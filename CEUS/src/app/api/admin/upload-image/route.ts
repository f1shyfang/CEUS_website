import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import {
  convertRasterToWebp,
  isRasterImage,
  isSvgImage,
} from '@/lib/adminImageUpload';
import { getPublicStorageUrl } from '@/lib/storagePublicUrls';
import { STORAGE_BUCKETS } from '@/lib/supabase';

export const runtime = 'nodejs';

const MAX_UPLOAD_BYTES = 12 * 1024 * 1024;
const ALLOWED_BUCKETS = new Set(Object.values(STORAGE_BUCKETS));

function sanitizeFolder(folder: string | null): string | null {
  if (!folder) return null;
  const cleaned = folder
    .trim()
    .replace(/^\/+|\/+$/g, '')
    .replace(/\.\./g, '');
  if (!cleaned || cleaned.includes('\\')) return null;
  return cleaned;
}

function randomFileStem(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(7)}`;
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Called from a Server Component context where setting cookies is ignored.
          }
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const file = formData.get('file');
  const bucket = String(formData.get('bucket') || '');
  const folder = sanitizeFolder(
    formData.get('folder') ? String(formData.get('folder')) : null
  );

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Missing image file' }, { status: 400 });
  }

  if (!ALLOWED_BUCKETS.has(bucket as (typeof STORAGE_BUCKETS)[keyof typeof STORAGE_BUCKETS])) {
    return NextResponse.json({ error: 'Invalid storage bucket' }, { status: 400 });
  }

  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json(
      { error: 'Image must be less than 12MB' },
      { status: 400 }
    );
  }

  const inputBuffer = Buffer.from(await file.arrayBuffer());
  const stem = randomFileStem();

  let uploadBody: Buffer | Blob;
  let contentType: string;
  let filename: string;

  if (isSvgImage(file.type, file.name)) {
    uploadBody = inputBuffer;
    contentType = 'image/svg+xml';
    filename = `${stem}.svg`;
  } else if (isRasterImage(file.type) || file.type.startsWith('image/')) {
    try {
      uploadBody = await convertRasterToWebp(inputBuffer);
      contentType = 'image/webp';
      filename = `${stem}.webp`;
    } catch (error) {
      console.error('WebP conversion failed:', error);
      return NextResponse.json(
        { error: 'Failed to convert image to WebP' },
        { status: 422 }
      );
    }
  } else {
    return NextResponse.json({ error: 'Unsupported image type' }, { status: 400 });
  }

  const path = folder ? `${folder}/${filename}` : filename;

  const { data, error } = await supabase.storage.from(bucket).upload(path, uploadBody, {
    cacheControl: '3600',
    upsert: true,
    contentType,
  });

  if (error) {
    console.error(`Error uploading to ${bucket}:`, error);
    return NextResponse.json(
      { error: error.message || 'Upload failed' },
      { status: 500 }
    );
  }

  return NextResponse.json({
    path: data.path,
    url: getPublicStorageUrl(bucket, data.path),
  });
}

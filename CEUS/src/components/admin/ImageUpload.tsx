'use client';

import { useState, useRef, useEffect } from 'react';
import { FiX, FiLoader, FiImage } from 'react-icons/fi';
import { STORAGE_BUCKETS } from '@/lib/supabase';

type BucketName = typeof STORAGE_BUCKETS[keyof typeof STORAGE_BUCKETS];

export type ImageUploadResult = {
  url: string;
  path: string;
};

interface ImageUploadProps {
  id?: string;
  bucket: BucketName;
  folder?: string;
  currentUrl?: string;
  onUpload: (url: string) => void;
  /** Prefer this when you need the storage object path (e.g. gallery DB rows). */
  onUploaded?: (result: ImageUploadResult) => void;
  onRemove?: () => void;
  className?: string;
  /** Max file size in MB (default 5). */
  maxSizeMB?: number;
}

export default function ImageUpload({
  id,
  bucket,
  folder,
  currentUrl,
  onUpload,
  onUploaded,
  onRemove,
  className = '',
  maxSizeMB = 5,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(currentUrl || null);
  }, [currentUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      setError(`Image must be less than ${maxSizeMB}MB`);
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('bucket', bucket);
      if (folder) {
        formData.append('folder', folder);
      }

      const response = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formData,
      });

      const payload = (await response.json().catch(() => null)) as
        | ImageUploadResult & { error?: string }
        | { error?: string }
        | null;

      if (!response.ok) {
        throw new Error(
          payload && 'error' in payload && payload.error
            ? payload.error
            : 'Failed to upload image'
        );
      }

      if (!payload || !('url' in payload) || !payload.url || !payload.path) {
        throw new Error('Invalid upload response');
      }

      const result: ImageUploadResult = {
        url: payload.url,
        path: payload.path,
      };

      setPreview(result.url);
      onUpload(result.url);
      onUploaded?.(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onRemove?.();
  };

  return (
    <div className={className}>
      {preview ? (
        <div className="relative">
          {/* Preview URL can be a dynamic external source. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg bg-gray-700"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1 bg-gray-900/80 hover:bg-red-600 text-white rounded-full transition"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label
          className={`flex flex-col items-center justify-center w-full h-48 bg-gray-700 border-2 border-dashed rounded-lg cursor-pointer transition ${
            isUploading
              ? 'border-indigo-500 bg-indigo-500/10'
              : 'border-gray-600 hover:border-gray-500 hover:bg-gray-600'
          }`}
        >
          <input
            id={id}
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
            className="hidden"
          />
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 text-indigo-400">
              <FiLoader className="w-8 h-8 animate-spin" />
              <span className="text-sm">Converting & uploading…</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <FiImage className="w-8 h-8" />
              <span className="text-sm">Click to upload image</span>
              <span className="text-xs text-gray-500">
                Max {maxSizeMB}MB · stored as WebP (SVG kept as SVG)
              </span>
            </div>
          )}
        </label>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}

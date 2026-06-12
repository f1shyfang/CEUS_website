// src/proxy.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Session cookies written by the pre-@supabase/ssr auth implementation.
// Cleared whenever seen so stale copies can't linger alongside the new ones.
const LEGACY_AUTH_COOKIES = ['sb-access-token', 'sb-refresh-token'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refreshes the session if the access token has expired and writes the
  // refreshed cookies onto the response. Do not run other code between
  // createServerClient and getUser().
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const cleanupLegacyCookies = (response: NextResponse) => {
    for (const name of LEGACY_AUTH_COOKIES) {
      if (request.cookies.has(name)) {
        response.cookies.delete(name);
      }
    }
    return response;
  };

  if (!user && pathname !== '/admin/login') {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    const redirectResponse = NextResponse.redirect(loginUrl);
    // Keep any cookie changes getUser() made (e.g. clearing a dead session).
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie);
    });
    return cleanupLegacyCookies(redirectResponse);
  }

  return cleanupLegacyCookies(supabaseResponse);
}

export const config = {
  matcher: ['/admin/:path*'],
};

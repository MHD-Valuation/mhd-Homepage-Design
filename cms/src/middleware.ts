import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const isProd = process.env.NODE_ENV === 'production'

/*
 * Content-Security-Policy — structural directives only.
 * script-src/style-src are intentionally not restricted: the Payload admin and
 * the inline-styled frontend rely on inline code, and a broken CSP is worse
 * than none. These directives still block clickjacking, <base> hijacking,
 * plugin content and form exfiltration to foreign hosts.
 */
const CSP = [
  "default-src 'self' https: data: blob: 'unsafe-inline'" + (isProd ? '' : " 'unsafe-eval' ws:"),
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(isProd ? ['upgrade-insecure-requests'] : []),
].join('; ')

const SECURITY_HEADERS: Record<string, string> = {
  'Content-Security-Policy': CSP,
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  // HSTS is only meaningful (and safe) over HTTPS
  ...(isProd ? { 'Strict-Transport-Security': 'max-age=31536000; includeSubDomains' } : {}),
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const localeQuery = request.nextUrl.searchParams.get('locale')
  if (localeQuery === 'vi' || localeQuery === 'en') {
    response.cookies.set('mhd_locale', localeQuery, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
      secure: isProd,
    })
  }

  for (const [key, value] of Object.entries(SECURITY_HEADERS)) response.headers.set(key, value)

  // CMS admin & API responses must never be cached by shared proxies
  const { pathname } = request.nextUrl
  if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
    response.headers.set('Cache-Control', 'no-store')
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|assets|favicon.ico).*)'],
}

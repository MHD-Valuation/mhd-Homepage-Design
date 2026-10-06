import path from 'path'

/* -------------------------------------------------------------------------- */
/*  Client IP                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Resolve the client IP for rate limiting.
 *
 * `x-forwarded-for` is client-controlled: a visitor can send any value and a
 * reverse proxy will APPEND the real address. The right-most entry is therefore
 * the one written by our own proxy and the only one we can trust.
 * `x-real-ip` (set by nginx/traefik) takes priority when present.
 */
export function getClientIp(request: Request): string {
  const realIp = request.headers.get('x-real-ip')?.trim()
  if (realIp) return realIp

  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const parts = forwarded.split(',').map((p) => p.trim()).filter(Boolean)
    if (parts.length) return parts[parts.length - 1]
  }
  return 'unknown'
}

/* -------------------------------------------------------------------------- */
/*  Rate limiter (sliding window, memory-bounded)                             */
/* -------------------------------------------------------------------------- */

interface Bucket {
  count: number
  resetAt: number
}

/**
 * Create an in-memory fixed-window limiter.
 * Suitable for a single container. For multi-instance deployments, back this
 * with Redis or a database table instead.
 */
export function createRateLimiter({ limit, windowMs, maxKeys = 10_000 }: { limit: number; windowMs: number; maxKeys?: number }) {
  const buckets = new Map<string, Bucket>()

  function sweep(now: number) {
    for (const [key, b] of buckets) if (now > b.resetAt) buckets.delete(key)
  }

  return {
    /** Returns remaining seconds until reset when blocked, or 0 when allowed. */
    check(key: string): number {
      const now = Date.now()
      if (buckets.size >= maxKeys) sweep(now)

      const b = buckets.get(key)
      if (!b || now > b.resetAt) {
        buckets.set(key, { count: 1, resetAt: now + windowMs })
        return 0
      }
      if (b.count >= limit) return Math.ceil((b.resetAt - now) / 1000)
      b.count += 1
      return 0
    },
  }
}

/* -------------------------------------------------------------------------- */
/*  Input sanitisation                                                        */
/* -------------------------------------------------------------------------- */

/** Trim, strip control characters and cap length. Non-strings become ''. */
export function cleanText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return ''
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, maxLength)
}

const VN_PHONE = /^(?:\+84|84|0)(?:3|5|7|8|9)\d{8}$/
const LANDLINE = /^(?:\+84|84|0)2\d{9}$/

export function isValidPhone(phone: string): boolean {
  const p = phone.replace(/[\s.()-]/g, '')
  return VN_PHONE.test(p) || LANDLINE.test(p)
}

export function isValidEmail(email: string): boolean {
  return email.length <= 254 && /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)
}

/* -------------------------------------------------------------------------- */
/*  File upload allowlist                                                     */
/* -------------------------------------------------------------------------- */

export const MAX_UPLOAD_BYTES = 20 * 1024 * 1024

type Signature = { offset?: number; bytes: number[] }

/**
 * Only document/image formats a valuation dossier legitimately needs.
 * Each extension is verified by its magic bytes, so a renamed .exe/.html/.svg
 * cannot slip through. SVG and HTML are deliberately excluded (stored XSS).
 */
const ALLOWED: Record<string, Signature[]> = {
  '.pdf': [{ bytes: [0x25, 0x50, 0x44, 0x46] }], // %PDF
  '.png': [{ bytes: [0x89, 0x50, 0x4e, 0x47] }],
  '.jpg': [{ bytes: [0xff, 0xd8, 0xff] }],
  '.jpeg': [{ bytes: [0xff, 0xd8, 0xff] }],
  '.webp': [{ offset: 8, bytes: [0x57, 0x45, 0x42, 0x50] }], // RIFF....WEBP
  // OOXML + zip share the PK header
  '.docx': [{ bytes: [0x50, 0x4b, 0x03, 0x04] }],
  '.xlsx': [{ bytes: [0x50, 0x4b, 0x03, 0x04] }],
  '.zip': [{ bytes: [0x50, 0x4b, 0x03, 0x04] }],
  // Legacy Office (OLE compound file)
  '.doc': [{ bytes: [0xd0, 0xcf, 0x11, 0xe0] }],
  '.xls': [{ bytes: [0xd0, 0xcf, 0x11, 0xe0] }],
}

export const ALLOWED_UPLOAD_EXTENSIONS = Object.keys(ALLOWED)

export type UploadCheck = { ok: true; ext: string } | { ok: false; reason: 'size' | 'type' }

export function validateUpload(fileName: string, buffer: Buffer): UploadCheck {
  if (buffer.length === 0 || buffer.length > MAX_UPLOAD_BYTES) return { ok: false, reason: 'size' }

  const ext = path.extname(fileName).toLowerCase()
  const sigs = ALLOWED[ext]
  if (!sigs) return { ok: false, reason: 'type' }

  const matches = sigs.some(({ offset = 0, bytes }) => bytes.every((b, i) => buffer[offset + i] === b))
  return matches ? { ok: true, ext } : { ok: false, reason: 'type' }
}

/** ASCII-only, no path separators, bounded length. */
export function safeFileName(name: string): string {
  const ext = path.extname(name).toLowerCase()
  const base = path
    .basename(name, path.extname(name))
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .replace(/_+/g, '_')
    .slice(0, 80)
  return `${base || 'file'}${ext}`
}

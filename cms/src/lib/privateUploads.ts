import path from 'path'

/**
 * Inquiry attachments (CVs, title deeds, financial statements) contain personal
 * data and must never be web-accessible. They live outside /public and are
 * streamed only to authenticated CMS users.
 */
export const PRIVATE_UPLOAD_DIR = path.resolve(
  process.cwd(),
  process.env.PRIVATE_UPLOAD_DIR || 'private-uploads',
)

const CONTENT_TYPES: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.xls': 'application/vnd.ms-excel',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.zip': 'application/zip',
}

export function contentTypeFor(fileName: string): string {
  return CONTENT_TYPES[path.extname(fileName).toLowerCase()] || 'application/octet-stream'
}

/** Resolve a stored file name to an absolute path, rejecting traversal. */
export function resolvePrivateFile(name: string): string | null {
  if (!name || name !== path.basename(name) || !/^[A-Za-z0-9._-]+$/.test(name)) return null
  const full = path.resolve(PRIVATE_UPLOAD_DIR, name)
  return full.startsWith(PRIVATE_UPLOAD_DIR + path.sep) ? full : null
}

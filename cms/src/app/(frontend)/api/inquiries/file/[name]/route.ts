import { getPayload } from 'payload'
import config from '@payload-config'
import fs from 'fs'

import { contentTypeFor, resolvePrivateFile } from '@/lib/privateUploads'

/**
 * Authenticated download of inquiry attachments.
 * Only logged-in CMS users (Payload session cookie) may access these files.
 */
export async function GET(request: Request, { params }: { params: Promise<{ name: string }> }) {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: request.headers })
  if (!user) return new Response('Unauthorized', { status: 401 })

  const { name } = await params
  const filePath = resolvePrivateFile(decodeURIComponent(name))
  if (!filePath) return new Response('Not found', { status: 404 })

  try {
    const data = await fs.promises.readFile(filePath)
    return new Response(new Uint8Array(data), {
      headers: {
        'Content-Type': contentTypeFor(filePath),
        // Force download — never render user-supplied content inline on our origin
        'Content-Disposition': `attachment; filename="${encodeURIComponent(name)}"`,
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'private, no-store',
      },
    })
  } catch {
    return new Response('Not found', { status: 404 })
  }
}

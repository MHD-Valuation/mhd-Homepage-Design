/**
 * One-off migration: move inquiry attachments out of /public/uploads (publicly
 * downloadable) into private storage, and rewrite their URLs in the CMS.
 *
 *   npx tsx src/scripts/migrate-private-uploads.ts
 *
 * Safe to re-run: records already pointing at /api/inquiries/file/ are skipped.
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import fs from 'fs'
import path from 'path'

import config from '../payload.config'
import { PRIVATE_UPLOAD_DIR } from '../lib/privateUploads'

const PUBLIC_DIR = path.resolve(process.cwd(), 'public', 'uploads')

async function main() {
  const payload = await getPayload({ config })
  await fs.promises.mkdir(PRIVATE_UPLOAD_DIR, { recursive: true })

  const { docs } = await payload.find({
    collection: 'inquiries',
    where: { fileUrl: { like: '/uploads/' } },
    limit: 1000,
    depth: 0,
  })

  let moved = 0
  for (const doc of docs) {
    const name = path.basename(doc.fileUrl || '')
    const from = path.join(PUBLIC_DIR, name)
    const to = path.join(PRIVATE_UPLOAD_DIR, name)

    if (fs.existsSync(from)) await fs.promises.rename(from, to)
    if (!fs.existsSync(to)) {
      console.warn(`  ! missing file for ${doc.ticketNumber}: ${name}`)
      continue
    }

    await payload.update({
      collection: 'inquiries',
      id: doc.id,
      data: { fileUrl: `/api/inquiries/file/${encodeURIComponent(name)}` },
    })
    moved++
    console.log(`  ✓ ${doc.ticketNumber} → private`)
  }

  // Sweep any orphaned files left in the public folder
  if (fs.existsSync(PUBLIC_DIR)) {
    for (const name of await fs.promises.readdir(PUBLIC_DIR)) {
      await fs.promises.rename(path.join(PUBLIC_DIR, name), path.join(PRIVATE_UPLOAD_DIR, name))
      console.log(`  ✓ orphan ${name} → private`)
    }
    await fs.promises.rmdir(PUBLIC_DIR).catch(() => {})
  }

  console.log(`Done. ${moved} record(s) migrated.`)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

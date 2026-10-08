import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import { revalidateCacheTag } from '../lib/revalidate'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    group: 'Nội dung',
  },
  access: {
    read: () => true,
    // Only CMS users may upload. Public inquiry attachments go through
    // /api/inquiries into private storage instead.
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateCacheTag('media')
        revalidateCacheTag('partners')
        revalidateCacheTag('about')
        revalidateCacheTag('homepage')
        return doc
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateCacheTag('media')
        revalidateCacheTag('partners')
        revalidateCacheTag('about')
        revalidateCacheTag('homepage')
        return doc
      },
    ],
  },
  upload: {
    staticDir: path.resolve(dirname, '../../media'),
    mimeTypes: [
      // Explicit raster types only — SVG can embed scripts
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/avif',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/zip',
      'application/x-zip-compressed',
    ],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 320,
        height: 240,
        position: 'centre',
      },
      {
        name: 'card',
        width: 640,
        height: 480,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Mô tả hình ảnh / Tên tài liệu',
      localized: true,
      defaultValue: 'Tài liệu hồ sơ MHD',
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Chú thích',
      localized: true,
    },
  ],
}

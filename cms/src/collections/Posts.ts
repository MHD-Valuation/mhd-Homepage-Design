import type { CollectionConfig } from 'payload'
import { revalidateCacheTag } from '../lib/revalidate'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'status'],
    group: 'Dữ liệu & Insight',
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateCacheTag('posts')
        revalidateCacheTag('homepage')
        return doc
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateCacheTag('posts')
        revalidateCacheTag('homepage')
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Tiêu đề bài viết',
      localized: true,
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Đường dẫn (Slug)',
      required: true,
      unique: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Chuyên mục',
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Ngày xuất bản',
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Tóm tắt bài viết',
      localized: true,
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Ảnh đại diện bài viết',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Nội dung chi tiết bài viết',
      localized: true,
    },
    {
      name: 'readingTime',
      type: 'text',
      label: 'Thời gian đọc (VD: 5 phút)',
      localized: true,
      defaultValue: '5 phút đọc',
    },
  ],
}

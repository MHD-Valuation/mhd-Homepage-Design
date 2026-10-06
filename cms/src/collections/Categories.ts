import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    group: 'Dữ liệu & Insight',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Tên chuyên mục',
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
      name: 'description',
      type: 'textarea',
      label: 'Mô tả chuyên mục',
      localized: true,
    },
  ],
}

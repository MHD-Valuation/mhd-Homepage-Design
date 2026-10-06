import type { CollectionConfig } from 'payload'

export const Team: CollectionConfig = {
  slug: 'team',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'position', 'cardId', 'order'],
    group: 'Về MHD',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Họ và tên',
      required: true,
    },
    {
      name: 'position',
      type: 'text',
      label: 'Chức danh / Vị trí',
      localized: true,
      required: true,
    },
    {
      name: 'cardId',
      type: 'text',
      label: 'Mã số thẻ thẩm định viên về giá (do Bộ Tài chính cấp)',
    },
    {
      name: 'experienceYears',
      type: 'number',
      label: 'Số năm kinh nghiệm',
      defaultValue: 10,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Thứ tự hiển thị',
      defaultValue: 1,
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Ảnh chân dung',
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Tiểu sử tóm tắt',
      localized: true,
    },
  ],
}

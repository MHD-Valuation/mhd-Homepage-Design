import type { CollectionConfig } from 'payload'
import { revalidateCacheTag } from '../lib/revalidate'

export const Team: CollectionConfig = {
  slug: 'team',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'position', 'category', 'experienceYears', 'order'],
    group: 'Về MHD',
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateCacheTag('team')
        revalidateCacheTag('about')
        revalidateCacheTag('homepage')
        return doc
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateCacheTag('team')
        revalidateCacheTag('about')
        revalidateCacheTag('homepage')
        return doc
      },
    ],
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
      label: 'Chức vụ',
      localized: true,
      required: true,
    },
    {
      name: 'experienceYears',
      type: 'number',
      label: 'Số năm kinh nghiệm',
      defaultValue: 10,
    },
    {
      name: 'category',
      type: 'select',
      label: 'Phân nhóm nhân sự',
      defaultValue: 'valuer',
      options: [
        { label: 'Ban lãnh đạo', value: 'leadership' },
        { label: 'Thẩm định viên', value: 'valuer' },
      ],
      required: true,
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
      label: 'Ảnh đại diện (tuỳ chọn)',
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Mô tả nhân sự / Bằng cấp & Chuyên môn',
      localized: true,
      admin: {
        description: 'Mô tả quá trình công tác, bằng cấp, năng lực chuyên môn của nhân sự',
      },
    },
  ],
}

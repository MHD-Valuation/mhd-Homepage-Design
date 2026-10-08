import type { CollectionConfig } from 'payload'
import { revalidateCacheTag } from '../lib/revalidate'

export const Documents: CollectionConfig = {
  slug: 'documents',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'docNumber', 'issuingAuthority', 'type'],
    group: 'Pháp lý & Tiêu chuẩn',
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateCacheTag('documents')
        return doc
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateCacheTag('documents')
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Tên văn bản / hồ sơ',
      localized: true,
      required: true,
    },
    {
      name: 'docNumber',
      type: 'text',
      label: 'Số hiệu văn bản (VD: 30/2024/TT-BTC, 000/GCN-BTC)',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      label: 'Loại tài liệu',
      options: [
        { label: 'Giấy phép hành nghề', value: 'license' },
        { label: 'Chuẩn mực thẩm định giá (Thông tư BTC)', value: 'standard' },
        { label: 'Quy trình kiểm soát chất lượng', value: 'procedure' },
        { label: 'Chính sách bảo mật & độc lập', value: 'policy' },
        { label: 'Hồ sơ năng lực (Profile công ty)', value: 'profile' },
      ],
      defaultValue: 'standard',
    },
    {
      name: 'issuingAuthority',
      type: 'text',
      label: 'Cơ quan ban hành / cấp phép',
      defaultValue: 'Bộ Tài chính',
    },
    {
      name: 'effectiveDate',
      type: 'date',
      label: 'Ngày ban hành / có hiệu lực',
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Tóm tắt nội dung',
      localized: true,
    },
    {
      name: 'fileAttachment',
      type: 'upload',
      relationTo: 'media',
      label: 'File đính kèm (PDF, văn bản gốc)',
    },
  ],
}

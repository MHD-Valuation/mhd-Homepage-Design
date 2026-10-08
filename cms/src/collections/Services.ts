import type { CollectionConfig } from 'payload'
import { revalidateCacheTag } from '../lib/revalidate'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'order', 'updatedAt'],
    group: 'Dịch vụ & Dự án',
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateCacheTag('services')
        revalidateCacheTag('homepage')
        return doc
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateCacheTag('services')
        revalidateCacheTag('homepage')
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Tên dịch vụ',
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
      name: 'order',
      type: 'number',
      label: 'Thứ tự hiển thị',
      defaultValue: 1,
    },
    {
      name: 'icon',
      type: 'select',
      label: 'Biểu tượng dịch vụ',
      options: [
        { label: 'Doanh nghiệp (Building2)', value: 'building' },
        { label: 'Bất động sản (Home)', value: 'realestate' },
        { label: 'Máy móc thiết bị (Cog / Cpu)', value: 'machinery' },
        { label: 'Thương hiệu / Sở hữu trí tuệ (Award)', value: 'brand' },
        { label: 'Dự án đầu tư (BarChart3)', value: 'project' },
        { label: 'Chứng minh tài chính (BadgeDollarSign)', value: 'finance' },
      ],
      defaultValue: 'building',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Mô tả ngắn (hiển thị ngoài danh sách/thẻ)',
      localized: true,
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Ảnh bìa dịch vụ',
    },
    {
      name: 'valuationPurposes',
      type: 'array',
      label: 'Mục đích thẩm định (Các trường hợp áp dụng)',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Mục đích (VD: M&A, Cổ phần hóa, Thế chấp vay vốn...)',
          localized: true,
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          label: 'Ghi chú',
          localized: true,
        },
      ],
    },
    {
      name: 'processSteps',
      type: 'array',
      label: 'Quy trình thẩm định đặc thù của dịch vụ này',
      fields: [
        {
          name: 'step',
          type: 'text',
          label: 'Bước (VD: Bước 1)',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Tên bước',
          localized: true,
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Chi tiết nghiệp vụ',
          localized: true,
        },
      ],
    },
    {
      name: 'requiredDossier',
      type: 'array',
      label: 'Hồ sơ khách hàng cần chuẩn bị',
      fields: [
        {
          name: 'documentName',
          type: 'text',
          label: 'Tên loại giấy tờ/tài liệu',
          localized: true,
          required: true,
        },
        {
          name: 'isMandatory',
          type: 'checkbox',
          label: 'Bắt buộc',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'legalStandards',
      type: 'array',
      label: 'Căn cứ pháp lý & Chuẩn mực áp dụng',
      fields: [
        {
          name: 'code',
          type: 'text',
          label: 'Mã văn bản (VD: TT 30/2024/TT-BTC)',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          label: 'Tên chuẩn mực',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'detailedContent',
      type: 'richText',
      label: 'Nội dung chi tiết dịch vụ',
      localized: true,
    },
  ],
}

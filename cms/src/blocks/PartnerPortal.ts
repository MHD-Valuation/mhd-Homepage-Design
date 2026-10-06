import type { Block } from 'payload'

export const PartnerPortalBlock: Block = {
  slug: 'partnerPortal',
  labels: {
    singular: 'Cổng thông tin đối tác & Xác thực',
    plural: 'Cổng thông tin đối tác & Xác thực',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Nhãn hệ thống',
      localized: true,
      defaultValue: 'Hệ thống dành cho đối tác tổ chức',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Tiêu đề chính (H2)',
      localized: true,
      defaultValue: 'Cổng thông tin & công cụ xác thực',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Mô tả',
      localized: true,
      defaultValue: 'Hệ thống chuyên biệt giúp ngân hàng, doanh nghiệp và cơ quan quản lý thẩm tra, xác thực và theo dõi hồ sơ.',
    },
    {
      name: 'portals',
      type: 'array',
      label: 'Danh sách các cổng dịch vụ',
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: 'Thẻ phân loại (VD: Dành cho Ngân hàng / Doanh nghiệp)',
          localized: true,
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Tên tiện ích / Cổng',
          localized: true,
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Mô tả',
          localized: true,
          required: true,
        },
        {
          name: 'actionLabel',
          type: 'text',
          label: 'Tên hành động / Nút',
          localized: true,
          required: true,
        },
        {
          name: 'actionUrl',
          type: 'text',
          label: 'Đường dẫn liên kết',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Icon đại diện',
          options: [
            { label: 'Tài liệu / Năng lực (FileCheck)', value: 'file' },
            { label: 'Quét mã QR / Tra cứu (QrCode)', value: 'qr' },
            { label: 'Tiến độ dự án / Portal (Layers)', value: 'portal' },
          ],
          defaultValue: 'qr',
        },
      ],
    },
  ],
}

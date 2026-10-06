import type { Block } from 'payload'

export const InsightsBlock: Block = {
  slug: 'insightsBlock',
  labels: {
    singular: 'Khối Dữ liệu & Insight',
    plural: 'Khối Dữ liệu & Insight',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Nhãn phân mục',
      localized: true,
      defaultValue: 'Dữ liệu & Insight',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Tiêu đề chính (H2)',
      localized: true,
      defaultValue: 'Phân tích thị trường và xu hướng giá',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Mô tả ngắn',
      localized: true,
      defaultValue: 'Phân tích cập nhật định kỳ theo ngành, khu vực và loại tài sản, dựa trên dữ liệu thẩm định thực tế của MHD.',
    },
    {
      name: 'categoryChips',
      type: 'array',
      label: 'Danh mục lọc nhanh (Tabs / Chips)',
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
          label: 'Slug liên kết',
        },
      ],
    },
    {
      name: 'viewAllText',
      type: 'text',
      label: 'Nhãn xem tất cả',
      localized: true,
      defaultValue: 'Xem tất cả bài viết →',
    },
    {
      name: 'viewAllUrl',
      type: 'text',
      label: 'Đường dẫn xem tất cả',
      defaultValue: '/insight',
    },
  ],
}

import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Nhận xét khách hàng & Đối tác',
    plural: 'Nhận xét khách hàng & Đối tác',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Nhãn phân mục',
      localized: true,
      defaultValue: 'Ý kiến từ đối tác & khách hàng',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Tiêu đề chính (H2)',
      localized: true,
      defaultValue: 'Đồng hành cùng tổ chức tín dụng & doanh nghiệp',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Danh sách đánh giá',
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          label: 'Nội dung nhận xét',
          localized: true,
          required: true,
        },
        {
          name: 'clientTitle',
          type: 'text',
          label: 'Chức danh khách hàng',
          localized: true,
          defaultValue: 'Giám đốc Tài chính',
        },
        {
          name: 'companyType',
          type: 'text',
          label: 'Loại hình tổ chức',
          localized: true,
          defaultValue: 'Doanh nghiệp sản xuất',
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          label: 'Ảnh đại diện (tuỳ chọn)',
        },
      ],
    },
  ],
}

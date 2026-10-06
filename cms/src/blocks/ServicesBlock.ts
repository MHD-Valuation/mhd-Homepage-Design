import type { Block } from 'payload'

export const ServicesBlock: Block = {
  slug: 'servicesBlock',
  labels: {
    singular: 'Khối Dịch vụ thẩm định',
    plural: 'Khối Dịch vụ thẩm định',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Nhãn phần',
      localized: true,
      defaultValue: 'Dịch vụ thẩm định giá',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Tiêu đề chính (H2)',
      localized: true,
      defaultValue: 'Giải pháp thẩm định theo từng loại tài sản',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Mô tả ngắn',
      localized: true,
      defaultValue: 'Mỗi dịch vụ có quy trình, bộ hồ sơ và đội ngũ thẩm định viên chuyên trách riêng theo mục đích sử dụng.',
    },
    {
      name: 'servicesMode',
      type: 'select',
      label: 'Cách lấy dữ liệu dịch vụ',
      defaultValue: 'dynamic',
      options: [
        { label: 'Tự động lấy từ Danh mục Dịch vụ (Recommended)', value: 'dynamic' },
        { label: 'Chọn thủ công từng dịch vụ', value: 'manual' },
      ],
    },
    {
      name: 'selectedServices',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      label: 'Chọn dịch vụ hiển thị (nếu chọn thủ công)',
      admin: {
        condition: (_, siblingData) => siblingData?.servicesMode === 'manual',
      },
    },
    {
      name: 'bottomCta',
      type: 'group',
      label: 'Khối CTA bên dưới danh sách dịch vụ',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Tiêu đề',
          localized: true,
          defaultValue: 'Cần tư vấn loại hình thẩm định phù hợp?',
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'Tên nút',
          localized: true,
          defaultValue: 'Yêu cầu tư vấn chuyên sâu →',
        },
        {
          name: 'buttonUrl',
          type: 'text',
          label: 'Đường dẫn liên kết',
          defaultValue: '/lien-he',
        },
      ],
    },
  ],
}

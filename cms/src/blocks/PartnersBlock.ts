import type { Block } from 'payload'

export const PartnersBlock: Block = {
  slug: 'partnersBlock',
  labels: {
    singular: 'Khối Đối tác & Doanh nghiệp',
    plural: 'Các khối Đối tác & Doanh nghiệp',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Nhãn nhỏ (Badge)',
      localized: true,
      defaultValue: 'Đối tác & Khách hàng',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Tiêu đề chính',
      localized: true,
      defaultValue: 'Đơn vị đã làm việc cùng MHD',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Đoạn mô tả ngắn',
      localized: true,
      defaultValue:
        'MHD vinh dự đồng hành cùng các ngân hàng thương mại, tập đoàn kinh tế và các tổ chức tài chính hàng đầu tại Việt Nam.',
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Số lượng logo hiển thị tối đa',
      defaultValue: 16,
    },
  ],
}

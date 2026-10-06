import type { Block } from 'payload'

export const ProcessBlock: Block = {
  slug: 'process',
  labels: {
    singular: 'Quy trình thẩm định',
    plural: 'Quy trình thẩm định',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Nhãn phần (Badge)',
      localized: true,
      defaultValue: 'Quy trình kiểm soát chất lượng',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Tiêu đề chính (H2)',
      localized: true,
      defaultValue: 'Bốn bước chuẩn hoá, một chứng thư xác thực',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Mô tả ngắn',
      localized: true,
      defaultValue: 'Mọi hồ sơ đều qua cùng một quy trình kiểm soát chất lượng, được thẩm định viên độc lập soát xét trước khi phát hành.',
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Các bước quy trình',
      fields: [
        {
          name: 'stepNumber',
          type: 'text',
          label: 'Số thứ tự bước (VD: 01)',
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
          label: 'Mô tả chi tiết',
          localized: true,
          required: true,
        },
        {
          name: 'badgeText',
          type: 'text',
          label: 'Tag/Ghi chú chuẩn mực kèm theo',
          localized: true,
        },
      ],
    },
  ],
}

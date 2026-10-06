import type { Block } from 'payload'

export const RichContentBlock: Block = {
  slug: 'richContent',
  labels: {
    singular: 'Nội dung chi tiết (Rich Text)',
    plural: 'Nội dung chi tiết (Rich Text)',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Tiêu đề khối (tuỳ chọn)',
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Nội dung',
      localized: true,
      required: true,
    },
  ],
}

export const FaqBlock: Block = {
  slug: 'faq',
  labels: {
    singular: 'Khối Hỏi & Đáp (FAQ)',
    plural: 'Khối Hỏi & Đáp (FAQ)',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Tiêu đề khối',
      localized: true,
      defaultValue: 'Câu hỏi thường gặp',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Danh sách câu hỏi & giải đáp',
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Câu hỏi',
          localized: true,
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          label: 'Câu trả lời',
          localized: true,
          required: true,
        },
      ],
    },
  ],
}

import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero Banner',
    plural: 'Hero Banners',
  },
  fields: [
    {
      name: 'badgeText',
      type: 'text',
      label: 'Huy hiệu trên tiêu đề (Badge)',
      localized: true,
      defaultValue: 'Đủ điều kiện kinh doanh dịch vụ thẩm định giá',
    },
    {
      name: 'titleLine1',
      type: 'text',
      label: 'Tiêu đề dòng 1',
      localized: true,
      required: true,
      defaultValue: 'Thẩm định giá',
    },
    {
      name: 'titleLine2',
      type: 'text',
      label: 'Tiêu đề dòng 2',
      localized: true,
      required: true,
      defaultValue: 'theo chuẩn mực Việt Nam',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Đoạn mô tả ngắn',
      localized: true,
      defaultValue: 'MHD thẩm định giá doanh nghiệp, bất động sản, động sản và tài sản vô hình. Hồ sơ được thực hiện theo Chuẩn mực thẩm định giá Việt Nam.',
    },
    {
      name: 'primaryCta',
      type: 'group',
      label: 'Nút hành động chính',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Nhãn nút',
          localized: true,
          defaultValue: 'Gửi yêu cầu thẩm định',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Đường dẫn liên kết',
          defaultValue: '/lien-he#yeu-cau',
        },
      ],
    },
    {
      name: 'secondaryCta',
      type: 'group',
      label: 'Nút hành động phụ',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Nhãn nút',
          localized: true,
          defaultValue: 'Dành cho KH tổ chức (B2B)',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Đường dẫn liên kết',
          defaultValue: '/phap-ly/tra-cuu',
        },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Ảnh nền Hero',
    },
    {
      name: 'statsCard',
      type: 'group',
      label: 'Khối năng lực số liệu (Stats Card)',
      fields: [
        {
          name: 'headerTitle',
          type: 'text',
          label: 'Tiêu đề khối',
          localized: true,
          defaultValue: 'Năng lực hoạt động',
        },
        {
          name: 'statAValue',
          type: 'text',
          label: 'Chỉ số 1 (Giá trị)',
          defaultValue: '5.000+',
        },
        {
          name: 'statALabel',
          type: 'text',
          label: 'Chỉ số 1 (Nhãn)',
          localized: true,
          defaultValue: 'Hồ sơ đã hoàn thành',
        },
        {
          name: 'statBValue',
          type: 'text',
          label: 'Chỉ số 2 (Giá trị)',
          defaultValue: '60+',
        },
        {
          name: 'statBLabel',
          type: 'text',
          label: 'Chỉ số 2 (Nhãn)',
          localized: true,
          defaultValue: 'Nhân sự chuyên môn',
        },
        {
          name: 'dossierLinkText',
          type: 'text',
          label: 'Nhãn liên kết Hồ sơ năng lực',
          localized: true,
          defaultValue: 'Hồ sơ năng lực →',
        },
        {
          name: 'dossierLinkUrl',
          type: 'text',
          label: 'Đường dẫn Hồ sơ năng lực',
          defaultValue: '/gioi-thieu#ho-so',
        },
        {
          name: 'footnote',
          type: 'text',
          label: 'Ghi chú chuẩn mực phía dưới',
          localized: true,
          defaultValue: 'Thực hiện theo Chuẩn mực thẩm định giá Việt Nam, Luật Giá 2023 và các quy định pháp luật có liên quan',
        },
      ],
    },
    {
      name: 'tickerItems',
      type: 'array',
      label: 'Dải chữ chạy ngang (Trust Marquee)',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Nội dung',
          localized: true,
          required: true,
        },
        {
          name: 'highlight',
          type: 'text',
          label: 'Chữ in đậm/nổi bật',
          localized: true,
        },
      ],
    },
  ],
}

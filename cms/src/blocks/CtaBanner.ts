import type { Block } from 'payload'

export const CtaBannerBlock: Block = {
  slug: 'ctaBanner',
  labels: {
    singular: 'Khối Kêu gọi hành động (CTA Banner)',
    plural: 'Khối Kêu gọi hành động (CTA Banner)',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Huy hiệu / Tag',
      localized: true,
      defaultValue: 'Tư vấn nhanh chóng',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Tiêu đề chính',
      localized: true,
      defaultValue: 'Sẵn sàng nhận báo giá thẩm định trong 24 giờ?',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Mô tả ngắn',
      localized: true,
      defaultValue: 'Chỉ cần mô tả ngắn về tài sản cần thẩm định — đội ngũ MHD sẽ liên hệ và tư vấn quy trình phù hợp.',
    },
    {
      name: 'buttonLabel',
      type: 'text',
      label: 'Tên nút chính',
      localized: true,
      defaultValue: 'Yêu cầu thẩm định ngay',
    },
    {
      name: 'buttonUrl',
      type: 'text',
      label: 'Đường dẫn liên kết',
      defaultValue: '/lien-he#yeu-cau',
    },
    {
      name: 'hotlineLabel',
      type: 'text',
      label: 'Nhãn hotline',
      localized: true,
      defaultValue: 'Hoặc gọi tư vấn trực tiếp:',
    },
    {
      name: 'hotlineNumber',
      type: 'text',
      label: 'Số điện thoại hotline',
      defaultValue: '028 3823 8888',
    },
  ],
}

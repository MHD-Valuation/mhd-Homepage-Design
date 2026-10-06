import type { Block } from 'payload'

export const WhyUsBlock: Block = {
  slug: 'whyUs',
  labels: {
    singular: 'Khối Vì sao chọn MHD',
    plural: 'Khối Vì sao chọn MHD',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Nhãn phần (Badge)',
      localized: true,
      defaultValue: 'Vì sao chọn MHD',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Tiêu đề chính (H2)',
      localized: true,
      defaultValue: 'Uy tín được kiểm chứng, không chỉ tuyên bố',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Danh sách điểm mạnh / Uy tín',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Tiêu đề',
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
          name: 'icon',
          type: 'select',
          label: 'Biểu tượng (Icon)',
          options: [
            { label: 'Pháp lý / Chứng nhận (Shield)', value: 'shield' },
            { label: 'Xác thực QR (QrCode)', value: 'qrcode' },
            { label: 'Dữ liệu thị trường (TrendingUp)', value: 'chart' },
            { label: 'Độc lập / Minh bạch (CheckCircle)', value: 'check' },
          ],
          defaultValue: 'shield',
        },
      ],
    },
    {
      name: 'teamCard',
      type: 'group',
      label: 'Thẻ Đội ngũ thẩm định viên',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Tiêu đề',
          localized: true,
          defaultValue: 'Đội ngũ thẩm định viên',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Mô tả',
          localized: true,
          defaultValue: 'Danh sách thẩm định viên đủ điều kiện hành nghề, đối chiếu công khai với danh sách của Bộ Tài chính.',
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'Tên nút liên kết',
          localized: true,
          defaultValue: 'Xem danh sách thẩm định viên →',
        },
        {
          name: 'buttonUrl',
          type: 'text',
          label: 'Đường dẫn liên kết',
          defaultValue: '/phap-ly/tham-dinh-vien',
        },
      ],
    },
  ],
}

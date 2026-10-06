import type { GlobalConfig } from 'payload'
import { revalidateCacheTag } from '../lib/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Cấu hình chung (Globals)',
  },
  hooks: {
    afterChange: [
      () => {
        revalidateCacheTag('globals')
        revalidateCacheTag('global-site-settings')
      },
    ],
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      label: 'Tên Website',
      defaultValue: 'MHD Valuation - Thẩm định giá chuyên nghiệp',
      localized: true,
      required: true,
    },
    {
      name: 'defaultSeoDescription',
      type: 'textarea',
      label: 'Mô tả SEO mặc định',
      localized: true,
      defaultValue: 'MHD cung cấp dịch vụ thẩm định giá doanh nghiệp, bất động sản, động sản và tài sản vô hình tuân thủ Chuẩn mực thẩm định giá Việt Nam.',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Mạng xã hội & Kênh liên kết',
      fields: [
        {
          name: 'platform',
          type: 'text',
          label: 'Nền tảng (VD: LinkedIn, Facebook, Zalo)',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'Đường dẫn URL',
          required: true,
        },
      ],
    },
    {
      name: 'hotline',
      type: 'text',
      label: 'Số Hotline liên hệ nhanh',
      defaultValue: '1900 000 000',
    },
    {
      name: 'zaloNumber',
      type: 'text',
      label: 'Số Zalo liên hệ (hoặc OA ID)',
      defaultValue: '3920702626611603828',
    },
    {
      name: 'zaloUrl',
      type: 'text',
      label: 'Đường dẫn liên kết Zalo',
      defaultValue: 'https://zalo.me/3920702626611603828',
    },
    {
      name: 'workingHours',
      type: 'text',
      label: 'Thời gian làm việc hỗ trợ',
      localized: true,
      defaultValue: '8:00 – 17:30, thứ Hai – thứ Bảy',
    },
    {
      name: 'quickContactTitle',
      type: 'text',
      label: 'Tiêu đề Widget Liên Hệ',
      localized: true,
      defaultValue: 'LIÊN HỆ MHD',
    },
    {
      name: 'phoneTitle',
      type: 'text',
      label: 'Nhãn nút Gọi điện thoại',
      localized: true,
      defaultValue: 'Gọi điện thoại',
    },
    {
      name: 'zaloTitle',
      type: 'text',
      label: 'Nhãn nút Nhắn Zalo',
      localized: true,
      defaultValue: 'Nhắn Zalo',
    },
  ],
}

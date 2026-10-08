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
        revalidateCacheTag('global-site-settings-vi')
        revalidateCacheTag('global-site-settings-en')
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
      defaultValue: '028 3515 3516',
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
    {
      name: 'officeCompany',
      type: 'text',
      label: 'Tên trụ sở / Công ty (Văn phòng)',
      localized: true,
      defaultValue: 'Công ty TNHH Thẩm định giá MHD',
    },
    {
      name: 'officeAddress',
      type: 'text',
      label: 'Địa chỉ trụ sở chính (Trang Liên hệ)',
      localized: true,
      defaultValue: 'Số 00 Đường ABC, Phường X, TP. Hồ Chí Minh',
    },
    {
      name: 'officeHoursWeekday',
      type: 'text',
      label: 'Giờ làm việc trong tuần (Thứ 2 – Thứ 6)',
      localized: true,
      defaultValue: 'Thứ 2 – Thứ 6: 8:00 – 17:30',
    },
    {
      name: 'officeHoursWeekend',
      type: 'text',
      label: 'Giờ làm việc cuối tuần (Thứ 7)',
      localized: true,
      defaultValue: 'Thứ 7: 8:00 – 12:00',
    },
    {
      name: 'officePhone',
      type: 'text',
      label: 'Số điện thoại văn phòng',
      defaultValue: '028 3515 3516',
    },
    {
      name: 'officeEmail',
      type: 'text',
      label: 'Email văn phòng',
      defaultValue: 'contact@mhd.com.vn',
    },
    {
      name: 'officeMapUrl',
      type: 'text',
      label: 'Đường dẫn Google Maps (Nút Chỉ đường)',
      defaultValue: 'https://maps.google.com/?q=TP.+Ho+Chi+Minh',
    },
  ],
}

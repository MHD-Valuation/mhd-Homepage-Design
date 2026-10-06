import type { GlobalConfig } from 'payload'
import { revalidateCacheTag } from '../lib/revalidate'

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: {
    group: 'Cấu hình chung (Globals)',
  },
  hooks: {
    afterChange: [
      () => {
        revalidateCacheTag('globals')
        revalidateCacheTag('global-footer')
      },
    ],
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      label: 'Tên công ty',
      localized: true,
      defaultValue: 'Công ty TNHH Thẩm định giá MHD',
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Khẩu hiệu (Tagline)',
      localized: true,
      defaultValue: 'Giá trị tài sản, giá trị cốt lõi.',
    },
    {
      name: 'qualificationNotice',
      type: 'text',
      label: 'Thông báo pháp lý hành nghề',
      localized: true,
      defaultValue: 'Đủ điều kiện hành nghề thẩm định giá theo quy định pháp luật Việt Nam. Giấy phép hành nghề số 000/GCN-BTC.',
    },
    {
      name: 'address',
      type: 'text',
      label: 'Địa chỉ trụ sở',
      localized: true,
      defaultValue: 'TP. Hồ Chí Minh, Việt Nam',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Số điện thoại',
      defaultValue: '028 3823 8888',
    },
    {
      name: 'email',
      type: 'text',
      label: 'Email liên hệ',
      defaultValue: 'contact@mhd.com.vn',
    },
    {
      name: 'workingHours',
      type: 'text',
      label: 'Thời gian làm việc',
      localized: true,
      defaultValue: 'Thứ Hai – Thứ Sáu: 8:00 – 17:30',
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Các cột liên kết Footer',
      localized: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Tiêu đề cột',
          localized: true,
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          label: 'Danh sách liên kết',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Tên liên kết',
              localized: true,
              required: true,
            },
            {
              name: 'href',
              type: 'text',
              label: 'Đường dẫn',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'licenseText',
      type: 'text',
      label: 'Dòng thông báo giấy phép (đáy trang)',
      localized: true,
      defaultValue: 'Giấy chứng nhận đủ điều kiện kinh doanh dịch vụ thẩm định giá số 000/GCN-BTC',
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'Dòng bản quyền',
      localized: true,
      defaultValue: '© 2026 Công ty TNHH Thẩm định giá MHD. Bản quyền đã đăng ký.',
    },
  ],
}

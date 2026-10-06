import type { GlobalConfig } from 'payload'
import { revalidateCacheTag } from '../lib/revalidate'

export const Header: GlobalConfig = {
  slug: 'header',
  admin: {
    group: 'Cấu hình chung (Globals)',
  },
  hooks: {
    afterChange: [
      () => {
        revalidateCacheTag('globals')
        revalidateCacheTag('global-header')
        revalidateCacheTag('global-header-vi')
        revalidateCacheTag('global-header-en')
      },
    ],
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo MHD (Header)',
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Danh sách Menu chính',
      localized: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Tên mục menu',
          localized: true,
          required: true,
        },
        {
          name: 'menuKey',
          type: 'select',
          label: 'Phân loại Mega Menu',
          options: [
            { label: 'Về MHD (about)', value: 'about' },
            { label: 'Dịch vụ (services)', value: 'services' },
            { label: 'Dự án (projects)', value: 'projects' },
            { label: 'Dữ liệu & Insight (insight)', value: 'insight' },
            { label: 'Pháp lý (legal)', value: 'legal' },
            { label: 'Liên hệ (contact)', value: 'contact' },
            { label: 'Liên kết đơn (Không có Mega menu)', value: 'single' },
          ],
          defaultValue: 'single',
        },
        {
          name: 'href',
          type: 'text',
          label: 'Đường dẫn (áp dụng nếu là link đơn)',
        },
        {
          name: 'tagline',
          type: 'text',
          label: 'Dòng mô tả Mega menu (phía trên)',
          localized: true,
        },
        {
          name: 'subItems',
          type: 'array',
          label: 'Các liên kết con trong Mega Menu',
          admin: {
            condition: (_, siblingData) => siblingData?.menuKey !== 'single',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Tiêu đề liên kết con',
              localized: true,
              required: true,
            },
            {
              name: 'description',
              type: 'text',
              label: 'Mô tả ngắn',
              localized: true,
            },
            {
              name: 'href',
              type: 'text',
              label: 'Đường dẫn liên kết',
              required: true,
            },
          ],
        },
        {
          name: 'ctaCard',
          type: 'group',
          label: 'Thẻ nổi bật (CTA Card) ở góc phải Mega Menu',
          admin: {
            condition: (_, siblingData) => siblingData?.menuKey !== 'single',
          },
          fields: [
            {
              name: 'tag',
              type: 'text',
              label: 'Huy hiệu',
              localized: true,
            },
            {
              name: 'title',
              type: 'text',
              label: 'Tiêu đề thẻ',
              localized: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Đoạn mô tả',
              localized: true,
            },
            {
              name: 'buttonLabel',
              type: 'text',
              label: 'Tên nút bấm',
              localized: true,
            },
            {
              name: 'buttonHref',
              type: 'text',
              label: 'Đường dẫn nút bấm',
            },
          ],
        },
      ],
    },
    {
      name: 'verifyButton',
      type: 'group',
      label: 'Nút "Tra cứu chứng thư"',
      fields: [
        {
          name: 'show',
          type: 'checkbox',
          label: 'Hiển thị nút',
          defaultValue: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Tên nút',
          localized: true,
          defaultValue: 'Tra cứu chứng thư',
        },
        {
          name: 'href',
          type: 'text',
          label: 'Đường dẫn',
          defaultValue: '/phap-ly/tra-cuu',
        },
      ],
    },
    {
      name: 'requestButton',
      type: 'group',
      label: 'Nút "Yêu cầu thẩm định" (Primary CTA)',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Tên nút',
          localized: true,
          defaultValue: 'Yêu cầu thẩm định',
        },
        {
          name: 'href',
          type: 'text',
          label: 'Đường dẫn',
          defaultValue: '/lien-he#yeu-cau',
        },
      ],
    },
  ],
}

import type { CollectionConfig } from 'payload'
import { revalidateCacheTag } from '../lib/revalidate'

export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'order', 'active', 'featured'],
    group: 'Nội dung',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateCacheTag('partners')
        revalidateCacheTag('about')
        revalidateCacheTag('homepage')
        return doc
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateCacheTag('partners')
        revalidateCacheTag('about')
        revalidateCacheTag('homepage')
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Tên đối tác / Khách hàng doanh nghiệp',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'File Logo (PNG / SVG)',
    },
    {
      name: 'logoSvg',
      type: 'textarea',
      label: 'Mã SVG hoặc Đường dẫn Logo dự phòng',
      admin: {
        description: 'Dùng nếu chưa tải file lên Media library (VD: /assets/partners/vcb.svg)',
      },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Phân loại đối tác',
      defaultValue: 'bank',
      options: [
        { label: 'Ngân hàng & tổ chức tín dụng', value: 'bank' },
        { label: 'Doanh nghiệp', value: 'corporate' },
        { label: 'Khu vực công', value: 'public' },
        { label: 'Nhà đầu tư', value: 'investor' },
        { label: 'Tổ chức tài chính & Kiểm toán', value: 'audit' },
      ],
      required: true,
    },
    {
      name: 'website',
      type: 'text',
      label: 'Website đối tác (URL)',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Thứ tự ưu tiên hiển thị',
      defaultValue: 10,
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Đang hoạt động (Kích hoạt hiển thị)',
      defaultValue: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Nổi bật trên Trang chủ',
      defaultValue: true,
    },
  ],
}

import type { CollectionConfig } from 'payload'
import fs from 'fs'

import { resolvePrivateFile } from '../lib/privateUploads'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['ticketNumber', 'fullName', 'phone', 'serviceType', 'dossierType', 'attachment', 'status', 'createdAt'],
    group: 'Liên hệ & Hồ sơ',
  },
  access: {
    // Visitors submit via the validated route /api/inquiries (overrideAccess),
    // so the raw Payload REST endpoint stays closed to anonymous callers.
    create: ({ req: { user } }) => Boolean(user),
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterDelete: [
      async ({ doc }) => {
        // Remove the private attachment so personal data isn't orphaned on disk
        const url = typeof doc?.fileUrl === 'string' ? doc.fileUrl : ''
        const name = decodeURIComponent(url.split('/').pop() || '')
        const filePath = url.startsWith('/api/inquiries/file/') ? resolvePrivateFile(name) : null
        if (filePath) await fs.promises.unlink(filePath).catch(() => {})
      },
    ],
  },
  fields: [
    {
      name: 'ticketNumber',
      type: 'text',
      label: 'Mã hồ sơ / Mã biên nhận',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'dossierType',
      type: 'select',
      label: 'Loại hồ sơ tiếp nhận',
      defaultValue: 'request',
      options: [
        { label: 'Yêu cầu thẩm định giá', value: 'request' },
        { label: 'Yêu cầu báo giá dịch vụ', value: 'quote' },
        { label: 'Hồ sơ ứng tuyển nhân sự', value: 'recruitment' },
        { label: 'Liên hệ & Hỏi đáp chung', value: 'general' },
      ],
    },
    {
      name: 'fullName',
      type: 'text',
      label: 'Họ tên người liên hệ / Ứng viên',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Số điện thoại',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'organization',
      type: 'text',
      label: 'Tổ chức / Doanh nghiệp',
    },
    {
      name: 'serviceType',
      type: 'select',
      label: 'Loại tài sản cần thẩm định / Dịch vụ',
      options: [
        { label: 'Thẩm định giá trị Doanh nghiệp', value: 'doanh-nghiep' },
        { label: 'Dịch vụ Doanh nghiệp (Slug)', value: 'Dich-vu-Doanh-nghiep' },
        { label: 'Thẩm định giá Bất động sản', value: 'bat-dong-san' },
        { label: 'Dịch vụ Bất động sản (Slug)', value: 'Dich-vu-Bat-dong-san' },
        { label: 'Máy móc thiết bị / Dây chuyền', value: 'may-thiet-bi' },
        { label: 'Dịch vụ Máy thiết bị (Slug)', value: 'Dich-vu-May-thiet-bi' },
        { label: 'Thương hiệu / Tài sản vô hình', value: 'tai-san-vo-hinh' },
        { label: 'Dịch vụ Thương hiệu (Slug)', value: 'Dich-vu-Thuong-hieu' },
        { label: 'Dự án đầu tư', value: 'du-an' },
        { label: 'Dịch vụ Dự án đầu tư (Slug)', value: 'Dich-vu-Du-an-dau-tu' },
        { label: 'Chứng minh tài chính', value: 'chung-minh-tai-chinh' },
        { label: 'Dịch vụ Chứng minh tài chính (Slug)', value: 'Dich-vu-Chung-minh-tai-chinh' },
        { label: 'Tuyển dụng & Ứng tuyển', value: 'recruitment' },
        { label: 'Khác', value: 'khac' },
      ],
    },
    {
      name: 'attachment',
      type: 'upload',
      relationTo: 'media',
      label: 'Tệp hồ sơ / Tài liệu đính kèm',
    },
    {
      name: 'fileName',
      type: 'text',
      label: 'Tên tệp gốc',
    },
    {
      name: 'fileUrl',
      type: 'text',
      label: 'Đường dẫn xem tệp trực tiếp',
    },
    {
      name: 'fileSize',
      type: 'text',
      label: 'Dung lượng tệp',
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Mô tả sơ bộ về tài sản và mục đích thẩm định',
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Ghi chú bổ sung',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Trạng thái xử lý',
      defaultValue: 'new',
      options: [
        { label: 'Mới tiếp nhận (Chưa xử lý)', value: 'new' },
        { label: 'Đang liên hệ tư vấn', value: 'in_progress' },
        { label: 'Đã báo giá', value: 'quoted' },
        { label: 'Hoàn thành / Đã ký hợp đồng', value: 'completed' },
      ],
    },
  ],
}

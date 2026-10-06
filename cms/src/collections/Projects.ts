import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'year', 'client'],
    group: 'Dịch vụ & Dự án',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Tên hồ sơ / dự án tiêu biểu',
      localized: true,
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      label: 'Phân loại tài sản',
      required: true,
      options: [
        { label: 'Doanh nghiệp', value: 'doanh-nghiep' },
        { label: 'Bất động sản', value: 'bat-dong-san' },
        { label: 'Hạ tầng & Nhà máy', value: 'ha-tang' },
        { label: 'Máy móc thiết bị', value: 'may-thiet-bi' },
        { label: 'Tài sản vô hình & Thương hiệu', value: 'tai-san-vo-hinh' },
        { label: 'Dự án đầu tư', value: 'du-an' },
      ],
    },
    {
      name: 'client',
      type: 'text',
      label: 'Khách hàng / Đối tác (Có thể ẩn danh tính VD: Tập đoàn BĐS hàng đầu)',
      localized: true,
    },
    {
      name: 'valuationPurpose',
      type: 'text',
      label: 'Mục đích thẩm định (VD: M&A, Tái cấu trúc vốn, Thế chấp ngân hàng)',
      localized: true,
    },
    {
      name: 'scale',
      type: 'text',
      label: 'Quy mô tài sản / Giá trị thẩm định',
      localized: true,
    },
    {
      name: 'year',
      type: 'number',
      label: 'Năm hoàn thành',
      defaultValue: 2025,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hình ảnh dự án',
    },
    {
      name: 'caseStudyContent',
      type: 'richText',
      label: 'Nội dung chi tiết Case Study',
      localized: true,
    },
  ],
}

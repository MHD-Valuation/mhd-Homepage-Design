import type { CollectionConfig } from 'payload'
import { HeroBlock } from '../blocks/Hero'
import { WhyUsBlock } from '../blocks/WhyUs'
import { ProcessBlock } from '../blocks/Process'
import { ServicesBlock } from '../blocks/ServicesBlock'
import { PartnerPortalBlock } from '../blocks/PartnerPortal'
import { InsightsBlock } from '../blocks/InsightsBlock'
import { TestimonialsBlock } from '../blocks/Testimonials'
import { CtaBannerBlock } from '../blocks/CtaBanner'
import { RichContentBlock, FaqBlock } from '../blocks/RichContent'
import { PartnersBlock } from '../blocks/PartnersBlock'
import { revalidateCacheTag } from '../lib/revalidate'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Nội dung',
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        if (doc?.slug === 'home') {
          revalidateCacheTag('homepage')
        }
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Tên trang',
      localized: true,
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Đường dẫn tĩnh (Slug)',
      required: true,
      unique: true,
      admin: {
        description: 'Ví dụ: "home" cho trang chủ, "about" cho giới thiệu, "contact" cho liên hệ',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Bố cục trang (Page Builder)',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              label: 'Các khối nội dung',
              localized: true,
              blocks: [
                HeroBlock,
                WhyUsBlock,
                ProcessBlock,
                ServicesBlock,
                PartnerPortalBlock,
                PartnersBlock,
                InsightsBlock,
                TestimonialsBlock,
                CtaBannerBlock,
                RichContentBlock,
                FaqBlock,
              ],
            },
          ],
        },
        {
          label: 'Tối ưu SEO & Chia sẻ MXH',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Tiêu đề SEO (Meta Title)',
              localized: true,
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Mô tả SEO (Meta Description)',
              localized: true,
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Ảnh đại diện khi chia sẻ (OG Image)',
            },
          ],
        },
      ],
    },
  ],
}

import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import { pushDevSchema } from '@payloadcms/drizzle'
import config from '../payload.config'

async function seed() {
  console.log('--- Starting Seed Process for MHD Payload CMS (VI & EN) ---')
  const payload = await getPayload({ config })

  // Synchronize database schema and create tables if they do not exist
  try {
    // Ensure critical column alterations run safely without blocking interactive prompts in Docker/headless
    const pool = (payload.db as any)?.pool
    if (pool?.query) {
      await pool.query(`
        DO $$ 
        BEGIN 
          -- 1. team
          IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'team') THEN
            IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'team' AND column_name = 'category') THEN
              ALTER TABLE "team" ADD COLUMN "category" text DEFAULT 'valuer';
            END IF;
          END IF;

          -- 2. site_settings
          IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'site_settings') THEN
            ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "office_phone" text;
            ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "office_email" text;
            ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "office_map_url" text;
          END IF;

          -- 3. site_settings_locales
          IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'site_settings_locales') THEN
            ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "office_company" text;
            ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "office_address" text;
            ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "office_hours_weekday" text;
            ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "office_hours_weekend" text;
          END IF;
        END $$;
      `)
      console.log('Ensured all table columns exist successfully!')
    }

    if (process.env.NODE_ENV !== 'production' && process.stdin.isTTY) {
      console.log('Pushed schema to PostgreSQL database...')
      await pushDevSchema(payload.db as any)
      console.log('Schema synchronized successfully!')
    } else {
      console.log('Running in non-interactive/production mode, skipped interactive Drizzle push.')
    }
  } catch (e: any) {
    console.log('DB schema sync notice:', e?.message || e)
  }

  // 1. Create or ensure Admin User
  const existingUsers = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: 'admin@mhd.com.vn',
      },
    },
  })

  if (existingUsers.totalDocs === 0) {
    console.log('Creating Admin User: admin@mhd.com.vn...')
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@mhd.com.vn',
        password: 'Admin@123456',
        name: 'MHD Admin',
        roles: ['admin'],
      },
    })
  } else {
    console.log('Admin user already exists.')
  }

  // 2. Seed Globals: Header (VI & EN)
  console.log('Seeding Header Global (VI & EN)...')
  const headerNavVi = [
    {
      title: 'Về MHD',
      menuKey: 'about',
      tagline: 'Doanh nghiệp thẩm định giá cung cấp thông tin rõ ràng về pháp lý, nhân sự và kinh nghiệm.',
      subItems: [
        {
          title: 'Giới thiệu MHD',
          description: 'Quá trình hoạt động, định hướng và nguyên tắc nghề nghiệp',
          href: '/about',
        },
        {
          title: 'Hồ sơ năng lực',
          description: 'Pháp lý, nhân sự và kinh nghiệm thực hiện',
          href: '/about/phap-ly',
        },
        {
          title: 'Đội ngũ thẩm định viên',
          description: 'Danh sách thẩm định viên về giá đủ điều kiện hành nghề',
          href: '/about/doi-ngu',
        },
        {
          title: 'Đối tác & Khách hàng',
          description: 'Hệ thống ngân hàng và doanh nghiệp đồng hành',
          href: '/about/doi-tac',
        },
      ],
      ctaCard: {
        tag: 'Hồ sơ pháp lý',
        title: 'Chứng nhận đủ điều kiện hành nghề',
        description: 'Giấy chứng nhận số 000/GCN-BTC do Bộ Tài chính cấp theo quy định pháp luật.',
        buttonLabel: 'Xem chi tiết →',
        buttonHref: '/about/phap-ly',
      },
    },
    {
      title: 'Dịch vụ',
      menuKey: 'services',
      tagline: 'Giải pháp thẩm định giá theo từng nhóm tài sản và mục đích sử dụng.',
      subItems: [
        {
          title: 'Thẩm định giá doanh nghiệp',
          description: 'Phục vụ M&A, cổ phần hoá và tái cấu trúc vốn',
          href: '/services/Dich-vu-Doanh-nghiep',
        },
        {
          title: 'Thẩm định giá bất động sản',
          description: 'Nhà, đất, công trình và dự án đầu tư',
          href: '/services/Dich-vu-Bat-dong-san',
        },
        {
          title: 'Động sản & máy thiết bị',
          description: 'Dây chuyền sản xuất, máy móc chuyên dùng',
          href: '/services/Dich-vu-May-thiet-bi',
        },
        {
          title: 'Thương hiệu & tài sản vô hình',
          description: 'Sở hữu trí tuệ, sáng chế và thương hiệu',
          href: '/services/Dich-vu-Thuong-hieu',
        },
      ],
      ctaCard: {
        tag: 'Trao đổi ban đầu',
        title: 'Nhận báo giá thẩm định',
        description: 'Gửi thông tin tài sản. MHD xác nhận yêu cầu trong 24 giờ làm việc.',
        buttonLabel: 'Nhận báo giá →',
        buttonHref: '/contact#yeu-cau',
      },
    },
    {
      title: 'Dự án',
      menuKey: 'projects',
      tagline: 'Dự án tiêu biểu đã thực hiện, phân loại theo nhóm tài sản.',
      subItems: [
        {
          title: 'Dự án Doanh nghiệp',
          description: 'Định giá doanh nghiệp quy mô lớn',
          href: '/projects/doanh-nghiep',
        },
        {
          title: 'Dự án Bất động sản',
          description: 'Tổ hợp thương mại và đất dự án',
          href: '/projects/bat-dong-san',
        },
        {
          title: 'Hạ tầng & Nhà máy',
          description: 'Khu công nghiệp và cảng biển',
          href: '/projects/ha-tang',
        },
      ],
      ctaCard: {
        tag: 'Hồ sơ chuyên đề',
        title: 'Thẩm định giá doanh nghiệp phục vụ tái cấu trúc vốn',
        subtitle: 'Doanh nghiệp · Hồ sơ chuyên đề',
        image: {
          url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
        },
        buttonLabel: 'Xem dự án →',
        buttonHref: '/projects',
      },
    },
    {
      title: 'Dữ liệu & Insight',
      menuKey: 'insight',
      tagline: 'Phân tích thị trường và xu hướng giá định kỳ.',
      subItems: [
        {
          title: 'Tin thị trường',
          description: 'Cập nhật diễn biến giá bất động sản và tài chính',
          href: '/insights',
        },
        {
          title: 'Kiến thức thẩm định giá',
          description: 'Phương pháp và chuẩn mực chuyên môn',
          href: '/insights',
        },
        {
          title: 'Chính sách & Pháp lý',
          description: 'Thông tư Bộ Tài chính và Luật Giá',
          href: '/insights',
        },
      ],
      ctaCard: {
        tag: 'Tin thị trường',
        title: 'Biến động giá bất động sản khu vực trung tâm TP.HCM quý 3',
        date: '05 Tháng 9, 2026',
        image: {
          url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
        },
        buttonLabel: 'Tải báo cáo →',
        buttonHref: '/insights',
      },
    },
    {
      title: 'Pháp lý',
      menuKey: 'legal',
      tagline: 'Hồ sơ pháp lý minh bạch — công khai tra cứu và xác thực.',
      subItems: [
        {
          title: 'Tra cứu chứng thư',
          description: 'Đối chiếu thông tin phát hành qua mã QR',
          href: '/phap-ly/tra-cuu',
        },
        {
          title: 'Chuẩn mực thẩm định giá',
          description: 'Tuân thủ TT30, TT31, TT36/2024/TT-BTC',
          href: '/phap-ly/quy-trinh',
        },
        {
          title: 'Kiểm soát chất lượng',
          description: 'Quy trình kiểm soát độc lập 2 cấp',
          href: '/phap-ly/chinh-sach',
        },
      ],
      ctaCard: {
        tag: 'Tra cứu trực tuyến',
        title: 'Đối chiếu thông tin chứng thư',
        description: 'Quét mã QR hoặc nhập số chứng thư để đối chiếu thông tin phát hành trên hệ thống MHD.',
        buttonLabel: 'Tra cứu chứng thư →',
        buttonHref: '/phap-ly/tra-cuu',
      },
    },
    {
      title: 'Liên hệ',
      menuKey: 'contact',
      tagline: 'Kết nối ngay với đội ngũ chuyên gia thẩm định giá MHD.',
      subItems: [
        {
          title: 'Gửi yêu cầu báo giá',
          description: 'Phản hồi tư vấn và báo giá trong 24 giờ',
          href: '/contact',
        },
        {
          title: 'Văn phòng làm việc',
          description: 'Địa chỉ trụ sở và mạng lưới hoạt động',
          href: '/contact/van-phong',
        },
        {
          title: 'Cổng đối tác tổ chức',
          description: 'Hỗ trợ thẩm tra dành cho ngân hàng',
          href: '/contact',
        },
      ],
      ctaCard: {
        tag: 'Hotline 24/7',
        title: '028 3515 3516',
        description: 'Tư vấn trực tiếp với thẩm định viên trưởng bộ phận.',
        buttonLabel: 'Gọi ngay',
        buttonHref: 'tel:02835153516',
      },
    },
  ]

  const headerNavEn = [
    {
      title: 'About MHD',
      menuKey: 'about',
      tagline: 'Independent valuation firm providing transparent records, credentials, and experience.',
      subItems: [
        {
          title: 'About Company',
          description: 'History, strategic direction, and professional principles',
          href: '/about',
        },
        {
          title: 'Credentials Dossier',
          description: 'Licensing, personnel, and valuation track record',
          href: '/about/phap-ly',
        },
        {
          title: 'Valuation Team',
          description: 'Directory of certified practicing valuers',
          href: '/about/doi-ngu',
        },
        {
          title: 'Partners & Clients',
          description: 'Commercial banks and corporate partners',
          href: '/about/doi-tac',
        },
      ],
      ctaCard: {
        tag: 'Legal License',
        title: 'Practice Eligibility Certificate',
        description: 'Certificate No. 000/GCN-BTC issued by the Ministry of Finance.',
        buttonLabel: 'View Details →',
        buttonHref: '/about/phap-ly',
      },
    },
    {
      title: 'Services',
      menuKey: 'services',
      tagline: 'Professional valuation solutions customized by asset category.',
      subItems: [
        {
          title: 'Enterprise Valuation',
          description: 'For M&A, equitization, and capital restructuring',
          href: '/services/Dich-vu-Doanh-nghiep',
        },
        {
          title: 'Real Estate Valuation',
          description: 'Land, properties, and commercial complexes',
          href: '/services/Dich-vu-Bat-dong-san',
        },
        {
          title: 'Machinery & Equipment',
          description: 'Industrial production lines and specialized equipment',
          href: '/services/Dich-vu-May-thiet-bi',
        },
        {
          title: 'Brand & Intangible Assets',
          description: 'Intellectual property, trademarks, and patents',
          href: '/services/Dich-vu-Thuong-hieu',
        },
      ],
      ctaCard: {
        tag: 'Initial Consultation',
        title: 'Get Valuation Quotation',
        description: 'Submit asset information. MHD confirms engagement requirements within 24 working hours.',
        buttonLabel: 'Get Quotation →',
        buttonHref: '/contact#yeu-cau',
      },
    },
    {
      title: 'Projects',
      menuKey: 'projects',
      tagline: 'Featured track records categorized by asset class.',
      subItems: [
        {
          title: 'Enterprise Cases',
          description: 'Large-scale corporate valuation assignments',
          href: '/projects/doanh-nghiep',
        },
        {
          title: 'Real Estate Projects',
          description: 'Commercial developments and land portfolios',
          href: '/projects/bat-dong-san',
        },
        {
          title: 'Infrastructure & Plants',
          description: 'Industrial zones, energy, and logistics ports',
          href: '/projects/ha-tang',
        },
      ],
      ctaCard: {
        tag: 'Case Study',
        title: 'Enterprise Valuation for Capital Restructuring',
        subtitle: 'Corporate · Case Study',
        image: {
          url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
        },
        buttonLabel: 'View Projects →',
        buttonHref: '/projects',
      },
    },
    {
      title: 'Data & Insights',
      menuKey: 'insight',
      tagline: 'Periodic market intelligence and price movement analysis.',
      subItems: [
        {
          title: 'Market Updates',
          description: 'Real estate dynamics and financial trends',
          href: '/insights',
        },
        {
          title: 'Valuation Expertise',
          description: 'Methodologies and professional valuation standards',
          href: '/insights',
        },
        {
          title: 'Legal Regulations',
          description: 'Ministry of Finance circulars and Price Law updates',
          href: '/insights',
        },
      ],
      ctaCard: {
        tag: 'Market News',
        title: 'Central HCMC Real Estate Price Movements Q3',
        date: 'September 05, 2026',
        image: {
          url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
        },
        buttonLabel: 'Download Report →',
        buttonHref: '/insights',
      },
    },
    {
      title: 'Legal & Standards',
      menuKey: 'legal',
      tagline: 'Transparent legal records — publicly verifiable and downloadable.',
      subItems: [
        {
          title: 'Verify Certificate',
          description: 'QR-enabled certificate cross-check system',
          href: '/phap-ly/tra-cuu',
        },
        {
          title: 'Valuation Standards',
          description: 'Compliant with Circulars 30, 31, 36/2024/TT-BTC',
          href: '/phap-ly/quy-trinh',
        },
        {
          title: 'Quality Assurance',
          description: 'Independent two-tier internal review system',
          href: '/phap-ly/chinh-sach',
        },
      ],
      ctaCard: {
        tag: 'Online Verification',
        title: 'Verify Certificate Details',
        description: 'Scan QR code or enter certificate number to verify issuance on the MHD system.',
        buttonLabel: 'Verify Certificate →',
        buttonHref: '/phap-ly/tra-cuu',
      },
    },
    {
      title: 'Contact',
      menuKey: 'contact',
      tagline: 'Get in touch directly with our senior valuation team.',
      subItems: [
        {
          title: 'Request a Valuation',
          description: 'Receive detailed proposal and pricing within 24 hours',
          href: '/contact',
        },
        {
          title: 'Head Office',
          description: 'Office locations and operating branches',
          href: '/contact/van-phong',
        },
        {
          title: 'Institutional Portal',
          description: 'Verification services for banking partners',
          href: '/contact',
        },
      ],
      ctaCard: {
        tag: 'Hotline 24/7',
        title: '028 3515 3516',
        description: 'Direct consultation with lead certified valuers.',
        buttonLabel: 'Call Now',
        buttonHref: 'tel:02835153516',
      },
    },
  ]

  await payload.updateGlobal({
    slug: 'header',
    locale: 'vi',
    data: {
      navItems: headerNavVi as any,
      phone: '028 3515 3516',
      verifyButton: {
        show: true,
        label: 'Tra cứu chứng thư',
        href: '/phap-ly/tra-cuu',
      },
      requestButton: {
        label: 'Yêu cầu thẩm định',
        href: '/contact',
      },
    } as any,
  })

  await payload.updateGlobal({
    slug: 'header',
    locale: 'en',
    data: {
      navItems: headerNavEn as any,
      phone: '028 3515 3516',
      verifyButton: {
        show: true,
        label: 'Verify Certificate',
        href: '/phap-ly/tra-cuu',
      },
      requestButton: {
        label: 'Request Valuation',
        href: '/contact',
      },
    } as any,
  })

  // 3. Seed Globals: Footer (VI & EN)
  console.log('Seeding Footer Global (VI & EN)...')
  const footerColumnsVi = [
    {
      title: 'Dịch vụ',
      links: [
        { label: 'Doanh nghiệp', href: '/services/Dich-vu-Doanh-nghiep' },
        { label: 'Bất động sản', href: '/services/Dich-vu-Bat-dong-san' },
        { label: 'Động sản & máy thiết bị', href: '/services/Dich-vu-May-thiet-bi' },
        { label: 'Thương hiệu', href: '/services/Dich-vu-Thuong-hieu' },
        { label: 'Dự án đầu tư', href: '/services/Dich-vu-Du-an-dau-tu' },
        { label: 'Chứng minh tài chính', href: '/services/Dich-vu-Chung-minh-tai-chinh' },
      ],
    },
    {
      title: 'Công ty',
      links: [
        { label: 'Về MHD', href: '/about' },
        { label: 'Hồ sơ pháp lý', href: '/about/phap-ly' },
        { label: 'Dự án tiêu biểu', href: '/projects' },
        { label: 'Dữ liệu & Insight', href: '/insights' },
        { label: 'Tuyển dụng', href: '/tuyen-dung' },
      ],
    },
    {
      title: 'Liên hệ',
      links: [
        { label: 'Hotline: 028 3515 3516', href: 'tel:02835153516' },
        { label: 'contact@mhd.com.vn', href: 'mailto:contact@mhd.com.vn' },
        { label: 'TP. Hồ Chí Minh, Việt Nam', href: '/contact/van-phong' },
      ],
    },
  ]

  const footerColumnsEn = [
    {
      title: 'Services',
      links: [
        { label: 'Enterprise', href: '/services/Dich-vu-Doanh-nghiep' },
        { label: 'Real Estate', href: '/services/Dich-vu-Bat-dong-san' },
        { label: 'Machinery & Equipment', href: '/services/Dich-vu-May-thiet-bi' },
        { label: 'Brand & Intangibles', href: '/services/Dich-vu-Thuong-hieu' },
        { label: 'Investment Projects', href: '/services/Dich-vu-Du-an-dau-tu' },
        { label: 'Financial Proof', href: '/services/Dich-vu-Chung-minh-tai-chinh' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About MHD', href: '/about' },
        { label: 'Legal Records', href: '/about/phap-ly' },
        { label: 'Featured Projects', href: '/projects' },
        { label: 'Data & Insights', href: '/insights' },
        { label: 'Careers', href: '/tuyen-dung' },
      ],
    },
    {
      title: 'Contact',
      links: [
        { label: 'Hotline: 028 3515 3516', href: 'tel:02835153516' },
        { label: 'info@mhd.com.vn', href: 'mailto:info@mhd.com.vn' },
        { label: 'Ho Chi Minh City, Vietnam', href: '/contact/van-phong' },
      ],
    },
  ]

  await payload.updateGlobal({
    slug: 'footer',
    locale: 'vi',
    data: {
      companyName: 'Công ty TNHH Thẩm định giá MHD',
      tagline: 'Giá trị tài sản, giá trị cốt lõi.',
      qualificationNotice: 'Doanh nghiệp được cấp Giấy chứng nhận đủ điều kiện kinh doanh dịch vụ thẩm định giá theo quy định pháp luật.',
      address: '52 Trần Bình Trọng, Bình Lợi Trung, Hồ Chí Minh, Việt Nam',
      phone: '028 3515 3516',
      email: 'contact@mhd.com.vn',
      workingHours: 'Thứ Hai – Thứ Sáu: 8:00 – 17:30',
      columns: footerColumnsVi as any,
      licenseText: 'Giấy chứng nhận đủ điều kiện kinh doanh dịch vụ thẩm định giá số 000/GCN-BTC',
      copyright: '© 2026 Công ty TNHH Thẩm định giá MHD. Bảo lưu các quyền.',
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    locale: 'en',
    data: {
      companyName: 'MHD Valuation Co., Ltd.',
      tagline: 'Asset Value, Core Value.',
      qualificationNotice: 'Qualified enterprise licensed to practice professional valuation services under Vietnamese law.',
      address: '52 Tran Binh Trong, Binh Loi Trung, Ho Chi Minh City, Vietnam',
      phone: '028 3515 3516',
      email: 'contact@mhd.com.vn',
      workingHours: 'Monday – Friday: 8:00 – 17:30',
      columns: footerColumnsEn as any,
      licenseText: 'Certificate of eligibility for valuation business services No. 000/GCN-BTC',
      copyright: '© 2026 MHD Valuation Co., Ltd. All rights reserved.',
    },
  })

  // 3.1 Seed Globals: Site Settings (VI & EN)
  console.log('Seeding SiteSettings Global (VI & EN)...')
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'vi',
    data: {
      siteName: 'MHD Valuation - Thẩm định giá chuyên nghiệp',
      defaultSeoDescription: 'MHD cung cấp dịch vụ thẩm định giá doanh nghiệp, bất động sản, động sản và tài sản vô hình tuân thủ Chuẩn mực thẩm định giá Việt Nam.',
      hotline: '028 3515 3516',
      zaloNumber: '3920702626611603828',
      zaloUrl: 'https://zalo.me/3920702626611603828',
      workingHours: '8:00 – 17:30, thứ Hai – thứ Bảy',
      quickContactTitle: 'LIÊN HỆ MHD',
      phoneTitle: 'Gọi Hotline',
      zaloTitle: 'Chat Zalo',
      officeCompany: 'Công ty TNHH Thẩm định giá MHD',
      officeAddress: '52 Trần Bình Trọng, Bình Lợi Trung, Hồ Chí Minh, Việt Nam',
      officeHoursWeekday: 'Thứ 2 – Thứ 6: 8:00 – 17:30',
      officeHoursWeekend: 'Thứ 7: 8:00 – 12:00',
      officePhone: '028 3515 3516',
      officeEmail: 'info@mhd.com.vn',
      officeMapUrl: 'https://www.google.com/maps/place/C%C3%B4ng+Ty+TNHH+Th%E1%BA%A9m+%C4%90%E1%BB%8Bnh+Gi%C3%A1+MHD/@10.8129232,106.6852583,17z/data=!3m1!4b1!4m6!3m5!1s0x317528e7e0914539:0x93ec01fe3afa8e09!8m2!3d10.8129179!4d106.6878332!16s%2Fg%2F11bzwmg433?entry=ttu&g_ep=EgoyMDI2MTAwNS4wIKXMDSoASAFQAw%3D%3D',
    },
  })

  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'en',
    data: {
      siteName: 'MHD Valuation - Professional Valuation Services',
      defaultSeoDescription: 'MHD provides professional independent valuation services in Vietnam.',
      hotline: '028 3515 3516',
      zaloNumber: '3920702626611603828',
      zaloUrl: 'https://zalo.me/3920702626611603828',
      workingHours: '8:00 – 17:30, Monday – Saturday',
      quickContactTitle: 'CONTACT MHD',
      phoneTitle: 'Call Hotline',
      zaloTitle: 'Chat Zalo',
      officeCompany: 'MHD Valuation Co., Ltd.',
      officeAddress: '52 Tran Binh Trong, Binh Loi Trung, Ho Chi Minh City, Vietnam',
      officeHoursWeekday: 'Monday – Friday: 8:00 – 17:30',
      officeHoursWeekend: 'Saturday: 8:00 – 12:00',
      officePhone: '028 3515 3516',
      officeEmail: 'info@mhd.com.vn',
      officeMapUrl: 'https://www.google.com/maps/place/C%C3%B4ng+Ty+TNHH+Th%E1%BA%A9m+%C4%90%E1%BB%8Bnh+Gi%C3%A1+MHD/@10.8129232,106.6852583,17z/data=!3m1!4b1!4m6!3m5!1s0x317528e7e0914539:0x93ec01fe3afa8e09!8m2!3d10.8129179!4d106.6878332!16s%2Fg%2F11bzwmg433?entry=ttu&g_ep=EgoyMDI2MTAwNS4wIKXMDSoASAFQAw%3D%3D',
    },
  })

  // 4. Seed 6 Services in VI & EN
  console.log('Seeding 6 Services...')
  const servicesData = [
    {
      vi: {
        title: 'Thẩm định giá trị doanh nghiệp',
        shortDescription: 'Xác định giá trị doanh nghiệp phục vụ M&A, cổ phần hoá và tái cấu trúc vốn.',
      },
      en: {
        title: 'Enterprise Valuation',
        shortDescription: 'Business valuation for M&A, equitization, and capital restructuring.',
      },
      slug: 'Dich-vu-Doanh-nghiep',
      order: 1,
      icon: 'building',
    },
    {
      vi: {
        title: 'Thẩm định giá bất động sản',
        shortDescription: 'Thẩm định giá đất, nhà và công trình phục vụ vay vốn, chuyển nhượng hoặc góp vốn.',
      },
      en: {
        title: 'Real Estate Valuation',
        shortDescription: 'Valuation of land, properties, and developments for loan security and transactions.',
      },
      slug: 'Dich-vu-Bat-dong-san',
      order: 2,
      icon: 'realestate',
    },
    {
      vi: {
        title: 'Động sản & máy thiết bị',
        shortDescription: 'Thẩm định giá dây chuyền sản xuất, máy móc và phương tiện vận tải.',
      },
      en: {
        title: 'Machinery & Equipment Valuation',
        shortDescription: 'Valuation of production lines, industrial machinery, and commercial vehicles.',
      },
      slug: 'Dich-vu-May-thiet-bi',
      order: 3,
      icon: 'machinery',
    },
    {
      vi: {
        title: 'Thương hiệu & tài sản vô hình',
        shortDescription: 'Thẩm định giá thương hiệu, sáng chế và quyền tài sản liên quan đến sở hữu trí tuệ.',
      },
      en: {
        title: 'Brand & Intangible Assets',
        shortDescription: 'Valuation of trademarks, patents, software, and intellectual property rights.',
      },
      slug: 'Dich-vu-Thuong-hieu',
      order: 4,
      icon: 'brand',
    },
    {
      vi: {
        title: 'Thẩm định dự án đầu tư',
        shortDescription: 'Phân tích hiệu quả và tính khả thi tài chính theo phạm vi công việc đã thỏa thuận.',
      },
      en: {
        title: 'Investment Project Valuation',
        shortDescription: 'Financial feasibility and economic efficiency analysis for investment dossiers.',
      },
      slug: 'Dich-vu-Du-an-dau-tu',
      order: 5,
      icon: 'project',
    },
    {
      vi: {
        title: 'Chứng minh tài chính',
        shortDescription: 'Thẩm định giá tài sản phục vụ hồ sơ chứng minh tài chính khi du học hoặc định cư.',
      },
      en: {
        title: 'Financial Proof Valuation',
        shortDescription: 'Asset valuation reports for immigration, overseas study, and visa applications.',
      },
      slug: 'Dich-vu-Chung-minh-tai-chinh',
      order: 6,
      icon: 'finance',
    },
  ]

  for (const svc of servicesData) {
    const existing = await payload.find({
      collection: 'services',
      where: { slug: { equals: svc.slug } },
    })

    if (existing.totalDocs === 0) {
      const doc = await payload.create({
        collection: 'services',
        locale: 'vi',
        data: {
          title: svc.vi.title,
          slug: svc.slug,
          order: svc.order,
          icon: svc.icon as any,
          shortDescription: svc.vi.shortDescription,
        },
      })
      await payload.update({
        collection: 'services',
        id: doc.id,
        locale: 'en',
        data: {
          title: svc.en.title,
          shortDescription: svc.en.shortDescription,
        },
      })
    } else {
      await payload.update({
        collection: 'services',
        id: existing.docs[0].id,
        locale: 'vi',
        data: {
          title: svc.vi.title,
          order: svc.order,
          icon: svc.icon as any,
          shortDescription: svc.vi.shortDescription,
        },
      })
      await payload.update({
        collection: 'services',
        id: existing.docs[0].id,
        locale: 'en',
        data: {
          title: svc.en.title,
          shortDescription: svc.en.shortDescription,
        },
      })
    }
  }

  // 5. Seed Certified Appraisers (Team collection)
  console.log('Seeding Certified Appraisers (Team)...')
  const teamData = [
    {
      name: 'Trần Khánh Du',
      positionVi: 'Giám Đốc',
      positionEn: 'Managing Director',
      category: 'leadership',
      experienceYears: 20,
      order: 1,
      avatarFilename: 'giam-doc-dieu-hanh-tran-khanh-du.png',
      bio: '– Cử nhân kinh tế, chuyên ngành thẩm định giá, trường Đại học Kinh tế TP.HCM\n– Thẻ thẩm định viên về giá – Bộ Tài chính\n– Chứng chỉ định giá Bất động sản – Sở xây dựng\n– Chứng chỉ đấu giá viên – Bộ Tư Pháp',
    },
    {
      name: 'Nguyễn Lê Hà',
      positionVi: 'Phó Giám Đốc',
      positionEn: 'Deputy Director',
      category: 'leadership',
      experienceYears: 10,
      order: 2,
      avatarFilename: 'pho-giam-doc-nguyen-le-ha.png',
      bio: '– Cử nhân kinh tế, chuyên ngành thẩm định giá, trường Đại học Kinh tế TP.HCM\n– Cử nhân kinh tế, chuyên ngành tài chính ngân hàng, trường Đại học Kinh tế TP.HCM\n– Thẻ thẩm định viên về giá – Bộ Tài chính\n– Chứng chỉ định giá Bất động sản – Sở xây dựng\n– Chứng chỉ kế toán tài chính – Trường ĐH Kinh tế TP.HCM.\n– Hội viên Hiệp hội Thẩm định giá việt Nam',
    },
    {
      name: 'Lê Ngọc Ánh',
      positionVi: 'Thẩm định viên - Trưởng phòng thẩm định',
      positionEn: 'Practicing Valuer - Head of Valuation Department',
      category: 'valuer',
      experienceYears: 10,
      order: 3,
      avatarFilename: 'tham-dinh-vien-truong-phong-tham-dinh-le-ngoc-anh.png',
      bio: '– Cử nhân kinh tế, chuyên ngành thẩm định giá, trường ĐH Tài Chính Marketing TP.HCM\n– Chứng chỉ định giá BĐS – Sở Xây dựng;\n– Chứng chỉ môi giới và quản lý sàn BĐS – Sở xây dựng',
    },
    {
      name: 'Bùi Quỳnh',
      positionVi: 'Thẩm định viên  — Giám đốc Chi nhánh Bình Định',
      positionEn: 'Practicing Valuer - Binh Dinh Branch Director',
      category: 'valuer',
      experienceYears: 11,
      order: 4,
      avatarFilename: 'Quynh-e1690357951804-256x300.jpg',
      bio: '– Thẩm định viên về giá của Bộ Tài Chính\n– Định giá viên Bất động sản của Sở Xây dựng\n– Chuyên viên cao cấp môi giới, quản lý và điều hành sàn Bất động sản',
    },
    {
      name: 'Phan Nguyên Uyên Hạ',
      positionVi: 'Thẩm định viên – trưởng bộ phận kiểm soát',
      positionEn: 'Practicing Valuer - Head of Internal Quality Control',
      category: 'valuer',
      experienceYears: 7,
      order: 5,
      avatarFilename: 'tham-dinh-vien-truong-bo-phan-kiem-soat-phan-nguyen-uyen-ha.png',
      bio: '– Thẩm định viên về giá của Bộ Tài Chính\n– Thạc sĩ chuyên ngành quản lý đất đai\n– Định giá viên Bất động sản của Sở Xây dựng',
    },
  ]

  // Clean up legacy mock team members if they exist
  const mockTeamNames = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C']
  for (const mockName of mockTeamNames) {
    const mockDocs = await payload.find({
      collection: 'team',
      where: { name: { equals: mockName } },
    })
    for (const doc of mockDocs.docs) {
      await payload.delete({
        collection: 'team',
        id: doc.id,
      })
      console.log(`Deleted mock team member: ${mockName} (ID: ${doc.id})`)
    }
  }

  for (const t of teamData) {
    let avatarId: string | number | undefined = undefined
    if (t.avatarFilename) {
      const existingMedia = await payload.find({
        collection: 'media',
        where: { filename: { equals: t.avatarFilename } },
      })
      if (existingMedia.totalDocs > 0) {
        avatarId = existingMedia.docs[0].id
      } else {
        const mediaFilePath = path.resolve(process.cwd(), 'media', t.avatarFilename)
        if (fs.existsSync(mediaFilePath)) {
          try {
            const uploaded = await payload.create({
              collection: 'media',
              filePath: mediaFilePath,
              data: {
                alt: t.name,
              },
            })
            avatarId = uploaded.id
          } catch (err) {
            // ignore
          }
        }
      }
    }

    const existing = await payload.find({
      collection: 'team',
      where: { name: { equals: t.name } },
    })

    const teamPayloadDataVi: any = {
      name: t.name,
      position: t.positionVi,
      category: t.category,
      experienceYears: t.experienceYears,
      order: t.order,
    }
    if (existing.totalDocs === 0) {
      if (avatarId) teamPayloadDataVi.avatar = avatarId
      const doc = await payload.create({
        collection: 'team',
        locale: 'vi',
        data: teamPayloadDataVi,
      })
      await payload.update({
        collection: 'team',
        id: doc.id,
        locale: 'en',
        data: {
          position: t.positionEn,
        },
      })
    } else {
      const existingAvatar = (existing.docs[0] as any).avatar
      if (existingAvatar) {
        teamPayloadDataVi.avatar = typeof existingAvatar === 'object' ? existingAvatar.id : existingAvatar
      } else if (avatarId) {
        teamPayloadDataVi.avatar = avatarId
      }
      await payload.update({
        collection: 'team',
        id: existing.docs[0].id,
        locale: 'vi',
        data: teamPayloadDataVi,
      })
      await payload.update({
        collection: 'team',
        id: existing.docs[0].id,
        locale: 'en',
        data: {
          position: t.positionEn,
        },
      })
    }
  }

  // 6. Seed Categories & Posts (Insights)
  console.log('Seeding Categories & Posts...')
  const categoriesData = [
    { vi: 'Tin thị trường', en: 'Market Updates', slug: 'thi-truong' },
    { vi: 'Kiến thức thẩm định giá', en: 'Valuation Expertise', slug: 'kien-thuc' },
    { vi: 'Chính sách & Pháp lý', en: 'Policies & Regulations', slug: 'chinh-sach' },
  ]

  const catMap: Record<string, string | number> = {}

  for (const cat of categoriesData) {
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: cat.slug } },
    })

    if (existing.totalDocs === 0) {
      const doc = await payload.create({
        collection: 'categories',
        locale: 'vi',
        data: {
          name: cat.vi,
          slug: cat.slug,
        },
      })
      await payload.update({
        collection: 'categories',
        id: doc.id,
        locale: 'en',
        data: {
          name: cat.en,
        },
      })
      catMap[cat.slug] = doc.id
    } else {
      catMap[cat.slug] = existing.docs[0].id
    }
  }

  const postsData = [
    {
      slug: 'bien-dong-gia-bds-trung-tam-q3',
      categorySlug: 'thi-truong',
      vi: {
        title: 'Biến động giá bất động sản khu vực trung tâm TP.HCM quý 3',
        summary: 'Phân tích xu hướng giá đất và căn hộ tại các quận trung tâm dựa trên dữ liệu thẩm định thực tế của MHD.',
        readingTime: '5 phút đọc',
      },
      en: {
        title: 'Real Estate Price Movements in Central HCMC - Q3',
        summary: 'Analysis of land and property price trends in central districts based on verified transaction data from MHD.',
        readingTime: '5 min read',
      },
    },
    {
      slug: 'ba-phuong-phap-tdg-doanh-nghiep',
      categorySlug: 'kien-thuc',
      vi: {
        title: '3 cách tiếp cận phổ biến khi thẩm định giá trị doanh nghiệp',
        summary: 'So sánh phương pháp chiết khấu dòng tiền (DCF), tài sản ròng và phương pháp so sánh thị trường.',
        readingTime: '7 phút đọc',
      },
      en: {
        title: '3 Common Approaches in Professional Enterprise Valuation',
        summary: 'Comparing Discounted Cash Flow (DCF), Net Asset Value (NAV), and Market Multiple methodologies.',
        readingTime: '7 min read',
      },
    },
    {
      slug: 'cap-nhat-thong-tu-36-2024',
      categorySlug: 'chinh-sach',
      vi: {
        title: 'Cập nhật Thông tư 36/2024/TT-BTC về thẩm định giá doanh nghiệp',
        summary: 'Điểm mới về quy trình thẩm định, cơ sở định giá và trách nhiệm giải trình của thẩm định viên về giá.',
        readingTime: '4 phút đọc',
      },
      en: {
        title: 'Key Updates on Circular 36/2024/TT-BTC on Business Valuation',
        summary: 'Essential regulatory requirements regarding valuation standards, valuation bases, and appraiser accountability.',
        readingTime: '4 min read',
      },
    },
  ]

  for (const post of postsData) {
    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: post.slug } },
    })

    if (existing.totalDocs === 0) {
      const doc = await payload.create({
        collection: 'posts',
        locale: 'vi',
        data: {
          title: post.vi.title,
          slug: post.slug,
          category: catMap[post.categorySlug] as any,
          summary: post.vi.summary,
          readingTime: post.vi.readingTime,
          publishedAt: new Date().toISOString(),
        },
      })
      await payload.update({
        collection: 'posts',
        id: doc.id,
        locale: 'en',
        data: {
          title: post.en.title,
          summary: post.en.summary,
          readingTime: post.en.readingTime,
        },
      })
    } else {
      await payload.update({
        collection: 'posts',
        id: existing.docs[0].id,
        locale: 'vi',
        data: {
          title: post.vi.title,
          summary: post.vi.summary,
          readingTime: post.vi.readingTime,
        },
      })
      await payload.update({
        collection: 'posts',
        id: existing.docs[0].id,
        locale: 'en',
        data: {
          title: post.en.title,
          summary: post.en.summary,
          readingTime: post.en.readingTime,
        },
      })
    }
  }

  // 7. Seed Homepage in VI and EN
  console.log('Seeding Homepage Blocks (VI & EN)...')
  const existingHome = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
  })

  const homeLayoutVi = [
    {
      blockType: 'hero',
      badgeText: 'Đủ điều kiện kinh doanh dịch vụ thẩm định giá',
      titleLine1: 'Thẩm định giá',
      titleLine2: 'theo chuẩn mực Việt Nam',
      description: 'MHD thẩm định giá doanh nghiệp, bất động sản, động sản và tài sản vô hình. Hồ sơ được thực hiện theo Chuẩn mực thẩm định giá Việt Nam.',
      primaryCta: {
        label: 'Gửi yêu cầu thẩm định',
        url: '/contact',
      },
      secondaryCta: {
        label: 'Dành cho KH tổ chức (B2B)',
        url: '/phap-ly/tra-cuu',
      },
      statsCard: {
        headerTitle: 'Năng lực hoạt động',
        statAValue: '5.000+',
        statALabel: 'Hồ sơ đã hoàn thành',
        statBValue: '60+',
        statBLabel: 'Nhân sự chuyên môn',
        dossierLinkText: 'Hồ sơ năng lực →',
        dossierLinkUrl: '/about/phap-ly',
        footnote: 'Thực hiện theo Chuẩn mực thẩm định giá Việt Nam, Luật Giá 2023 và các quy định pháp luật có liên quan',
      },
      tickerItems: [
        { text: 'Giấy chứng nhận đủ điều kiện kinh doanh dịch vụ thẩm định giá: 000/GCN-BTC', highlight: '000/GCN-BTC' },
        { text: 'Thông tư 30/2024/TT-BTC', highlight: 'Thông tư 30/2024/TT-BTC' },
        { text: 'Thông tư 31/2024/TT-BTC', highlight: 'Thông tư 31/2024/TT-BTC' },
        { text: 'Thông tư 36/2024/TT-BTC', highlight: 'Thông tư 36/2024/TT-BTC' },
        { text: 'Tra cứu chứng thư bằng mã QR', highlight: 'mã QR' },
      ],
    },
    {
      blockType: 'whyUs',
      badge: 'Vì sao chọn MHD',
      heading: 'Năng lực được thể hiện bằng hồ sơ',
      features: [
        {
          title: 'Hồ sơ pháp lý công khai',
          description: 'Giấy chứng nhận đủ điều kiện kinh doanh dịch vụ thẩm định giá được công khai để tra cứu và tải về.',
          icon: 'shield',
        },
        {
          title: 'Tra cứu thông tin chứng thư',
          description: 'Mã QR giúp khách hàng và đơn vị tiếp nhận đối chiếu thông tin phát hành trên hệ thống MHD.',
          icon: 'qrcode',
        },
        {
          title: 'Thông tin thị trường được cập nhật',
          description: 'MHD thu thập, kiểm tra và phân tích thông tin phù hợp với từng loại tài sản và mục đích thẩm định.',
          icon: 'chart',
        },
      ],
      teamCard: {
        title: 'Thẩm định viên về giá',
        description: 'Danh sách thẩm định viên về giá hành nghề tại MHD được cập nhật theo thông báo của Bộ Tài chính.',
        buttonText: 'Xem danh sách',
        buttonUrl: '/about/doi-ngu',
      },
    },
    {
      blockType: 'process',
      badge: 'Quy trình kiểm soát chất lượng',
      heading: 'Quy trình thẩm định giá tại MHD',
      description: 'Mỗi hồ sơ thực hiện theo phạm vi công việc đã xác định và được kiểm tra trước khi phát hành chứng thư.',
      steps: [
        {
          stepNumber: '01',
          title: 'Tiếp nhận và khảo sát',
          description: 'Xác định tài sản, mục đích, thời điểm, cơ sở giá trị và phạm vi công việc; khảo sát hiện trạng khi cần.',
        },
        {
          stepNumber: '02',
          title: 'Thu thập và phân tích thông tin',
          description: 'Kiểm tra hồ sơ pháp lý, đặc điểm tài sản, thông tin thị trường và tài sản so sánh phù hợp.',
        },
        {
          stepNumber: '03',
          title: 'Áp dụng phương pháp thẩm định giá',
          description: 'Phân tích thông tin, lựa chọn phương pháp và xác định giá trị theo cơ sở giá trị đã xác định.',
        },
        {
          stepNumber: '04',
          title: 'Phát hành hồ sơ thẩm định giá',
          description: 'Phát hành chứng thư kèm báo cáo thẩm định giá. Mã QR hỗ trợ tra cứu thông tin trên hệ thống MHD.',
        },
      ],
    },
    {
      blockType: 'servicesBlock',
      badge: 'Dịch vụ thẩm định',
      heading: 'Dịch vụ theo từng nhóm tài sản',
      description: 'Phạm vi công việc và hồ sơ cần cung cấp được xác định theo loại tài sản, mục đích và yêu cầu của từng hồ sơ.',
    },
    {
      blockType: 'partnerPortal',
      badge: 'Dành cho khách hàng tổ chức',
      heading: 'Cổng tra cứu dành cho đối tác',
      description: 'Hệ thống hỗ trợ ngân hàng, doanh nghiệp và cơ quan nhà nước tra cứu thông tin, đối chiếu chứng thư và theo dõi hồ sơ.',
      portals: [
        {
          tag: 'Dành cho ngân hàng và doanh nghiệp',
          title: 'Hồ sơ năng lực phục vụ thẩm tra',
          description: 'Truy cập thông tin pháp lý, nhân sự và kinh nghiệm theo quyền được cấp.',
          actionLabel: 'Yêu cầu truy cập',
          actionUrl: '#',
          icon: 'file',
        },
        {
          tag: 'Tra cứu chứng thư',
          title: 'Đối chiếu bằng mã QR',
          description: 'Quét mã QR trên chứng thư để đối chiếu thông tin phát hành trên hệ thống MHD.',
          actionLabel: 'Mở trang tra cứu',
          actionUrl: '/phap-ly/tra-cuu',
          icon: 'qr',
        },
        {
          tag: 'Hồ sơ nhiều giai đoạn',
          title: 'Theo dõi tiến độ thực hiện',
          description: 'Khách hàng được phân quyền có thể theo dõi tình trạng hồ sơ và tài liệu cần bổ sung.',
          actionLabel: 'Mở cổng theo dõi',
          actionUrl: '#',
          icon: 'portal',
        },
      ],
    },
    {
      blockType: 'insightsBlock',
      badge: 'Dữ liệu & Insight',
      heading: 'Thông tin thị trường và chuyên môn',
      description: 'Nội dung được tổng hợp theo ngành, khu vực và loại tài sản từ nguồn thông tin phù hợp. Dữ liệu khách hàng được bảo mật theo quy định.',
      categoryChips: [
        { name: 'Tin thị trường', slug: 'thi-truong' },
        { name: 'Kiến thức thẩm định giá', slug: 'kien-thuc' },
        { name: 'Chính sách & Pháp lý', slug: 'chinh-sach' },
        { name: 'Case study', slug: 'case-study' },
        { name: 'Báo cáo thị trường', slug: 'bao-cao' },
      ],
      viewAllText: 'Xem tất cả bài viết →',
      viewAllUrl: '/insights',
    },
    {
      blockType: 'ctaBanner',
      badge: 'Tư vấn nhanh chóng',
      heading: 'Gửi yêu cầu thẩm định',
      description: 'Gửi thông tin về tài sản và mục đích thẩm định. MHD sẽ liên hệ để xác nhận phạm vi công việc và hồ sơ cần cung cấp.',
      buttonLabel: 'Gửi yêu cầu',
      buttonUrl: '/contact',
    },
    {
      blockType: 'testimonials',
      badge: 'Ý kiến từ đối tác & khách hàng',
      heading: 'Đồng hành cùng tổ chức tín dụng & doanh nghiệp',
      items: [
        {
          quote: 'Báo cáo thẩm định giá trình bày rõ căn cứ và phương pháp. Hồ sơ đáp ứng nhu cầu làm việc của doanh nghiệp với ngân hàng.',
          clientTitle: 'Giám đốc Tài chính',
          companyType: 'Doanh nghiệp sản xuất',
        },
        {
          quote: 'Mã QR trên chứng thư giúp bộ phận tín dụng thuận tiện hơn khi đối chiếu thông tin phát hành.',
          clientTitle: 'Trưởng phòng Thẩm định tín dụng',
          companyType: 'Ngân hàng thương mại',
        },
        {
          quote: 'Báo cáo thẩm định giá thương hiệu nêu rõ phương pháp, nguồn thông tin và các giả thiết. Nội dung được sử dụng trong quá trình xem xét thương vụ M&A.',
          clientTitle: 'Tổng Giám đốc',
          companyType: 'Công ty công nghệ',
        },
      ],
    },
  ]

  const homeLayoutEn = [
    {
      blockType: 'hero',
      badgeText: 'Fully qualified for valuation business services',
      titleLine1: 'Professional Valuation',
      titleLine2: 'under Vietnam Standards',
      description: 'MHD provides independent valuation for enterprises, real estate, machinery, and intangible assets compliant with Vietnam Valuation Standards.',
      primaryCta: {
        label: 'Request Valuation',
        url: '/contact',
      },
      secondaryCta: {
        label: 'For Institutions (B2B)',
        url: '/phap-ly/tra-cuu',
      },
      statsCard: {
        headerTitle: 'Operating Capacity',
        statAValue: '5,000+',
        statALabel: 'Completed Valuations',
        statBValue: '60+',
        statBLabel: 'Certified Appraisers',
        dossierLinkText: 'Credentials Dossier →',
        dossierLinkUrl: '/about/phap-ly',
        footnote: 'Compliant with Vietnam Valuation Standards, Price Law 2023, and relevant legal regulations',
      },
      tickerItems: [
        { text: 'Valuation Business Eligibility Certificate: 000/GCN-BTC', highlight: '000/GCN-BTC' },
        { text: 'Circular 30/2024/TT-BTC', highlight: 'Circular 30/2024/TT-BTC' },
        { text: 'Circular 31/2024/TT-BTC', highlight: 'Circular 31/2024/TT-BTC' },
        { text: 'Circular 36/2024/TT-BTC', highlight: 'Circular 36/2024/TT-BTC' },
        { text: 'QR-enabled Certificate Verification', highlight: 'QR code' },
      ],
    },
    {
      blockType: 'whyUs',
      badge: 'Why Choose MHD',
      heading: 'Competence Proven by Documentation',
      features: [
        {
          title: 'Transparent Legal Records',
          description: 'Official certificate of eligibility for valuation services is publicly disclosed for verification and download.',
          icon: 'shield',
        },
        {
          title: 'QR-enabled Certificate Verification',
          description: 'QR codes enable clients and receiving organizations to cross-check issuance details on the MHD platform.',
          icon: 'qrcode',
        },
        {
          title: 'Updated Market Intelligence',
          description: 'MHD gathers, verifies, and analyzes accurate market comparables tailored to each asset category and valuation purpose.',
          icon: 'chart',
        },
      ],
      teamCard: {
        title: 'Certified Valuers',
        description: 'Directory of certified practicing valuers at MHD updated in accordance with Ministry of Finance notices.',
        buttonText: 'View Directory',
        buttonUrl: '/about/doi-ngu',
      },
    },
    {
      blockType: 'process',
      badge: 'Quality Control Process',
      heading: 'Valuation Process at MHD',
      description: 'Every dossier follows a strictly defined scope of work and is reviewed before issuing valuation certificates.',
      steps: [
        {
          stepNumber: '01',
          title: 'Intake and Field Inspection',
          description: 'Identify the asset, purpose, valuation date, basis of value, and scope of work; conduct on-site physical survey.',
        },
        {
          stepNumber: '02',
          title: 'Data Collection & Market Analysis',
          description: 'Review legal documentation, asset specifications, and reliable comparable transactions in the market.',
        },
        {
          stepNumber: '03',
          title: 'Apply Valuation Methodologies',
          description: 'Analyze collected data, select suitable approaches, and determine value based on statutory valuation principles.',
        },
        {
          stepNumber: '04',
          title: 'Issue Valuation Certificates',
          description: 'Deliver the certificate alongside comprehensive valuation reports with verification QR codes.',
        },
      ],
    },
    {
      blockType: 'servicesBlock',
      badge: 'Valuation Services',
      heading: 'Services by Asset Category',
      description: 'Scope of work and required documentation are determined according to the asset type, objective, and regulatory criteria.',
    },
    {
      blockType: 'partnerPortal',
      badge: 'For Institutional Partners',
      heading: 'Partner Verification & Lookup Portal',
      description: 'Dedicated system supporting commercial banks, enterprises, and state authorities in verifying certificates and tracking progress.',
      portals: [
        {
          tag: 'For Banks & Corporations',
          title: 'Institutional Credentials Dossier',
          description: 'Access complete legal records, personnel credentials, and proven track records according to granted permissions.',
          actionLabel: 'Request Access',
          actionUrl: '#',
          icon: 'file',
        },
        {
          tag: 'Certificate Verification',
          title: 'Verification via QR Code',
          description: 'Scan the QR code on certificates to cross-check issuance data directly on the MHD verification system.',
          actionLabel: 'Open Verification Portal',
          actionUrl: '/phap-ly/tra-cuu',
          icon: 'qr',
        },
        {
          tag: 'Multi-stage Valuations',
          title: 'Track Dossier Progress',
          description: 'Authorized clients can monitor appraisal milestones, document requests, and completion schedules.',
          actionLabel: 'Open Portal',
          actionUrl: '#',
          icon: 'portal',
        },
      ],
    },
    {
      blockType: 'insightsBlock',
      badge: 'Data & Insights',
      heading: 'Market Intelligence & Valuation Insights',
      description: 'Market commentary aggregated by industry sector, geographical location, and asset class. Client confidentiality strictly maintained.',
      categoryChips: [
        { name: 'Market Updates', slug: 'thi-truong' },
        { name: 'Valuation Expertise', slug: 'kien-thuc' },
        { name: 'Policies & Legal', slug: 'chinh-sach' },
        { name: 'Case Studies', slug: 'case-study' },
        { name: 'Market Reports', slug: 'bao-cao' },
      ],
      viewAllText: 'View All Articles →',
      viewAllUrl: '/insights',
    },
    {
      blockType: 'ctaBanner',
      badge: 'Prompt Consultation',
      heading: 'Request a Valuation',
      description: 'Submit your asset details and valuation purpose. MHD will reach out to confirm the scope of work and documentation required.',
      buttonLabel: 'Submit Request',
      buttonUrl: '/contact',
    },
    {
      blockType: 'testimonials',
      badge: 'Client & Partner Testimonials',
      heading: 'Partnering with Financial Institutions & Corporations',
      items: [
        {
          quote: 'The valuation report clearly stated the legal basis and calculation methodology. It met all documentation requirements for working with commercial banks.',
          clientTitle: 'Chief Financial Officer',
          companyType: 'Manufacturing Corporation',
        },
        {
          quote: 'The QR code on the certificate made it remarkably fast and reliable for our credit committee to verify collateral records.',
          clientTitle: 'Head of Credit Appraisal',
          companyType: 'Commercial Bank',
        },
        {
          quote: 'The brand valuation report demonstrated transparent DCF models and market parameters that fully satisfied our Board of Directors during M&A review.',
          clientTitle: 'General Director',
          companyType: 'Technology Group',
        },
      ],
    },
  ]

  let homeId: string | number
  if (existingHome.totalDocs === 0) {
    const doc = await payload.create({
      collection: 'pages',
      locale: 'vi',
      data: {
        title: 'Trang chủ',
        slug: 'home',
        metaTitle: 'MHD — Thẩm định giá theo chuẩn mực Việt Nam',
        metaDescription: 'MHD cung cấp dịch vụ thẩm định giá doanh nghiệp, bất động sản, động sản và tài sản vô hình.',
        layout: homeLayoutVi as any,
      },
    })
    homeId = doc.id
  } else {
    homeId = existingHome.docs[0].id
    await payload.update({
      collection: 'pages',
      id: homeId,
      locale: 'vi',
      data: {
        title: 'Trang chủ',
        metaTitle: 'MHD — Thẩm định giá theo chuẩn mực Việt Nam',
        metaDescription: 'MHD cung cấp dịch vụ thẩm định giá doanh nghiệp, bất động sản, động sản và tài sản vô hình.',
        layout: homeLayoutVi as any,
      },
    })
  }

  // Update English content for Home
  await payload.update({
    collection: 'pages',
    id: homeId,
    locale: 'en',
    data: {
      title: 'Homepage',
      metaTitle: 'MHD — Professional Valuation under Vietnam Standards',
      metaDescription: 'MHD provides independent valuation services for enterprises, real estate, and intangible assets.',
      layout: homeLayoutEn as any,
    },
  })

  // 8. Seed 36 Official Partners & Clients with Logo Media
  console.log('Seeding 36 Official Partners with Logos...')
  const partnersData = [
    { name: 'Vietcombank', category: 'bank', website: 'https://vietcombank.com.vn', order: 1, logoFilename: 'images-2.jpg' },
    { name: 'Agribank', category: 'bank', website: 'https://agribank.com.vn', order: 2, logoFilename: 'images-4.png' },
    { name: 'BIDV', category: 'bank', website: 'https://bidv.com.vn', order: 3, logoFilename: 'logo-bidv-20220426071253.jpg' },
    { name: 'MB Bank', category: 'bank', website: 'https://mbbank.com.vn', order: 4, logoFilename: 'Logo_MB_new.png' },
    { name: 'ACB', category: 'bank', website: 'https://acb.com.vn', order: 5, logoFilename: 'notFound.webp' },
    { name: 'SHB', category: 'bank', website: 'https://shb.com.vn', order: 6, logoFilename: 'Logo-SHB-VN.png' },
    { name: 'Sacombank', category: 'bank', website: 'https://sacombank.com.vn', order: 7, logoFilename: 'images-5.png' },
    { name: 'HDBank', category: 'bank', website: 'https://hdbank.com.vn', order: 8, logoFilename: 'Logo-HDBank.webp' },
    { name: 'KienlongBank', category: 'bank', website: 'https://kienlongbank.com', order: 9, logoFilename: 'logo-kienlongbank-klb-dinh-vi-thuong-hieu-10-1.png' },
    { name: 'VBSP', category: 'bank', website: 'https://vbsp.org.vn', order: 10, logoFilename: 'images-6.png' },
    { name: 'Hưng Thịnh Corporation', category: 'corporate', website: 'https://hungthinhcorp.com.vn', order: 11, logoFilename: 'Logo-Hung-Thinh-Co-V.png' },
    { name: 'Vạn Phúc Group', category: 'corporate', website: 'https://vanphuc.vn', order: 12, logoFilename: 'images-12.png' },
    { name: 'T&T Group', category: 'corporate', website: 'https://ttgroup.com.vn', order: 13, logoFilename: 'Logo_của_Tập_đoàn_T&T_Group.png' },
    { name: 'KITA Group', category: 'corporate', website: 'https://kitagroup.com.vn', order: 14, logoFilename: '6a3a546c4eb2d1782207596.jpg' },
    { name: 'GOTEC LAND', category: 'corporate', website: 'https://gotecland.vn', order: 15, logoFilename: 'logo-gotec-land.png' },
    { name: 'GOTECH', category: 'corporate', website: 'https://gotech.vn', order: 16, logoFilename: 'images-3.jpg' },
    { name: 'Saigontourist', category: 'corporate', website: 'https://saigontourist.com.vn', order: 17, logoFilename: '643e5d174f5b6-1681808663.png' },
    { name: 'Gạch Men Ý Mỹ', category: 'corporate', website: 'https://ymyceramic.com.vn', order: 18, logoFilename: 'LOGO-Y-MY-CHUAN_large.webp' },
    { name: 'The Sailing Bay Beach Resort', category: 'corporate', website: 'https://thesailingbay.com', order: 19, logoFilename: 'images-4.jpg' },
    { name: 'DICcons', category: 'corporate', website: 'https://diccons.com.vn', order: 20, logoFilename: 'logo_new.png' },
    { name: 'Sơn Oseven', category: 'corporate', website: 'https://osevenpaint.com', order: 21, logoFilename: 'images-7.png' },
    { name: 'Sơn Sonata', category: 'corporate', website: 'https://sonata.vn', order: 22, logoFilename: 'images-5.jpg' },
    { name: 'Thiên An Corp', category: 'corporate', website: 'https://thienancorp.vn', order: 23, logoFilename: 'logo-thienan-new.jpg' },
    { name: 'Catherine Denoual Maison', category: 'corporate', website: 'https://catherinedenoual.com', order: 24, logoFilename: 'Catherine+Denoual+Maison.webp' },
    { name: 'Rectorseal', category: 'corporate', website: 'https://rectorseal.com', order: 25, logoFilename: 'images-8.png' },
    { name: 'Shimez Engineering', category: 'corporate', website: null, order: 26, logoFilename: '1620095116135-Logo Shimez Chính thức - Copy.png' },
    { name: 'Wasol', category: 'corporate', website: 'https://wasol-vn.com', order: 27, logoFilename: 'logo-slogan-1.png' },
    { name: 'Nhất Thống', category: 'corporate', website: 'https://nhatthong.com.vn', order: 28, logoFilename: 'images-9.png' },
    { name: 'Bình Minh Én', category: 'corporate', website: null, order: 29, logoFilename: 'unnamed.png' },
    { name: 'Đại Phúc Lộc Thọ', category: 'corporate', website: null, order: 30, logoFilename: 'IEy1uqyVRg5qDW1rp0erWcHTdQWhnLeR_1711517714____83d1b6aa8b3619bbe520fae8e98f5e45.webp' },
    { name: 'Yeebo', category: 'corporate', website: 'https://yeebo.com.vn', order: 31, logoFilename: 'yeebo-logo.png' },
    { name: 'PV GAS', category: 'public', website: 'https://pvgas.com.vn', order: 32, logoFilename: 'images-10.png' },
    { name: 'Petrolimex', category: 'public', website: 'https://petrolimex.com.vn', order: 33, logoFilename: 'images-11.png' },
    { name: 'Viet Capital Securities', category: 'investor', website: 'https://vietcap.com.vn', order: 34, logoFilename: '1682251336594.png' },
    { name: 'Savills', category: 'investor', website: 'https://savills.com.vn', order: 35, logoFilename: 'images-6.jpg' },
    { name: 'JLL', category: 'investor', website: 'https://jll.com.vn', order: 36, logoFilename: 'images-7.jpg' },
  ]

  for (const p of partnersData) {
    let logoId: string | number | undefined = undefined
    if (p.logoFilename) {
      const existingMedia = await payload.find({
        collection: 'media',
        where: { filename: { equals: p.logoFilename } },
      })
      if (existingMedia.totalDocs > 0) {
        logoId = existingMedia.docs[0].id
      } else {
        const mediaFilePath = path.resolve(process.cwd(), 'media', p.logoFilename)
        if (fs.existsSync(mediaFilePath)) {
          try {
            const uploaded = await payload.create({
              collection: 'media',
              filePath: mediaFilePath,
              data: { alt: p.name },
            })
            logoId = uploaded.id
          } catch (err) {
            // ignore
          }
        }
      }
    }

    const existing = await payload.find({
      collection: 'partners',
      where: { name: { equals: p.name } },
    })

    const partnerData: any = {
      name: p.name,
      category: p.category as any,
      website: p.website || null,
      order: p.order,
      active: true,
      featured: true,
    }
    if (existing.totalDocs === 0) {
      if (logoId) partnerData.logo = logoId
      await payload.create({
        collection: 'partners',
        data: partnerData,
      })
    } else {
      const existingLogo = (existing.docs[0] as any).logo
      if (existingLogo) {
        partnerData.logo = typeof existingLogo === 'object' ? existingLogo.id : existingLogo
      } else if (logoId) {
        partnerData.logo = logoId
      }
      await payload.update({
        collection: 'partners',
        id: existing.docs[0].id,
        data: partnerData,
      })
    }
  }

  console.log('--- SEED COMPLETED SUCCESSFULLY! (VI & EN Populated) ---')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed Error:', err)
  if (process.env.NODE_ENV === 'production') {
    console.log('Continuing to start Next.js server in production...')
    process.exit(0)
  }
  process.exit(1)
})

import { getPayload } from 'payload'
import config from '../payload.config'

async function seed() {
  console.log('--- Starting Seed Process for MHD Payload CMS (VI & EN) ---')
  const payload = await getPayload({ config })

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
        tag: 'Quy trình',
        title: 'Bốn bước chuẩn hoá',
        description: 'Mọi hồ sơ đều được soát xét độc lập trước khi phát hành chứng thư.',
        buttonLabel: 'Xem quy trình →',
        buttonHref: '/phap-ly/quy-trinh',
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
        tag: 'Kinh nghiệm',
        title: '5.000+ hồ sơ hoàn thành',
        description: 'Được các tổ chức tín dụng và kiểm toán chấp thuận.',
        buttonLabel: 'Xem danh sách →',
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
        tag: 'Báo cáo',
        title: 'Báo cáo tổng quan quý',
        description: 'Tải miễn phí báo cáo phân tích chuyên sâu từ MHD.',
        buttonLabel: 'Đọc ngay →',
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
        tag: 'Bảo mật',
        title: 'Chính sách độc lập',
        description: 'Cam kết độc lập, khách quan và bảo mật dữ liệu tuyệt đối.',
        buttonLabel: 'Xem chính sách →',
        buttonHref: '/about/phap-ly',
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
        title: '028 3823 8888',
        description: 'Tư vấn trực tiếp với thẩm định viên trưởng bộ phận.',
        buttonLabel: 'Gọi ngay',
        buttonHref: 'tel:02838238888',
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
        tag: 'Workflow',
        title: '4-Step Quality Process',
        description: 'Every dossier undergoes independent review before certificate issuance.',
        buttonLabel: 'View Process →',
        buttonHref: '/phap-ly/quy-trinh',
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
        tag: 'Track Record',
        title: '5,000+ Completed Valuations',
        description: 'Accepted by all major financial institutions and audit firms.',
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
        tag: 'Quarterly Report',
        title: 'Quarterly Valuation Review',
        description: 'Free download of in-depth market reports from MHD.',
        buttonLabel: 'Read Now →',
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
        tag: 'Confidentiality',
        title: 'Independence Policy',
        description: 'Strict adherence to objectivity and data confidentiality.',
        buttonLabel: 'View Policy →',
        buttonHref: '/about/phap-ly',
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
        title: '028 3823 8888',
        description: 'Direct consultation with lead certified valuers.',
        buttonLabel: 'Call Now',
        buttonHref: 'tel:02838238888',
      },
    },
  ]

  await payload.updateGlobal({
    slug: 'header',
    locale: 'vi',
    data: {
      navItems: headerNavVi as any,
      verifyButton: {
        show: true,
        label: 'Tra cứu chứng thư',
        href: '/phap-ly/tra-cuu',
      },
      requestButton: {
        label: 'Yêu cầu thẩm định',
        href: '/contact',
      },
    },
  })

  await payload.updateGlobal({
    slug: 'header',
    locale: 'en',
    data: {
      navItems: headerNavEn as any,
      verifyButton: {
        show: true,
        label: 'Verify Certificate',
        href: '/phap-ly/tra-cuu',
      },
      requestButton: {
        label: 'Request Valuation',
        href: '/contact',
      },
    },
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
        { label: 'Hotline: 028 3823 8888', href: 'tel:02838238888' },
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
        { label: 'Hotline: 028 3823 8888', href: 'tel:02838238888' },
        { label: 'contact@mhd.com.vn', href: 'mailto:contact@mhd.com.vn' },
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
      address: 'TP. Hồ Chí Minh, Việt Nam',
      phone: '028 3823 8888',
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
      address: 'Ho Chi Minh City, Vietnam',
      phone: '028 3823 8888',
      email: 'contact@mhd.com.vn',
      workingHours: 'Monday – Friday: 8:00 – 17:30',
      columns: footerColumnsEn as any,
      licenseText: 'Certificate of eligibility for valuation business services No. 000/GCN-BTC',
      copyright: '© 2026 MHD Valuation Co., Ltd. All rights reserved.',
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
      name: 'Nguyễn Văn A',
      cardId: 'Thẻ TĐV-00123',
      positionVi: 'Thẩm định giá doanh nghiệp',
      positionEn: 'Business Valuation Specialist',
      order: 1,
    },
    {
      name: 'Trần Thị B',
      cardId: 'Thẻ TĐV-00456',
      positionVi: 'Thẩm định giá bất động sản',
      positionEn: 'Real Estate Valuation Specialist',
      order: 2,
    },
    {
      name: 'Lê Văn C',
      cardId: 'Thẻ TĐV-00789',
      positionVi: 'Thẩm định động sản & máy thiết bị',
      positionEn: 'Machinery & Equipment Appraiser',
      order: 3,
    },
  ]

  for (const t of teamData) {
    const existing = await payload.find({
      collection: 'team',
      where: { cardId: { equals: t.cardId } },
    })

    if (existing.totalDocs === 0) {
      const doc = await payload.create({
        collection: 'team',
        locale: 'vi',
        data: {
          name: t.name,
          cardId: t.cardId,
          position: t.positionVi,
          order: t.order,
        },
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
      await payload.update({
        collection: 'team',
        id: existing.docs[0].id,
        locale: 'vi',
        data: {
          name: t.name,
          position: t.positionVi,
          order: t.order,
        },
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

  console.log('--- SEED COMPLETED SUCCESSFULLY! (VI & EN Populated) ---')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed Error:', err)
  process.exit(1)
})

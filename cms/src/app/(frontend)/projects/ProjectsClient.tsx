'use client'

import React, { useState } from 'react'
import Link from 'next/link'

interface ProjectsClientProps {
  initialProjects?: any[]
  activeCategory?: string
  currentLocale?: string
}

export default function ProjectsClient({
  activeCategory = 'all',
  currentLocale = 'vi',
}: ProjectsClientProps) {
  const isEn = currentLocale === 'en'
  const [selectedCat, setSelectedCat] = useState<string>(activeCategory)

  const categories = [
    { key: 'all', href: '/projects', label: isEn ? 'All Asset Classes' : 'Tất cả nhóm tài sản' },
    { key: 'bat-dong-san', href: '/projects/bat-dong-san', label: isEn ? 'Real Estate' : 'Bất động sản' },
    { key: 'doanh-nghiep', href: '/projects/doanh-nghiep', label: isEn ? 'Enterprise Valuation' : 'Doanh nghiệp' },
    { key: 'may-thiet-bi', href: '/projects/may-thiet-bi', label: isEn ? 'Machinery & Equipment' : 'Máy móc thiết bị' },
    { key: 'tai-san-vo-hinh', href: '/projects/tai-san-vo-hinh', label: isEn ? 'Intangible Assets' : 'Tài sản vô hình' },
    { key: 'ha-tang', href: '/projects/ha-tang', label: isEn ? 'Infrastructure & Plant' : 'Hạ tầng & Nhà xưởng' },
  ]

  // Render 3D Isometric Animated SVG Icons with rich micro-animations
  const renderAsset3DIcon = (key: string) => {
    if (key === 'bat-dong-san') {
      return (
        <svg width="72" height="56" viewBox="0 0 72 56" fill="none" aria-hidden="true">
          <path d="M6 48h60" stroke="#9aa0a7" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M10 48V26l20-14 20 14v22H10z" fill="#fbf7f3" stroke="#9aa0a7" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M30 12l24 16.8V48" stroke="#9aa0a7" strokeWidth="1.5" strokeLinejoin="round" />
          <rect x="23" y="32" width="14" height="16" fill="#fff" stroke="#9aa0a7" strokeWidth="1.5" />
          <circle cx="30" cy="23" r="4.5" stroke="var(--c-accent, #d94f0a)" strokeWidth="1.5" />
          <g style={{ animation: 'mhdPin 3s ease-in-out infinite' }}>
            <path d="M52 14c0 5-6 12-6 12s-6-7-6-12a6 6 0 1112 0z" fill="#fff" stroke="var(--c-accent, #d94f0a)" strokeWidth="1.6" />
            <circle cx="46" cy="14" r="2" fill="var(--c-accent, #d94f0a)" />
          </g>
        </svg>
      )
    }

    if (key === 'doanh-nghiep') {
      return (
        <svg width="72" height="56" viewBox="0 0 72 56" fill="none" aria-hidden="true">
          <path d="M4 52h56" stroke="#9aa0a7" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="10" y="14" width="24" height="38" rx="2" fill="#fbf7f3" stroke="#9aa0a7" strokeWidth="1.5" />
          <rect x="34" y="26" width="16" height="26" rx="2" fill="#fff" stroke="#9aa0a7" strokeWidth="1.5" />
          <path d="M16 22h4M24 22h4M16 30h4M24 30h4M16 38h4M24 38h4M39 34h6M39 42h6" stroke="#e2e0da" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M44 18l7-7 5 4 10-10" stroke="var(--c-accent, #d94f0a)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M60 5h6v6" stroke="var(--c-accent, #d94f0a)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="56" cy="15" r="2.5" fill="var(--c-accent, #d94f0a)" style={{ animation: 'mhdPop 2.4s ease-in-out infinite' }} />
        </svg>
      )
    }

    if (key === 'may-thiet-bi') {
      return (
        <svg width="72" height="56" viewBox="0 0 72 56" fill="none" aria-hidden="true">
          <path d="M6 50h60" stroke="#9aa0a7" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="8" y="26" width="34" height="24" rx="2" fill="#fbf7f3" stroke="#9aa0a7" strokeWidth="1.5" />
          <path d="M14 26v-8h10v8M30 26v-4h6v4" stroke="#9aa0a7" strokeWidth="1.5" />
          <line x1="8" y1="36" x2="42" y2="36" stroke="#e2e0da" strokeWidth="1.5" />
          <circle cx="16" cy="43" r="3" fill="#e2e0da" />
          <circle cx="34" cy="43" r="3" fill="#e2e0da" />
          <g style={{ transformOrigin: '50px 20px', animation: 'mhdSpin 12s linear infinite' }}>
            <circle cx="50" cy="20" r="11" fill="#fff" stroke="var(--c-accent, #d94f0a)" strokeWidth="1.6" />
            <circle cx="50" cy="20" r="4" fill="#fbf7f3" stroke="var(--c-accent, #d94f0a)" strokeWidth="1.4" />
            <path d="M50 7v4M50 29v4M37 20h4M59 20h4M41 11l3 3M56 26l3 3M41 29l3-3M56 14l3-3" stroke="var(--c-accent, #d94f0a)" strokeWidth="1.6" strokeLinecap="round" />
          </g>
        </svg>
      )
    }

    if (key === 'tai-san-vo-hinh') {
      return (
        <svg width="72" height="56" viewBox="0 0 72 56" fill="none" aria-hidden="true">
          <circle cx="36" cy="22" r="16" fill="#fbf7f3" stroke="#9aa0a7" strokeWidth="1.5" />
          <circle cx="36" cy="22" r="11" fill="#fff" stroke="var(--c-accent, #d94f0a)" strokeWidth="1.6" />
          <path d="M30 35l-5 15 11-5 11 5-5-15" fill="#fbf7f3" stroke="#9aa0a7" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M36 15l2 4.5 4.8.4-3.6 3.2 1.1 4.7-4.3-2.5-4.3 2.5 1.1-4.7-3.6-3.2 4.8-.4z" fill="var(--c-accent, #d94f0a)" />
          <path d="M12 18c3-6 9-10 16-11" stroke="var(--c-accent, #d94f0a)" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="3 3" style={{ animation: 'mhdDashS 2s linear infinite' }} />
          <path d="M60 26c-1 7-5 13-11 16" stroke="var(--c-accent, #d94f0a)" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="3 3" style={{ animation: 'mhdDashS 2s linear infinite' }} />
        </svg>
      )
    }

    // Default ha-tang
    return (
      <svg width="72" height="56" viewBox="0 0 72 56" fill="none" aria-hidden="true">
        <path d="M8 50h56" stroke="#9aa0a7" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 50V32h10v18M28 50V22h10v28M42 50V14h10v36" stroke="#e2e0da" strokeWidth="1.5" fill="#fbf7f3" />
        <path d="M12 36l16-12 14-8 18-6" stroke="var(--c-accent, #d94f0a)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 3" style={{ animation: 'mhdDashS 1.8s linear infinite' }} />
        <circle cx="60" cy="10" r="3.5" fill="var(--c-accent, #d94f0a)" />
        <circle cx="42" cy="16" r="2.5" fill="#fff" stroke="var(--c-accent, #d94f0a)" strokeWidth="1.5" />
        <circle cx="28" cy="24" r="2.5" fill="#fff" stroke="var(--c-accent, #d94f0a)" strokeWidth="1.5" />
      </svg>
    )
  }

  // Deep Asset Capabilities Data with rich UI metadata
  const assetCapabilities = [
    {
      key: 'bat-dong-san',
      indexNumber: '01',
      tag: isEn ? 'Real Estate' : 'Bất động sản',
      title: isEn ? 'Real Estate Valuation' : 'Thẩm định giá Bất động sản',
      desc: isEn
        ? 'Valuation of residential land, master-planned townships, commercial office towers, industrial parks, and hospitality resorts.'
        : 'Xác định giá trị quyền sử dụng đất, dự án khu đô thị 1/500, cao ốc văn phòng thương mại, khu công nghiệp và resort nghỉ dưỡng.',
      standardCode: 'Thông tư 30/2024/TT-BTC',
      standardName: isEn ? 'Vietnam Valuation Standard on Real Estate' : 'Chuẩn mực Thẩm định giá BĐS (Bộ Tài chính)',
      methods: isEn
        ? ['Market Comparison', 'Income Yield / DCF', 'Residual Approach', 'Cost Method']
        : ['So sánh thị trường', 'Chiết khấu dòng tiền (DCF)', 'Phương pháp Thặng dư', 'Phương pháp Chi phí'],
      purposes: isEn
        ? ['Bank Credit Mortgage', 'Project M&A Transfer', 'Corporate Bond Backing', 'Site Clearance']
        : ['Thế chấp tín dụng ngân hàng', 'M&A & Chuyển nhượng dự án', 'Bảo đảm phát hành trái phiếu', 'Bồi thường GPMB'],
      serviceLink: '/services/Dich-vu-Bat-dong-san',
    },
    {
      key: 'doanh-nghiep',
      indexNumber: '02',
      tag: isEn ? 'Enterprise & Equity' : 'Doanh nghiệp & Phần vốn',
      title: isEn ? 'Enterprise & Equity Valuation' : 'Thẩm định giá Doanh nghiệp',
      desc: isEn
        ? 'Independent valuation of business enterprises, strategic equity stakes, private capital shares, and investment portfolios.'
        : 'Xác định giá trị thực của doanh nghiệp, danh mục đầu tư tài chính, phần vốn góp liên doanh và cổ phần chiến lược.',
      standardCode: 'Thông tư 36/2024/TT-BTC',
      standardName: isEn ? 'Vietnam Valuation Standard on Enterprises' : 'Chuẩn mực Thẩm định giá Doanh nghiệp',
      methods: isEn
        ? ['Free Cash Flow (FCFF/FCFE)', 'Adjusted Net Asset', 'Multiples (P/E, EV/EBITDA)', 'Dividend Discount']
        : ['Dòng tiền tự do (FCFF/FCFE)', 'Tài sản thuần điều chỉnh', 'Bội số thị trường (P/E, EV/EBITDA)', 'Chiết khấu cổ tức'],
      purposes: isEn
        ? ['Mergers & Acquisitions (M&A)', 'Equitization & Divestment', 'Strategic Capital Raise', 'IFRS / VAS Reporting']
        : ['Mua bán & Sáp nhập (M&A)', 'Cổ phần hóa & Thoái vốn', 'Phát hành cổ phần chiến lược', 'Báo cáo tài chính IFRS/VAS'],
      serviceLink: '/services/Dich-vu-Doanh-nghiep',
    },
    {
      key: 'may-thiet-bi',
      indexNumber: '03',
      tag: isEn ? 'Machinery & Lines' : 'Máy móc & Dây chuyền',
      title: isEn ? 'Machinery & Equipment Valuation' : 'Máy móc Thiết bị & Dây chuyền',
      desc: isEn
        ? 'Appraisal of specialized industrial lines, processing facilities, heavy technological plants, and utility vessels.'
        : 'Định giá dây chuyền sản xuất đồng bộ, tổ hợp nhà máy chế biến, thiết bị công nghiệp nặng và phương tiện chuyên dùng.',
      standardCode: 'Thông tư 31/2024/TT-BTC',
      standardName: isEn ? 'Vietnam Valuation Standard on Machinery' : 'Chuẩn mực Thẩm định giá Máy móc thiết bị',
      methods: isEn
        ? ['Depreciated Replacement Cost', 'Market Comparison Approach', 'Economic Obsolescence Audit']
        : ['Chi phí thay thế ròng (DRC)', 'So sánh thị trường', 'Đánh giá hao mòn công nghệ & kinh tế'],
      purposes: isEn
        ? ['Working Capital Financing', 'Import Machinery Pledge', 'Insurance Value Audit', 'Asset Auction / Liquidation']
        : ['Cấp hạn mức vốn lưu động', 'Thế chấp máy móc nhập khẩu', 'Xác định giá trị bảo hiểm', 'Thanh lý & Bán đấu giá tài sản'],
      serviceLink: '/services/Dich-vu-May-thiet-bi',
    },
    {
      key: 'tai-san-vo-hinh',
      indexNumber: '04',
      tag: isEn ? 'Intangibles & IP' : 'Tài sản Vô hình & SHTT',
      title: isEn ? 'Intangible Assets & Brand Equity' : 'Thương hiệu & Tài sản Vô hình',
      desc: isEn
        ? 'Valuation of brand equity, trademark portfolios, proprietary patents, commercial software, and goodwill.'
        : 'Định lượng giá trị kinh tế của nhãn hiệu, thương hiệu doanh nghiệp, sáng chế độc quyền, bản quyền phần mềm và lợi thế thương mại.',
      standardCode: 'Tiêu chuẩn Quốc tế IVS 210',
      standardName: isEn ? 'International Valuation Standards on Intangibles' : 'Tiêu chuẩn TĐG Quốc tế & Chuẩn mực Bộ Tài chính',
      methods: isEn
        ? ['Relief-from-Royalty', 'Multi-period Excess Earnings', 'With-and-Without Model']
        : ['Chiết trừ bản quyền (Royalty)', 'Lợi nhuận vượt trội (MPEEM)', 'Mô hình Giả định có/không'],
      purposes: isEn
        ? ['IP Capital Contribution', 'Brand Franchise & Licensing', 'Litigation & Dispute Settlement', 'Venture Capital Financing']
        : ['Góp vốn bằng quyền SHTT', 'Nhượng quyền & Li-xăng nhãn hiệu', 'Giải quyết tranh chấp cổ đông', 'Huy động vốn quỹ đầu tư mạo hiểm'],
      serviceLink: '/services/Dich-vu-Thuong-hieu',
    },
    {
      key: 'ha-tang',
      indexNumber: '05',
      tag: isEn ? 'Infrastructure & Plant' : 'Hạ tầng & Dự án Lớn',
      title: isEn ? 'Infrastructure & Industrial Plants' : 'Hạ tầng & Dự án Đầu tư',
      desc: isEn
        ? 'Appraisal of deep-water port systems, clean energy grids, substations, logistics hubs, and industrial park technical infrastructure.'
        : 'Thẩm định kết cấu hạ tầng cảng biển, mạng lưới điện truyền tải, trạm năng lượng sạch, kho vận logistics và hạ tầng kỹ thuật KCN.',
      standardCode: 'Thông tư 30 & 31/2024/TT-BTC',
      standardName: isEn ? 'Vietnam Technical Infrastructure Valuation Standards' : 'Hệ thống Chuẩn mực Thẩm định giá Việt Nam',
      methods: isEn
        ? ['Discounted Cash Flow (DCF)', 'Depreciated Replacement Cost', 'Project Feasibility Modeling']
        : ['Chiết khấu dòng tiền (DCF)', 'Chi phí thay thế hạ tầng', 'Mô hình hiệu quả tài chính dự án'],
      purposes: isEn
        ? ['ODA & Green Credit Facilities', 'Public-Private Partnership (PPP)', 'SOE Restructuring', 'Foreign FDI Inflow']
        : ['Giải ngân vốn ODA & Tín dụng xanh', 'Dự án đối tác công tư (PPP)', 'Cổ phần hóa doanh nghiệp nhà nước', 'Hợp tác liên doanh FDI quốc tế'],
      serviceLink: '/services/Dich-vu-Du-an-dau-tu',
    },
  ]

  const activeCapabilityList =
    selectedCat === 'all'
      ? assetCapabilities
      : assetCapabilities.filter((c) => c.key === selectedCat)

  return (
    <div style={{ background: 'var(--c-page, #f6f5f2)', minHeight: '100vh', color: 'var(--c-ink, #16181c)' }}>
      {/* 1. HERO SECTION (Synchronized with Homepage & About page) */}
      <section
        data-screen-label="Hồ sơ Năng lực — Hero"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--c-page, #f6f5f2)',
          borderBottom: '1px solid var(--c-border, #e2e0da)',
          paddingTop: 'clamp(2.5rem, 5vw, 4rem)',
          paddingBottom: 'clamp(3rem, 5vw, 4.5rem)',
        }}
      >
        {/* Architectural 56px subtle grid */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundImage:
              'linear-gradient(rgba(var(--c-ink-rgb, 22, 24, 28), .045) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--c-ink-rgb, 22, 24, 28), .045) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'linear-gradient(100deg, transparent 0%, #000 40%, #000 75%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(100deg, transparent 0%, #000 40%, #000 75%, transparent 100%)',
          }}
        />

        {/* Ambient Warm Gradient Glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-8%',
            top: '-25%',
            width: '640px',
            height: '640px',
            borderRadius: '50%',
            pointerEvents: 'none',
            background: 'radial-gradient(circle, rgba(var(--c-accent-rgb, 217, 79, 10), .11), transparent 65%)',
            filter: 'blur(30px)',
          }}
        />

        {/* Floating Geometric Wireframe Hexagon Branding SVG */}
        <svg
          aria-hidden="true"
          viewBox="0 0 500 400"
          fill="none"
          style={{
            position: 'absolute',
            right: '3%',
            top: '8%',
            width: 'min(40%, 460px)',
            height: 'auto',
            pointerEvents: 'none',
            opacity: 0.65,
          }}
        >
          <g style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
            <polygon points="340,60 430,110 430,215 340,265 250,215 250,110" stroke="var(--c-accent, #d94f0a)" strokeWidth="1.3" />
            <polygon points="340,100 400,135 400,205 340,240 280,205 280,135" stroke="var(--c-accent, #d94f0a)" strokeWidth="0.8" opacity="0.45" />
          </g>
          <circle cx="340" cy="188" r="140" stroke="rgba(var(--c-ink-rgb, 22, 24, 28), 0.12)" strokeWidth="1" strokeDasharray="4 12" />
        </svg>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem, 4vw, 2.5rem)' }}>
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '.5rem',
              fontSize: '.82rem',
              color: 'var(--c-faint, #8a8f96)',
              marginBottom: '1.4rem',
            }}
          >
            <Link href="/" style={{ color: 'var(--c-faint, #8a8f96)', textDecoration: 'none' }}>
              {isEn ? 'Home' : 'Trang chủ'}
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href="/projects"
              onClick={() => setSelectedCat('all')}
              style={{
                color: selectedCat === 'all' ? 'var(--c-ink, #16181c)' : 'var(--c-faint, #8a8f96)',
                fontWeight: selectedCat === 'all' ? 600 : 400,
                textDecoration: 'none',
              }}
            >
              {isEn ? 'Credentials & Track Record' : 'Dự án & Hồ sơ Tiêu biểu'}
            </Link>
            {selectedCat !== 'all' && (
              <>
                <span aria-hidden="true">/</span>
                <span style={{ color: 'var(--c-accent, #d94f0a)', fontWeight: 600 }}>
                  {categories.find((c) => c.key === selectedCat)?.label || selectedCat}
                </span>
              </>
            )}
          </nav>

          {/* Header content with Title & Description */}
          <div style={{ maxWidth: '840px' }}>
            {/* Badge Pill */}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.5rem',
                fontSize: '.74rem',
                fontWeight: 700,
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                color: 'var(--c-accent, #d94f0a)',
                border: '1px solid var(--c-border, #e2e0da)',
                background: '#fff',
                padding: '.42rem .95rem',
                borderRadius: '999px',
                marginBottom: '1.2rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M9 12l2 2 4-4M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7z" />
              </svg>
              {isEn ? 'Credentials & Track Record' : 'Hồ sơ tiêu biểu & Năng lực thực hiện'}
            </span>

            {/* Page Title */}
            <h1
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: 'clamp(2.2rem, 1.6rem + 2.5vw, 3.5rem)',
                fontWeight: 700,
                lineHeight: 1.18,
                letterSpacing: '-.025em',
                color: 'var(--c-ink, #16181c)',
                marginBottom: '1rem',
              }}
            >
              {isEn ? 'Independent Valuation Credentials' : 'Hồ Sơ Năng Lực Thẩm Định Giá Độc Lập'}
            </h1>

            {/* Subtitle Description */}
            <p
              style={{
                fontSize: 'clamp(1rem, .95rem + .3vw, 1.15rem)',
                color: 'var(--c-muted, #5f656d)',
                maxWidth: '72ch',
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {isEn
                ? 'MHD Valuation delivers independent, objective valuation opinions across diverse asset portfolios for financial institutions, commercial banks, corporations, and judicial authorities in full compliance with the Law on Prices 2023 and Vietnam Valuation Standards.'
                : 'MHD Thẩm định giá thực hiện thẩm định độc lập cho các tổ chức tài chính, ngân hàng, doanh nghiệp và nhà đầu tư theo Luật Giá 2023 và Hệ thống Chuẩn mực Thẩm định giá Việt Nam. Mọi hồ sơ đều đảm bảo tính khách quan, cơ sở pháp lý vững chắc và bảo mật tuyệt đối.'}
            </p>
          </div>
        </div>
      </section>

      {/* 2. STATUTORY CONFIDENTIALITY COMMITMENT BANNER (Luật Giá 2023) */}
      <section
        style={{
          background: '#fff',
          borderBottom: '1px solid var(--c-border, #e2e0da)',
          padding: '1.6rem 0',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem, 4vw, 2.5rem)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1.2rem',
              background: 'rgba(217, 79, 10, 0.04)',
              border: '1px solid rgba(217, 79, 10, 0.22)',
              borderRadius: '12px',
              padding: '1.2rem 1.4rem',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(217, 79, 10, 0.12)',
                color: 'var(--c-accent, #d94f0a)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '2px',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div style={{ flex: '1 1 auto' }}>
              <div style={{ fontSize: '.9rem', fontWeight: 700, color: 'var(--c-ink, #16181c)', marginBottom: '.3rem' }}>
                {isEn
                  ? 'Client Confidentiality Commitment under Law on Prices 2023'
                  : 'Nguyên tắc Bảo mật Thông tin Hồ sơ theo Luật Giá 2023 & Quy chuẩn Nghề nghiệp'}
              </div>
              <p style={{ margin: 0, fontSize: '.84rem', color: 'var(--c-muted, #5f656d)', lineHeight: 1.6 }}>
                {isEn
                  ? 'In compliance with Article 42 of the Law on Prices No. 16/2023/QH15 and Professional Ethics Standards of Valuation, all client identities, specific project titles, financial records, and appraisal figures remain strictly confidential. MHD does not publish individual client engagement listings in public domain.'
                  : 'Căn cứ Điều 42 Luật Giá số 16/2023/QH15 và Chuẩn mực Đạo đức Nghề nghiệp Thẩm định giá Việt Nam: Toàn bộ thông tin khách hàng, tên thương mại của dự án, hồ sơ kỹ thuật, dữ liệu tài chính nội bộ và giá trị thẩm định cụ thể đều được MHD cam kết bảo mật tuyệt đối. Chúng tôi không công khai danh mục thương vụ riêng của từng đối tác nhằm bảo vệ quyền lợi hợp pháp và bí mật kinh doanh của khách hàng.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY TABS TOOLBAR (Synchronized with About Page Underline Subnav) */}
      <style>{`
        .mhd-projects-subnav-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.92rem 0.35rem 0.82rem;
          font-size: clamp(0.82rem, 0.78rem + 0.2vw, 0.88rem);
          white-space: nowrap !important;
          text-wrap: nowrap !important;
          margin-bottom: -1px;
          transition: color 0.18s ease, border-color 0.18s ease;
          font-family: inherit;
          display: inline-flex;
          align-items: center;
          gap: .4rem;
          flex-shrink: 0 !important;
          line-height: 1.35;
        }
        .mhd-projects-subnav-btn:hover {
          color: var(--c-ink, #16181c) !important;
        }
        .mhd-projects-subnav-scroll {
          display: flex;
          align-items: center;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          ms-overflow-style: none;
          gap: clamp(1rem, 2vw, 2.4rem);
        }
        .mhd-projects-subnav-scroll::-webkit-scrollbar {
          display: none;
        }
        @media (min-width: 1024px) {
          .mhd-projects-subnav-scroll {
            justify-content: space-between;
          }
        }
      `}</style>
      <div
        id="projects-anchors"
        style={{
          position: 'sticky',
          top: '72px',
          zIndex: 30,
          background: '#ffffff',
          borderBottom: '1px solid var(--c-border, #e2e0da)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
        }}
      >
        <nav
          aria-label={isEn ? 'Asset class categories' : 'Phân loại nhóm tài sản'}
          className="mhd-projects-subnav-scroll"
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '0 clamp(1rem, 4vw, 2.5rem)',
          }}
        >
          {categories.map((cat) => {
            const active = selectedCat === cat.key
            return (
              <button
                key={cat.key}
                type="button"
                className="mhd-projects-subnav-btn"
                onClick={() => setSelectedCat(cat.key)}
                style={{
                  fontWeight: active ? 700 : 500,
                  color: active ? 'var(--c-ink, #16181c)' : 'var(--c-muted, #5f656d)',
                  borderBottom: active
                    ? '2.5px solid var(--c-accent, #d94f0a)'
                    : '2.5px solid transparent',
                  whiteSpace: 'nowrap',
                  textWrap: 'nowrap',
                  flexShrink: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                <span style={{ whiteSpace: 'nowrap', textWrap: 'nowrap' }}>{cat.label}</span>
                {cat.key === 'all' ? (
                  <span
                    style={{
                      fontSize: '.72rem',
                      fontWeight: 600,
                      padding: '.1rem .44rem',
                      borderRadius: '999px',
                      background: active ? 'rgba(217, 79, 10, 0.1)' : 'var(--c-subtle, #f0eee9)',
                      color: active ? 'var(--c-accent, #d94f0a)' : 'var(--c-faint, #8a8f96)',
                      transition: 'all 0.18s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: 1.25,
                      flexShrink: 0,
                    }}
                  >
                    5
                  </span>
                ) : null}
              </button>
            )
          })}
        </nav>
      </div>

      {/* 4. NĂNG LỰC CHUYÊN SÂU THEO NHÓM TÀI SẢN (REDESIGNED ULTRA-PREMIUM CARDS) */}
      <section
        style={{
          padding: 'clamp(3.5rem, 6vw, 5rem) 0',
          background: 'var(--c-page, #f6f5f2)',
          borderBottom: '1px solid var(--c-border, #e2e0da)',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem, 4vw, 2.5rem)' }}>
          <div style={{ maxWidth: '780px', marginBottom: '2.5rem' }}>
            <span
              style={{
                display: 'inline-block',
                fontSize: '.74rem',
                fontWeight: 700,
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                color: 'var(--c-accent, #d94f0a)',
                marginBottom: '.5rem',
              }}
            >
              {isEn ? 'ASSET CLASS SCOPES & STANDARDS' : 'PHẠM VI & TIÊU CHUẨN ĐỊNH GIÁ'}
            </span>
            <h2
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: 'clamp(1.6rem, 1.3rem + 1vw, 2.2rem)',
                fontWeight: 700,
                lineHeight: 1.25,
                letterSpacing: '-.02em',
                color: 'var(--c-ink, #16181c)',
                margin: 0,
              }}
            >
              {isEn ? 'Specialized Valuation Disciplines' : 'Năng lực thẩm định theo nhóm tài sản'}
            </h2>
            <p style={{ margin: '.5rem 0 0', fontSize: '.92rem', color: 'var(--c-muted, #5f656d)' }}>
              {isEn
                ? 'Each asset category is appraised using statutory valuation standards, approved mathematical models, and verified market databases.'
                : 'Mỗi nhóm tài sản được thẩm định theo đúng chuẩn mực của Bộ Tài chính, áp dụng phương pháp định lượng khoa học và kiểm chứng chéo trên thị trường.'}
            </p>
          </div>

          {/* Cards Grid with Premium Visual Hierarchy & 3D Isometric Animated Icons */}
          <style>{`
            .mhd-capability-card {
              transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.28s ease !important;
            }
            .mhd-capability-card:hover {
              transform: translateY(-4px) !important;
              box-shadow: 0 18px 40px -8px rgba(22, 24, 28, 0.09) !important;
              border-color: rgba(217, 79, 10, 0.38) !important;
            }
            .mhd-capability-card:hover .mhd-card-arrow {
              transform: translateX(4px) !important;
              background: var(--c-accent, #d94f0a) !important;
              color: #ffffff !important;
            }
          `}</style>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
              gap: '1.75rem',
            }}
          >
            {activeCapabilityList.map((item) => (
              <article
                key={item.key}
                className="mhd-capability-card"
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--c-border, #e2e0da)',
                  borderRadius: '18px',
                  padding: '1.8rem 1.8rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1.3rem',
                  boxShadow: '0 4px 18px rgba(22, 24, 28, 0.035)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div>
                  {/* Top Bar: 3D Animated Icon Stage + Number & Category Badge */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      marginBottom: '1.2rem',
                    }}
                  >
                    {/* 3D Animated Icon Hero Stage */}
                    <div
                      style={{
                        width: '82px',
                        height: '66px',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, rgba(217, 79, 10, 0.05) 0%, rgba(22, 24, 28, 0.02) 100%)',
                        border: '1px solid rgba(217, 79, 10, 0.14)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(217, 79, 10, 0.04)',
                        flexShrink: 0,
                      }}
                    >
                      {renderAsset3DIcon(item.key)}
                    </div>

                    {/* Right side: Watermark Number + Category Pill */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '.4rem' }}>
                      <span
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: '1.8rem',
                          fontWeight: 800,
                          color: 'rgba(22, 24, 28, 0.08)',
                          lineHeight: 1,
                          letterSpacing: '-.03em',
                        }}
                      >
                        {item.indexNumber}
                      </span>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '.4rem',
                          fontSize: '.72rem',
                          fontWeight: 700,
                          letterSpacing: '.06em',
                          textTransform: 'uppercase',
                          color: 'var(--c-ink, #16181c)',
                          background: 'var(--c-page, #f6f5f2)',
                          border: '1px solid var(--c-border, #e2e0da)',
                          padding: '.3rem .72rem',
                          borderRadius: '999px',
                        }}
                      >
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--c-accent, #d94f0a)' }} />
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  {/* Title & Concise Summary */}
                  <h3
                    style={{
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: '1.26rem',
                      fontWeight: 700,
                      color: 'var(--c-ink, #16181c)',
                      margin: '0 0 .55rem',
                      lineHeight: 1.35,
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '.88rem',
                      color: 'var(--c-muted, #5f656d)',
                      lineHeight: 1.65,
                      margin: '0 0 1.25rem',
                      minHeight: '2.8rem',
                    }}
                  >
                    {item.desc}
                  </p>

                  {/* Statutory Standard Compliance Ribbon (Clean, Trustworthy, Non-blocky) */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '.65rem',
                      background: '#faf9f6',
                      border: '1px solid rgba(217, 79, 10, 0.16)',
                      borderRadius: '8px',
                      padding: '.55rem .85rem',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <div
                      style={{
                        color: 'var(--c-accent, #d94f0a)',
                        display: 'flex',
                        alignItems: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" aria-hidden="true">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </div>
                    <div style={{ fontSize: '.8rem', lineHeight: 1.4, color: 'var(--c-ink, #16181c)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      <strong style={{ fontWeight: 700 }}>{item.standardCode}</strong>
                      <span style={{ color: 'var(--c-muted, #5f656d)', marginLeft: '.4rem' }}>· {item.standardName}</span>
                    </div>
                  </div>

                  {/* Key Methodologies (Modern 2-Column Minimalist List with Accent Bullets) */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '.45rem',
                        fontSize: '.72rem',
                        fontWeight: 700,
                        letterSpacing: '.07em',
                        textTransform: 'uppercase',
                        color: 'var(--c-accent, #d94f0a)',
                        marginBottom: '.65rem',
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8v8M8 12h8" />
                      </svg>
                      <span>{isEn ? 'Core Valuation Methodologies' : 'Phương pháp thẩm định cốt lõi'}</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '.45rem .75rem' }}>
                      {item.methods.map((method, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: '.4rem',
                            fontSize: '.8rem',
                            fontWeight: 600,
                            color: 'var(--c-ink, #16181c)',
                            lineHeight: 1.45,
                          }}
                        >
                          <span style={{ color: 'var(--c-accent, #d94f0a)', fontSize: '.75rem', transform: 'translateY(-1px)' }}>▸</span>
                          <span>{method}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Primary Engagement Purposes (Clean Sub-chips) */}
                  <div>
                    <div
                      style={{
                        fontSize: '.72rem',
                        fontWeight: 700,
                        letterSpacing: '.07em',
                        textTransform: 'uppercase',
                        color: 'var(--c-faint, #8a8f96)',
                        marginBottom: '.55rem',
                      }}
                    >
                      {isEn ? 'Statutory & Commercial Use Cases' : 'Mục đích áp dụng tiêu biểu'}
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.35rem' }}>
                      {item.purposes.map((purpose, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: '.76rem',
                            fontWeight: 500,
                            background: '#faf9f6',
                            border: '1px solid var(--c-border, #e2e0da)',
                            padding: '.24rem .58rem',
                            borderRadius: '6px',
                            color: 'var(--c-muted, #5f656d)',
                          }}
                        >
                          {purpose}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Link with Sleek Micro-Interaction */}
                <Link
                  href={item.serviceLink}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1.1rem',
                    marginTop: '.8rem',
                    borderTop: '1px solid rgba(22, 24, 28, 0.06)',
                    fontSize: '.86rem',
                    fontWeight: 700,
                    color: 'var(--c-accent, #d94f0a)',
                    textDecoration: 'none',
                  }}
                >
                  <span>{isEn ? 'Explore Methodology & Solutions' : 'Xem chi tiết dịch vụ'}</span>
                  <span
                    className="mhd-card-arrow"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'rgba(217, 79, 10, 0.08)',
                      color: 'var(--c-accent, #d94f0a)',
                      fontWeight: 700,
                      fontSize: '.95rem',
                      transition: 'transform 0.22s ease, background 0.22s ease, color 0.22s ease',
                    }}
                  >
                    →
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. RIGOROUS 5-STEP QUALITY CONTROL WORKFLOW */}
      <section
        style={{
          padding: 'clamp(3.5rem, 6vw, 5rem) 0',
          background: '#fff',
          borderBottom: '1px solid var(--c-border, #e2e0da)',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem, 4vw, 2.5rem)' }}>
          <div style={{ maxWidth: '780px', marginBottom: '2.5rem' }}>
            <span
              style={{
                display: 'inline-block',
                fontSize: '.74rem',
                fontWeight: 700,
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                color: 'var(--c-accent, #d94f0a)',
                marginBottom: '.5rem',
              }}
            >
              {isEn ? 'QUALITY ASSURANCE' : 'QUY TRÌNH KIỂM SOÁT'}
            </span>
            <h2
              style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: 'clamp(1.6rem, 1.3rem + 1vw, 2.2rem)',
                fontWeight: 700,
                lineHeight: 1.25,
                letterSpacing: '-.02em',
                color: 'var(--c-ink, #16181c)',
                margin: 0,
              }}
            >
              {isEn ? '5-Stage Rigorous Valuation Process' : 'Quy trình kiểm soát chất lượng 5 bước'}
            </h2>
            <p style={{ margin: '.5rem 0 0', fontSize: '.92rem', color: 'var(--c-muted, #5f656d)' }}>
              {isEn
                ? 'Two-tier verification by licensed practicing valuers and Valuation Council before final certification.'
                : 'Kiểm soát 2 cấp độc lập giữa Thẩm định viên thực hiện và Hội đồng Thẩm định giá trước khi ký phát hành chứng thư.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.2rem' }}>
            {[
              {
                step: '01',
                title: isEn ? 'Dossier Intake & Legal Audit' : 'Tiếp nhận & Rà soát pháp lý',
                desc: isEn
                  ? 'Audit ownership certificates, technical permits, and define clear appraisal purpose.'
                  : 'Kiểm tra giấy tờ sở hữu, hồ sơ kỹ thuật, xác định mục đích và thời điểm thẩm định.',
              },
              {
                step: '02',
                title: isEn ? 'On-site Survey & Physical Inventory' : 'Khảo sát hiện trạng thực địa',
                desc: isEn
                  ? 'Inspect physical condition, geo-coordinates, wear & tear, operational capacity.'
                  : 'Kiểm tra thực tế tài sản, chụp ảnh ghi nhận, đo đạc thông số kỹ thuật và hao mòn.',
              },
              {
                step: '03',
                title: isEn ? 'Market Research & Verification' : 'Thu thập dữ liệu thị trường',
                desc: isEn
                  ? 'Cross-reference secondary transactions, cash flow metrics, and regulatory indices.'
                  : 'Xác minh giao dịch tương đồng, phân tích cung cầu khu vực và số liệu tài chính.',
              },
              {
                step: '04',
                title: isEn ? 'Modeling & Draft Report' : 'Áp dụng phương pháp & Dự thảo',
                desc: isEn
                  ? 'Apply certified mathematical valuation algorithms compliant with MoF circulars.'
                  : 'Tính toán theo tiêu chuẩn thẩm định giá, lập dự thảo báo cáo và giải trình kết quả.',
              },
              {
                step: '05',
                title: isEn ? 'Two-Tier Audit & Certificate' : 'Kiểm soát nội bộ & Phát hành',
                desc: isEn
                  ? 'Council review, serial number registration, QR verification, and final delivery.'
                  : 'Hội đồng thẩm định phê duyệt, cấp số chứng thư, tạo mã QR tra cứu và bàn giao.',
              },
            ].map((st) => (
              <div
                key={st.step}
                style={{
                  background: 'var(--c-page, #f6f5f2)',
                  border: '1px solid var(--c-border, #e2e0da)',
                  borderRadius: '12px',
                  padding: '1.4rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.8rem',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    color: 'var(--c-accent, #d94f0a)',
                    lineHeight: 1,
                  }}
                >
                  {st.step}
                </div>
                <div style={{ fontSize: '.95rem', fontWeight: 700, color: 'var(--c-ink, #16181c)' }}>
                  {st.title}
                </div>
                <div style={{ fontSize: '.83rem', color: 'var(--c-muted, #5f656d)', lineHeight: 1.55 }}>
                  {st.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION (CTA) SECTION */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 6rem) 0',
          background: 'var(--c-ink, #16181c)',
          color: '#fff',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem, 4vw, 2.5rem)' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '2.5rem',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ maxWidth: '720px' }}>
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '.74rem',
                  fontWeight: 700,
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  color: 'var(--c-accent, #d94f0a)',
                  marginBottom: '.6rem',
                }}
              >
                {isEn ? 'DIRECT CONSULTATION DESK' : 'KẾT NỐI CHUYÊN GIA THẨM ĐỊNH'}
              </span>
              <h2
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: 'clamp(1.8rem, 1.4rem + 1.2vw, 2.6rem)',
                  fontWeight: 700,
                  lineHeight: 1.25,
                  letterSpacing: '-.02em',
                  color: '#fff',
                  margin: '0 0 .8rem',
                }}
              >
                {isEn ? 'Need Valuation for Your Corporate Portfolio?' : 'Cần thẩm định giá cho tài sản của bạn?'}
              </h2>
              <p style={{ margin: 0, fontSize: '1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.65 }}>
                {isEn
                  ? 'Our licensed practicing valuers provide initial methodology scoping, statutory compliance review, and official fee proposals within 24 hours.'
                  : 'Đội ngũ thẩm định viên về giá thẻ hành nghề của MHD sẵn sàng tư vấn sơ bộ về phạm vi, phương pháp và khung pháp lý thẩm định giá tối ưu nhất cho quý khách hàng.'}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '.8rem', minWidth: '280px', flex: '0 0 auto' }}>
              <a
                href="tel:02835153516"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '.6rem',
                  background: 'var(--c-accent, #d94f0a)',
                  color: '#fff',
                  fontSize: '.95rem',
                  fontWeight: 700,
                  padding: '.85rem 1.6rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(217, 79, 10, 0.35)',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Hotline: 028 3515 3516</span>
              </a>

              <Link
                href="/contact#yeu-cau"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '.5rem',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#fff',
                  fontSize: '.9rem',
                  fontWeight: 600,
                  padding: '.8rem 1.6rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  textDecoration: 'none',
                }}
              >
                <span>{isEn ? 'Submit Formal Valuation Request' : 'Gửi yêu cầu thẩm định giá'}</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

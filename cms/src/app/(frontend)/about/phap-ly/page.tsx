import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { getCachedDocumentsList } from '@/lib/cachedQueries'

interface PageProps {
  searchParams?: Promise<{ locale?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = searchParams ? await searchParams : {}
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const locale = (resolvedParams.locale || localeCookie) === 'en' ? 'en' : 'vi'

  if (locale === 'en') {
    return {
      title: 'Legal Credentials & Standards — MHD Valuation',
      description:
        'Official valuation business eligibility certificate by Ministry of Finance Vietnam, Law on Price 2023 compliance, professional valuation standards, and quality governance.',
    }
  }

  return {
    title: 'Hồ sơ Năng lực Pháp lý & Chuẩn mực — MHD Thẩm định giá',
    description:
      'Giấy chứng nhận đủ điều kiện kinh doanh dịch vụ thẩm định giá do Bộ Tài chính cấp, quy định tuân thủ Luật Giá 2023 và hệ thống Chuẩn mực thẩm định giá Việt Nam.',
  }
}

export default async function LegalCredentialsPage({ searchParams }: PageProps) {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const resolvedParams = searchParams ? await searchParams : {}
  const locale = (resolvedParams?.locale || localeCookie) === 'en' ? 'en' : 'vi'
  const isEn = locale === 'en'

  const documentsList = await getCachedDocumentsList(locale as 'vi' | 'en')

  // Filter legal standards / circulars
  const standardDocs = documentsList.filter(
    (d) => d.type === 'standard' || (d.docNumber && d.docNumber.includes('/TT-BTC'))
  )

  const coreLicenses = [
    {
      badge: isEn ? 'Ministry of Finance' : 'Bộ Tài chính cấp',
      title: isEn ? 'Eligibility Certificate' : 'Giấy chứng nhận ĐĐKKD Thẩm định giá',
      sub: isEn ? 'Certificate of Business Eligibility for Valuation Services' : 'Số giấy phép: 000/GCN-BTC',
      desc: isEn
        ? 'Official license certifying MHD fulfills all statutory conditions regarding capital, certified appraiser personnel, and professional quality control systems under Vietnam Law on Price.'
        : 'Chứng nhận MHD đáp ứng đầy đủ điều kiện về số lượng Thẩm định viên về giá đăng ký hành nghề, mức vốn điều lệ thực góp và hệ thống quy chế kiểm soát chất lượng nội bộ.',
      tag: isEn ? 'Active & Valid nationwide' : 'Hiệu lực toàn quốc • Đang hoạt động',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      badge: isEn ? 'DPI HCMC Registration' : 'Sở KH&ĐT TP.HCM cấp',
      title: isEn ? 'Enterprise Registration' : 'Giấy chứng nhận Đăng ký Doanh nghiệp',
      sub: isEn ? 'Business Code / Tax Identification Number' : 'Mã số doanh nghiệp: 031xxxxxxx',
      desc: isEn
        ? 'Independent corporate legal entity authorized for asset appraisal, enterprise valuation, tangible asset valuation, and investment project feasibility studies.'
        : 'Pháp nhân hoạt động độc lập, có chức năng thẩm định giá tài sản, thẩm định giá trị doanh nghiệp, bất động sản, dự án đầu tư và nghiên cứu khả thi tài chính.',
      tag: isEn ? 'Head Office: Ho Chi Minh City' : 'Trụ sở: TP. Hồ Chí Minh, Việt Nam',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      badge: isEn ? 'Quality Governance' : 'Quy chuẩn kiểm soát',
      title: isEn ? '3-Tier Quality Review Protocol' : 'Kiểm soát Chất lượng 3 Cấp Độc lập',
      sub: isEn ? 'Strict QA/QC before issuance' : 'Quy chế tuân thủ nội bộ',
      desc: isEn
        ? 'Every valuation dossier must undergo three strict verification tiers: Practicing Valuer in charge -> Technical Review Committee -> Managing Director issuance.'
        : 'Mỗi chứng thư và báo cáo thẩm định giá đều qua 3 tầng thẩm tra nghiêm ngặt: Thẩm định viên phụ trách -> Hội đồng chuyên môn kỹ thuật -> Tổng Giám đốc ký phát hành.',
      tag: isEn ? 'Professional Indemnity Insured' : 'Bảo hiểm trách nhiệm nghề nghiệp đầy đủ',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2">
          <path d="M9 12l2 2 4-4M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7z" />
        </svg>
      ),
    },
  ]

  const quickNav = [
    {
      title: isEn ? 'Valuation Process' : 'Quy trình & Tiêu chuẩn',
      desc: isEn ? '6-step standardized workflow applied across all valuation assets.' : 'Quy trình 6 bước chuẩn hóa theo hệ thống Chuẩn mực thẩm định giá Việt Nam.',
      href: '/phap-ly/quy-trinh',
      label: isEn ? 'View Process' : 'Xem quy trình',
    },
    {
      title: isEn ? 'Operating Policies' : 'Chính sách vận hành',
      desc: isEn ? 'Data confidentiality, independence, conflict of interest, and complaint handling.' : 'Nguyên tắc bảo mật dữ liệu, tính độc lập, kiểm soát xung đột lợi ích và phản ánh.',
      href: '/phap-ly/chinh-sach',
      label: isEn ? 'View Policies' : 'Xem chính sách',
    },
    {
      title: isEn ? 'Verify Certificate Online' : 'Tra cứu chứng thư trực tuyến',
      desc: isEn ? 'Instant online verification with official QR code or certificate ID.' : 'Tra cứu số hiệu chứng thư điện tử xác nhận tính hợp lệ tức thời.',
      href: '/phap-ly/tra-cuu',
      label: isEn ? 'Verify Now' : 'Tra cứu ngay',
    },
  ]

  return (
    <main style={{ minHeight: '100vh', background: 'var(--c-page, #f6f5f2)', color: 'var(--c-ink, #16181c)' }}>
      {/* 1. HERO SECTION */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--c-page, #f6f5f2)',
          borderBottom: '1px solid var(--c-border, #e2e0da)',
          padding: 'clamp(3.5rem, 7vw, 5.5rem) clamp(1rem, 4vw, 2.5rem) clamp(3rem, 6vw, 4.5rem)',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundImage:
              'linear-gradient(rgba(22,24,28,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(22,24,28,.05) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'linear-gradient(100deg, transparent 0%, #000 50%, #000 75%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(100deg, transparent 0%, #000 50%, #000 75%, transparent 100%)',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-10%',
            top: '-40%',
            width: 620,
            height: 620,
            borderRadius: '50%',
            pointerEvents: 'none',
            background: 'radial-gradient(circle, rgba(217,79,10,.12), transparent 65%)',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1240, margin: '0 auto' }}>
          <nav
            aria-label="Breadcrumb"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '.5rem',
              flexWrap: 'wrap',
              fontSize: '.82rem',
              color: 'var(--c-faint, #8a8f96)',
              marginBottom: '1.6rem',
            }}
          >
            <Link href="/" style={{ color: 'var(--c-faint, #8a8f96)', textDecoration: 'none' }}>
              {isEn ? 'Home' : 'Trang chủ'}
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/about" style={{ color: 'var(--c-faint, #8a8f96)', textDecoration: 'none' }}>
              {isEn ? 'About MHD' : 'Về MHD'}
            </Link>
            <span aria-hidden="true">/</span>
            <span style={{ color: 'var(--c-ink, #16181c)', fontWeight: 600 }}>
              {isEn ? 'Legal & Compliance' : 'Năng lực pháp lý'}
            </span>
          </nav>

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
              background: '#fff',
              border: '1px solid var(--c-border, #e2e0da)',
              padding: '.4rem .9rem',
              borderRadius: '999px',
              marginBottom: '1.2rem',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            {isEn ? 'Statutory Eligibility under Vietnam Law on Price' : 'Doanh nghiệp thẩm định giá đủ điều kiện hành nghề'}
          </span>

          <h1
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: 'clamp(2.3rem, 1.5rem + 2.8vw, 3.8rem)',
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: '-.02em',
              maxWidth: '28ch',
              marginBottom: '1.2rem',
            }}
          >
            {isEn ? 'Legal Dossier & Licensing Credentials' : 'Hồ sơ Pháp lý & Năng lực Hành nghề'}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, .95rem + .3vw, 1.15rem)',
              color: 'var(--c-muted, #5f656d)',
              maxWidth: '65ch',
              lineHeight: 1.65,
              marginBottom: '2rem',
            }}
          >
            {isEn
              ? 'MHD Valuation operates with full authorization under the Vietnam Law on Price 2023, certified by the Ministry of Finance with the Certificate of Eligibility for Valuation Services Business.'
              : 'Công ty TNHH Thẩm định giá MHD hoạt động trên cơ sở Giấy chứng nhận đủ điều kiện kinh doanh dịch vụ thẩm định giá do Bộ Tài chính cấp, tuân thủ nghiêm ngặt Luật Giá 2023 và hệ thống Chuẩn mực thẩm định giá Việt Nam.'}
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              href="/phap-ly/tra-cuu"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.5rem',
                padding: '.85rem 1.6rem',
                background: 'var(--c-accent, #d94f0a)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '.92rem',
                borderRadius: '8px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(217,79,10,.25)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              {isEn ? 'Verify Certificate Online' : 'Tra cứu chứng thư trực tuyến'}
            </Link>
            <Link
              href="/phap-ly/quy-trinh"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.5rem',
                padding: '.85rem 1.5rem',
                background: '#fff',
                border: '1px solid var(--c-border, #e2e0da)',
                color: 'var(--c-ink, #16181c)',
                fontWeight: 600,
                fontSize: '.92rem',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              {isEn ? '6-Step Workflow' : 'Quy trình thẩm định giá'}
            </Link>
            <Link
              href="/phap-ly/chinh-sach"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.5rem',
                padding: '.85rem 1.5rem',
                background: '#fff',
                border: '1px solid var(--c-border, #e2e0da)',
                color: 'var(--c-ink, #16181c)',
                fontWeight: 600,
                fontSize: '.92rem',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              {isEn ? 'Operating Policies' : 'Chính sách vận hành'}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. STATUTORY LICENSES & CERTIFICATES */}
      <section style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(3.5rem, 6vw, 5rem) clamp(1rem, 4vw, 2.5rem)' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-accent, #d94f0a)', display: 'block', marginBottom: '.5rem' }}>
            {isEn ? 'Official Credentials' : 'Văn bằng & Giấy phép'}
          </span>
          <h2 style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 'clamp(1.6rem, 1.3rem + 1vw, 2.2rem)', fontWeight: 600 }}>
            {isEn ? 'Government Certifications & Operating Authorizations' : 'Giấy phép và Văn bản Pháp lý Cốt lõi'}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {coreLicenses.map((lic, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                borderRadius: '16px',
                border: '1px solid var(--c-border, #e2e0da)',
                padding: '2.2rem',
                boxShadow: '0 6px 24px rgba(22,24,28,.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'var(--c-page, #f6f5f2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {lic.icon}
                  </div>
                  <div>
                    <span style={{ fontSize: '.74rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--c-faint, #8a8f96)', display: 'block' }}>
                      {lic.badge}
                    </span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.3, marginTop: '.2rem' }}>
                      {lic.title}
                    </h3>
                  </div>
                </div>
                <div style={{ fontSize: '.84rem', fontWeight: 600, color: 'var(--c-accent, #d94f0a)', marginBottom: '.8rem' }}>
                  {lic.sub}
                </div>
                <p style={{ fontSize: '.9rem', color: 'var(--c-muted, #5f656d)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  {lic.desc}
                </p>
              </div>
              <div style={{ padding: '.85rem 1rem', background: 'var(--c-page, #f6f5f2)', borderRadius: '8px', fontSize: '.82rem', fontWeight: 600, color: 'var(--c-ink, #16181c)' }}>
                {lic.tag}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. VIETNAM VALUATION STANDARDS APPLIED (FROM CMS OR CURATED) */}
      <section style={{ background: '#fff', borderTop: '1px solid var(--c-border, #e2e0da)', borderBottom: '1px solid var(--c-border, #e2e0da)', padding: 'clamp(3.5rem, 6vw, 5rem) 0' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(1rem, 4vw, 2.5rem)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div>
              <span style={{ fontSize: '.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-accent, #d94f0a)', display: 'block', marginBottom: '.5rem' }}>
                {isEn ? 'Technical Framework' : 'Chuẩn mực áp dụng'}
              </span>
              <h2 style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 'clamp(1.6rem, 1.3rem + 1vw, 2.2rem)', fontWeight: 600 }}>
                {isEn ? 'Vietnam Valuation Standards & Circulars' : 'Hệ thống Chuẩn mực Thẩm định giá Việt Nam'}
              </h2>
            </div>
            <p style={{ maxWidth: '52ch', fontSize: '.92rem', color: 'var(--c-muted, #5f656d)', lineHeight: 1.6, margin: 0 }}>
              {isEn
                ? 'Promulgated by the Ministry of Finance, providing unified statutory methodology for market, cost, and income valuation approaches.'
                : 'Ban hành bởi Bộ Tài chính, quy định thống nhất về nguyên tắc đạo đức, phương pháp tiếp cận và mẫu biểu hồ sơ chứng thư.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {standardDocs.length > 0 ? (
              standardDocs.map((doc, idx) => (
                <div
                  key={doc.id || idx}
                  style={{
                    background: 'var(--c-page, #f6f5f2)',
                    border: '1px solid var(--c-border, #e2e0da)',
                    borderRadius: '12px',
                    padding: '1.6rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.8rem' }}>
                      <span style={{ fontSize: '.8rem', fontWeight: 700, color: 'var(--c-accent, #d94f0a)' }}>
                        {doc.docNumber || 'BTC'}
                      </span>
                      <span style={{ fontSize: '.76rem', color: 'var(--c-faint, #8a8f96)' }}>
                        {doc.effectiveDate ? new Date(doc.effectiveDate).toLocaleDateString('vi-VN') : '2024'}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '1.02rem', fontWeight: 700, lineHeight: 1.4, marginBottom: '.6rem' }}>
                      {doc.title}
                    </h4>
                    <p style={{ fontSize: '.86rem', color: 'var(--c-muted, #5f656d)', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                      {doc.summary || doc.title}
                    </p>
                  </div>
                  <div style={{ fontSize: '.78rem', color: 'var(--c-faint, #8a8f96)', fontWeight: 600 }}>
                    {doc.issuingAuthority || 'Bộ Tài chính'}
                  </div>
                </div>
              ))
            ) : (
              [
                {
                  code: 'Luật Giá số 16/2023/QH15',
                  date: 'Có hiệu lực từ 01/07/2024',
                  title: 'Luật Giá 2023 (Quốc hội khóa XV)',
                  desc: 'Căn cứ pháp lý cao nhất điều chỉnh hoạt động thẩm định giá, quyền và nghĩa vụ của doanh nghiệp thẩm định giá và thẩm định viên về giá.',
                  auth: 'Quốc hội nước CHXHCN Việt Nam',
                },
                {
                  code: 'Thông tư 30/2024/TT-BTC',
                  date: 'Ban hành 16/05/2024',
                  title: 'Quy tắc đạo đức nghề nghiệp & Chuẩn mực chung',
                  desc: 'Quy định quy tắc đạo đức, tính độc lập, phạm vi công việc, cơ sở giá trị và hồ sơ thẩm định giá.',
                  auth: 'Bộ Tài chính',
                },
                {
                  code: 'Thông tư 31/2024/TT-BTC',
                  date: 'Ban hành 16/05/2024',
                  title: 'Cách tiếp cận từ thị trường, chi phí và thu nhập',
                  desc: 'Quy định 3 phương pháp tiếp cận cốt lõi trong xác định giá trị tài sản thực tế và tài chính.',
                  auth: 'Bộ Tài chính',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--c-page, #f6f5f2)',
                    border: '1px solid var(--c-border, #e2e0da)',
                    borderRadius: '12px',
                    padding: '1.6rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.8rem' }}>
                      <span style={{ fontSize: '.8rem', fontWeight: 700, color: 'var(--c-accent, #d94f0a)' }}>
                        {item.code}
                      </span>
                      <span style={{ fontSize: '.76rem', color: 'var(--c-faint, #8a8f96)' }}>
                        {item.date}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '1.02rem', fontWeight: 700, lineHeight: 1.4, marginBottom: '.6rem' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '.86rem', color: 'var(--c-muted, #5f656d)', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                      {item.desc}
                    </p>
                  </div>
                  <div style={{ fontSize: '.78rem', color: 'var(--c-faint, #8a8f96)', fontWeight: 600 }}>
                    {item.auth}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 4. LINKAGE TO WORKFLOW & POLICIES */}
      <section style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(3.5rem, 6vw, 5rem) clamp(1rem, 4vw, 2.5rem)' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--c-accent, #d94f0a)', display: 'block', marginBottom: '.5rem' }}>
            {isEn ? 'Core Components' : 'Hệ thống đồng bộ'}
          </span>
          <h2 style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 'clamp(1.6rem, 1.3rem + 1vw, 2.2rem)', fontWeight: 600 }}>
            {isEn ? 'Explore Legal Governance Modules' : 'Các Chuyên mục Pháp lý Liên kết'}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {quickNav.map((card, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                borderRadius: '16px',
                border: '1px solid var(--c-border, #e2e0da)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all .25s ease',
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '.6rem' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: '.9rem', color: 'var(--c-muted, #5f656d)', lineHeight: 1.6, marginBottom: '1.8rem' }}>
                  {card.desc}
                </p>
              </div>
              <Link
                href={card.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.4rem',
                  fontSize: '.88rem',
                  fontWeight: 700,
                  color: 'var(--c-accent, #d94f0a)',
                  textDecoration: 'none',
                }}
              >
                <span>{card.label}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section
        style={{
          background: 'var(--c-partner, #23262c)',
          color: '#fff',
          padding: 'clamp(3.5rem, 6vw, 4.5rem) 0',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(1rem, 4vw, 2.5rem)', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ maxWidth: '68ch' }}>
            <span style={{ fontSize: '.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#ff8a50', display: 'block', marginBottom: '.5rem' }}>
              {isEn ? 'Official Company Dossier' : 'Hồ sơ Năng lực Chính thức'}
            </span>
            <h3 style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 'clamp(1.5rem, 1.2rem + 1vw, 2rem)', fontWeight: 600, color: '#fff', lineHeight: 1.25 }}>
              {isEn ? 'Request Full Legal & Capacity Profile Dossier' : 'Yêu cầu Bản Hồ sơ Năng lực (Profile) Đầy đủ'}
            </h3>
            <p style={{ color: 'var(--c-ondark-muted, #b9bcc3)', marginTop: '.5rem', fontSize: '.92rem', lineHeight: 1.6 }}>
              {isEn
                ? 'Receive certified copies of operating licenses, valuer card lists, and audited track record for credit institutions and auditing firms.'
                : 'MHD cung cấp hồ sơ năng lực chi tiết, danh sách trích ngang thẩm định viên đăng ký hành nghề và hồ sơ pháp lý công chứng phục vụ thẩm định hạn mức tín dụng và kiểm toán.'}
            </p>
          </div>
          <Link
            href="/contact"
            style={{
              padding: '.9rem 1.8rem',
              background: 'var(--c-accent, #d94f0a)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '.92rem',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(217,79,10,.35)',
              whiteSpace: 'nowrap',
            }}
          >
            {isEn ? 'Request Full Profile' : 'Yêu cầu nhận Hồ sơ năng lực'}
          </Link>
        </div>
      </section>
    </main>
  )
}

import React from 'react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import ProcessToc from '../quy-trinh/ProcessToc'

interface PageProps {
  searchParams?: Promise<{
    locale?: string
  }>
}

export async function generateMetadata({ searchParams }: PageProps) {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const resolvedParams = searchParams ? await searchParams : {}
  const isEn = (resolvedParams?.locale || localeCookie) === 'en'

  return {
    title: isEn ? 'Policies — MHD Valuation' : 'Chính sách — MHD Thẩm định giá',
    description: isEn
      ? 'Principles applied by MHD regarding data confidentiality, personal data protection, independence, and conflict of interest control.'
      : 'Nguyên tắc MHD áp dụng về bảo mật thông tin, bảo vệ dữ liệu cá nhân, tính độc lập và kiểm soát xung đột lợi ích trong hoạt động thẩm định giá.',
  }
}

export default async function ChinhSachPage({ searchParams }: PageProps) {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const resolvedParams = searchParams ? await searchParams : {}
  const locale = (resolvedParams?.locale || localeCookie) === 'en' ? 'en' : 'vi'
  const isEn = locale === 'en'

  const tocItems = [
    { href: '#bao-mat', label: isEn ? 'Client Confidentiality Policy' : 'Chính sách bảo mật' },
    { href: '#doc-lap', label: isEn ? 'Independence & Objectivity' : 'Tính độc lập & khách quan' },
    { href: '#xung-dot', label: isEn ? 'Conflict of Interest Control' : 'Kiểm soát xung đột lợi ích' },
    { href: '#khieu-nai', label: isEn ? 'Handling Inquiries & Complaints' : 'Xử lý phản ánh & khiếu nại' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--c-page, #f6f5f2)', color: 'var(--c-ink, #16181c)' }}>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--c-page, #f6f5f2)',
          borderBottom: '1px solid var(--c-border, #e2e0da)',
          padding: 'clamp(3.5rem, 7vw, 6rem) clamp(1rem, 4vw, 2.5rem) clamp(3rem, 6vw, 4.5rem)',
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
            <Link href="/" style={{ color: 'var(--c-faint, #8a8f96)' }}>
              {isEn ? 'Home' : 'Trang chủ'}
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/about/phap-ly" style={{ color: 'var(--c-faint, #8a8f96)' }}>
              {isEn ? 'Legal & Standards' : 'Pháp lý'}
            </Link>
            <span aria-hidden="true">/</span>
            <span style={{ color: 'var(--c-ink, #16181c)', fontWeight: 600 }}>
              {isEn ? 'Policies' : 'Chính sách'}
            </span>
          </nav>

          <span
            style={{
              display: 'inline-block',
              fontSize: '.76rem',
              fontWeight: 700,
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              color: 'var(--c-accent, #d94f0a)',
              marginBottom: '.8rem',
            }}
          >
            {isEn ? 'Operating Principles' : 'Nguyên tắc vận hành'}
          </span>
          <h1
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(2.3rem, 1.5rem + 2.9vw, 3.8rem)',
              lineHeight: 1.15,
              letterSpacing: '-.02em',
              marginBottom: '1.1rem',
            }}
          >
            {isEn ? 'Policies & Governance' : 'Chính sách'}
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, .95rem + .3vw, 1.15rem)',
              color: 'var(--c-muted, #5f656d)',
              maxWidth: '62ch',
              lineHeight: 1.6,
            }}
          >
            {isEn
              ? 'Principles applied by MHD regarding data confidentiality, personal data protection, independence, and conflict of interest control.'
              : 'Nguyên tắc MHD áp dụng về bảo mật thông tin, bảo vệ dữ liệu cá nhân, tính độc lập và kiểm soát xung đột lợi ích trong hoạt động thẩm định giá.'}
          </p>
        </div>
      </section>

      {/* Main Content with Sticky TOC Navigation */}
      <section style={{ background: '#fff', padding: 'clamp(3rem, 5vw, 4.5rem) 0 clamp(4rem, 6vw, 6rem)' }}>
        <div
          style={{
            maxWidth: 1240,
            margin: '0 auto',
            padding: '0 clamp(1rem, 4vw, 2.5rem)',
            display: 'grid',
            gridTemplateColumns: '220px minmax(0, 1fr)',
            gap: 'clamp(3rem, 6vw, 6rem)',
            alignItems: 'start',
          }}
        >
          {/* Left Sticky Sidebar (MỤC LỤC) with Active indicator bar & scroll spy */}
          <ProcessToc items={tocItems} title={isEn ? 'TABLE OF CONTENTS' : 'MỤC LỤC'} />

          {/* Detailed Content */}
          <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {/* 01: Chính sách bảo mật */}
            <section
              id="bao-mat"
              style={{ scrollMarginTop: 100, padding: '0 0 2.4rem', borderBottom: '1px solid var(--c-border, #e2e0da)' }}
            >
              <span style={{ display: 'block', fontSize: '.78rem', fontWeight: 700, color: 'var(--c-accent, #d94f0a)', marginBottom: '.5rem' }}>
                01
              </span>
              <h2 style={{ fontSize: 'clamp(1.3rem, 1.15rem + .5vw, 1.6rem)', fontWeight: 700, lineHeight: 1.3, marginBottom: '1rem' }}>
                {isEn ? 'Client Confidentiality Policy' : 'Chính sách bảo mật thông tin'}
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--c-muted2, #3f444b)', marginBottom: '1rem' }}>
                {isEn
                  ? 'All financial statements, asset documents, contracts, and internal information provided by clients are maintained under strict confidentiality per professional codes of ethics and contractual Non-Disclosure Agreements (NDAs).'
                  : 'Mọi thông tin tài chính, hồ sơ tài sản, hợp đồng và dữ liệu nội bộ do khách hàng cung cấp đều được bảo mật tuyệt đối theo Quy tắc đạo đức nghề nghiệp thẩm định giá và thỏa thuận bảo mật (NDA).'}
              </p>
              <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--c-muted2, #3f444b)' }}>
                {isEn
                  ? 'Information is only provided to competent state authorities when officially mandated by law.'
                  : 'MHD chỉ cung cấp thông tin cho cơ quan quản lý nhà nước có thẩm quyền khi có yêu cầu bằng văn bản theo đúng quy định của pháp luật.'}
              </p>
            </section>

            {/* 02: Tính độc lập & khách quan */}
            <section
              id="doc-lap"
              style={{ scrollMarginTop: 100, padding: '2.4rem 0', borderBottom: '1px solid var(--c-border, #e2e0da)' }}
            >
              <span style={{ display: 'block', fontSize: '.78rem', fontWeight: 700, color: 'var(--c-accent, #d94f0a)', marginBottom: '.5rem' }}>
                02
              </span>
              <h2 style={{ fontSize: 'clamp(1.3rem, 1.15rem + .5vw, 1.6rem)', fontWeight: 700, lineHeight: 1.3, marginBottom: '1rem' }}>
                {isEn ? 'Independence & Objectivity Principles' : 'Tính độc lập & khách quan'}
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--c-muted2, #3f444b)', marginBottom: '1rem' }}>
                {isEn
                  ? 'MHD operates as an independent valuation entity. Appraisers are prohibited from having personal economic interests or family ties with the evaluated assets or clients.'
                  : 'MHD hoạt động hoàn toàn độc lập với các bên tham gia giao dịch. Thẩm định viên không được có lợi ích kinh tế hoặc quan hệ gia đình trực tiếp với tài sản hoặc chủ sở hữu tài sản được thẩm định.'}
              </p>
            </section>

            {/* 03: Kiểm soát xung đột lợi ích */}
            <section
              id="xung-dot"
              style={{ scrollMarginTop: 100, padding: '2.4rem 0', borderBottom: '1px solid var(--c-border, #e2e0da)' }}
            >
              <span style={{ display: 'block', fontSize: '.78rem', fontWeight: 700, color: 'var(--c-accent, #d94f0a)', marginBottom: '.5rem' }}>
                03
              </span>
              <h2 style={{ fontSize: 'clamp(1.3rem, 1.15rem + .5vw, 1.6rem)', fontWeight: 700, lineHeight: 1.3, marginBottom: '1rem' }}>
                {isEn ? 'Conflict of Interest Control' : 'Kiểm soát xung đột lợi ích'}
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--c-muted2, #3f444b)', marginBottom: '1rem' }}>
                {isEn
                  ? 'Prior to accepting any engagement, MHD appraisers execute an internal conflict-of-interest disclosure to ensure zero bias.'
                  : 'Trước khi tiếp nhận hồ sơ, thẩm định viên phụ trách phải ký cam kết không có xung đột lợi ích. Nếu phát hiện xung đột phát sinh, MHD sẽ ngay lập tức thay đổi nhân sự phụ trách.'}
              </p>
            </section>

            {/* 04: Xử lý phản ánh & khiếu nại */}
            <section
              id="khieu-nai"
              style={{ scrollMarginTop: 100, padding: '2.4rem 0' }}
            >
              <span style={{ display: 'block', fontSize: '.78rem', fontWeight: 700, color: 'var(--c-accent, #d94f0a)', marginBottom: '.5rem' }}>
                04
              </span>
              <h2 style={{ fontSize: 'clamp(1.3rem, 1.15rem + .5vw, 1.6rem)', fontWeight: 700, lineHeight: 1.3, marginBottom: '1rem' }}>
                {isEn ? 'Handling Inquiries & Complaints' : 'Xử lý phản ánh & khiếu nại'}
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--c-muted2, #3f444b)', marginBottom: '1rem' }}>
                {isEn ? (
                  <>
                    Clients and partners may submit feedback regarding service quality or appraiser conduct directly to{' '}
                    <a href="mailto:phapche@mhd.com.vn" style={{ color: 'var(--c-accent, #d94f0a)', fontWeight: 600 }}>
                      phapche@mhd.com.vn
                    </a>{' '}
                    or hotline{' '}
                    <a href="tel:1900000000" style={{ color: 'var(--c-accent, #d94f0a)', fontWeight: 600 }}>
                      1900 000 000
                    </a>.
                  </>
                ) : (
                  <>
                    Khách hàng và đối tác có thể gửi phản ánh về chất lượng dịch vụ hoặc hành vi của nhân sự MHD qua email{' '}
                    <a href="mailto:phapche@mhd.com.vn" style={{ color: 'var(--c-accent, #d94f0a)', fontWeight: 600 }}>
                      phapche@mhd.com.vn
                    </a>{' '}
                    hoặc hotline{' '}
                    <a href="tel:1900000000" style={{ color: 'var(--c-accent, #d94f0a)', fontWeight: 600 }}>
                      1900 000 000
                    </a>.
                  </>
                )}
              </p>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--c-muted2, #3f444b)' }}>
                {isEn
                  ? 'All inquiries are logged, independently reviewed, and responded to in writing within 5 business days.'
                  : 'Mọi phản ánh được ghi nhận, xác minh độc lập và phản hồi bằng văn bản trong vòng 5 ngày làm việc.'}
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}

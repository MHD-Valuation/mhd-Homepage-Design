import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { getCachedPartnersList } from '@/lib/cachedQueries'
import PartnersSection from '@/components/PartnersSection'

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
      title: 'Partners & Clients — MHD Valuation',
      description:
        'Commercial banks, top corporate developers, Big 4 audit firms, and financial institutions working with MHD Valuation.',
    }
  }

  return {
    title: 'Đối tác & Khách hàng — MHD Thẩm định giá',
    description:
      'Hệ thống ngân hàng thương mại, tập đoàn bất động sản hàng đầu, công ty kiểm toán Big 4 và các tổ chức tín dụng hợp tác cùng MHD Thẩm định giá.',
  }
}

export default async function PartnersPage({ searchParams }: PageProps) {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const resolvedParams = searchParams ? await searchParams : {}
  const locale = (resolvedParams?.locale || localeCookie) === 'en' ? 'en' : 'vi'
  const isEn = locale === 'en'

  const partnersList = await getCachedPartnersList(locale)

  return (
    <main style={{ background: 'var(--c-page, #f6f5f2)', color: 'var(--c-ink, #16181c)' }}>
      {/* 1. HERO SECTION */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--c-page, #f6f5f2)',
          padding: 'clamp(3rem, 6vw, 5rem) 0 3rem',
          borderBottom: '1px solid var(--c-border, #e2e0da)',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem, 4vw, 2.5rem)' }}>
          <nav
            aria-label="Breadcrumb"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '.5rem',
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
              {isEn ? 'Partners & Clients' : 'Đối tác & khách hàng'}
            </span>
          </nav>

          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '.5rem',
              fontSize: '.72rem',
              fontWeight: 700,
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              color: 'var(--c-accent, #d94f0a)',
              border: '1px solid var(--c-border, #e2e0da)',
              background: '#fff',
              padding: '.45rem .95rem',
              borderRadius: '999px',
              marginBottom: '1.2rem',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            {isEn ? 'Trusted by Leading Financial & Enterprise Groups' : 'Mạng lưới Đối tác & Khách hàng'}
          </span>

          <h1
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: 'clamp(2.2rem, 1.4rem + 2.6vw, 3.6rem)',
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: '-.02em',
              maxWidth: '24ch',
              marginBottom: '1.2rem',
            }}
          >
            {isEn ? 'Organizations Partnering with MHD' : 'Đối tác & Khách hàng Đồng hành cùng MHD'}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, .95rem + .3vw, 1.15rem)',
              color: 'var(--c-muted, #5f656d)',
              maxWidth: '58ch',
              lineHeight: 1.65,
              marginBottom: '2rem',
            }}
          >
            {isEn
              ? 'MHD Valuation is proud to be a trusted valuation partner for Tier-1 commercial banks, premier property developers, Big 4 international audit firms, and leading corporations throughout Vietnam.'
              : 'MHD vinh dự là đơn vị thẩm định giá độc lập được lựa chọn bởi hệ thống ngân hàng thương mại, tập đoàn bất động sản hàng đầu, các tổ chức kiểm toán quốc tế và cơ quan quản lý Nhà nước.'}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--c-border, #e2e0da)',
            }}
          >
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--c-ink, #16181c)' }}>15+</div>
              <div style={{ fontSize: '.84rem', color: 'var(--c-muted, #5f656d)' }}>
                {isEn ? 'Commercial Bank Panels' : 'Ngân hàng ký thỏa thuận hợp tác'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--c-ink, #16181c)' }}>500+</div>
              <div style={{ fontSize: '.84rem', color: 'var(--c-muted, #5f656d)' }}>
                {isEn ? 'Corporate Clients Served' : 'Doanh nghiệp & Tập đoàn hợp tác'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--c-ink, #16181c)' }}>100%</div>
              <div style={{ fontSize: '.84rem', color: 'var(--c-muted, #5f656d)' }}>
                {isEn ? 'Big 4 Audit Acceptance' : 'Được Big 4 và Kiểm toán chấp thuận'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REAL VECTOR LOGOS SECTION */}
      <section style={{ padding: '2rem 0' }}>
        <PartnersSection
          data={{
            badge: isEn ? 'ACCREDITED PARTNERS' : 'DANH MỤC ĐỐI TÁC',
            heading: isEn ? 'Strategic Partners & Major Clients' : 'Các Tổ chức Hợp tác Tiêu biểu',
            description: isEn
              ? 'Our valuation certificates and advisory opinions are accredited across banking risk committees, investment boards, and statutory audit audits.'
              : 'Chứng thư và báo cáo thẩm định giá của MHD được công nhận và sử dụng rộng rãi bởi các ban thẩm định rủi ro tín dụng và hội đồng quản trị.',
          }}
          partners={partnersList}
          currentLocale={locale}
        />
      </section>

      {/* 3. PARTNERSHIP CRITERIA */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2.5rem)' }}>
        <h2 style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: '1.8rem', fontWeight: 600, marginBottom: '2rem' }}>
          {isEn ? 'Why Leading Institutions Trust MHD' : 'Cơ sở tín nhiệm của các Định chế lớn với MHD'}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '14px', border: '1px solid var(--c-border, #e2e0da)' }}>
            <span style={{ fontSize: '.8rem', fontWeight: 700, color: 'var(--c-accent, #d94f0a)' }}>01</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '.6rem 0' }}>
              {isEn ? 'Regulatory Compliance' : 'Tuân thủ pháp lý cao nhất'}
            </h3>
            <p style={{ fontSize: '.9rem', color: 'var(--c-muted, #5f656d)', lineHeight: 1.6 }}>
              {isEn
                ? 'Strict adherence to Vietnam Price Law 2023 and Ministry of Finance valuation standards ensure all dossiers are legally sound.'
                : '100% hồ sơ thẩm định giá được lập trên cơ sở Luật Giá 2023 và hệ thống Chuẩn mực thẩm định giá Việt Nam ban hành bởi Bộ Tài chính.'}
            </p>
          </div>

          <div style={{ background: '#fff', padding: '2rem', borderRadius: '14px', border: '1px solid var(--c-border, #e2e0da)' }}>
            <span style={{ fontSize: '.8rem', fontWeight: 700, color: 'var(--c-accent, #d94f0a)' }}>02</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '.6rem 0' }}>
              {isEn ? 'Independent Data & Evidence' : 'Dữ liệu độc lập & Đa nguồn'}
            </h3>
            <p style={{ fontSize: '.9rem', color: 'var(--c-muted, #5f656d)', lineHeight: 1.6 }}>
              {isEn
                ? 'Robust database of verified market transactions and clear methodologies withstand comprehensive audit checks.'
                : 'Hệ thống cơ sở dữ liệu giao dịch thị trường thực tế kết hợp phương pháp luận chặt chẽ, sẵn sàng giải trình trước mọi đoàn kiểm toán.'}
            </p>
          </div>

          <div style={{ background: '#fff', padding: '2rem', borderRadius: '14px', border: '1px solid var(--c-border, #e2e0da)' }}>
            <span style={{ fontSize: '.8rem', fontWeight: 700, color: 'var(--c-accent, #d94f0a)' }}>03</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '.6rem 0' }}>
              {isEn ? 'Professional Indemnity Insurance' : 'Bảo hiểm trách nhiệm nghề nghiệp'}
            </h3>
            <p style={{ fontSize: '.9rem', color: 'var(--c-muted, #5f656d)', lineHeight: 1.6 }}>
              {isEn
                ? 'Full professional indemnity coverage in accordance with regulations protects client interests on critical financial decisions.'
                : 'MHD duy trì bảo hiểm trách nhiệm nghề nghiệp thẩm định giá theo đúng quy định, bảo vệ tối đa quyền lợi đối tác và khách hàng.'}
            </p>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section
        style={{
          background: 'var(--c-partner, #23262c)',
          color: '#fff',
          padding: '4rem 0',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem, 4vw, 2.5rem)', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: '1.8rem', fontWeight: 600, color: '#fff' }}>
              {isEn ? 'Become a Partner or Request Valuation' : 'Hợp tác định chế hoặc Yêu cầu Thẩm định giá'}
            </h3>
            <p style={{ color: 'var(--c-ondark-muted, #b9bcc3)', marginTop: '.4rem' }}>
              {isEn ? 'Discuss cooperation agreements, bank panel onboarding, or enterprise valuation scopes.' : 'Trao đổi về thỏa thuận hợp tác, gia nhập danh sách nhà thẩm định giá đối tác hoặc báo giá dự án.'}
            </p>
          </div>
          <Link
            href="/contact"
            style={{
              padding: '.9rem 1.8rem',
              background: 'var(--c-accent, #d94f0a)',
              color: '#fff',
              fontWeight: 700,
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            {isEn ? 'Contact Partnership Team' : 'Liên hệ Bộ phận Hợp tác'}
          </Link>
        </div>
      </section>
    </main>
  )
}

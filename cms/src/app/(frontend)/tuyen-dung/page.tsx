import React from 'react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import CareersClient from './CareersClient'

interface CareersPageProps {
  searchParams?: Promise<{
    locale?: string
  }>
}

export async function generateMetadata({ searchParams }: CareersPageProps) {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const resolvedParams = searchParams ? await searchParams : {}
  const isEn = (resolvedParams?.locale || localeCookie) === 'en'

  return {
    title: isEn ? 'Careers — MHD Valuation' : 'Tuyển dụng — MHD Thẩm định giá',
    description: isEn
      ? 'Current job openings at MHD Valuation offices nationwide. View job descriptions, qualifications, and submit applications online.'
      : 'Các vị trí MHD đang tuyển tại từng văn phòng. Chọn vị trí để xem mô tả công việc, yêu cầu và nộp hồ sơ trực tuyến.',
  }
}

export default async function CareersPage({ searchParams }: CareersPageProps) {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const resolvedParams = searchParams ? await searchParams : {}
  const locale = (resolvedParams?.locale || localeCookie) === 'en' ? 'en' : 'vi'
  const isEn = locale === 'en'

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
              fontSize: '.82rem',
              color: 'var(--c-faint, #8a8f96)',
              marginBottom: '1.6rem',
            }}
          >
            <Link href="/" style={{ color: 'var(--c-faint, #8a8f96)' }}>
              {isEn ? 'Home' : 'Trang chủ'}
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/about" style={{ color: 'var(--c-faint, #8a8f96)' }}>
              {isEn ? 'About MHD' : 'Về MHD'}
            </Link>
            <span aria-hidden="true">/</span>
            <span style={{ color: 'var(--c-ink, #16181c)', fontWeight: 600 }}>
              {isEn ? 'Careers' : 'Tuyển dụng'}
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
            {isEn ? 'Career Opportunities' : 'Cơ hội nghề nghiệp'}
          </span>
          <h1
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(2.4rem, 1.6rem + 3vw, 4rem)',
              lineHeight: 1.15,
              letterSpacing: '-.02em',
              marginBottom: '1.1rem',
            }}
          >
            {isEn ? 'Join the MHD Valuation Team' : 'Tuyển dụng MHD'}
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, .95rem + .3vw, 1.15rem)',
              color: 'var(--c-muted, #5f656d)',
              maxWidth: '58ch',
              lineHeight: 1.6,
            }}
          >
            {isEn
              ? 'Positions available across MHD offices in HCMC, Hanoi, Da Nang, and Can Tho. Select an opening to review requirements and apply directly.'
              : 'Các vị trí MHD đang tuyển tại từng văn phòng. Chọn vị trí để xem mô tả công việc, yêu cầu và nộp hồ sơ trực tuyến.'}
          </p>
        </div>
      </section>

      {/* Interactive Careers List & Form */}
      <CareersClient currentLocale={locale} />
    </div>
  )
}

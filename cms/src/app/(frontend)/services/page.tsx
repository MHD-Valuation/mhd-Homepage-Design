import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { SERVICES_CATALOG, getServiceCatalog } from '@/lib/services-data'

export const metadata: Metadata = {
  title: 'Dịch vụ Thẩm định giá — MHD Valuation',
  description:
    'Hệ thống giải pháp thẩm định giá chuyên sâu cho doanh nghiệp, bất động sản, máy móc thiết bị, tài sản vô hình và dự án đầu tư theo Chuẩn mực thẩm định giá Việt Nam.',
}

export default async function ServicesHubPage() {
  const cookieStore = await cookies()
  const locale = cookieStore.get('mhd_locale')?.value === 'en' ? 'en' : 'vi'
  const isEn = locale === 'en'

  const services = Object.values(getServiceCatalog(locale))

  return (
    <main style={{ background: 'var(--c-page, #f6f5f2)', minHeight: '100vh', color: 'var(--c-ink, #16181c)' }}>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 2.5rem) clamp(2.5rem, 5vw, 4rem)',
          borderBottom: '1px solid var(--c-border, #e2e0da)',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <nav
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
            <span>/</span>
            <span style={{ color: 'var(--c-ink, #16181c)', fontWeight: 600 }}>
              {isEn ? 'Services' : 'Dịch vụ Thẩm định giá'}
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
              border: '1px solid var(--c-border, #e2e0da)',
              background: '#fff',
              padding: '.4rem .9rem',
              borderRadius: '999px',
              marginBottom: '1.2rem',
            }}
          >
            {isEn ? 'Comprehensive Valuation Solutions' : 'Danh mục Dịch vụ Chuyên sâu'}
          </span>

          <h1
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: 'clamp(2.2rem, 1.5rem + 2.5vw, 3.6rem)',
              fontWeight: 700,
              lineHeight: 1.18,
              letterSpacing: '-.025em',
              marginBottom: '1rem',
            }}
          >
            {isEn ? 'Valuation Services by Asset Class' : 'Dịch vụ theo từng nhóm tài sản'}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, .95rem + .3vw, 1.15rem)',
              color: 'var(--c-muted, #5f656d)',
              maxWidth: '65ch',
              lineHeight: 1.6,
            }}
          >
            {isEn
              ? 'Independent appraisal services compliant with Vietnam Valuation Standards and Law on Price 2023. Tailored for corporate transactions, financial collateral, and statutory reporting.'
              : 'Phạm vi công việc và phương pháp tiếp cận được xác định chuẩn xác theo từng loại tài sản, mục đích thẩm định và Chuẩn mực thẩm định giá Việt Nam.'}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: 'clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 2.5rem)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '2rem',
          }}
        >
          {services.map((s) => (
            <article
              key={s.slug}
              style={{
                background: '#fff',
                borderRadius: '14px',
                border: '1px solid var(--c-border, #e2e0da)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 2px 10px rgba(22, 24, 28, 0.03)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                  <span
                    style={{
                      fontSize: '.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      padding: '.35rem .75rem',
                      borderRadius: '6px',
                      background: 'rgba(217, 79, 10, 0.08)',
                      color: 'var(--c-accent, #d94f0a)',
                      border: '1px solid rgba(217, 79, 10, 0.18)',
                    }}
                  >
                    {s.menu}
                  </span>
                  <span style={{ fontSize: '.8rem', color: 'var(--c-faint, #8a8f96)', fontWeight: 600 }}>
                    MHD Standard
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    lineHeight: 1.4,
                    color: 'var(--c-ink, #16181c)',
                    marginBottom: '.85rem',
                  }}
                >
                  <Link href={`/services/${s.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {s.title}
                  </Link>
                </h2>

                <p style={{ fontSize: '.92rem', color: 'var(--c-muted, #5f656d)', lineHeight: 1.6, marginBottom: '1.4rem' }}>
                  {s.sub}
                </p>

                {s.hl && s.hl.length > 0 && (
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', marginBottom: '1.5rem' }}>
                    {s.hl.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '.6rem', fontSize: '.85rem', color: 'var(--c-muted, #5f656d)' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent, #d94f0a)" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: '3px' }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div style={{ paddingTop: '1.2rem', borderTop: '1px solid var(--c-border, #e2e0da)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link
                  href={`/services/${s.slug}`}
                  style={{
                    fontSize: '.88rem',
                    fontWeight: 700,
                    color: 'var(--c-accent, #d94f0a)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '.35rem',
                  }}
                >
                  {isEn ? 'View detail workflow' : 'Xem quy trình chi tiết'}
                  <span>→</span>
                </Link>
                <Link
                  href="/contact"
                  style={{
                    fontSize: '.82rem',
                    fontWeight: 600,
                    color: 'var(--c-ink, #16181c)',
                    background: '#f6f5f2',
                    padding: '.4rem .8rem',
                    borderRadius: '6px',
                    border: '1px solid var(--c-border, #e2e0da)',
                    textDecoration: 'none',
                  }}
                >
                  {isEn ? 'Quote' : 'Báo phí'}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

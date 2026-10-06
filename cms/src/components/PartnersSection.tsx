'use client'

import React, { useState } from 'react'

interface PartnerItem {
  id?: string | number
  name: string
  logo?: any
  logoSvg?: string | null
  category: 'bank' | 'corporate' | 'audit'
  website?: string | null
  order?: number | null
}

interface PartnersSectionProps {
  data?: any
  partners?: PartnerItem[]
  currentLocale?: string
}

function getPartnerLogo(item: PartnerItem) {
  // Read strictly from user uploaded logo in Payload CMS Media collection
  if (item.logo && typeof item.logo === 'object' && item.logo.url) {
    return { type: 'url' as const, content: item.logo.url }
  }
  if (typeof item.logo === 'string' && (item.logo.startsWith('/api/media/') || item.logo.startsWith('http'))) {
    return { type: 'url' as const, content: item.logo }
  }
  return null
}

export default function PartnersSection({
  data,
  partners = [],
  currentLocale = 'vi',
}: PartnersSectionProps) {
  const isEn = currentLocale === 'en'
  const [activeFilter, setActiveFilter] = useState<'all' | 'bank' | 'corporate' | 'audit'>('all')

  const badge =
    data?.badge || (isEn ? 'PARTNERS & CLIENTS' : 'ĐỐI TÁC & KHÁCH HÀNG')
  const heading =
    data?.heading || (isEn ? 'Organizations Partnering with MHD' : 'Đơn vị đã làm việc cùng MHD')
  const description =
    data?.description ||
    (isEn
      ? 'Commercial banks, corporate groups, and leading financial institutions trust MHD for independent valuation services.'
      : 'Các ngân hàng thương mại, tập đoàn kinh tế và tổ chức tài chính hàng đầu tin tưởng đồng hành cùng MHD.')

  const list = partners || []

  const filtered =
    activeFilter === 'all' ? list : list.filter((p) => p.category === activeFilter)

  const filterTabs = [
    { id: 'all', label: isEn ? 'All Partners' : 'Tất cả đối tác' },
    { id: 'bank', label: isEn ? 'Banks & Credit Institutions' : 'Ngân hàng & TCTD' },
    { id: 'corporate', label: isEn ? 'Corporations & Enterprises' : 'Tập đoàn & Doanh nghiệp' },
    { id: 'audit', label: isEn ? 'Auditing & Funds' : 'Kiểm toán & Quỹ tài chính' },
  ]

  return (
    <section
      id="doi-tac"
      data-screen-label="Đối tác"
      style={{
        background: 'var(--c-page,#f6f5f2)',
        padding: 'clamp(4.5rem, 8vw, 7rem) 0',
        borderBottom: '1px solid var(--c-border,#e2e0da)',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto clamp(2.5rem, 4vw, 3.5rem)' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: '.74rem',
              fontWeight: 700,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              color: 'var(--c-accent,#d94f0a)',
              marginBottom: '.8rem',
            }}
          >
            {badge}
          </span>
          <h2
            style={{
              fontFamily: "'Be Vietnam Pro',sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(1.8rem,1.3rem + 1.3vw,2.6rem)',
              lineHeight: 1.26,
              letterSpacing: '-.015em',
              color: 'var(--c-ink,#16181c)',
              textWrap: 'balance',
            }}
          >
            {heading}
          </h2>
          <p
            style={{
              fontSize: '.98rem',
              color: 'var(--c-muted,#5f656d)',
              marginTop: '1rem',
              lineHeight: 1.65,
              textWrap: 'pretty',
            }}
          >
            {description}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '2.5rem',
          }}
        >
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id as any)}
                style={{
                  padding: '.55rem 1.15rem',
                  borderRadius: '999px',
                  fontSize: '.84rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  border: isActive ? '1px solid var(--c-accent,#d94f0a)' : '1px solid var(--c-border,#e2e0da)',
                  background: isActive ? 'var(--c-accent,#d94f0a)' : '#ffffff',
                  color: isActive ? '#ffffff' : 'var(--c-muted,#5f656d)',
                  transition: 'all .2s cubic-bezier(.16,1,.3,1)',
                  boxShadow: isActive ? '0 2px 8px rgba(217,79,10,.25)' : 'none',
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Partner Logos Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 220px), 1fr))',
            gap: '1.2rem',
          }}
        >
          {filtered.map((item, idx) => {
            const logo = getPartnerLogo(item)

            const content = (
              <div
                style={{
                  height: '100px',
                  borderRadius: '12px',
                  background: '#ffffff',
                  border: '1px solid var(--c-border,#e2e0da)',
                  padding: '1.2rem 1.4rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  transition: 'all .24s cubic-bezier(.16,1,.3,1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                className="partner-card"
              >
                {logo?.type === 'url' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logo.content}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    style={{
                      maxHeight: '44px',
                      maxWidth: '160px',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                      filter: 'grayscale(0.85)',
                      opacity: 0.85,
                      transition: 'all .24s ease',
                    }}
                    className="partner-logo-img"
                  />
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span
                      style={{
                        fontFamily: "'Be Vietnam Pro',sans-serif",
                        fontWeight: 700,
                        fontSize: '1.05rem',
                        letterSpacing: '-.01em',
                        color: 'var(--c-ink,#16181c)',
                        transition: 'color .2s ease',
                      }}
                      className="partner-name-text"
                    >
                      {item.name}
                    </span>
                    <span
                      style={{
                        fontSize: '.72rem',
                        color: 'var(--c-faint,#8a8f96)',
                        marginTop: '3px',
                        textTransform: 'uppercase',
                        letterSpacing: '.04em',
                      }}
                    >
                      {item.category === 'bank'
                        ? isEn
                          ? 'Commercial Bank'
                          : 'Ngân hàng'
                        : item.category === 'corporate'
                        ? isEn
                          ? 'Corporate'
                          : 'Doanh nghiệp'
                        : isEn
                        ? 'Financial / Audit'
                        : 'Kiểm toán / Quỹ'}
                    </span>
                  </div>
                )}
              </div>
            )

            if (item.website) {
              return (
                <a
                  key={item.id || idx}
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  {content}
                </a>
              )
            }

            return <div key={item.id || idx}>{content}</div>
          })}
        </div>
      </div>

      <style jsx global>{`
        .partner-card:hover {
          border-color: var(--c-accent, #d94f0a) !important;
          transform: translateY(-3px);
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
        }
        .partner-card .partner-logo-img,
        .partner-card .partner-inline-svg {
          filter: grayscale(0.85);
          opacity: 0.85;
          transition: all .24s ease;
        }
        .partner-card:hover .partner-logo-img,
        .partner-card:hover .partner-inline-svg {
          filter: grayscale(0) !important;
          opacity: 1 !important;
          transform: scale(1.05);
        }
        .partner-card .partner-inline-svg svg {
          max-height: 44px;
          width: auto;
          max-width: 160px;
        }
        .partner-card:hover .partner-name-text {
          color: var(--c-accent, #d94f0a) !important;
        }
      `}</style>
    </section>
  )
}

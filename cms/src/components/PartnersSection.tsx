'use client'

import React, { useState } from 'react'

interface PartnerItem {
  id?: string | number
  name: string
  logo?: any
  logoSvg?: string | null
  category: 'bank' | 'corporate' | 'public' | 'investor' | 'audit' | string
  website?: string | null
  order?: number | null
}

interface PartnersSectionProps {
  data?: any
  partners?: PartnerItem[]
  currentLocale?: string
}

function cleanMediaUrl(rawUrl?: string | null): string | null {
  if (!rawUrl) return null
  try {
    if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
      const u = new URL(rawUrl)
      if (u.pathname.startsWith('/api/media/') || u.pathname.startsWith('/media/')) {
        return u.pathname
      }
    }
  } catch {}
  return rawUrl
}

function getPartnerLogo(item: PartnerItem) {
  if (!item) return null

  // 1. If logo is an object from Payload Media upload
  if (item.logo && typeof item.logo === 'object') {
    const rawUrl =
      item.logo.url ||
      item.logo.sizes?.card?.url ||
      item.logo.sizes?.thumbnail?.url ||
      (item.logo.filename ? `/api/media/file/${item.logo.filename}` : null)

    const cleaned = cleanMediaUrl(rawUrl)
    if (cleaned) {
      return { type: 'url' as const, content: cleaned }
    }
  }

  // 2. If logo is a string
  if (typeof item.logo === 'string' && item.logo.trim()) {
    const trimmed = item.logo.trim()
    const cleaned = cleanMediaUrl(trimmed)
    if (cleaned) {
      if (cleaned.startsWith('/') || cleaned.startsWith('http')) {
        return { type: 'url' as const, content: cleaned }
      }
      return { type: 'url' as const, content: `/api/media/file/${cleaned}` }
    }
  }

  // 3. Fallback SVG
  if (item.logoSvg && item.logoSvg.trim()) {
    const svg = item.logoSvg.trim()
    if (svg.startsWith('/') || svg.startsWith('http')) {
      return { type: 'url' as const, content: svg }
    }
    return { type: 'svg' as const, content: svg }
  }

  return null
}

export default function PartnersSection({
  data,
  partners = [],
  currentLocale = 'vi',
}: PartnersSectionProps) {
  const isEn = currentLocale === 'en'
  const [activeFilter, setActiveFilter] = useState<'bank' | 'corporate' | 'public' | 'investor'>('bank')

  const badge = data?.badge || (isEn ? 'PARTNERS & CLIENTS' : 'ĐỐI TÁC & KHÁCH HÀNG')
  const heading = data?.heading || (isEn ? 'Organizations Working with MHD' : 'Đơn vị đã làm việc cùng MHD')

  // Default partners accurately matching MHD's client roster from credentials
  const defaultPartners: PartnerItem[] = [
    // 1. Ngân hàng & tổ chức tín dụng (bank) - 10 đối tác
    { name: 'Vietcombank', category: 'bank', website: 'https://vietcombank.com.vn' },
    { name: 'Agribank', category: 'bank', website: 'https://agribank.com.vn' },
    { name: 'BIDV', category: 'bank', logo: '/media/logo-bidv-20220426071253.jpg', website: 'https://bidv.com.vn' },
    { name: 'MB Bank', category: 'bank', logo: '/media/Logo_MB_new.png', website: 'https://mbbank.com.vn' },
    { name: 'ACB', category: 'bank', website: 'https://acb.com.vn' },
    { name: 'SHB', category: 'bank', website: 'https://shb.com.vn' },
    { name: 'Sacombank', category: 'bank', website: 'https://sacombank.com.vn' },
    { name: 'HDBank', category: 'bank', website: 'https://hdbank.com.vn' },
    { name: 'KienlongBank', category: 'bank', website: 'https://kienlongbank.com' },
    { name: 'VBSP', category: 'bank', website: 'https://vbsp.org.vn' },

    // 2. Doanh nghiệp (corporate) - 21 đối tác
    { name: 'Hưng Thịnh Corporation', category: 'corporate', website: 'https://hungthinhcorp.com.vn' },
    { name: 'Vạn Phúc Group', category: 'corporate', website: 'https://vanphuc.vn' },
    { name: 'T&T Group', category: 'corporate', website: 'https://ttgroup.com.vn' },
    { name: 'KITA Group', category: 'corporate', website: 'https://kitagroup.com.vn' },
    { name: 'GOTEC LAND', category: 'corporate', website: 'https://gotecland.vn' },
    { name: 'GOTECH', category: 'corporate', website: 'https://gotech.vn' },
    { name: 'Saigontourist', category: 'corporate', website: 'https://saigontourist.com.vn' },
    { name: 'Gạch Men Ý Mỹ', category: 'corporate', website: 'https://ymyceramic.com.vn' },
    { name: 'The Sailing Bay Beach Resort', category: 'corporate', website: 'https://thesailingbay.com' },
    { name: 'DICcons', category: 'corporate', website: 'https://diccons.com.vn' },
    { name: 'Sơn Oseven', category: 'corporate', website: 'https://osevenpaint.com' },
    { name: 'Sơn Sonata', category: 'corporate', website: 'https://sonata.vn' },
    { name: 'Thiên An Corp', category: 'corporate', website: 'https://thienancorp.vn' },
    { name: 'Catherine Denoual Maison', category: 'corporate', website: 'https://catherinedenoual.com' },
    { name: 'Rectorseal', category: 'corporate', website: 'https://rectorseal.com' },
    { name: 'Shimez Engineering', category: 'corporate' },
    { name: 'Wasol', category: 'corporate', website: 'https://wasol-vn.com' },
    { name: 'Nhất Thống', category: 'corporate', website: 'https://nhatthong.com.vn' },
    { name: 'Bình Minh Én', category: 'corporate' },
    { name: 'Đại Phúc Lộc Thọ', category: 'corporate' },
    { name: 'Yeebo', category: 'corporate', website: 'https://yeebo.com.vn' },

    // 3. Khu vực công (public) - 2 đối tác
    { name: 'PV GAS', category: 'public', website: 'https://pvgas.com.vn' },
    { name: 'Petrolimex', category: 'public', website: 'https://petrolimex.com.vn' },

    // 4. Nhà đầu tư (investor) - 3 đối tác
    { name: 'Viet Capital Securities', category: 'investor', website: 'https://vietcap.com.vn' },
    { name: 'Savills', category: 'investor', website: 'https://savills.com.vn' },
    { name: 'JLL', category: 'investor', website: 'https://jll.com.vn' },
  ]

  // Combine props partners with defaults if category matches
  const mergedList = partners && partners.length > 0 ? partners : defaultPartners

  // Map audit category from CMS to investor if needed
  const filtered = mergedList.filter((p) => {
    if (activeFilter === 'investor') {
      return p.category === 'investor' || p.category === 'audit'
    }
    return p.category === activeFilter
  })

  // Ensure minimum items for robust 6-col grid presentation
  const displayItems = filtered.length > 0
    ? filtered
    : defaultPartners.filter((p) => p.category === activeFilter)

  const filterTabs = [
    { id: 'bank', label: isEn ? 'Banks & Credit Institutions' : 'Ngân hàng & tổ chức tín dụng' },
    { id: 'corporate', label: isEn ? 'Corporations & Enterprises' : 'Doanh nghiệp' },
    { id: 'public', label: isEn ? 'Public Sector' : 'Khu vực công' },
    { id: 'investor', label: isEn ? 'Investors & Funds' : 'Nhà đầu tư' },
  ]

  return (
    <div
      style={{
        width: '100%',
        padding: '0.5rem 0',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}>
          <span
            style={{
              display: 'block',
              fontSize: '.74rem',
              fontWeight: 700,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              color: 'var(--c-accent,#d94f0a)',
              marginBottom: '.75rem',
            }}
          >
            {badge}
          </span>
          <h2
            style={{
              fontFamily: "'Be Vietnam Pro',sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1.9rem,1.4rem + 1.4vw,2.6rem)',
              lineHeight: 1.25,
              letterSpacing: '-.02em',
              color: 'var(--c-ink,#16181c)',
              margin: 0,
            }}
          >
            {heading}
          </h2>
        </div>

        {/* Category Underline Filter Tabs (Exact Match with Target Design) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'clamp(1.2rem, 2.8vw, 2.5rem)',
            marginTop: '1.8rem',
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
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '.5rem 0 .4rem',
                  fontSize: '.92rem',
                  fontFamily: 'inherit',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--c-ink, #16181c)' : 'var(--c-muted, #5f656d)',
                  borderBottom: isActive
                    ? '2.5px solid var(--c-accent, #d94f0a)'
                    : '2.5px solid transparent',
                  marginBottom: '-1px',
                  whiteSpace: 'nowrap',
                  transition: 'all .18s ease',
                }}
                className="partner-tab-btn"
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* 6-Column Partner Logos Grid with Dashed Border Cards */}
        <div
          className="mhd-partners-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
            gap: '1rem',
          }}
        >
          {displayItems.map((item, idx) => {
            const logo = getPartnerLogo(item)

            const cardInner = (
              <div
                style={{
                  height: '84px',
                  borderRadius: '8px',
                  background: '#ffffff',
                  border: '1.5px dashed var(--c-border, #d2cfc8)',
                  padding: '.75rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  transition: 'all .22s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
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
                      maxWidth: '120px',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                      filter: 'none',
                      opacity: 1,
                      transition: 'transform .22s ease',
                    }}
                    className="partner-logo-img"
                  />
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '.35rem',
                      width: '100%',
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#8a8f96"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span
                      style={{
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        fontWeight: 600,
                        fontSize: '.78rem',
                        color: 'var(--c-ink, #16181c)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '120px',
                        lineHeight: 1.2,
                      }}
                      className="partner-name-text"
                    >
                      {item.name}
                    </span>
                  </div>
                )}
              </div>
            )

            if (item.website) {
              return (
                <a
                  key={item.id || `${item.name}-${idx}`}
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', display: 'block' }}
                  title={item.name}
                >
                  {cardInner}
                </a>
              )
            }

            return (
              <div key={item.id || `${item.name}-${idx}`} title={item.name}>
                {cardInner}
              </div>
            )
          })}
        </div>
      </div>

      <style jsx global>{`
        .partner-tab-btn:hover {
          color: var(--c-ink, #16181c) !important;
        }
        .partner-card:hover {
          border-color: var(--c-accent, #d94f0a) !important;
          border-style: solid !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.06) !important;
        }
        .partner-card .partner-logo-img {
          filter: none !important;
          opacity: 1 !important;
        }
        .partner-card:hover .partner-logo-img {
          transform: scale(1.04);
        }
        .partner-card:hover .partner-name-text {
          color: var(--c-accent, #d94f0a) !important;
        }
        @media (max-width: 1024px) {
          .mhd-partners-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 768px) {
          .mhd-partners-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 480px) {
          .mhd-partners-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
      `}</style>
    </div>
  )
}

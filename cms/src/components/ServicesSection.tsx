import React from 'react'
import { cleanNavHref } from '@/lib/cleanUrl'

interface ServicesSectionProps {
  data?: any
  servicesList?: any[]
  currentLocale?: string
}

export default function ServicesSection({ data, servicesList = [], currentLocale = 'vi' }: ServicesSectionProps) {
  const isEn = currentLocale === 'en'
  const badge = data?.badge || (isEn ? 'Valuation Services' : 'Dịch vụ thẩm định')
  const title = data?.heading || data?.title || (isEn ? 'Valuation Solutions by Asset Class' : 'Dịch vụ theo từng nhóm tài sản')
  const description =
    data?.description ||
    (isEn
      ? 'Scope of work and required documentation are determined based on asset type, purpose, and specific engagement requirements.'
      : 'Phạm vi công việc và hồ sơ cần cung cấp được xác định theo loại tài sản, mục đích và yêu cầu của từng hồ sơ.')

  const viewDetailText = isEn ? 'View details →' : 'Xem chi tiết →'

  const defaultServices = isEn
    ? [
        {
          title: 'Enterprise Valuation',
          shortDescription: 'Determining business enterprise value for M&A, equitization, and capital restructuring.',
          slug: 'Dich-vu-Doanh-nghiep',
          icon: 'building',
        },
        {
          title: 'Real Estate Valuation',
          shortDescription: 'Valuation of land, buildings, and development projects for bank lending or investment.',
          slug: 'Dich-vu-Bat-dong-san',
          icon: 'realestate',
        },
        {
          title: 'Plant, Machinery & Equipment',
          shortDescription: 'Appraisal of production lines, specialized equipment, and commercial vehicles.',
          slug: 'Dich-vu-May-thiet-bi',
          icon: 'machinery',
        },
        {
          title: 'Brand & Intangible Assets',
          shortDescription: 'Valuation of trademarks, patents, proprietary technologies, and intellectual property.',
          slug: 'Dich-vu-Thuong-hieu',
          icon: 'brand',
        },
        {
          title: 'Investment Project Valuation',
          shortDescription: 'Financial feasibility and economic viability analysis per agreed project parameters.',
          slug: 'Dich-vu-Du-an-dau-tu',
          icon: 'project',
        },
        {
          title: 'Financial Proof Valuation',
          shortDescription: 'Asset valuation supporting documentation for overseas study or immigration.',
          slug: 'Dich-vu-Chung-minh-tai-chinh',
          icon: 'finance',
        },
      ]
    : [
        {
          title: 'Thẩm định giá trị doanh nghiệp',
          shortDescription: 'Xác định giá trị doanh nghiệp phục vụ M&A, cổ phần hoá và tái cấu trúc vốn.',
          slug: 'Dich-vu-Doanh-nghiep',
          icon: 'building',
        },
        {
          title: 'Thẩm định giá bất động sản',
          shortDescription: 'Thẩm định giá đất, nhà và công trình phục vụ vay vốn, chuyển nhượng hoặc góp vốn.',
          slug: 'Dich-vu-Bat-dong-san',
          icon: 'realestate',
        },
        {
          title: 'Động sản & máy thiết bị',
          shortDescription: 'Thẩm định giá dây chuyền sản xuất, máy móc và phương tiện vận tải.',
          slug: 'Dich-vu-May-thiet-bi',
          icon: 'machinery',
        },
        {
          title: 'Thương hiệu & tài sản vô hình',
          shortDescription: 'Thẩm định giá thương hiệu, sáng chế và quyền tài sản liên quan đến sở hữu trí tuệ.',
          slug: 'Dich-vu-Thuong-hieu',
          icon: 'brand',
        },
        {
          title: 'Thẩm định dự án đầu tư',
          shortDescription: 'Phân tích hiệu quả và tính khả thi tài chính theo phạm vi công việc đã thỏa thuận.',
          slug: 'Dich-vu-Du-an-dau-tu',
          icon: 'project',
        },
        {
          title: 'Chứng minh tài chính',
          shortDescription: 'Thẩm định giá tài sản phục vụ hồ sơ chứng minh tài chính khi du học hoặc định cư.',
          slug: 'Dich-vu-Chung-minh-tai-chinh',
          icon: 'finance',
        },
      ]

  const itemsToRender = servicesList && servicesList.length > 0 ? servicesList : defaultServices

  const renderServiceIcon = (iconName: string | undefined, idx: number) => {
    const key = iconName || ['building', 'realestate', 'machinery', 'brand', 'project', 'finance'][idx % 6]

    if (key === 'building' || key === 'doanh-nghiep') {
      return (
        <svg width="72" height="56" viewBox="0 0 72 56" fill="none" aria-hidden="true">
          <path d="M4 52h56" stroke="#9aa0a7" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="10" y="14" width="24" height="38" rx="2" fill="#fbf7f3" stroke="#9aa0a7" strokeWidth="1.5" />
          <rect x="34" y="26" width="16" height="26" rx="2" fill="#fff" stroke="#9aa0a7" strokeWidth="1.5" />
          <path d="M16 22h4M24 22h4M16 30h4M24 30h4M16 38h4M24 38h4M39 34h6M39 42h6" stroke="#e2e0da" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M44 18l7-7 5 4 10-10" stroke="#d94f0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M60 5h6v6" stroke="#d94f0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="56" cy="15" r="2" fill="#d94f0a" />
        </svg>
      )
    }

    if (key === 'realestate' || key === 'bat-dong-san') {
      return (
        <svg width="72" height="56" viewBox="0 0 72 56" fill="none" aria-hidden="true">
          <path d="M6 48h60" stroke="#9aa0a7" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M10 48V26l20-14 20 14v22H10z" fill="#fbf7f3" stroke="#9aa0a7" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M30 12l24 16.8V48" stroke="#9aa0a7" strokeWidth="1.5" strokeLinejoin="round" />
          <rect x="23" y="32" width="14" height="16" fill="#fff" stroke="#9aa0a7" strokeWidth="1.5" />
          <circle cx="30" cy="23" r="4.5" stroke="#d94f0a" strokeWidth="1.5" />
          <g style={{ animation: 'mhdPin 3s ease-in-out infinite' }}>
            <path d="M52 14c0 5-6 12-6 12s-6-7-6-12a6 6 0 1112 0z" fill="#fff" stroke="#d94f0a" strokeWidth="1.6" />
            <circle cx="46" cy="14" r="2" fill="#d94f0a" />
          </g>
        </svg>
      )
    }

    if (key === 'machinery' || key === 'may-thiet-bi') {
      return (
        <svg width="72" height="56" viewBox="0 0 72 56" fill="none" aria-hidden="true">
          <path d="M6 50h60" stroke="#9aa0a7" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="8" y="26" width="34" height="24" rx="2" fill="#fbf7f3" stroke="#9aa0a7" strokeWidth="1.5" />
          <path d="M14 26v-8h10v8M30 26v-4h6v4" stroke="#9aa0a7" strokeWidth="1.5" />
          <line x1="8" y1="36" x2="42" y2="36" stroke="#e2e0da" strokeWidth="1.5" />
          <circle cx="16" cy="43" r="3" fill="#e2e0da" />
          <circle cx="34" cy="43" r="3" fill="#e2e0da" />
          <g style={{ transformOrigin: '50px 20px', animation: 'mhdSpin 12s linear infinite' }}>
            <circle cx="50" cy="20" r="11" fill="#fff" stroke="#d94f0a" strokeWidth="1.6" />
            <circle cx="50" cy="20" r="4" fill="#fbf7f3" stroke="#d94f0a" strokeWidth="1.4" />
            <path d="M50 7v4M50 29v4M37 20h4M59 20h4M41 11l3 3M56 26l3 3M41 29l3-3M56 14l3-3" stroke="#d94f0a" strokeWidth="1.6" strokeLinecap="round" />
          </g>
        </svg>
      )
    }

    if (key === 'brand' || key === 'thuong-hieu') {
      return (
        <svg width="72" height="56" viewBox="0 0 72 56" fill="none" aria-hidden="true">
          <circle cx="36" cy="22" r="16" fill="#fbf7f3" stroke="#9aa0a7" strokeWidth="1.5" />
          <circle cx="36" cy="22" r="11" fill="#fff" stroke="#d94f0a" strokeWidth="1.6" />
          <path d="M30 35l-5 15 11-5 11 5-5-15" fill="#fbf7f3" stroke="#9aa0a7" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M36 15l2 4.5 4.8.4-3.6 3.2 1.1 4.7-4.3-2.5-4.3 2.5 1.1-4.7-3.6-3.2 4.8-.4z" fill="#d94f0a" />
          <path d="M12 18c3-6 9-10 16-11" stroke="#d94f0a" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="3 3" style={{ animation: 'mhdDashS 2s linear infinite' }} />
          <path d="M60 26c-1 7-5 13-11 16" stroke="#d94f0a" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="3 3" style={{ animation: 'mhdDashS 2s linear infinite' }} />
        </svg>
      )
    }

    if (key === 'project' || key === 'du-an') {
      return (
        <svg width="72" height="56" viewBox="0 0 72 56" fill="none" aria-hidden="true">
          <path d="M8 50h56" stroke="#9aa0a7" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M14 50V32h10v18M28 50V22h10v28M42 50V14h10v36" stroke="#e2e0da" strokeWidth="1.5" fill="#fbf7f3" />
          <path d="M12 36l16-12 14-8 18-6" stroke="#d94f0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 3" style={{ animation: 'mhdDashS 1.8s linear infinite' }} />
          <circle cx="60" cy="10" r="3.5" fill="#d94f0a" />
          <circle cx="42" cy="16" r="2.5" fill="#fff" stroke="#d94f0a" strokeWidth="1.5" />
          <circle cx="28" cy="24" r="2.5" fill="#fff" stroke="#d94f0a" strokeWidth="1.5" />
        </svg>
      )
    }

    // Default finance
    return (
      <svg width="72" height="56" viewBox="0 0 72 56" fill="none" aria-hidden="true">
        <rect x="8" y="8" width="28" height="42" rx="3" fill="#fbf7f3" stroke="#9aa0a7" strokeWidth="1.5" />
        <circle cx="22" cy="24" r="7.5" stroke="#d94f0a" strokeWidth="1.5" />
        <path d="M14.5 24h15M22 16.5c-3 3.5-3 11.5 0 15M22 16.5c3 3.5 3 11.5 0 15" stroke="#d94f0a" strokeWidth="1.2" />
        <path d="M15 38h14M15 43h9" stroke="#e2e0da" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M38 46c12-2 20-12 22-26" stroke="#d94f0a" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" style={{ animation: 'mhdDashS 1.6s linear infinite reverse' }} />
        <g style={{ animation: 'mhdMagnify 4s ease-in-out infinite' }}>
          <path d="M50 14l17-8-6 18-4.5-5.5z" fill="#fff" stroke="#d94f0a" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M56.5 18.5L67 6" stroke="#d94f0a" strokeWidth="1.3" />
        </g>
      </svg>
    )
  }

  return (
    <section id="services" data-screen-label="Dịch vụ" style={{ background: '#fff', padding: 'clamp(5rem,9vw,8.5rem) 0' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)' }}>
        <div
          data-reveal="0"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '1.5rem',
            flexWrap: 'wrap',
            marginBottom: 'clamp(2.4rem,4vw,3.4rem)',
          }}
        >
          <div>
            <span
              style={{
                display: 'block',
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
                fontSize: 'clamp(1.9rem,1.4rem + 1.4vw,2.7rem)',
                lineHeight: 1.28,
                letterSpacing: '-.012em',
                textWrap: 'balance',
                maxWidth: '20ch',
              }}
            >
              {title}
            </h2>
          </div>
          <p
            style={{
              maxWidth: '50ch',
              color: 'var(--c-muted,#5f656d)',
              fontSize: '.95rem',
              lineHeight: 1.6,
              textWrap: 'pretty',
              paddingBottom: '.35rem',
            }}
          >
            {description}
          </p>
        </div>

        {/* Dynamic Services Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: '1.6rem' }}>
          {itemsToRender.map((s: any, idx: number) => {
            const svcTitle = (s.title || '').replace(/&amp;/g, '&').replace(/&;/g, '&')
            const svcDesc = (s.shortDescription || s.excerpt || s.description || '').replace(/&amp;/g, '&').replace(/&;/g, '&')
            const svcUrl = s.slug ? `/services/${s.slug}` : cleanNavHref(s.url || '#')

            return (
              <a
                key={s.id || idx}
                href={svcUrl}
                data-reveal={idx * 40}
                className="hover-service-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  background: '#fff',
                  border: '1px solid var(--c-border,#e2e0da)',
                  borderRadius: '12px',
                  padding: '1.8rem',
                  color: 'var(--c-ink,#16181c)',
                  position: 'relative',
                  transition: 'all .25s cubic-bezier(.16,1,.3,1)',
                }}
              >
                <div style={{ height: '56px', display: 'flex', alignItems: 'center' }}>
                  {renderServiceIcon(s.icon, idx)}
                </div>
                <h4 style={{ fontSize: '1.08rem', fontWeight: 700, lineHeight: 1.35 }}>{svcTitle}</h4>
                <p style={{ fontSize: '.88rem', color: 'var(--c-muted,#5f656d)', textWrap: 'pretty' }}>
                  {svcDesc}
                </p>
                <span style={{ fontSize: '.84rem', fontWeight: 700, color: 'var(--c-accent,#d94f0a)', marginTop: 'auto' }}>
                  {viewDetailText}
                </span>
              </a>
            )
          })}
        </div>

        {/* Optional Bottom CTA Banner */}
        {(data?.bottomCta?.title || isEn) && (
          <div
            style={{
              marginTop: '3rem',
              padding: '1.8rem 2.2rem',
              borderRadius: '12px',
              background: 'var(--c-page,#f6f5f2)',
              border: '1px solid var(--c-border,#e2e0da)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1.2rem',
            }}
          >
            <span style={{ fontWeight: 600, fontSize: '1.05rem', color: 'var(--c-ink,#16181c)' }}>
              {isEn
                ? (data?.bottomCta?.title && !data.bottomCta.title.includes('Cần tư vấn')
                    ? data.bottomCta.title
                    : 'Need consultation on the right valuation service?')
                : (data?.bottomCta?.title || 'Cần tư vấn loại hình thẩm định phù hợp?')}
            </span>
            <a
              href={cleanNavHref(data?.bottomCta?.buttonUrl || '/contact')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.5rem',
                background: 'var(--c-accent,#d94f0a)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '.88rem',
                padding: '.75rem 1.4rem',
                borderRadius: '6px',
                transition: 'opacity .2s',
              }}
            >
              {isEn
                ? (data?.bottomCta?.buttonText && !data.bottomCta.buttonText.includes('Yêu cầu')
                    ? data.bottomCta.buttonText
                    : 'Request In-depth Consultation →')
                : (data?.bottomCta?.buttonText || 'Yêu cầu tư vấn chuyên sâu →')}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

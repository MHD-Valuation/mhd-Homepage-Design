'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { cleanNavHref } from '@/lib/cleanUrl'

interface TestimonialsAndCtaProps {
  data?: any
  testimonialsData?: any
  currentLocale?: string
}

export default function TestimonialsAndCta({ data, testimonialsData, currentLocale = 'vi' }: TestimonialsAndCtaProps) {
  const isEn = currentLocale === 'en'
  const testiRef = useRef<HTMLDivElement>(null)
  const [testiIdx, setTestiIdx] = useState(0)

  const title = data?.heading || data?.title || (isEn ? 'Submit Valuation Request' : 'Gửi yêu cầu thẩm định')
  const description =
    data?.description ||
    (isEn
      ? 'Submit asset details and valuation purpose. MHD will contact you to confirm engagement scope and required files.'
      : 'Gửi thông tin về tài sản và mục đích thẩm định. MHD sẽ liên hệ để xác nhận phạm vi công việc và hồ sơ cần cung cấp.')
  const ctaUrl = cleanNavHref(data?.buttonUrl || data?.ctaUrl || '/contact')
  const ctaText = data?.buttonLabel || data?.ctaText || (isEn ? 'Submit request' : 'Gửi yêu cầu')

  const defaultReviews = isEn
    ? [
        {
          quote:
            'The valuation report clearly demonstrated methodology and legal grounds. The dossier satisfied our corporate financing requirements with top tier commercial banks.',
          role: 'Chief Financial Officer',
          company: 'Manufacturing Corporation',
          avatar:
            'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/422120dcf3a58ded1e8b0315e9410882420308b3.jpg',
        },
        {
          quote:
            'The QR code verification on certificate made it extraordinarily efficient for our risk credit team to cross-reference issuing parameters.',
          role: 'Head of Credit Appraisal',
          company: 'Commercial Bank',
          avatar:
            'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/881875bfacabc36b995e0222bed5681bbc7b8b54.jpg',
        },
        {
          quote:
            'Brand valuation report detailed assumptions, market metrics, and forecast cash flows. The findings were vital in completing our M&A transaction.',
          role: 'Chief Executive Officer',
          company: 'Technology Group',
          avatar:
            'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/b739f3f18faa0510846354809748a7b644474f2f.jpg',
        },
      ]
    : [
        {
          quote:
            'Báo cáo thẩm định giá trình bày rõ căn cứ và phương pháp. Hồ sơ đáp ứng nhu cầu làm việc của doanh nghiệp với ngân hàng.',
          role: 'Giám đốc Tài chính',
          company: 'Doanh nghiệp sản xuất',
          avatar:
            'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/422120dcf3a58ded1e8b0315e9410882420308b3.jpg',
        },
        {
          quote:
            'Mã QR trên chứng thư giúp bộ phận tín dụng thuận tiện hơn khi đối chiếu thông tin phát hành.',
          role: 'Trưởng phòng Thẩm định tín dụng',
          company: 'Ngân hàng thương mại',
          avatar:
            'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/881875bfacabc36b995e0222bed5681bbc7b8b54.jpg',
        },
        {
          quote:
            'Báo cáo thẩm định giá thương hiệu nêu rõ phương pháp, nguồn thông tin và các giả thiết. Nội dung được sử dụng trong quá trình xem xét thương vụ M&A.',
          role: 'Tổng Giám đốc',
          company: 'Công ty công nghệ',
          avatar:
            'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/b739f3f18faa0510846354809748a7b644474f2f.jpg',
        },
      ]

  const customItems = testimonialsData?.items || data?.items
  const reviews =
    customItems && customItems.length > 0
      ? customItems.map((item: any) => ({
          quote: item.quote,
          role: item.clientTitle || (isEn ? 'Client' : 'Khách hàng'),
          company: item.companyType || (isEn ? 'Enterprise' : 'Doanh nghiệp'),
          avatar:
            item.avatar?.url ||
            'https://pplx-res.cloudinary.com/image/upload/pplx_search_images/422120dcf3a58ded1e8b0315e9410882420308b3.jpg',
        }))
      : defaultReviews

  const total = reviews.length

  const scrollTesti = (dir: number) => {
    const el = testiRef.current
    if (!el) return
    const next = Math.max(0, Math.min(total - 1, testiIdx + dir))
    const w = el.clientWidth + 16
    el.scrollTo({ left: next * w, behavior: 'smooth' })
    setTestiIdx(next)
  }

  const onScroll = () => {
    const el = testiRef.current
    if (!el) return
    const i = Math.round(el.scrollLeft / (el.clientWidth + 16))
    if (i !== testiIdx) setTestiIdx(i)
  }

  return (
    <section
      data-screen-label="CTA"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--c-page,#f6f5f2)',
        padding: 'clamp(7rem,13vw,12rem) 0',
      }}
    >
      <Image
        src="/assets/map-hcm.webp"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
          filter: 'saturate(.55) contrast(.95)',
          opacity: 0.85,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'linear-gradient(180deg,rgba(var(--c-page-rgb,246,245,242),.95) 0%,rgba(var(--c-page-rgb,246,245,242),.35) 25%,rgba(var(--c-page-rgb,246,245,242),.35) 75%,rgba(var(--c-subtle-rgb,238,236,231),.98) 100%)',
        }}
      ></div>
      <div style={{ position: 'relative', maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)' }}>
        <div
          data-reveal="0"
          style={{
            position: 'relative',
            overflow: 'hidden',
            background: 'var(--c-ink,#16181c)',
            color: '#fff',
            borderRadius: '18px',
            padding: 'clamp(2rem,4vw,3.5rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))',
            gap: '2.5rem',
            alignItems: 'center',
            boxShadow: '0 40px 80px rgba(var(--c-ink-rgb,22,24,28),.28)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: '-120px',
              bottom: '-160px',
              width: '460px',
              height: '460px',
              borderRadius: '50%',
              pointerEvents: 'none',
              background: 'radial-gradient(circle,rgba(var(--c-accent-rgb,217,79,10),.35),transparent 65%)',
              filter: 'blur(30px)',
              animation: 'mhdDrift 12s ease-in-out infinite alternate',
            }}
          ></div>
          <div style={{ position: 'relative' }}>
            <h2
              style={{
                fontFamily: "'Be Vietnam Pro',sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(1.7rem,1.3rem + 1.2vw,2.5rem)',
                lineHeight: 1.28,
                letterSpacing: '-.012em',
                textWrap: 'balance',
                maxWidth: '22ch',
                marginBottom: '.8rem',
                color: '#fff',
              }}
            >
              {title}
            </h2>
            <p
              style={{
                color: 'var(--c-ondark-muted,#b9bcc3)',
                fontSize: '.95rem',
                maxWidth: '42ch',
                textWrap: 'pretty',
                marginBottom: '1.8rem',
              }}
            >
              {description}
            </p>
            <a
              href={ctaUrl}
              data-cta-dark="1"
              className="hover-cta-submit"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.5rem',
                background: 'var(--c-accent,#d94f0a)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '.95rem',
                padding: '.95rem 1.7rem',
                borderRadius: '6px',
                transition: 'all .2s cubic-bezier(.16,1,.3,1)',
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z" />
                <path d="M14 3v6h6M9 14l2 2 4-4" />
              </svg>
              {ctaText}
            </a>
          </div>
          <div style={{ position: 'relative', minWidth: 0 }}>
            <div
              ref={testiRef}
              onScroll={onScroll}
              style={{
                display: 'flex',
                gap: '1rem',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none',
                scrollBehavior: 'smooth',
              }}
            >
              {reviews.map((rev: any, idx: number) => (
                <div
                  key={idx}
                  style={{
                    flex: '0 0 100%',
                    scrollSnapAlign: 'start',
                    background: 'rgba(255,255,255,.06)',
                    border: '1px solid rgba(255,255,255,.12)',
                    borderRadius: '12px',
                    padding: '1.6rem',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontSize: '3rem', lineHeight: 0.6, color: 'var(--c-accent,#d94f0a)', marginBottom: '.6rem' }}>
                    “
                  </div>
                  <p
                    style={{
                      fontFamily: "'Be Vietnam Pro',sans-serif",
                      fontStyle: 'italic',
                      fontSize: '1.08rem',
                      lineHeight: 1.5,
                      color: 'var(--c-ondark,#eef0f3)',
                      marginBottom: '1.1rem',
                      textWrap: 'pretty',
                    }}
                  >
                    &quot;{rev.quote}&quot;
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.7rem', fontSize: '.84rem', color: 'var(--c-ondark-muted,#c9ccd2)', marginTop: 'auto' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={rev.avatar}
                      alt={rev.role}
                      width={34}
                      height={34}
                      loading="lazy"
                      style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    {rev.role}, {rev.company}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
              <span style={{ fontSize: '.74rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--c-faint,#9a9fa6)' }}>
                {`0${testiIdx + 1} / 0${total}`}
              </span>
              <div style={{ display: 'flex', gap: '.5rem' }}>
                <button
                  onClick={() => scrollTesti(-1)}
                  aria-label="Nhận xét trước"
                  className="hover-testi-btn"
                  style={{
                    width: '38px',
                    height: '38px',
                    border: '1px solid rgba(255,255,255,.25)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    transition: 'all .2s',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M19 12H5M11 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollTesti(1)}
                  aria-label="Nhận xét tiếp"
                  className="hover-testi-btn"
                  style={{
                    width: '38px',
                    height: '38px',
                    border: '1px solid rgba(255,255,255,.25)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    transition: 'all .2s',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import React from 'react'
import { cleanNavHref } from '@/lib/cleanUrl'

interface WhyUsProps {
  data?: any
  teamMembers?: any[]
  currentLocale?: string
}

export default function WhyUs({ data, teamMembers, currentLocale = 'vi' }: WhyUsProps) {
  const isEn = currentLocale === 'en'
  const badge = data?.badge || (isEn ? 'Why Choose MHD' : 'Vì sao chọn MHD')
  const heading = data?.heading || (isEn ? 'Credentials Demonstrated Through Tangible Records' : 'Năng lực được thể hiện bằng hồ sơ')
  const features = data?.features || []

  const teamTitle = data?.teamCard?.title || (isEn ? 'Certified Appraisers' : 'Thẩm định viên về giá')
  const teamDesc =
    data?.teamCard?.description ||
    (isEn
      ? 'List of certified valuation professionals practicing at MHD, officially updated in compliance with Ministry of Finance announcements.'
      : 'Danh sách thẩm định viên về giá hành nghề tại MHD được cập nhật theo thông báo của Bộ Tài chính.')
  const teamBtnText = data?.teamCard?.buttonText || (isEn ? 'View list →' : 'Xem danh sách →')
  const teamBtnUrl = cleanNavHref(data?.teamCard?.buttonUrl || '/about/doi-ngu')

  // Standard SVGs for the 3 core features
  const defaultFeatures = isEn
    ? [
        {
          title: 'Public Legal Credentials',
          description: 'Certificate of Eligibility for Valuation Services Business is publicly available for lookup and download.',
          iconSvg: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M9 12l2 2 4-4M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7z" />
            </svg>
          ),
        },
        {
          title: 'Certificate Verification',
          description: 'QR codes enable clients and recipient organizations to verify issued information on the MHD system.',
          iconSvg: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M4 19V6a2 2 0 012-2h9l5 5v10a2 2 0 01-2 2H6a2 2 0 01-2-2z" />
              <path d="M14 4v5h5" />
            </svg>
          ),
        },
        {
          title: 'Continuously Updated Market Data',
          description: 'MHD gathers, verifies, and analyzes data tailored to each asset category and valuation objective.',
          iconSvg: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 3v18h18M7 15l4-4 3 3 5-6" />
            </svg>
          ),
        },
      ]
    : [
        {
          title: 'Hồ sơ pháp lý công khai',
          description: 'Giấy chứng nhận đủ điều kiện kinh doanh dịch vụ thẩm định giá được công khai để tra cứu và tải về.',
          iconSvg: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M9 12l2 2 4-4M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7z" />
            </svg>
          ),
        },
        {
          title: 'Tra cứu thông tin chứng thư',
          description: 'Mã QR giúp khách hàng và đơn vị tiếp nhận đối chiếu thông tin phát hành trên hệ thống MHD.',
          iconSvg: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M4 19V6a2 2 0 012-2h9l5 5v10a2 2 0 01-2 2H6a2 2 0 01-2-2z" />
              <path d="M14 4v5h5" />
            </svg>
          ),
        },
        {
          title: 'Thông tin thị trường được cập nhật',
          description: 'MHD thu thập, kiểm tra và phân tích thông tin phù hợp với từng loại tài sản và mục đích thẩm định.',
          iconSvg: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 3v18h18M7 15l4-4 3 3 5-6" />
            </svg>
          ),
        },
      ]

  const activeAppraisers =
    Array.isArray(teamMembers) && teamMembers.length > 0
      ? teamMembers.slice(0, 3).map((m: any) => ({
          name: m.name,
          cardId: m.cardId || (isEn ? 'Certified Appraiser' : 'Thẩm định viên về giá'),
          specialty: m.position || (isEn ? 'Practicing Valuer' : 'Thẩm định viên hành nghề'),
          avatar: m.avatar?.url || (typeof m.avatar === 'string' ? m.avatar : ''),
        }))
      : []

  return (
    <section id="about" data-screen-label="Vì sao chọn MHD" style={{ background: '#fff', padding: 'clamp(5rem,9vw,8.5rem) 0' }}>
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 clamp(1rem,4vw,2.5rem)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))',
          gap: 'clamp(3rem,6vw,6rem)',
          alignItems: 'start',
        }}
      >
        <div data-reveal="0">
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
              marginBottom: '2.2rem',
            }}
          >
            {heading}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
            {features && features.length > 0 ? (
              features.map((feat: any, idx: number) => {
                const iconSvg =
                  defaultFeatures[idx % defaultFeatures.length]?.iconSvg || defaultFeatures[0].iconSvg
                return (
                  <div key={idx} style={{ display: 'flex', gap: '1.2rem' }}>
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        flexShrink: 0,
                        border: '1px solid var(--c-border,#e2e0da)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--c-accent,#d94f0a)',
                        background: 'var(--c-icon,#fbf7f3)',
                      }}
                    >
                      {iconSvg}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '.35rem' }}>{feat.title}</h4>
                      <p style={{ fontSize: '.92rem', color: 'var(--c-muted,#5f656d)', textWrap: 'pretty' }}>
                        {feat.description}
                      </p>
                    </div>
                  </div>
                )
              })
            ) : (
              defaultFeatures.map((feat, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1.2rem' }}>
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      flexShrink: 0,
                      border: '1px solid var(--c-border,#e2e0da)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--c-accent,#d94f0a)',
                      background: 'var(--c-icon,#fbf7f3)',
                    }}
                  >
                    {feat.iconSvg}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '.35rem' }}>{feat.title}</h4>
                    <p style={{ fontSize: '.92rem', color: 'var(--c-muted,#5f656d)', textWrap: 'pretty' }}>
                      {feat.description}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right side: Certified Appraisers Card */}
        <div
          data-reveal="120"
          style={{
            background: 'var(--c-page,#f6f5f2)',
            border: '1px solid var(--c-border,#e2e0da)',
            borderRadius: '14px',
            padding: 'clamp(1.6rem,2.5vw,2.4rem)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(90deg,var(--c-accent,#d94f0a),var(--c-gold,#7d7d7d))',
            }}
          ></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: '1.5rem' }}>
            <span
              style={{
                fontSize: '.64rem',
                fontWeight: 700,
                letterSpacing: '.02em',
                padding: '.35rem .55rem',
                borderRadius: '4px',
                background: '#fff',
                border: '1px solid var(--c-border,#e2e0da)',
                color: 'var(--c-ink,#16181c)',
                whiteSpace: 'nowrap',
              }}
            >
              TT30/2024/TT-BTC
            </span>
            <span
              style={{
                fontSize: '.64rem',
                fontWeight: 700,
                letterSpacing: '.02em',
                padding: '.35rem .55rem',
                borderRadius: '4px',
                background: '#fff',
                border: '1px solid var(--c-border,#e2e0da)',
                color: 'var(--c-ink,#16181c)',
                whiteSpace: 'nowrap',
              }}
            >
              TT31/2024/TT-BTC
            </span>
            <span
              style={{
                fontSize: '.64rem',
                fontWeight: 700,
                letterSpacing: '.02em',
                padding: '.35rem .55rem',
                borderRadius: '4px',
                background: '#fff',
                border: '1px solid var(--c-border,#e2e0da)',
                color: 'var(--c-ink,#16181c)',
                whiteSpace: 'nowrap',
              }}
            >
              TT36/2024/TT-BTC
            </span>
          </div>
          <h3 style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontWeight: 600, fontSize: '1.5rem', marginBottom: '.6rem' }}>
            {teamTitle}
          </h3>
          <p style={{ fontSize: '.9rem', color: 'var(--c-muted,#5f656d)', marginBottom: '1.4rem', textWrap: 'pretty' }}>
            {teamDesc}
          </p>

          {activeAppraisers.map((appraiser, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '.9rem',
                padding: '.9rem 0',
                borderTop: '1px solid var(--c-border,#e2e0da)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {appraiser.avatar ? (
                <img
                  src={appraiser.avatar}
                  alt={appraiser.name}
                  width={42}
                  height={42}
                  loading="lazy"
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                />
              ) : (
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'var(--c-accent-light, #fff5f0)',
                    color: 'var(--c-accent, #d94f0b)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1rem',
                    flexShrink: 0,
                    border: '1px solid rgba(217,79,11,0.2)',
                  }}
                >
                  {appraiser.name?.charAt(0) || 'M'}
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '.88rem', fontWeight: 700, lineHeight: 1.4 }}>
                  {appraiser.name} · <span style={{ whiteSpace: 'nowrap' }}>{appraiser.cardId}</span>
                </div>
                <div style={{ fontSize: '.78rem', color: 'var(--c-muted3,#6b7178)' }}>{appraiser.specialty}</div>
              </div>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#d94f0b"
                strokeWidth="2.2"
                style={{ marginLeft: 'auto', flexShrink: 0 }}
                aria-hidden="true"
              >
                <path d="M9 12l2 2 4-4M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7z" />
              </svg>
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '.9rem', borderTop: '1px solid var(--c-border,#e2e0da)' }}>
            <a
              href={teamBtnUrl}
              className="hover-whyus-link"
              style={{
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.4rem',
                fontSize: '.82rem',
                fontWeight: 700,
                color: 'var(--c-accent,#d94f0a)',
                transition: 'all .2s',
              }}
            >
              {teamBtnText}{' '}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

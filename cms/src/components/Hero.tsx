'use client'

import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { cleanNavHref } from '@/lib/cleanUrl'

interface HeroProps {
  data?: any
  currentLocale?: string
}

export default function Hero({ data, currentLocale = 'vi' }: HeroProps) {
  const isEn = currentLocale === 'en'
  const [statA, setStatA] = useState(isEn ? '5,000+' : '5.000+')
  const [statB, setStatB] = useState('60+')
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const panel = statsRef.current
    if (!panel) return

    const runCounters = () => {
      const t0 = performance.now()
      const dur = 1700
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / dur)
        const e = 1 - Math.pow(1 - p, 3)
        const valA = Math.round(5000 * e)
        const valB = Math.round(60 * e)
        setStatA(isEn ? `${valA.toLocaleString('en-US')}+` : `${valA.toLocaleString('vi-VN')}+`)
        setStatB(`${valB}+`)
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          runCounters()
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(panel)
    return () => observer.disconnect()
  }, [isEn])

  const statAVal = data?.statsCard?.statAValue || '5.000+'
  const statBVal = data?.statsCard?.statBValue || '60+'
  const statALbl = isEn
    ? (data?.statsCard?.statALabel && !data.statsCard.statALabel.includes('Hồ sơ')
        ? data.statsCard.statALabel
        : 'Completed Appraisals')
    : (data?.statsCard?.statALabel || 'Hồ sơ đã hoàn thành')
  const statBLbl = isEn
    ? (data?.statsCard?.statBLabel && !data.statsCard.statBLabel.includes('Nhân sự')
        ? data.statsCard.statBLabel
        : 'Certified Specialists')
    : (data?.statsCard?.statBLabel || 'Nhân sự chuyên môn')
  const dossierText = isEn
    ? (data?.statsCard?.dossierLinkText && !data.statsCard.dossierLinkText.includes('Hồ sơ')
        ? data.statsCard.dossierLinkText
        : 'Credentials Dossier →')
    : (data?.statsCard?.dossierLinkText || 'Hồ sơ năng lực →')
  const dossierUrl = data?.statsCard?.dossierLinkUrl || '#about'
  const footnoteText = isEn
    ? (data?.statsCard?.footnote && !data.statsCard.footnote.includes('Chuẩn mực')
        ? data.statsCard.footnote
        : 'Conducted in strict compliance with Vietnam Valuation Standards, Price Law 2023, and regulatory mandates.')
    : (data?.statsCard?.footnote ||
      'Thực hiện theo Chuẩn mực thẩm định giá Việt Nam, Luật Giá 2023 và các quy định pháp luật có liên quan')
  const statsTitle = isEn
    ? (data?.statsCard?.headerTitle && !data.statsCard.headerTitle.includes('Năng lực')
        ? data.statsCard.headerTitle
        : 'Operational Track Record')
    : (data?.statsCard?.headerTitle || 'Năng lực hoạt động')

  const badgeText = isEn
    ? (data?.badgeText && !data.badgeText.includes('Đủ điều kiện')
        ? data.badgeText
        : 'Licensed Valuation Services under Ministry of Finance')
    : (data?.badgeText || 'Đủ điều kiện kinh doanh dịch vụ thẩm định giá')
  const titleLine1 = isEn
    ? (data?.titleLine1 && !data.titleLine1.includes('Thẩm định giá')
        ? data.titleLine1
        : 'Professional Valuation')
    : (data?.titleLine1 || 'Thẩm định giá')
  const titleLine2 = isEn
    ? (data?.titleLine2 && !data.titleLine2.includes('theo chuẩn mực')
        ? data.titleLine2
        : 'to Vietnamese & Global Standards')
    : (data?.titleLine2 || 'theo chuẩn mực Việt Nam')
  const description = isEn
    ? (data?.description && !data.description.includes('MHD thẩm định')
        ? data.description
        : 'MHD provides comprehensive enterprise, real estate, plant & equipment, and intangible asset valuations compliant with Vietnam Valuation Standards.')
    : (data?.description ||
      'MHD thẩm định giá doanh nghiệp, bất động sản, động sản và tài sản vô hình. Hồ sơ được thực hiện theo Chuẩn mực thẩm định giá Việt Nam.')
  const ctaPrimaryText = isEn
    ? (data?.primaryCta?.label && !data.primaryCta.label.includes('Gửi')
        ? data.primaryCta.label
        : 'Submit Valuation Request')
    : (data?.primaryCta?.label || 'Gửi yêu cầu thẩm định')
  const ctaPrimaryUrl = cleanNavHref(data?.primaryCta?.url || '/contact')
  const ctaSecondaryText = isEn
    ? (data?.secondaryCta?.label && !data.secondaryCta.label.includes('Dành')
        ? data.secondaryCta.label
        : 'Institutional Partner Portal (B2B)')
    : (data?.secondaryCta?.label || 'Dành cho KH tổ chức (B2B)')
  const ctaSecondaryUrl = cleanNavHref(data?.secondaryCta?.url || '/phap-ly/tra-cuu')
  const tickerItems = data?.tickerItems || []

  return (
    <>
      <section
        data-screen-label="Hero"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--c-hero,#14161a)',
          color: '#fff',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, opacity: 0.75 }}>
          <Image
            id="mhd-hero-photo"
            src="/assets/hero-office.webp"
            alt="Ảnh toà nhà văn phòng hiện đại tại trung tâm tài chính"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
              'linear-gradient(100deg,var(--c-hero,#14161a) 22%,rgba(var(--c-hero-rgb,20,22,26),.86) 48%,rgba(var(--c-hero-rgb,20,22,26),.3) 100%),linear-gradient(0deg,rgba(var(--c-hero-rgb,20,22,26),.7) 0%,transparent 40%)',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse at 30% 40%,#000 20%,transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 30% 40%,#000 20%,transparent 75%)',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            left: '38%',
            top: '-10%',
            width: '560px',
            height: '560px',
            borderRadius: '50%',
            pointerEvents: 'none',
            background: 'radial-gradient(circle,rgba(var(--c-accent-rgb,217,79,10),.28),transparent 65%)',
            filter: 'blur(40px)',
            animation: 'mhdDrift 14s ease-in-out infinite alternate',
          }}
        ></div>
        <svg
          aria-hidden="true"
          viewBox="0 0 800 600"
          fill="none"
          style={{
            position: 'absolute',
            right: '-6%',
            top: '-4%',
            width: 'min(72%,920px)',
            height: 'auto',
            pointerEvents: 'none',
            opacity: 0.6,
            overflow: 'visible',
            animation: 'mhdGlow 6s ease-in-out infinite',
          }}
        >
          <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'mhdFloatA 9s ease-in-out infinite alternate' }}>
            <polygon points="560,60 640,105 640,195 560,240 480,195 480,105" stroke="#d94f0a" strokeWidth="1.3" />
            <polygon points="560,95 610,122 610,178 560,205 510,178 510,122" stroke="#d94f0a" strokeWidth=".8" opacity=".5" />
          </g>
          <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'mhdFloatB 11s ease-in-out infinite alternate' }}>
            <polygon points="700,300 790,430 610,430" stroke="rgba(255,255,255,.4)" strokeWidth="1" />
          </g>
          <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'mhdFloatC 10s ease-in-out infinite alternate' }}>
            <polygon points="300,120 360,180 300,240 240,180" stroke="rgba(255,255,255,.32)" strokeWidth="1" />
          </g>
          <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'mhdSpin 36s linear infinite' }}>
            <circle cx="520" cy="330" r="160" stroke="rgba(255,255,255,.14)" strokeWidth="1" strokeDasharray="3 12" />
          </g>
          <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'mhdSpin 24s linear infinite reverse' }}>
            <circle cx="520" cy="330" r="235" stroke="rgba(217,79,10,.28)" strokeWidth="1" strokeDasharray="1 16" />
          </g>
          <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'mhdFloatA 12s ease-in-out infinite alternate-reverse' }}>
            <polygon points="420,420 470,445 470,505 420,530 370,505 370,445" stroke="#d94f0a" strokeWidth="1" opacity=".65" />
          </g>
          <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'mhdFloatB 8s ease-in-out infinite alternate-reverse' }}>
            <polygon points="150,400 195,470 105,470" stroke="rgba(255,255,255,.28)" strokeWidth="1" />
          </g>
          <polyline
            points="240,180 480,150 560,240 640,195 700,300"
            stroke="rgba(255,255,255,.14)"
            strokeWidth="1"
            strokeDasharray="6 8"
            style={{ animation: 'mhdDash 12s linear infinite' }}
          />
          <circle cx="480" cy="150" r="3" fill="#d94f0a" style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'mhdPulse 2.4s ease-in-out infinite' }} />
          <circle cx="700" cy="300" r="2.5" fill="rgba(255,255,255,.6)" />
          <circle cx="240" cy="180" r="2.5" fill="rgba(255,255,255,.6)" />
        </svg>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1240px',
            margin: '0 auto',
            padding: 'clamp(4rem,9vw,7.5rem) clamp(1rem,4vw,2.5rem) clamp(3.5rem,7vw,5.5rem)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(2.5rem,5vw,4.5rem)',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ flex: '1.2 1 520px', minWidth: 0, containerType: 'inline-size' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.55rem',
                whiteSpace: 'nowrap',
                maxWidth: '100%',
                fontSize: '.72rem',
                fontWeight: 700,
                letterSpacing: '.09em',
                textTransform: 'uppercase',
                color: 'var(--c-badge,#f3c9b3)',
                border: '1px solid rgba(255,255,255,.18)',
                background: 'rgba(255,255,255,.05)',
                padding: '.5rem 1rem',
                borderRadius: '999px',
                marginBottom: '1.6rem',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                animation: 'mhdFadeUp .8s cubic-bezier(.16,1,.3,1) both',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="3">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {badgeText}
            </span>
            <h1
              style={{
                fontFamily: "'Be Vietnam Pro',sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(1.6rem,7.9cqi,4.4rem)',
                lineHeight: 1.18,
                letterSpacing: '-.02em',
                color: '#fff',
                textWrap: 'balance',
                marginBottom: '1.4rem',
                animation: 'mhdFadeUp .9s .12s cubic-bezier(.16,1,.3,1) both',
              }}
            >
              <span style={{ display: 'block' }}>{titleLine1}</span>
              <span style={{ display: 'block', whiteSpace: 'nowrap' }}>{titleLine2}</span>
            </h1>
            <div
              style={{
                width: '64px',
                height: '2px',
                background: 'var(--c-accent,#d94f0a)',
                marginBottom: '1.4rem',
                transformOrigin: 'left',
                animation: 'mhdGrow .9s .5s cubic-bezier(.16,1,.3,1) both',
              }}
            ></div>
            <p
              style={{
                fontSize: 'clamp(1rem,.95rem + .3vw,1.15rem)',
                color: 'var(--c-ondark-muted,#b9bcc3)',
                maxWidth: '50ch',
                marginBottom: '2.2rem',
                textWrap: 'pretty',
                animation: 'mhdFadeUp .9s .24s cubic-bezier(.16,1,.3,1) both',
              }}
            >
              {description}
            </p>
            <div
              style={{
                display: 'flex',
                gap: '.8rem',
                flexWrap: 'wrap',
                animation: 'mhdFadeUp .9s .36s cubic-bezier(.16,1,.3,1) both',
              }}
            >
              <a
                href={ctaPrimaryUrl}
                data-cta-dark="1"
                className="hover-hero-cta1"
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
                  whiteSpace: 'nowrap',
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
                {ctaPrimaryText}
              </a>
              <a
                href={ctaSecondaryUrl}
                className="hover-hero-cta2"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.5rem',
                  border: '1.5px solid rgba(255,255,255,.4)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '.95rem',
                  padding: '.95rem 1.5rem',
                  borderRadius: '6px',
                  whiteSpace: 'nowrap',
                  transition: 'all .2s cubic-bezier(.16,1,.3,1)',
                }}
              >
                {ctaSecondaryText}
              </a>
            </div>
          </div>
          <div
            id="mhd-stats"
            ref={statsRef}
            style={{
              flex: '1 1 460px',
              minWidth: 0,
              background: 'rgba(255,255,255,.05)',
              border: '1px solid rgba(255,255,255,.13)',
              borderRadius: '14px',
              padding: 'clamp(1.5rem,2.4vw,2.2rem)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 30px 60px rgba(0,0,0,.35)',
              animation: 'mhdFadeUp 1s .45s cubic-bezier(.16,1,.3,1) both',
            }}
          >
            <h3
              style={{
                fontSize: '.74rem',
                fontWeight: 700,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                color: 'var(--c-faint,#9a9fa6)',
                marginBottom: '1.4rem',
                display: 'flex',
                alignItems: 'center',
                gap: '.6rem',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--c-accent,#d94f0a)',
                  animation: 'mhdPulse 2.4s ease-in-out infinite',
                }}
              ></span>
              {statsTitle}
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto auto minmax(0,1fr)',
                gap: '1.2rem clamp(.9rem,1.6vw,1.4rem)',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Be Vietnam Pro',sans-serif",
                    fontSize: 'clamp(1.8rem,1.4rem + 1vw,2.6rem)',
                    fontWeight: 500,
                    lineHeight: 1,
                    color: '#fff',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {statA}
                </div>
                <div style={{ fontSize: '.78rem', color: 'var(--c-faint,#9a9fa6)', marginTop: '.5rem', whiteSpace: 'nowrap' }}>
                  {statALbl}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Be Vietnam Pro',sans-serif",
                    fontSize: 'clamp(1.8rem,1.4rem + 1vw,2.6rem)',
                    fontWeight: 500,
                    lineHeight: 1,
                    color: '#fff',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {statB}
                </div>
                <div style={{ fontSize: '.78rem', color: 'var(--c-faint,#9a9fa6)', marginTop: '.5rem', whiteSpace: 'nowrap' }}>
                  {statBLbl}
                </div>
              </div>
              <a
                href={dossierUrl}
                className="hover-hero-profile"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '.5rem',
                  color: '#fff',
                  borderLeft: '1px solid rgba(255,255,255,.14)',
                  paddingLeft: 'clamp(.8rem,1.4vw,1.1rem)',
                  transition: 'color .2s',
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d94f0a" strokeWidth="1.8" aria-hidden="true">
                  <path d="M4 19V6a2 2 0 012-2h9l5 5v10a2 2 0 01-2 2H6a2 2 0 01-2-2z" />
                  <path d="M14 4v5h5M8 13h8M8 17h5" />
                </svg>
                <span style={{ fontSize: '.78rem', fontWeight: 700, lineHeight: 1.35, whiteSpace: 'nowrap' }}>
                  {dossierText}
                </span>
              </a>
            </div>
            <div style={{ height: '1px', background: 'rgba(255,255,255,.12)', margin: '1.4rem 0' }}></div>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '.55rem',
                fontSize: '.8rem',
                color: 'var(--c-ondark-muted,#c9ccd2)',
                lineHeight: 1.5,
              }}
            >
              <svg viewBox="0 0 24 24" fill="#d94f0b" width="16" height="16" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true">
                <path d="M12 2l2.4 6.6L21 9l-5 4.5L17.4 21 12 17l-5.4 4L8 13.5 3 9l6.6-.4z" />
              </svg>
              {footnoteText}
            </div>
          </div>
        </div>
      </section>

      {/* TrustStrip Marquee */}
      <div
        aria-hidden="true"
        style={{
          background: '#fff',
          borderBottom: '1px solid var(--c-border2,#e6e3dc)',
          overflow: 'hidden',
          padding: '.85rem 0',
          maskImage: 'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)',
          WebkitMaskImage: 'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '3.5rem',
            width: 'max-content',
            animation: 'mhdMarquee 46s linear infinite',
            fontSize: '.76rem',
            fontWeight: 700,
            letterSpacing: '.06em',
            textTransform: 'uppercase',
            color: 'var(--c-muted2,#4a5058)',
            whiteSpace: 'nowrap',
          }}
        >
          {tickerItems && tickerItems.length > 0 ? (
            tickerItems.map((item: any, i: number) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '.7rem', flexShrink: 0, whiteSpace: 'nowrap' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--c-gold,var(--c-accent,#d94f0a))', flexShrink: 0 }}></span>
                {item.text} {item.highlight && <span style={{ whiteSpace: 'nowrap' }}>{item.highlight}</span>}
              </span>
            ))
          ) : (
            <>
              <span style={{ display: 'flex', alignItems: 'center', gap: '.7rem', flexShrink: 0, whiteSpace: 'nowrap' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--c-gold,var(--c-accent,#d94f0a))', flexShrink: 0 }}></span>
                Giấy chứng nhận đủ điều kiện kinh doanh dịch vụ thẩm định giá: <span style={{ whiteSpace: 'nowrap' }}>000/GCN-BTC</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '.7rem', flexShrink: 0, whiteSpace: 'nowrap' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--c-gold,var(--c-accent,#d94f0a))', flexShrink: 0 }}></span>
                <span style={{ whiteSpace: 'nowrap' }}>Thông tư 30/2024/TT-BTC</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '.7rem', flexShrink: 0, whiteSpace: 'nowrap' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--c-gold,var(--c-accent,#d94f0a))', flexShrink: 0 }}></span>
                <span style={{ whiteSpace: 'nowrap' }}>Thông tư 31/2024/TT-BTC</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '.7rem', flexShrink: 0, whiteSpace: 'nowrap' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--c-gold,var(--c-accent,#d94f0a))', flexShrink: 0 }}></span>
                <span style={{ whiteSpace: 'nowrap' }}>Thông tư 36/2024/TT-BTC</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '.7rem', flexShrink: 0, whiteSpace: 'nowrap' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--c-gold,var(--c-accent,#d94f0a))', flexShrink: 0 }}></span>
                Tra cứu chứng thư bằng mã QR
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '.7rem', flexShrink: 0, whiteSpace: 'nowrap' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--c-gold,var(--c-accent,#d94f0a))', flexShrink: 0 }}></span>
                Giấy chứng nhận đủ điều kiện kinh doanh dịch vụ thẩm định giá: <span style={{ whiteSpace: 'nowrap' }}>000/GCN-BTC</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '.7rem', flexShrink: 0, whiteSpace: 'nowrap' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--c-gold,var(--c-accent,#d94f0a))', flexShrink: 0 }}></span>
                <span style={{ whiteSpace: 'nowrap' }}>Thông tư 30/2024/TT-BTC</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '.7rem', flexShrink: 0, whiteSpace: 'nowrap' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--c-gold,var(--c-accent,#d94f0a))', flexShrink: 0 }}></span>
                <span style={{ whiteSpace: 'nowrap' }}>Thông tư 31/2024/TT-BTC</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '.7rem', flexShrink: 0, whiteSpace: 'nowrap' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--c-gold,var(--c-accent,#d94f0a))', flexShrink: 0 }}></span>
                <span style={{ whiteSpace: 'nowrap' }}>Thông tư 36/2024/TT-BTC</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '.7rem', flexShrink: 0, whiteSpace: 'nowrap' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--c-gold,var(--c-accent,#d94f0a))', flexShrink: 0 }}></span>
                Tra cứu chứng thư bằng mã QR
              </span>
            </>
          )}
        </div>
      </div>
    </>
  )
}

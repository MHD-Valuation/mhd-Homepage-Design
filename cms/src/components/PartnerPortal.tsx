'use client'

import React from 'react'
import { cleanNavHref } from '@/lib/cleanUrl'

interface PartnerPortalProps {
  data?: any
  currentLocale?: string
}

export default function PartnerPortal({ data, currentLocale = 'vi' }: PartnerPortalProps) {
  const isEn = currentLocale === 'en'
  const badge = data?.badge || (isEn ? 'System for Institutional Partners' : 'Dành cho khách hàng tổ chức')
  const title = data?.heading || data?.title || (isEn ? 'Partner Portals & Verification Tools' : 'Cổng tra cứu dành cho đối tác')
  const description =
    data?.description ||
    (isEn
      ? 'Dedicated systems enabling banks, enterprises, and regulators to verify credentials, authenticate certificates, and track appraisal progress.'
      : 'Hệ thống hỗ trợ ngân hàng, doanh nghiệp và cơ quan nhà nước tra cứu thông tin, đối chiếu chứng thư và theo dõi hồ sơ.')

  const portals = data?.portals || []

  const p1Tag = portals[0]?.tag || (isEn ? 'For Banks & Enterprises' : 'Dành cho ngân hàng và doanh nghiệp')
  const p1Title = portals[0]?.title || (isEn ? 'Credentials Profile for Verification' : 'Hồ sơ năng lực phục vụ thẩm tra')
  const p1Desc =
    portals[0]?.description ||
    (isEn
      ? 'Access official legal documentation, appraiser credentials, and track records per authorized permissions.'
      : 'Truy cập thông tin pháp lý, nhân sự và kinh nghiệm theo quyền được cấp.')
  const p1BtnText = portals[0]?.actionLabel || (isEn ? 'Request access' : 'Yêu cầu truy cập')
  const p1BtnUrl = cleanNavHref(portals[0]?.actionUrl || '/contact')

  const p2Tag = portals[1]?.tag || (isEn ? 'Certificate Verification' : 'Tra cứu chứng thư')
  const p2Title = portals[1]?.title || (isEn ? 'Verification by QR Code' : 'Đối chiếu bằng mã QR')
  const p2Desc =
    portals[1]?.description ||
    (isEn
      ? 'Scan QR code on certificate to cross-reference issuance parameters on the official MHD system.'
      : 'Quét mã QR trên chứng thư để đối chiếu thông tin phát hành trên hệ thống MHD.')
  const p2BtnText = portals[1]?.actionLabel || (isEn ? 'Open lookup page' : 'Mở trang tra cứu')
  const p2BtnUrl = cleanNavHref(portals[1]?.actionUrl || '/phap-ly/tra-cuu')

  const p3Tag = portals[2]?.tag || (isEn ? 'Multi-stage Engagements' : 'Hồ sơ nhiều giai đoạn')
  const p3Title = portals[2]?.title || (isEn ? 'Real-time Progress Tracking' : 'Theo dõi tiến độ thực hiện')
  const p3Desc =
    portals[2]?.description ||
    (isEn
      ? 'Authorized clients can monitor status, key milestones, and pending documentation in real time.'
      : 'Khách hàng được phân quyền có thể theo dõi tình trạng hồ sơ và tài liệu cần bổ sung.')
  const p3BtnText = portals[2]?.actionLabel || (isEn ? 'Open tracker portal' : 'Mở cổng theo dõi')
  const p3BtnUrl = cleanNavHref(portals[2]?.actionUrl || '/contact')

  return (
    <section
      id="portals"
      data-screen-label="Cổng B2B"
      style={{
        background: 'var(--c-partner,#23262c)',
        color: '#fff',
        padding: 'clamp(6rem,11vw,10rem) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at 15% 0%,rgba(255,255,255,.07),transparent 55%),radial-gradient(ellipse at 90% 100%,rgba(var(--c-accent-rgb,217,79,10),.16),transparent 55%)',
        }}
      ></div>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.07) 1px,transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'linear-gradient(180deg,#000 0%,rgba(0,0,0,.5) 60%,transparent 100%)',
          WebkitMaskImage: 'linear-gradient(180deg,#000 0%,rgba(0,0,0,.5) 60%,transparent 100%)',
        }}
      ></div>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: 'radial-gradient(rgba(var(--c-accent-dark-rgb,240,149,106),.55) 1.2px,transparent 1.5px)',
          backgroundSize: '56px 56px',
          backgroundPosition: '28px 28px',
          maskImage: 'radial-gradient(ellipse at 85% 15%,#000 0%,transparent 50%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 85% 15%,#000 0%,transparent 50%)',
        }}
      ></div>
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        fill="none"
        style={{ position: 'absolute', left: '-60px', bottom: '-80px', width: '340px', height: '340px', pointerEvents: 'none', opacity: 0.6 }}
      >
        <g style={{ transformOrigin: '100px 100px', animation: 'mhdSpin 80s linear infinite' }}>
          <polygon points="100,20 169,60 169,140 100,180 31,140 31,60" stroke="rgba(240,149,106,.4)" strokeWidth=".7" />
          <polygon points="100,50 143,75 143,125 100,150 57,125 57,75" stroke="rgba(255,255,255,.18)" strokeWidth=".7" />
        </g>
      </svg>
      <div style={{ position: 'relative', maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)' }}>
        <div
          data-reveal="0"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '1.5rem',
            flexWrap: 'wrap',
            marginBottom: 'clamp(3rem,5vw,4.2rem)',
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
                color: 'var(--c-accent-dark,#f0956a)',
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
                maxWidth: '18ch',
                color: '#fff',
              }}
            >
              {title}
            </h2>
          </div>
          <p
            style={{
              maxWidth: '50ch',
              color: 'var(--c-ondark-muted,#b9bcc3)',
              fontSize: '.95rem',
              lineHeight: 1.6,
              textWrap: 'pretty',
              paddingBottom: '.35rem',
            }}
          >
            {description}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))',
            gap: 'clamp(1.5rem,2.4vw,2.2rem)',
          }}
        >
          {/* Card 1: B2B Dossier */}
          <div
            data-reveal="0"
            className="hover-portal-card"
            style={{
              background: 'rgba(255,255,255,.06)',
              border: '1px solid rgba(255,255,255,.16)',
              borderRadius: '14px',
              padding: 'clamp(1.8rem,2.6vw,2.4rem)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all .25s cubic-bezier(.16,1,.3,1)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <span
                style={{
                  display: 'block',
                  fontSize: '.7rem',
                  fontWeight: 700,
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  color: 'var(--c-faint,#9a9fa6)',
                }}
              >
                {p1Tag}
              </span>
              <div
                aria-hidden="true"
                style={{
                  position: 'relative',
                  width: '48px',
                  height: '48px',
                  border: '1.5px solid rgba(255,255,255,.3)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.12) 1px,transparent 1px)',
                  backgroundSize: '8px 8px',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{ position: 'absolute', left: '14px', top: '6px' }}>
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 018 0v4" />
                </svg>
                <div style={{ position: 'absolute', left: '7px', right: '7px', bottom: '9px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,.2)', animation: 'mhdDot 2.8s 0.00s ease-in-out infinite' }}></span>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,.2)', animation: 'mhdDot 2.8s 0.35s ease-in-out infinite' }}></span>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,.2)', animation: 'mhdDot 2.8s 0.70s ease-in-out infinite' }}></span>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,.2)', animation: 'mhdDot 2.8s 1.05s ease-in-out infinite' }}></span>
                </div>
              </div>
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '.6rem', color: '#fff' }}>
              {p1Title}
            </h4>
            <p style={{ fontSize: '.88rem', color: 'var(--c-ondark-muted,#b9bcc3)', marginBottom: '1.4rem', textWrap: 'pretty' }}>
              {p1Desc}
            </p>
            <a
              href={p1BtnUrl}
              target={p1BtnUrl.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="hover-portal-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.45rem',
                fontSize: '.86rem',
                fontWeight: 700,
                color: 'var(--c-accent-dark,#f0956a)',
                marginTop: 'auto',
                transition: 'all .2s',
              }}
            >
              {p1BtnText}{' '}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          {/* Card 2: QR Lookup */}
          <div
            data-reveal="80"
            className="hover-portal-card"
            style={{
              background: 'rgba(255,255,255,.06)',
              border: '1px solid rgba(255,255,255,.16)',
              borderRadius: '14px',
              padding: 'clamp(1.8rem,2.6vw,2.4rem)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all .25s cubic-bezier(.16,1,.3,1)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <span
                style={{
                  display: 'block',
                  fontSize: '.7rem',
                  fontWeight: 700,
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  color: 'var(--c-faint,#9a9fa6)',
                }}
              >
                {p2Tag}
              </span>
              <div
                aria-hidden="true"
                style={{
                  position: 'relative',
                  width: '48px',
                  height: '48px',
                  border: '1.5px solid rgba(255,255,255,.3)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.12) 1px,transparent 1px)',
                  backgroundSize: '8px 8px',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'var(--c-accent,#d94f0a)',
                    boxShadow: '0 0 10px var(--c-accent,#d94f0a)',
                    animation: 'mhdScan 2.8s ease-in-out infinite',
                  }}
                ></div>
              </div>
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '.6rem', color: '#fff' }}>{p2Title}</h4>
            <p style={{ fontSize: '.88rem', color: 'var(--c-ondark-muted,#b9bcc3)', marginBottom: '1.4rem', textWrap: 'pretty' }}>
              {p2Desc}
            </p>
            <a
              href={p2BtnUrl}
              className="hover-portal-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.45rem',
                fontSize: '.86rem',
                fontWeight: 700,
                color: 'var(--c-accent-dark,#f0956a)',
                marginTop: 'auto',
                transition: 'all .2s',
              }}
            >
              {p2BtnText}{' '}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          {/* Card 3: Multi-stage progress */}
          <div
            data-reveal="160"
            className="hover-portal-card"
            style={{
              background: 'rgba(255,255,255,.06)',
              border: '1px solid rgba(255,255,255,.16)',
              borderRadius: '14px',
              padding: 'clamp(1.8rem,2.6vw,2.4rem)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all .25s cubic-bezier(.16,1,.3,1)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <span
                style={{
                  display: 'block',
                  fontSize: '.7rem',
                  fontWeight: 700,
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  color: 'var(--c-faint,#9a9fa6)',
                }}
              >
                {p3Tag}
              </span>
              <div
                aria-hidden="true"
                style={{
                  position: 'relative',
                  width: '48px',
                  height: '48px',
                  border: '1.5px solid rgba(255,255,255,.3)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.12) 1px,transparent 1px)',
                  backgroundSize: '8px 8px',
                }}
              >
                <div style={{ position: 'absolute', left: '8px', right: '8px', top: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,.18)', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: '100%',
                        background: 'var(--c-accent,#d94f0a)',
                        transformOrigin: 'left',
                        animation: 'mhdProgress 3s 0.0s cubic-bezier(.16,1,.3,1) infinite',
                      }}
                    ></div>
                  </div>
                  <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,.18)', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: '75%',
                        background: '#fff',
                        transformOrigin: 'left',
                        animation: 'mhdProgress 3s 0.4s cubic-bezier(.16,1,.3,1) infinite',
                      }}
                    ></div>
                  </div>
                  <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,.18)', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: '50%',
                        background: '#fff',
                        transformOrigin: 'left',
                        animation: 'mhdProgress 3s 0.8s cubic-bezier(.16,1,.3,1) infinite',
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '.6rem', color: '#fff' }}>
              {p3Title}
            </h4>
            <p style={{ fontSize: '.88rem', color: 'var(--c-ondark-muted,#b9bcc3)', marginBottom: '1.4rem', textWrap: 'pretty' }}>
              {p3Desc}
            </p>
            <a
              href={p3BtnUrl}
              target={p3BtnUrl.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="hover-portal-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.45rem',
                fontSize: '.86rem',
                fontWeight: 700,
                color: 'var(--c-accent-dark,#f0956a)',
                marginTop: 'auto',
                transition: 'all .2s',
              }}
            >
              {p3BtnText}{' '}
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

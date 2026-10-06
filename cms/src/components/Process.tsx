'use client'

import React from 'react'

interface ProcessProps {
  data?: any
  currentLocale?: string
}

export default function Process({ data, currentLocale = 'vi' }: ProcessProps) {
  const isEn = currentLocale === 'en'
  const badge = data?.badge || (isEn ? 'Valuation Process' : 'Quy trình thẩm định')
  const title = data?.heading || data?.title || (isEn ? 'Valuation Process at MHD' : 'Quy trình thẩm định giá tại MHD')
  const description =
    data?.description ||
    (isEn
      ? 'Each dossier is executed according to the defined scope and verified prior to issuing the valuation certificate.'
      : 'Mỗi hồ sơ thực hiện theo phạm vi công việc đã xác định và được kiểm tra trước khi phát hành chứng thư.')

  const stepsData = data?.steps || []

  const step1Title = stepsData[0]?.title || (isEn ? 'Intake & Survey' : 'Tiếp nhận và khảo sát')
  const step1Desc =
    stepsData[0]?.description ||
    (isEn
      ? 'Define asset, purpose, effective date, value basis, and engagement scope; conduct on-site inspection when required.'
      : 'Xác định tài sản, mục đích, thời điểm, cơ sở giá trị và phạm vi công việc; khảo sát hiện trạng khi cần.')

  const step2Title = stepsData[1]?.title || (isEn ? 'Information Collection & Analysis' : 'Thu thập và phân tích thông tin')
  const step2Desc =
    stepsData[1]?.description ||
    (isEn
      ? 'Examine legal dossiers, asset characteristics, market data, and comparable market transactions.'
      : 'Kiểm tra hồ sơ pháp lý, đặc điểm tài sản, thông tin thị trường và tài sản so sánh phù hợp.')

  const step3Title = stepsData[2]?.title || (isEn ? 'Valuation Methodology Application' : 'Áp dụng phương pháp thẩm định giá')
  const step3Desc =
    stepsData[2]?.description ||
    (isEn
      ? 'Analyze data, select appropriate valuation methods, and conclude value according to defined valuation basis.'
      : 'Phân tích thông tin, lựa chọn phương pháp và xác định giá trị theo cơ sở giá trị đã xác định.')

  const step4Title = stepsData[3]?.title || (isEn ? 'Valuation Report Issuance' : 'Phát hành hồ sơ thẩm định giá')
  const step4Desc =
    stepsData[3]?.description ||
    (isEn
      ? 'Issue certificate accompanied by detailed valuation report. QR code enables instant authenticity verification on MHD system.'
      : 'Phát hành chứng thư kèm báo cáo thẩm định giá. Mã QR hỗ trợ tra cứu thông tin trên hệ thống MHD.')

  return (
    <section
      data-screen-label="Quy trình"
      style={{
        background: 'var(--c-page,#f6f5f2)',
        borderTop: '1px solid var(--c-border2,#e6e3dc)',
        borderBottom: '1px solid var(--c-border2,#e6e3dc)',
        padding: 'clamp(5rem,9vw,8rem) 0',
      }}
    >
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
                fontSize: 'clamp(1.7rem,1.3rem + 1.1vw,2.3rem)',
                lineHeight: 1.28,
                letterSpacing: '-.01em',
                textWrap: 'balance',
                maxWidth: '22ch',
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,max(240px,45%)),1fr))',
            gap: '1.5rem',
          }}
        >
          {/* Step 01 */}
          <div
            data-reveal="0"
            className="hover-process-card"
            style={{
              background: '#fff',
              border: '1px solid var(--c-border,#e2e0da)',
              borderRadius: '12px',
              padding: '1.6rem',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all .25s cubic-bezier(.16,1,.3,1)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
              <div
                style={{
                  fontFamily: "'Be Vietnam Pro',sans-serif",
                  fontSize: '2.6rem',
                  lineHeight: 1,
                  color: 'var(--c-border,#e2e0da)',
                  fontWeight: 700,
                  letterSpacing: '-.02em',
                }}
              >
                01
              </div>
              <svg width="84" height="64" viewBox="0 0 84 64" fill="none" aria-hidden="true">
                <rect x="8" y="8" width="38" height="50" rx="4" fill="#fbf7f3" stroke="#9aa0a7" strokeWidth="1.5" />
                <rect x="19" y="4" width="16" height="8" rx="2" fill="#fff" stroke="#9aa0a7" strokeWidth="1.5" />
                <path d="M15 24h24M15 32h18M15 40h22" stroke="#e2e0da" strokeWidth="2.5" strokeLinecap="round" />
                <path
                  d="M15 24h24"
                  stroke="#d94f0a"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="24 24"
                  style={{ animation: 'mhdDashS 2.4s linear infinite' }}
                />
                <g style={{ animation: 'mhdMagnify 4.5s ease-in-out infinite' }}>
                  <circle cx="56" cy="38" r="12" fill="#fff" stroke="#d94f0a" strokeWidth="2" />
                  <path d="M65 47l9 9" stroke="#d94f0a" strokeWidth="3" strokeLinecap="round" />
                  <path d="M51 38l3.5 3.5L61 35" stroke="#d94f0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </svg>
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '.4rem' }}>{step1Title}</h4>
            <p style={{ fontSize: '.86rem', color: 'var(--c-muted,#5f656d)', textWrap: 'pretty' }}>
              {step1Desc}
            </p>
          </div>

          {/* Step 02 */}
          <div
            data-reveal="80"
            className="hover-process-card"
            style={{
              background: '#fff',
              border: '1px solid var(--c-border,#e2e0da)',
              borderRadius: '12px',
              padding: '1.6rem',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all .25s cubic-bezier(.16,1,.3,1)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
              <div
                style={{
                  fontFamily: "'Be Vietnam Pro',sans-serif",
                  fontSize: '2.6rem',
                  lineHeight: 1,
                  color: 'var(--c-border,#e2e0da)',
                  fontWeight: 700,
                  letterSpacing: '-.02em',
                }}
              >
                02
              </div>
              <svg width="84" height="64" viewBox="0 0 84 64" fill="none" aria-hidden="true">
                <ellipse cx="22" cy="14" rx="14" ry="5" fill="#fbf7f3" stroke="#9aa0a7" strokeWidth="1.5" />
                <path d="M8 14v28c0 2.8 6.3 5 14 5s14-2.2 14-5V14" stroke="#9aa0a7" strokeWidth="1.5" />
                <path d="M8 28c0 2.8 6.3 5 14 5s14-2.2 14-5" stroke="#9aa0a7" strokeWidth="1.5" />
                <path d="M44 56h34" stroke="#9aa0a7" strokeWidth="1.5" strokeLinecap="round" />
                <rect
                  x="47"
                  y="30"
                  width="7"
                  height="26"
                  rx="1.5"
                  fill="#e2e0da"
                  style={{ transformBox: 'fill-box', transformOrigin: 'bottom', animation: 'mhdBar 2.6s ease-in-out infinite' }}
                />
                <rect
                  x="58"
                  y="24"
                  width="7"
                  height="32"
                  rx="1.5"
                  fill="#e2e0da"
                  style={{ transformBox: 'fill-box', transformOrigin: 'bottom', animation: 'mhdBar 2.6s .3s ease-in-out infinite' }}
                />
                <rect
                  x="69"
                  y="18"
                  width="7"
                  height="38"
                  rx="1.5"
                  fill="#d94f0a"
                  style={{ transformBox: 'fill-box', transformOrigin: 'bottom', animation: 'mhdBar 2.6s .6s ease-in-out infinite' }}
                />
                <path
                  d="M48 22l11-8 8 4 10-10"
                  stroke="#d94f0a"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="3 3"
                  style={{ animation: 'mhdDashS 1.6s linear infinite' }}
                />
              </svg>
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '.4rem' }}>{step2Title}</h4>
            <p style={{ fontSize: '.86rem', color: 'var(--c-muted,#5f656d)', textWrap: 'pretty' }}>
              {step2Desc}
            </p>
          </div>

          {/* Step 03 */}
          <div
            data-reveal="160"
            className="hover-process-card"
            style={{
              background: '#fff',
              border: '1px solid var(--c-border,#e2e0da)',
              borderRadius: '12px',
              padding: '1.6rem',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all .25s cubic-bezier(.16,1,.3,1)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
              <div
                style={{
                  fontFamily: "'Be Vietnam Pro',sans-serif",
                  fontSize: '2.6rem',
                  lineHeight: 1,
                  color: 'var(--c-border,#e2e0da)',
                  fontWeight: 700,
                  letterSpacing: '-.02em',
                }}
              >
                03
              </div>
              <svg width="84" height="64" viewBox="0 0 84 64" fill="none" aria-hidden="true">
                <path d="M42 8v48M28 58h28" stroke="#9aa0a7" strokeWidth="1.8" strokeLinecap="round" />
                <g style={{ transformOrigin: '42px 16px', animation: 'mhdTilt 3.4s ease-in-out infinite' }}>
                  <path d="M14 16h56" stroke="#9aa0a7" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M14 16L5 36h18L14 16z" fill="#fbf7f3" stroke="#9aa0a7" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M5 36c0 4 4 6 9 6s9-2 9-6" stroke="#9aa0a7" strokeWidth="1.5" />
                  <path d="M70 16l-9 20h18L70 16z" fill="#fbf7f3" stroke="#d94f0a" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M61 36c0 4 4 6 9 6s9-2 9-6" fill="#d94f0a" fillOpacity=".15" stroke="#d94f0a" strokeWidth="1.5" />
                </g>
                <circle cx="42" cy="8" r="3" fill="#d94f0a" />
              </svg>
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '.4rem' }}>{step3Title}</h4>
            <p style={{ fontSize: '.86rem', color: 'var(--c-muted,#5f656d)', textWrap: 'pretty' }}>
              {step3Desc}
            </p>
          </div>

          {/* Step 04 */}
          <div
            data-reveal="240"
            className="hover-process-dark"
            style={{
              background: 'var(--c-ink,#16181c)',
              color: '#fff',
              border: '1px solid var(--c-ink,#16181c)',
              borderRadius: '12px',
              padding: '1.6rem',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all .25s cubic-bezier(.16,1,.3,1)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                right: '-30px',
                top: '-30px',
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                background: 'radial-gradient(circle,rgba(var(--c-accent-rgb,217,79,10),.45),transparent 70%)',
              }}
            ></div>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
              <div
                style={{
                  fontFamily: "'Be Vietnam Pro',sans-serif",
                  fontSize: '2.6rem',
                  lineHeight: 1,
                  color: 'var(--c-accent,#d94f0a)',
                  fontWeight: 700,
                  letterSpacing: '-.02em',
                }}
              >
                04
              </div>
              <svg width="84" height="64" viewBox="0 0 84 64" fill="none" aria-hidden="true">
                <rect x="6" y="6" width="50" height="52" rx="4" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.45)" strokeWidth="1.5" />
                <path d="M14 16h28M14 23h20" stroke="rgba(255,255,255,.35)" strokeWidth="2.5" strokeLinecap="round" />
                <rect x="14" y="32" width="18" height="18" rx="2" stroke="#d94f0a" strokeWidth="1.5" />
                <path d="M18 36h4v4h-4zM26 44h2v2h-2zM18 44h4v2h-4zM26 36h2v4h-2z" fill="#d94f0a" />
                <rect x="12" y="33" width="22" height="1.5" fill="#fff" style={{ animation: 'mhdQrScan 2.4s ease-in-out infinite' }} />
                <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'mhdPop 2.4s ease-in-out infinite' }}>
                  <path d="M55 54l-3 8 6-3 4 4 1-9" fill="#d94f0a" />
                  <circle cx="62" cy="42" r="13" fill="#d94f0a" />
                  <path d="M57.5 42l3 3 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <circle
                  cx="62"
                  cy="42"
                  r="9"
                  stroke="#fff"
                  strokeWidth="1.2"
                  strokeDasharray="2 2"
                  style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'mhdSpin 10s linear infinite' }}
                />
              </svg>
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '.4rem' }}>{step4Title}</h4>
            <p style={{ fontSize: '.86rem', color: 'var(--c-ondark-muted,#b9bcc3)', textWrap: 'pretty' }}>
              {step4Desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

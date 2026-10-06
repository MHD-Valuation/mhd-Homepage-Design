'use client'

import React, { useState } from 'react'

const SAMPLES = ['MHD-2025-0891', 'MHD-2026-001234', 'MHD-2026-000987', 'MHD-2025-004521']

interface LookupClientProps {
  currentLocale?: string
}

export default function LookupClient({ currentLocale = 'vi' }: LookupClientProps) {
  const isEn = currentLocale === 'en'

  const [num, setNum] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [searched, setSearched] = useState('')
  const [errEmpty, setErrEmpty] = useState(false)

  const handleLookup = async (val?: string) => {
    const raw = typeof val === 'string' ? val : num
    const code = raw.trim().toUpperCase().replace(/\s+/g, '')

    if (!code) {
      setErrEmpty(true)
      setResult(null)
      setNotFound(false)
      return
    }

    setErrEmpty(false)
    setLoading(true)
    setNotFound(false)
    setSearched(code)

    try {
      const res = await fetch(`/api/lookup?number=${encodeURIComponent(code)}`)
      const json = await res.json()
      if (json.found && json.data) {
        setResult(json.data)
        setNotFound(false)
      } else {
        setResult(null)
        setNotFound(true)
      }
    } catch {
      setResult(null)
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
        gap: '1.4rem',
        marginTop: '2.4rem',
        alignItems: 'stretch',
      }}
    >
      {/* Search Input Box */}
      <div
        style={{
          background: '#fff',
          border: '1px solid var(--c-border, #e2e0da)',
          borderRadius: 16,
          padding: 'clamp(1.5rem, 3vw, 2.2rem)',
          boxShadow: '0 30px 60px rgba(22,24,28,.07)',
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
            height: 3,
            background: 'linear-gradient(90deg, var(--c-accent, #d94f0a), var(--c-gold, #7d7d7d))',
          }}
        />
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleLookup()
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: '.8rem' }}
        >
          <label htmlFor="so-chung-thu" style={{ fontSize: '.84rem', fontWeight: 700 }}>
            {isEn ? 'Certificate Number' : 'Số chứng thư'}
          </label>
          <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap' }}>
            <input
              id="so-chung-thu"
              type="text"
              value={num}
              onChange={(e) => setNum(e.target.value)}
              placeholder={isEn ? 'e.g. MHD-2026-001234' : 'Ví dụ: MHD-2026-001234'}
              autoComplete="off"
              style={{
                flex: '1 1 220px',
                minWidth: 0,
                padding: '.9rem 1rem',
                border: '1px solid var(--c-border, #e2e0da)',
                borderRadius: 8,
                font: 'inherit',
                fontSize: '1rem',
                fontWeight: 600,
                letterSpacing: '.02em',
                color: 'var(--c-ink, #16181c)',
                outline: 'none',
                background: '#fff',
                textTransform: 'uppercase',
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '.5rem',
                background: 'var(--c-ink, #16181c)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '.92rem',
                padding: '.9rem 1.4rem',
                borderRadius: 8,
                border: 'none',
                cursor: loading ? 'wait' : 'pointer',
                transition: 'all .2s ease',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              {loading ? (isEn ? 'Searching…' : 'Đang tra cứu…') : (isEn ? 'Lookup' : 'Tra cứu')}
            </button>
          </div>
          <span style={{ fontSize: '.78rem', color: 'var(--c-faint, #8a8f96)' }}>
            {isEn
              ? 'Certificate number is printed on the top-right corner of page 1.'
              : 'Số chứng thư in ở góc trên bên phải trang đầu chứng thư.'}
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '.4rem', fontSize: '.78rem', color: 'var(--c-muted, #5f656d)' }}>
            <span>{isEn ? 'Sample numbers to test:' : 'Số mẫu để thử:'}</span>
            {SAMPLES.map((sm) => (
              <button
                key={sm}
                type="button"
                onClick={() => {
                  setNum(sm)
                  handleLookup(sm)
                }}
                style={{
                  padding: '.2rem .55rem',
                  borderRadius: 4,
                  border: '1px dashed var(--c-border3, #d9d6cf)',
                  fontSize: '.76rem',
                  fontWeight: 600,
                  color: 'var(--c-ink, #16181c)',
                  background: 'none',
                  cursor: 'pointer',
                }}
              >
                {sm}
              </button>
            ))}
          </div>
        </form>

        {errEmpty && (
          <p style={{ marginTop: '1rem', fontSize: '.84rem', color: '#c0392b' }}>
            {isEn ? 'Please enter a certificate number.' : 'Vui lòng nhập số chứng thư.'}
          </p>
        )}

        {notFound && (
          <div
            style={{
              marginTop: '1.4rem',
              padding: '1.2rem 1.3rem',
              borderRadius: 10,
              background: 'var(--c-page, #f6f5f2)',
              border: '1px solid var(--c-border, #e2e0da)',
            }}
          >
            <div style={{ fontWeight: 700, fontSize: '.98rem', marginBottom: '.3rem' }}>
              {isEn ? `Certificate ${searched} not found` : `Không tìm thấy chứng thư ${searched}`}
            </div>
            <p style={{ fontSize: '.86rem', color: 'var(--c-muted, #5f656d)', lineHeight: 1.55 }}>
              {isEn ? (
                <>
                  Please check the certificate number. If information still mismatches, contact MHD via hotline 1900 000 000 or email{' '}
                  <a href="mailto:phapche@mhd.com.vn" style={{ color: 'var(--c-accent, #d94f0a)', fontWeight: 600 }}>
                    phapche@mhd.com.vn
                  </a>{' '}
                  for manual verification.
                </>
              ) : (
                <>
                  Kiểm tra lại số chứng thư. Nếu thông tin vẫn không khớp, liên hệ MHD qua hotline 1900 000 000 hoặc email{' '}
                  <a href="mailto:phapche@mhd.com.vn" style={{ color: 'var(--c-accent, #d94f0a)', fontWeight: 600 }}>
                    phapche@mhd.com.vn
                  </a>{' '}
                  để được xác minh.
                </>
              )}
            </p>
          </div>
        )}

        {result && (
          <div style={{ marginTop: '1.4rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                paddingBottom: '.9rem',
                borderBottom: '1px solid var(--c-ink, #16181c)',
              }}
            >
              <span style={{ fontWeight: 700, fontSize: '1.02rem', fontVariantNumeric: 'tabular-nums' }}>
                {result.no}
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.4rem',
                  fontSize: '.78rem',
                  fontWeight: 700,
                  padding: '.3rem .75rem',
                  borderRadius: 999,
                  background: result.statusBg,
                  color: result.statusColor,
                }}
              >
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: result.statusColor }} />
                {isEn && result.status === 'Có hiệu lực' ? 'Active / Valid' : result.status}
              </span>
            </div>
            <dl style={{ margin: 0 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.15rem 1rem', padding: '.75rem 0', borderBottom: '1px solid var(--c-border, #e2e0da)' }}>
                <dt style={{ flex: '0 0 150px', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-faint, #8a8f96)' }}>
                  {isEn ? 'Issue Date' : 'Ngày phát hành'}
                </dt>
                <dd style={{ flex: '1 1 200px', margin: 0, fontSize: '.9rem', fontWeight: 600, lineHeight: 1.5 }}>{result.date}</dd>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.15rem 1rem', padding: '.75rem 0', borderBottom: '1px solid var(--c-border, #e2e0da)' }}>
                <dt style={{ flex: '0 0 150px', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-faint, #8a8f96)' }}>
                  {isEn ? 'Valid Until' : 'Hiệu lực đến'}
                </dt>
                <dd style={{ flex: '1 1 200px', margin: 0, fontSize: '.9rem', fontWeight: 600, lineHeight: 1.5 }}>{result.until}</dd>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.15rem 1rem', padding: '.75rem 0', borderBottom: '1px solid var(--c-border, #e2e0da)' }}>
                <dt style={{ flex: '0 0 150px', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-faint, #8a8f96)' }}>
                  {isEn ? 'Asset Description' : 'Tài sản'}
                </dt>
                <dd style={{ flex: '1 1 200px', margin: 0, fontSize: '.9rem', fontWeight: 600, lineHeight: 1.5 }}>{result.asset}</dd>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.15rem 1rem', padding: '.75rem 0', borderBottom: '1px solid var(--c-border, #e2e0da)' }}>
                <dt style={{ flex: '0 0 150px', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-faint, #8a8f96)' }}>
                  {isEn ? 'Valuation Purpose' : 'Mục đích'}
                </dt>
                <dd style={{ flex: '1 1 200px', margin: 0, fontSize: '.9rem', fontWeight: 600, lineHeight: 1.5 }}>{result.purpose}</dd>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.15rem 1rem', padding: '.75rem 0', borderBottom: '1px solid var(--c-border, #e2e0da)' }}>
                <dt style={{ flex: '0 0 150px', fontSize: '.8rem', fontWeight: 700, color: 'var(--c-faint, #8a8f96)' }}>
                  {isEn ? 'Certified Appraiser' : 'Thẩm định viên'}
                </dt>
                <dd style={{ flex: '1 1 200px', margin: 0, fontSize: '.9rem', fontWeight: 600, lineHeight: 1.5 }}>{result.valuer}</dd>
              </div>
            </dl>
            <p style={{ marginTop: '.9rem', fontSize: '.76rem', color: 'var(--c-faint, #8a8f96)' }}>
              {isEn
                ? 'Asset parameters are summarized for confidentiality. Lookup conclusions cross-reference official issuance and do not replace the full report.'
                : 'Thông tin tài sản được rút gọn để bảo mật. Kết quả tra cứu dùng để đối chiếu, không thay thế bản chứng thư và báo cáo thẩm định giá.'}
            </p>
          </div>
        )}
      </div>

      {/* QR Code Scan Guide Box */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--c-ink, #16181c)',
          color: '#fff',
          borderRadius: 16,
          padding: 'clamp(1.5rem, 3vw, 2.2rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: -60,
            top: -60,
            width: 220,
            height: 220,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(217,79,10,.4), transparent 70%)',
          }}
        />
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            aria-hidden="true"
            style={{
              position: 'relative',
              width: 64,
              height: 64,
              flexShrink: 0,
              border: '1.5px solid rgba(255,255,255,.5)',
              borderRadius: 8,
              overflow: 'hidden',
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.14) 1px, transparent 1px)',
              backgroundSize: '8px 8px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: 2,
                background: 'var(--c-accent-dark, #f0956a)',
                boxShadow: '0 0 10px var(--c-accent-dark, #f0956a)',
              }}
            />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--c-accent-dark, #f0956a)' }}>
              {isEn ? 'Scan QR Code' : 'Quét mã QR'}
            </span>
            <span style={{ display: 'block', fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.3 }}>
              {isEn ? 'Instant Mobile Verification' : 'Đối chiếu nhanh bằng điện thoại'}
            </span>
          </div>
        </div>
        <ol style={{ position: 'relative', listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '.9rem' }}>
          <li style={{ display: 'flex', gap: '.8rem' }}>
            <span style={{ width: 26, height: 26, flexShrink: 0, borderRadius: '50%', border: '1px solid rgba(255,255,255,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.76rem', fontWeight: 700 }}>
              1
            </span>
            <span style={{ fontSize: '.9rem', color: 'var(--c-ondark-muted, #b9bcc3)', lineHeight: 1.55 }}>
              {isEn
                ? 'Open your smartphone camera and point it at the QR code printed on the certificate.'
                : 'Mở camera điện thoại và hướng vào mã QR in trên chứng thư.'}
            </span>
          </li>
          <li style={{ display: 'flex', gap: '.8rem' }}>
            <span style={{ width: 26, height: 26, flexShrink: 0, borderRadius: '50%', border: '1px solid rgba(255,255,255,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.76rem', fontWeight: 700 }}>
              2
            </span>
            <span style={{ fontSize: '.9rem', color: 'var(--c-ondark-muted, #b9bcc3)', lineHeight: 1.55 }}>
              {isEn
                ? 'Open the URL link that appears; verify that the domain name is the official MHD website.'
                : 'Mở liên kết hiện ra; kiểm tra địa chỉ trang thuộc tên miền của MHD.'}
            </span>
          </li>
          <li style={{ display: 'flex', gap: '.8rem' }}>
            <span style={{ width: 26, height: 26, flexShrink: 0, borderRadius: '50%', border: '1px solid rgba(255,255,255,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.76rem', fontWeight: 700 }}>
              3
            </span>
            <span style={{ fontSize: '.9rem', color: 'var(--c-ondark-muted, #b9bcc3)', lineHeight: 1.55 }}>
              {isEn
                ? 'Cross-reference certificate number, issuance date, asset description, and appraiser against the physical paper certificate.'
                : 'So khớp số chứng thư, ngày phát hành, tài sản và thẩm định viên với bản giấy.'}
            </span>
          </li>
        </ol>
      </div>
    </div>
  )
}

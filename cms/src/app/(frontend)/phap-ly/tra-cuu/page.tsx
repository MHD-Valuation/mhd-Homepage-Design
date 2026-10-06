import React from 'react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import LookupClient from './LookupClient'

interface LookupPageProps {
  searchParams?: Promise<{
    locale?: string
  }>
}

export async function generateMetadata({ searchParams }: LookupPageProps) {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const resolvedParams = searchParams ? await searchParams : {}
  const isEn = (resolvedParams?.locale || localeCookie) === 'en'

  return {
    title: isEn ? 'Verify Certificate — MHD Valuation' : 'Kiểm tra chứng thư — MHD Thẩm định giá',
    description: isEn
      ? 'Enter certificate number or scan QR code to verify issuance parameters on the official MHD system.'
      : 'Nhập số chứng thư hoặc quét mã QR để đối chiếu thông tin phát hành trên hệ thống MHD.',
  }
}

export default async function CertificateLookupPage({ searchParams }: LookupPageProps) {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const resolvedParams = searchParams ? await searchParams : {}
  const locale = (resolvedParams?.locale || localeCookie) === 'en' ? 'en' : 'vi'
  const isEn = locale === 'en'

  return (
    <div style={{ minHeight: '100vh', background: 'var(--c-page, #f6f5f2)', color: 'var(--c-ink, #16181c)' }}>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--c-page, #f6f5f2)',
          borderBottom: '1px solid var(--c-border, #e2e0da)',
          padding: 'clamp(3.5rem, 7vw, 6rem) clamp(1rem, 4vw, 2.5rem) clamp(3rem, 6vw, 4.5rem)',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundImage:
              'linear-gradient(rgba(22,24,28,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(22,24,28,.05) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'linear-gradient(100deg, transparent 0%, #000 50%, #000 75%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(100deg, transparent 0%, #000 50%, #000 75%, transparent 100%)',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-10%',
            top: '-40%',
            width: 620,
            height: 620,
            borderRadius: '50%',
            pointerEvents: 'none',
            background: 'radial-gradient(circle, rgba(217,79,10,.12), transparent 65%)',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1240, margin: '0 auto' }}>
          <nav
            aria-label="Breadcrumb"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '.5rem',
              flexWrap: 'wrap',
              fontSize: '.82rem',
              color: 'var(--c-faint, #8a8f96)',
              marginBottom: '1.6rem',
            }}
          >
            <Link href="/" style={{ color: 'var(--c-faint, #8a8f96)' }}>
              {isEn ? 'Home' : 'Trang chủ'}
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/about/phap-ly" style={{ color: 'var(--c-faint, #8a8f96)' }}>
              {isEn ? 'Legal & Standards' : 'Pháp lý'}
            </Link>
            <span aria-hidden="true">/</span>
            <span style={{ color: 'var(--c-ink, #16181c)', fontWeight: 600 }}>
              {isEn ? 'Verify Certificate' : 'Kiểm tra chứng thư'}
            </span>
          </nav>

          <span
            style={{
              display: 'inline-block',
              fontSize: '.76rem',
              fontWeight: 700,
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              color: 'var(--c-accent, #d94f0a)',
              marginBottom: '.8rem',
            }}
          >
            {isEn ? 'Public Verification System' : 'Hệ thống đối chiếu công khai'}
          </span>
          <h1
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(2.3rem, 1.5rem + 2.9vw, 3.8rem)',
              lineHeight: 1.15,
              letterSpacing: '-.02em',
              marginBottom: '1.1rem',
            }}
          >
            {isEn ? 'Certificate Verification' : 'Kiểm tra chứng thư'}
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, .95rem + .3vw, 1.15rem)',
              color: 'var(--c-muted, #5f656d)',
              maxWidth: '62ch',
              lineHeight: 1.6,
            }}
          >
            {isEn
              ? 'Enter certificate number or scan QR code to verify issuance parameters on the official MHD system.'
              : 'Nhập số chứng thư hoặc quét mã QR để đối chiếu thông tin phát hành trên hệ thống MHD.'}
          </p>

          {/* Interactive lookup tool */}
          <LookupClient currentLocale={locale} />
        </div>
      </section>

      {/* Verification Instructions & Notices */}
      <section id="luu-y" style={{ background: '#fff', padding: 'clamp(4rem, 7vw, 6.5rem) 0' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(1rem, 4vw, 2.5rem)' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: 'clamp(2.5rem, 5vw, 5rem)',
              alignItems: 'start',
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
                  color: 'var(--c-accent, #d94f0a)',
                  marginBottom: '.8rem',
                }}
              >
                {isEn ? 'Verification Guidelines' : 'Lưu ý'}
              </span>
              <h2
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontWeight: 600,
                  fontSize: 'clamp(1.8rem, 1.3rem + 1.3vw, 2.5rem)',
                  lineHeight: 1.28,
                  letterSpacing: '-.012em',
                }}
              >
                {isEn ? 'When Cross-referencing Certificates' : 'Khi đối chiếu chứng thư'}
              </h2>
              <div
                style={{
                  marginTop: '2rem',
                  padding: '1.5rem',
                  borderRadius: 12,
                  background: 'var(--c-page, #f6f5f2)',
                  border: '1px solid var(--c-border, #e2e0da)',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '.35rem' }}>
                  {isEn ? 'Information Mismatch?' : 'Thông tin không khớp?'}
                </div>
                <p style={{ fontSize: '.86rem', color: 'var(--c-muted, #5f656d)', marginBottom: '1rem' }}>
                  {isEn
                    ? 'Contact MHD Compliance Department for immediate verification within standard business hours.'
                    : 'Liên hệ bộ phận Pháp chế để được xác minh trong ngày làm việc.'}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem', fontSize: '.92rem', fontWeight: 700 }}>
                  <a href="tel:1900000000" style={{ color: 'var(--c-ink, #16181c)' }}>
                    Hotline: 1900 000 000
                  </a>
                  <a href="mailto:phapche@mhd.com.vn" style={{ color: 'var(--c-ink, #16181c)' }}>
                    phapche@mhd.com.vn
                  </a>
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                gap: '1.8rem 2rem',
              }}
            >
              <div style={{ borderTop: '2px solid var(--c-ink, #16181c)', paddingTop: '1.1rem' }}>
                <span
                  style={{
                    display: 'block',
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    color: 'var(--c-border, #e2e0da)',
                    lineHeight: 1,
                    marginBottom: '.8rem',
                  }}
                >
                  01
                </span>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '.35rem' }}>
                  {isEn ? 'Cross-check Hardcopy' : 'Đối chiếu với bản giấy'}
                </h3>
                <p style={{ fontSize: '.88rem', color: 'var(--c-muted, #5f656d)', lineHeight: 1.6 }}>
                  {isEn
                    ? 'Verify each field carefully; any mismatch is an indicator requiring official re-verification.'
                    : 'So khớp từng trường thông tin; một trường không khớp là dấu hiệu cần xác minh lại.'}
                </p>
              </div>

              <div style={{ borderTop: '2px solid var(--c-ink, #16181c)', paddingTop: '1.1rem' }}>
                <span
                  style={{
                    display: 'block',
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    color: 'var(--c-border, #e2e0da)',
                    lineHeight: 1,
                    marginBottom: '.8rem',
                  }}
                >
                  02
                </span>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '.35rem' }}>
                  {isEn ? 'Validity Period' : 'Thời hạn hiệu lực'}
                </h3>
                <p style={{ fontSize: '.88rem', color: 'var(--c-muted, #5f656d)', lineHeight: 1.6 }}>
                  {isEn
                    ? 'The certificate can only be utilized within the validity period explicitly stated on the document.'
                    : 'Chứng thư chỉ được sử dụng trong thời hạn hiệu lực ghi trên chứng thư.'}
                </p>
              </div>

              <div style={{ borderTop: '2px solid var(--c-ink, #16181c)', paddingTop: '1.1rem' }}>
                <span
                  style={{
                    display: 'block',
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    color: 'var(--c-border, #e2e0da)',
                    lineHeight: 1,
                    marginBottom: '.8rem',
                  }}
                >
                  03
                </span>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '.35rem' }}>
                  {isEn ? 'Authorized Purpose' : 'Đúng mục đích'}
                </h3>
                <p style={{ fontSize: '.88rem', color: 'var(--c-muted, #5f656d)', lineHeight: 1.6 }}>
                  {isEn
                    ? 'Valuation conclusions are strictly applicable for the specific purpose stated in the certificate and contract.'
                    : 'Kết quả thẩm định chỉ sử dụng cho mục đích ghi trên chứng thư và hợp đồng.'}
                </p>
              </div>

              <div style={{ borderTop: '2px solid var(--c-ink, #16181c)', paddingTop: '1.1rem' }}>
                <span
                  style={{
                    display: 'block',
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    color: 'var(--c-border, #e2e0da)',
                    lineHeight: 1,
                    marginBottom: '.8rem',
                  }}
                >
                  04
                </span>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '.35rem' }}>
                  {isEn ? 'Confidentiality' : 'Bảo mật thông tin'}
                </h3>
                <p style={{ fontSize: '.88rem', color: 'var(--c-muted, #5f656d)', lineHeight: 1.6 }}>
                  {isEn
                    ? 'The lookup system displays summarized issuance parameters and does not disclose sensitive asset values.'
                    : 'Trang tra cứu chỉ hiển thị thông tin rút gọn, không công bố giá trị tài sản.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

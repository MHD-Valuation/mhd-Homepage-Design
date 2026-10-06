import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'

interface PageProps {
  searchParams?: Promise<{ locale?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = searchParams ? await searchParams : {}
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const locale = (resolvedParams.locale || localeCookie) === 'en' ? 'en' : 'vi'

  if (locale === 'en') {
    return {
      title: 'Office Network & Branches — MHD Valuation',
      description:
        'Head office in Ho Chi Minh City and branches in Hanoi, Da Nang, and Can Tho providing valuation services nationwide.',
    }
  }

  return {
    title: 'Hệ thống Văn phòng & Chi nhánh — MHD Thẩm định giá',
    description:
      'Trụ sở chính tại TP. Hồ Chí Minh và mạng lưới chi nhánh tại Hà Nội, Đà Nẵng, Cần Thơ tiếp nhận và xử lý hồ sơ thẩm định giá trên toàn quốc.',
  }
}

export default async function OfficeNetworkPage({ searchParams }: PageProps) {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const resolvedParams = searchParams ? await searchParams : {}
  const locale = (resolvedParams?.locale || localeCookie) === 'en' ? 'en' : 'vi'
  const isEn = locale === 'en'

  const offices = [
    {
      name: isEn ? 'Head Office — Ho Chi Minh City' : 'Trụ sở chính — TP. Hồ Chí Minh',
      badge: isEn ? 'Headquarters' : 'Trụ sở điều hành',
      address: isEn
        ? 'Tầng 8, Tòa nhà MHD Building, Quận 1, TP. Hồ Chí Minh'
        : 'Tầng 8, Tòa nhà MHD Building, Quận 1, TP. Hồ Chí Minh',
      phone: 'Hotline: 028 3515 3516',
      email: 'hcm@mhdvaluation.vn',
      hours: isEn ? 'Mon - Fri: 08:00 - 17:30 | Sat: 08:00 - 12:00' : 'Thứ 2 - Thứ 6: 08:00 - 17:30 | Thứ 7: 08:00 - 12:00',
      coverage: isEn ? 'Southern Key Economic Zone & Central Highland' : 'Khu vực Đông Nam Bộ & Tây Nguyên',
    },
    {
      name: isEn ? 'Northern Regional Office — Hanoi' : 'Chi nhánh Miền Bắc — Hà Nội',
      badge: isEn ? 'Northern Hub' : 'Chi nhánh miền Bắc',
      address: isEn
        ? 'Tầng 12, Tòa nhà Capital Tower, Quận Hoàn Kiếm, TP. Hà Nội'
        : 'Tầng 12, Tòa nhà Capital Tower, Quận Hoàn Kiếm, TP. Hà Nội',
      phone: '(024) 3933 xxxx',
      email: 'hanoi@mhdvaluation.vn',
      hours: isEn ? 'Mon - Fri: 08:00 - 17:30' : 'Thứ 2 - Thứ 6: 08:00 - 17:30',
      coverage: isEn ? 'Hanoi, Red River Delta & Northern Industrial Belts' : 'Hà Nội & các tỉnh công nghiệp phía Bắc',
    },
    {
      name: isEn ? 'Central Regional Office — Da Nang' : 'Văn phòng Miền Trung — Đà Nẵng',
      badge: isEn ? 'Central Hub' : 'Chi nhánh miền Trung',
      address: isEn
        ? 'Tầng 5, Tòa nhà Indochina Riverside, Quận Hải Châu, TP. Đà Nẵng'
        : 'Tầng 5, Tòa nhà Indochina Riverside, Quận Hải Châu, TP. Đà Nẵng',
      phone: '(0236) 3899 xxxx',
      email: 'danang@mhdvaluation.vn',
      hours: isEn ? 'Mon - Fri: 08:00 - 17:30' : 'Thứ 2 - Thứ 6: 08:00 - 17:30',
      coverage: isEn ? 'Da Nang, Quang Nam, Thua Thien Hue & Central Coast' : 'Đà Nẵng & Vùng Duyên hải Nam Trung Bộ',
    },
    {
      name: isEn ? 'Mekong Delta Representative Office — Can Tho' : 'Văn phòng Tây Nam Bộ — Cần Thơ',
      badge: isEn ? 'Mekong Hub' : 'Văn phòng Tây Nam Bộ',
      address: isEn
        ? 'Tầng 4, Tòa nhà STS Tower, Đại lộ Hòa Bình, Quận Ninh Kiều, TP. Cần Thơ'
        : 'Tầng 4, Tòa nhà STS Tower, Đại lộ Hòa Bình, Quận Ninh Kiều, TP. Cần Thơ',
      phone: '(0292) 3788 xxxx',
      email: 'cantho@mhdvaluation.vn',
      hours: isEn ? 'Mon - Fri: 08:00 - 17:30' : 'Thứ 2 - Thứ 6: 08:00 - 17:30',
      coverage: isEn ? '13 Provinces & Cities across Mekong River Delta' : 'TP. Cần Thơ và 12 tỉnh Đồng bằng sông Cửu Long',
    },
  ]

  return (
    <main style={{ background: 'var(--c-page, #f6f5f2)', color: 'var(--c-ink, #16181c)' }}>
      {/* 1. HERO SECTION */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--c-page, #f6f5f2)',
          padding: 'clamp(3rem, 6vw, 5rem) 0 3rem',
          borderBottom: '1px solid var(--c-border, #e2e0da)',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem, 4vw, 2.5rem)' }}>
          <nav
            aria-label="Breadcrumb"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '.5rem',
              fontSize: '.82rem',
              color: 'var(--c-faint, #8a8f96)',
              marginBottom: '1.6rem',
            }}
          >
            <Link href="/" style={{ color: 'var(--c-faint, #8a8f96)', textDecoration: 'none' }}>
              {isEn ? 'Home' : 'Trang chủ'}
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/contact" style={{ color: 'var(--c-faint, #8a8f96)', textDecoration: 'none' }}>
              {isEn ? 'Contact' : 'Liên hệ'}
            </Link>
            <span aria-hidden="true">/</span>
            <span style={{ color: 'var(--c-ink, #16181c)', fontWeight: 600 }}>
              {isEn ? 'Office Network' : 'Hệ thống văn phòng'}
            </span>
          </nav>

          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '.5rem',
              fontSize: '.72rem',
              fontWeight: 700,
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              color: 'var(--c-accent, #d94f0a)',
              border: '1px solid var(--c-border, #e2e0da)',
              background: '#fff',
              padding: '.45rem .95rem',
              borderRadius: '999px',
              marginBottom: '1.2rem',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {isEn ? 'Nationwide Valuation Coverage' : 'Mạng lưới hoạt động toàn quốc'}
          </span>

          <h1
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: 'clamp(2.2rem, 1.4rem + 2.6vw, 3.6rem)',
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: '-.02em',
              maxWidth: '26ch',
              marginBottom: '1.2rem',
            }}
          >
            {isEn ? 'Offices & Regional Branches' : 'Hệ thống Trụ sở & Chi nhánh Toàn quốc'}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, .95rem + .3vw, 1.15rem)',
              color: 'var(--c-muted, #5f656d)',
              maxWidth: '58ch',
              lineHeight: 1.65,
              marginBottom: '2rem',
            }}
          >
            {isEn
              ? 'MHD Valuation operates direct offices in key commercial centers, enabling prompt on-site physical inspection and fast turn-around times across all 63 provinces.'
              : 'Với trụ sở chính tại TP. Hồ Chí Minh cùng mạng lưới chi nhánh tại các vùng kinh tế trọng điểm, MHD sẵn sàng thực hiện khảo sát hiện trạng tài sản và thẩm định giá nhanh chóng trên toàn bộ 63 tỉnh thành.'}
          </p>
        </div>
      </section>

      {/* 2. OFFICES DIRECTORY */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: 'clamp(3.5rem, 6vw, 5.5rem) clamp(1rem, 4vw, 2.5rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
          {offices.map((office, idx) => (
            <div
              key={idx}
              style={{
                background: '#fff',
                borderRadius: '16px',
                border: '1px solid var(--c-border, #e2e0da)',
                padding: '2.2rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '.06em',
                    padding: '.35rem .75rem',
                    borderRadius: '6px',
                    background: 'var(--c-page, #f6f5f2)',
                    color: 'var(--c-accent, #d94f0a)',
                    marginBottom: '1rem',
                  }}
                >
                  {office.badge}
                </span>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--c-ink, #16181c)', marginBottom: '1.2rem' }}>
                  {office.name}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '.85rem', fontSize: '.88rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.6rem' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span style={{ color: 'var(--c-ink, #16181c)' }}>{office.address}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2" style={{ flexShrink: 0 }}>
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span style={{ color: 'var(--c-ink, #16181c)', fontWeight: 600 }}>{office.phone}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2" style={{ flexShrink: 0 }}>
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span style={{ color: 'var(--c-muted, #5f656d)' }}>{office.email}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2" style={{ flexShrink: 0 }}>
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span style={{ color: 'var(--c-faint, #8a8f96)', fontSize: '.84rem' }}>{office.hours}</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1.6rem', paddingTop: '1.2rem', borderTop: '1px solid var(--c-border, #e2e0da)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '.8rem', color: 'var(--c-faint, #8a8f96)' }}>
                  {office.coverage}
                </span>
                <Link
                  href="/contact"
                  style={{
                    fontSize: '.84rem',
                    fontWeight: 700,
                    color: 'var(--c-accent, #d94f0a)',
                    textDecoration: 'none',
                  }}
                >
                  {isEn ? 'Contact Branch' : 'Liên hệ'} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CTA */}
      <section
        style={{
          background: 'var(--c-partner, #23262c)',
          color: '#fff',
          padding: '4rem 0',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1rem, 4vw, 2.5rem)', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: '1.8rem', fontWeight: 600, color: '#fff' }}>
              {isEn ? 'Need On-Site Asset Inspection?' : 'Cần thẩm định hiện trạng tài sản tại địa phương?'}
            </h3>
            <p style={{ color: 'var(--c-ondark-muted, #b9bcc3)', marginTop: '.4rem' }}>
              {isEn ? 'Our mobile appraiser teams are deployed within 24 hours of engagement confirmation.' : 'Đội ngũ thẩm định viên MHD trực tiếp khảo sát và xử lý hồ sơ ngay tại địa bàn tài sản.'}
            </p>
          </div>
          <Link
            href="/contact"
            style={{
              padding: '.9rem 1.8rem',
              background: 'var(--c-accent, #d94f0a)',
              color: '#fff',
              fontWeight: 700,
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            {isEn ? 'Submit Valuation Request' : 'Gửi yêu cầu thẩm định'}
          </Link>
        </div>
      </section>
    </main>
  )
}

import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { getCachedTeamList } from '@/lib/cachedQueries'

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
      title: 'Certified Valuers & Valuation Team — MHD Valuation',
      description:
        'Directory of Certified Practicing Valuers licensed by the Ministry of Finance Vietnam, senior consultants, and quality control experts at MHD.',
    }
  }

  return {
    title: 'Đội ngũ Thẩm định viên & Chuyên môn — MHD Thẩm định giá',
    description:
      'Danh bạ thẩm định viên về giá đủ điều kiện hành nghề theo quy định của Bộ Tài chính, chuyên gia định giá tài sản và hội đồng kiểm soát chất lượng MHD.',
  }
}

const DEFAULT_TEAM = {
  vi: [
    {
      name: 'Nguyễn Văn Anh',
      role: 'Thẩm định viên về giá — Phó Tổng Giám đốc Chuyên môn',
      cardId: 'Thẻ TĐV số: 18.042/BTC',
      experienceYears: 16,
      field: 'Định giá Doanh nghiệp & M&A',
      bio: 'Hơn 16 năm kinh nghiệm thẩm định giá tài sản tài chính, doanh nghiệp Nhà nước cổ phần hóa và dự án FDI quy mô lớn.',
    },
    {
      name: 'Trần Minh Hoàng',
      role: 'Thẩm định viên về giá — Trưởng Khối Bất động sản',
      cardId: 'Thẻ TĐV số: 20.115/BTC',
      experienceYears: 14,
      field: 'Bất động sản phức hợp & Đất dự án',
      bio: 'Chuyên gia định giá các tổ hợp khu đô thị, dự án nghỉ dưỡng và trung tâm thương mại phục vụ phát hành trái phiếu và cấp tín dụng.',
    },
    {
      name: 'Lê Thu Hương',
      role: 'Thẩm định viên về giá — Trưởng Khối Máy thiết bị & Hạ tầng',
      cardId: 'Thẻ TĐV số: 19.288/BTC',
      experienceYears: 12,
      field: 'Dây chuyền công nghệ & Khu công nghiệp',
      bio: 'Kinh nghiệm sâu rộng trong khảo sát, định giá máy móc thiết bị nhập khẩu, trạm năng lượng và nhà xưởng tiêu chuẩn quốc tế.',
    },
    {
      name: 'Phạm Quốc Bảo',
      role: 'Thẩm định viên về giá — Trưởng Ban Kiểm soát Chất lượng',
      cardId: 'Thẻ TĐV số: 17.091/BTC',
      experienceYears: 18,
      field: 'Kiểm soát tuân thủ & Chuẩn mực TĐG',
      bio: 'Chịu trách nhiệm thẩm tra độc lập toàn bộ mô hình tính toán, hồ sơ chứng thư trước khi trình Tổng Giám đốc ký phát hành.',
    },
    {
      name: 'Đặng Tuấn Kiệt',
      role: 'Chuyên viên Phân tích Định giá Cấp cao',
      cardId: 'Thẻ TĐV số: 22.304/BTC',
      experienceYears: 9,
      field: 'Tài sản vô hình & Nhãn hiệu thương mại',
      bio: 'Chuyên sâu thẩm định thương hiệu, quyền sở hữu trí tuệ, phần mềm công nghệ theo phương pháp thu nhập và chiết khấu dòng tiền.',
    },
    {
      name: 'Vũ Hải Yến',
      role: 'Thẩm định viên về giá — Chi nhánh Hà Nội',
      cardId: 'Thẻ TĐV số: 21.056/BTC',
      experienceYears: 11,
      field: 'Dự án đầu tư & Tái cấu trúc vốn',
      bio: 'Phụ trách điều phối các hồ sơ định giá dự án đầu tư khu vực phía Bắc cho các ngân hàng thương mại nhà nước và tư nhân.',
    },
  ],
  en: [
    {
      name: 'Nguyen Van Anh',
      role: 'Certified Practicing Valuer — Deputy Managing Director',
      cardId: 'Valuer License No: 18.042/BTC',
      experienceYears: 16,
      field: 'Enterprise Valuation & M&A Advisory',
      bio: 'Over 16 years of expertise in corporate asset valuation, state-owned enterprise equitization, and large-scale FDI transactions.',
    },
    {
      name: 'Tran Minh Hoang',
      role: 'Certified Practicing Valuer — Head of Real Estate Practice',
      cardId: 'Valuer License No: 20.115/BTC',
      experienceYears: 14,
      field: 'Mixed-Use Developments & Township Projects',
      bio: 'Specialist in township land appraisal, commercial assets, and urban complexes for corporate debt issuance and syndicated financing.',
    },
    {
      name: 'Le Thu Huong',
      role: 'Certified Practicing Valuer — Head of Plant & Infrastructure',
      cardId: 'Valuer License No: 19.288/BTC',
      experienceYears: 12,
      field: 'Technology Lines & Industrial Parks',
      bio: 'Extensive track record inspecting and appraising imported machinery, heavy manufacturing equipment, and power utilities.',
    },
    {
      name: 'Pham Quoc Bao',
      role: 'Certified Practicing Valuer — Head of Quality Assurance',
      cardId: 'Valuer License No: 17.091/BTC',
      experienceYears: 18,
      field: 'Regulatory Compliance & Standards Assurance',
      bio: 'Conducts independent verification on financial models, evidence, and certificates prior to Managing Director final signature.',
    },
    {
      name: 'Dang Tuan Kiet',
      role: 'Senior Valuation Analyst',
      cardId: 'Valuer License No: 22.304/BTC',
      experienceYears: 9,
      field: 'Intangibles & Brand Equity Valuation',
      bio: 'Focuses on IP rights, software, and commercial brands applying Income & Discounted Cash Flow valuation models.',
    },
    {
      name: 'Vu Hai Yen',
      role: 'Certified Practicing Valuer — Hanoi Branch Director',
      cardId: 'Valuer License No: 21.056/BTC',
      experienceYears: 11,
      field: 'Capital Projects & Syndicated Debt Appraisals',
      bio: 'Oversees Northern Vietnam operations servicing leading commercial banks, audited groups, and state agencies.',
    },
  ],
}

export default async function TeamPage({ searchParams }: PageProps) {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const resolvedParams = searchParams ? await searchParams : {}
  const locale = (resolvedParams?.locale || localeCookie) === 'en' ? 'en' : 'vi'
  const isEn = locale === 'en'

  const teamList = await getCachedTeamList(locale as 'vi' | 'en')
  const displayTeam = teamList.length > 0 ? teamList : (isEn ? DEFAULT_TEAM.en : DEFAULT_TEAM.vi)

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
            <Link href="/about" style={{ color: 'var(--c-faint, #8a8f96)', textDecoration: 'none' }}>
              {isEn ? 'About MHD' : 'Về MHD'}
            </Link>
            <span aria-hidden="true">/</span>
            <span style={{ color: 'var(--c-ink, #16181c)', fontWeight: 600 }}>
              {isEn ? 'Valuation Team' : 'Đội ngũ chuyên môn'}
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            {isEn ? 'Ministry of Finance Licensed Valuers' : 'Thẩm định viên hành nghề Bộ Tài chính'}
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
            {isEn ? 'Certified Appraisers & Specialists' : 'Đội ngũ Thẩm định viên & Ban Chuyên môn'}
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
              ? 'Our core team brings together practicing valuers certified under the Vietnam Law on Price, experienced across four asset divisions: Enterprise Valuation, Real Estate, Plant & Machinery, and Intangible Assets.'
              : 'MHD quy tụ đội ngũ thẩm định viên về giá được Bộ Tài chính cấp thẻ hành nghề theo quy định Luật Giá 2023, chuyên sâu trong 4 khối nghiệp vụ: Doanh nghiệp, Bất động sản, Máy móc thiết bị và Tài sản vô hình.'}
          </p>

          {/* Standards Pledge */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              padding: '1.4rem 1.6rem',
              background: '#fff',
              border: '1px solid var(--c-border, #e2e0da)',
              borderRadius: '12px',
              maxWidth: '820px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2">
                <path d="M9 12l2 2 4-4M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7z" />
              </svg>
              <span style={{ fontSize: '.88rem', fontWeight: 600 }}>
                {isEn ? '100% MOF Certified Cards' : 'Thẻ Thẩm định viên Bộ Tài chính cấp'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span style={{ fontSize: '.88rem', fontWeight: 600 }}>
                {isEn ? '3-Tier Quality Review Protocol' : 'Kiểm soát chất lượng 3 cấp độc lập'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d94f0b" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <span style={{ fontSize: '.88rem', fontWeight: 600 }}>
                {isEn ? 'Average 12+ Years Experience' : 'Kinh nghiệm trung bình 12+ năm'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TEAM DIRECTORY GRID */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: 'clamp(3.5rem, 6vw, 5.5rem) clamp(1rem, 4vw, 2.5rem)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2rem',
          }}
        >
          {displayTeam.map((member: any, idx: number) => {
            const initials = member.name ? member.name.split(' ').map((n: string) => n[0]).slice(-2).join('') : 'TĐ'
            return (
              <div
                key={member.id || idx}
                style={{
                  background: '#fff',
                  borderRadius: '16px',
                  border: '1px solid var(--c-border, #e2e0da)',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1.4rem' }}>
                    <div
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'var(--c-page, #f6f5f2)',
                        border: '2px solid var(--c-border, #e2e0da)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: 'var(--c-ink, #16181c)',
                        flexShrink: 0,
                      }}
                    >
                      {initials}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--c-ink, #16181c)' }}>
                        {member.name}
                      </h3>
                      <span style={{ fontSize: '.84rem', color: 'var(--c-accent, #d94f0a)', fontWeight: 600, display: 'block', marginTop: '.2rem' }}>
                        {member.position || member.role}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', marginBottom: '1.2rem', fontSize: '.86rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                      <span style={{ color: 'var(--c-faint, #8a8f96)', minWidth: '95px' }}>
                        {isEn ? 'License Card:' : 'Số thẻ TĐV:'}
                      </span>
                      <strong style={{ color: 'var(--c-ink, #16181c)', fontFamily: 'monospace' }}>
                        {member.cardId || (isEn ? 'Licensed Valuer' : 'Thẩm định viên BTC')}
                      </strong>
                    </div>

                    {member.experienceYears && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                        <span style={{ color: 'var(--c-faint, #8a8f96)', minWidth: '95px' }}>
                          {isEn ? 'Experience:' : 'Kinh nghiệm:'}
                        </span>
                        <span style={{ color: 'var(--c-ink, #16181c)', fontWeight: 600 }}>
                          {member.experienceYears} {isEn ? 'years in valuation' : 'năm hành nghề'}
                        </span>
                      </div>
                    )}

                    {member.field && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                        <span style={{ color: 'var(--c-faint, #8a8f96)', minWidth: '95px' }}>
                          {isEn ? 'Practice Area:' : 'Chuyên môn:'}
                        </span>
                        <span style={{ color: 'var(--c-muted, #5f656d)' }}>{member.field}</span>
                      </div>
                    )}
                  </div>

                  {member.bio && (
                    <p style={{ fontSize: '.88rem', color: 'var(--c-muted, #5f656d)', lineHeight: 1.6, borderTop: '1px solid var(--c-border, #e2e0da)', paddingTop: '1rem' }}>
                      {member.bio}
                    </p>
                  )}
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--c-border, #e2e0da)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '.76rem', color: 'var(--c-faint, #8a8f96)' }}>
                    {isEn ? 'Law on Price 2023 Compliant' : 'Tuân thủ Luật Giá 2023'}
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
                    {isEn ? 'Consult' : 'Tư vấn'} →
                  </Link>
                </div>
              </div>
            )
          })}
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
              {isEn ? 'Connect with Our Valuation Specialists' : 'Liên hệ trao đổi cùng chuyên gia MHD'}
            </h3>
            <p style={{ color: 'var(--c-ondark-muted, #b9bcc3)', marginTop: '.4rem' }}>
              {isEn ? 'Direct consultation with lead appraisers on complex asset valuation dossiers.' : 'Làm việc trực tiếp cùng thẩm định viên phụ trách hồ sơ để được tư vấn phương pháp phù hợp.'}
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
            {isEn ? 'Book a Consultation' : 'Đặt lịch tư vấn chuyên môn'}
          </Link>
        </div>
      </section>
    </main>
  )
}

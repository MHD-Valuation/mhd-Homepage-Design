import React from 'react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import ProcessToc from './ProcessToc'

interface PageProps {
  searchParams?: Promise<{
    locale?: string
  }>
}

export async function generateMetadata({ searchParams }: PageProps) {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const resolvedParams = searchParams ? await searchParams : {}
  const isEn = (resolvedParams?.locale || localeCookie) === 'en'

  return {
    title: isEn ? 'Process & Standards — MHD Valuation' : 'Quy trình & tiêu chuẩn — MHD Thẩm định giá',
    description: isEn
      ? 'Legal grounds, operational methodology, and quality control mechanisms applied to all MHD valuation engagements.'
      : 'Căn cứ pháp lý, quy trình thực hiện và cơ chế kiểm soát chất lượng MHD áp dụng cho mọi hồ sơ thẩm định giá.',
  }
}

export default async function QuyTrinhTieuChuanPage({ searchParams }: PageProps) {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('mhd_locale')?.value
  const resolvedParams = searchParams ? await searchParams : {}
  const locale = (resolvedParams?.locale || localeCookie) === 'en' ? 'en' : 'vi'
  const isEn = locale === 'en'

  const tocItems = [
    { href: '#khung-phap-ly', label: isEn ? 'Applicable Legal Framework' : 'Khung pháp lý áp dụng' },
    { href: '#quy-trinh', label: isEn ? 'Six-Step Valuation Process' : 'Quy trình sáu bước' },
    { href: '#kiem-soat', label: isEn ? 'Quality Control System' : 'Kiểm soát chất lượng' },
    { href: '#luu-tru', label: isEn ? 'Dossier Retention' : 'Lưu trữ hồ sơ' },
    { href: '#tien-do', label: isEn ? 'Engagement Timeline' : 'Tiến độ thực hiện' },
  ]

  const sixSteps = isEn
    ? [
        {
          step: '01',
          title: 'General Asset Identification & Valuation Basis',
          desc: 'Clarify legal and physical characteristics of the asset, valuation purpose, valuation effective date, and applied value basis.',
          citation: 'Basis: Vietnam Valuation Standards on General Standards',
        },
        {
          step: '02',
          title: 'Valuation Work Plan Formulation',
          desc: 'Establish scope of work, technical team assignment, and schedule for on-site field inspection.',
          citation: 'Basis: Approved Internal Planning & Work Assignment',
        },
        {
          step: '03',
          title: 'Field Inspection & Market Data Collection',
          desc: 'Inspect physical asset conditions; gather legal title documents and verifiable market evidence.',
          citation: 'Basis: Inspection minutes and photographic records in dossier',
        },
        {
          step: '04',
          title: 'Data & Market Evidence Analysis',
          desc: 'Review data reliability, verify comparable transactions, and analyze industry dynamics and sub-markets.',
          citation: 'Basis: Verified database and market comparables',
        },
        {
          step: '05',
          title: 'Asset Value Determination',
          desc: 'Select and apply appropriate valuation approaches; model value indications and reconcile methodology results.',
          citation: 'Basis: Analytical calculation models and technical explanatory notes',
        },
        {
          step: '06',
          title: 'Report Preparation, Certification & Issuance',
          desc: 'Internal quality control review, sign-off on Valuation Certificate, and issuance of certified printed and QR-secured digital copies.',
          citation: 'Basis: Valuation Report & Valuation Certificate',
        },
      ]
    : [
        {
          step: '01',
          title: 'Xác định tổng quát về tài sản và cơ sở giá trị',
          desc: 'Làm rõ đặc điểm pháp lý & thực tế của tài sản, mục đích và thời điểm thẩm định, cơ sở giá trị áp dụng.',
          citation: 'Căn cứ: Chuẩn mực thẩm định giá Việt Nam về chuẩn mực chung',
        },
        {
          step: '02',
          title: 'Lập kế hoạch thẩm định giá',
          desc: 'Xác định phạm vi công việc, phân công chuyên môn và lịch khảo sát thực địa thực tế.',
          citation: 'Căn cứ: Kế hoạch và phân công nội bộ có sự phê duyệt',
        },
        {
          step: '03',
          title: 'Khảo sát thực tế, thu thập thông tin',
          desc: 'Kiểm tra hiện trạng tài sản; thu thập chứng thư pháp lý và thông tin thị trường.',
          citation: 'Căn cứ: Biên bản khảo sát, hình ảnh thực địa trong hồ sơ',
        },
        {
          step: '04',
          title: 'Phân tích thông tin',
          desc: 'Soát xét tính hợp lý, đối chiếu thông tin giao dịch, phân tích ngành và phân khúc liên quan.',
          citation: 'Căn cứ: Cơ sở dữ liệu đã được kiểm chứng',
        },
        {
          step: '05',
          title: 'Xác định giá trị tài sản',
          desc: 'Lựa chọn và áp dụng các cách tiếp cận phù hợp; ước tính giá trị và đối chiếu kết quả giữa các phương pháp.',
          citation: 'Căn cứ: Mô hình tính toán kèm thuyết minh',
        },
        {
          step: '06',
          title: 'Lập báo cáo, chứng thư và phát hành',
          desc: 'Soát xét chất lượng nội bộ, ký ban hành chứng thư, gửi kèm bản in và bản điện tử có mã QR.',
          citation: 'Căn cứ: Báo cáo và chứng thư thẩm định giá',
        },
      ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--c-page, #f6f5f2)', color: 'var(--c-ink, #16181c)', overflowX: 'hidden' }}>
      {/* Responsive Styles for Quy Trinh & Tieu Chuan */}
      <style>{`
        .mhd-process-content-grid {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 clamp(1rem, 4vw, 2.5rem);
          display: grid;
          grid-template-columns: 220px minmax(0, 1fr);
          gap: clamp(3rem, 6vw, 6rem);
          align-items: start;
          width: 100%;
          min-width: 0;
        }
        .mhd-legal-table-row {
          display: grid;
          grid-template-columns: clamp(200px, 28%, 260px) 1fr;
          gap: 1.5rem;
          padding: clamp(0.75rem, 1.5vw, 1.1rem) 0;
          align-items: baseline;
        }
        .mhd-process-step-item {
          display: flex;
          gap: clamp(0.75rem, 2vw, 1.4rem);
          padding: clamp(0.85rem, 1.8vw, 1.4rem) 0;
          align-items: flex-start;
        }
        .mhd-hero-accent-hex {
          position: absolute;
          right: clamp(3rem, 10vw, 12rem);
          top: 50%;
          transform: translateY(-50%);
          width: 130px;
          height: 130px;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 1023px) {
          .mhd-process-section-body {
            padding-top: 0 !important;
          }
          .mhd-process-content-grid {
            grid-template-columns: 1fr !important;
            gap: 1.8rem !important;
            overflow-x: hidden !important;
          }
        }

        @media (max-width: 767px) {
          .mhd-hero-accent-hex {
            display: none !important;
          }
          .mhd-legal-table-row {
            display: flex !important;
            flex-direction: column !important;
            gap: 0.35rem !important;
            padding: 0.85rem 0 !important;
          }
        }
      `}</style>

      {/* 1. HERO SECTION */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--c-page, #f6f5f2)',
          borderBottom: '1px solid var(--c-border, #e2e0da)',
          padding: 'clamp(2.5rem, 5vw, 5rem) clamp(1rem, 4vw, 2.5rem) clamp(2.2rem, 4.5vw, 4rem)',
        }}
      >
        {/* Subtle grid pattern background */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundImage:
              'linear-gradient(rgba(22,24,28,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(22,24,28,.04) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Floating Hexagon Accent matching screenshot */}
        <div
          aria-hidden="true"
          className="mhd-hero-accent-hex"
        >
          <svg viewBox="0 0 100 100" width="120" height="120" fill="none" stroke="rgba(217,79,10,.3)" strokeWidth="1.8">
            <polygon points="50 5, 90 27.5, 90 72.5, 50 95, 10 72.5, 10 27.5" />
          </svg>
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1240, margin: '0 auto', width: '100%' }}>
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '.45rem',
              flexWrap: 'wrap',
              fontSize: 'clamp(0.74rem, 0.7rem + 0.15vw, 0.82rem)',
              color: 'var(--c-faint, #8a8f96)',
              marginBottom: '1.2rem',
            }}
          >
            <Link href="/" style={{ color: 'var(--c-faint, #8a8f96)', textDecoration: 'none' }}>
              {isEn ? 'Home' : 'Trang chủ'}
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/about" style={{ color: 'var(--c-faint, #8a8f96)', textDecoration: 'none' }}>
              {isEn ? 'Legal & Compliance' : 'Pháp lý'}
            </Link>
            <span aria-hidden="true">/</span>
            <span style={{ color: 'var(--c-ink, #16181c)', fontWeight: 600 }}>
              {isEn ? 'Process & Standards' : 'Quy trình & tiêu chuẩn'}
            </span>
          </nav>

          {/* Page Title */}
          <h1
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1.75rem, 1.35rem + 1.5vw, 3.2rem)',
              lineHeight: 1.18,
              letterSpacing: '-.02em',
              marginBottom: '.85rem',
              color: 'var(--c-ink, #16181c)',
            }}
          >
            {isEn ? 'Process & Standards' : 'Quy trình & tiêu chuẩn'}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(0.86rem, 0.82rem + 0.15vw, 1.05rem)',
              color: 'var(--c-muted, #5f656d)',
              maxWidth: '65ch',
              lineHeight: 1.55,
              marginBottom: '1.2rem',
            }}
          >
            {isEn
              ? 'Legal grounds, operational methodology, and quality control mechanisms applied by MHD to all valuation engagements.'
              : 'Căn cứ pháp lý, quy trình thực hiện và cơ chế kiểm soát chất lượng MHD áp dụng cho mọi hồ sơ thẩm định giá.'}
          </p>

          {/* Metadata */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem', flexWrap: 'wrap', fontSize: '.84rem', color: 'var(--c-muted, #5f656d)' }}>
            <span>{isEn ? 'Last updated: ' : 'Cập nhật lần cuối: '}<strong>09/2026</strong></span>
          </div>
        </div>
      </section>

      {/* 2. MAIN TWO-COLUMN CONTENT */}
      <section className="mhd-process-section-body" style={{ background: '#fff', padding: 'clamp(2.5rem, 5vw, 4.5rem) 0 clamp(3.5rem, 6vw, 6rem)' }}>
        <div className="mhd-process-content-grid">
          {/* Left Sticky Sidebar (MỤC LỤC) with Active indicator bar & scroll spy */}
          <ProcessToc items={tocItems} title={isEn ? 'TABLE OF CONTENTS' : 'MỤC LỤC'} />

          {/* Right Main Body */}
          <div style={{ minWidth: 0, width: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(2rem, 3.5vw, 3.5rem)' }}>
            {/* 01. KHUNG PHÁP LÝ ÁP DỤNG */}
            <section id="khung-phap-ly" style={{ scrollMarginTop: 110 }}>
              <span style={{ fontSize: '.74rem', fontWeight: 700, color: 'var(--c-accent, #d94f0a)', display: 'block', marginBottom: '.35rem' }}>
                01
              </span>
              <h2 style={{ fontSize: 'clamp(1.1rem, 1.02rem + 0.3vw, 1.45rem)', fontWeight: 700, color: 'var(--c-ink, #16181c)', marginBottom: '.75rem' }}>
                {isEn ? 'Applicable Legal Framework' : 'Khung pháp lý áp dụng'}
              </h2>
              <p style={{ fontSize: 'clamp(0.86rem, 0.82rem + 0.15vw, 0.95rem)', color: 'var(--c-muted, #5f656d)', lineHeight: 1.65, marginBottom: '1.4rem' }}>
                {isEn
                  ? 'MHD conducts valuations in strict accordance with the Law on Price and the Vietnam Valuation Standards promulgated by the Ministry of Finance.'
                  : 'MHD thực hiện thẩm định giá theo Luật Giá và hệ thống Chuẩn mực thẩm định giá Việt Nam do Bộ Tài chính ban hành.'}
              </p>

              {/* Legal Reference Table matching screenshot */}
              <div
                style={{
                  borderTop: '1px solid var(--c-border, #e2e0da)',
                  borderBottom: '1px solid var(--c-border, #e2e0da)',
                  overflow: 'hidden',
                  background: '#ffffff',
                }}
              >
                {(isEn
                  ? [
                      {
                        code: 'Law on Price No. 16/2023/QH15',
                        desc: 'Governing valuation activities, professional bodies, and statutory rights, duties, and legal responsibilities of certified appraisers & firms.',
                      },
                      {
                        code: 'Circular No. 30/2024/TT-BTC',
                        desc: 'General Valuation Standards: professional code of ethics, engagement scope, value bases, and valuation dossiers.',
                      },
                      {
                        code: 'Circular No. 31/2024/TT-BTC',
                        desc: 'Valuation Standard on collection and analytical verification of asset data.',
                      },
                      {
                        code: 'Circular No. 36/2024/TT-BTC',
                        desc: 'Valuation Standard on enterprise / business valuation.',
                      },
                    ]
                  : [
                      {
                        code: 'Luật Giá số 16/2023/QH15',
                        desc: 'Quy định về thẩm định giá và cơ quan chuyên môn; quyền, nghĩa vụ và trách nhiệm của thẩm định viên & doanh nghiệp.',
                      },
                      {
                        code: 'Thông tư 30/2024/TT-BTC',
                        desc: 'Chuẩn mực chung: quy tắc đạo đức nghề nghiệp, phạm vi công việc, cơ sở giá trị và hồ sơ thẩm định giá.',
                      },
                      {
                        code: 'Thông tư 31/2024/TT-BTC',
                        desc: 'Chuẩn mực về thu thập và phân tích thông tin về tài sản thẩm định giá.',
                      },
                      {
                        code: 'Thông tư 36/2024/TT-BTC',
                        desc: 'Chuẩn mực thẩm định giá doanh nghiệp.',
                      },
                    ]
                ).map((row, idx, arr) => (
                  <div
                    key={idx}
                    className="mhd-legal-table-row"
                    style={{
                      borderBottom: idx < arr.length - 1 ? '1px solid #eee' : 'none',
                    }}
                  >
                    <span style={{ fontWeight: 700, fontSize: 'clamp(0.84rem, 0.8rem + 0.15vw, 0.92rem)', color: 'var(--c-ink, #16181c)' }}>
                      {row.code}
                    </span>
                    <span style={{ fontSize: 'clamp(0.82rem, 0.78rem + 0.15vw, 0.88rem)', color: 'var(--c-muted2, #45595c)', lineHeight: 1.55 }}>
                      {row.desc}
                    </span>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: '.84rem', color: 'var(--c-faint, #8a8f96)', marginTop: '1rem', fontStyle: 'italic' }}>
                {isEn
                  ? 'Depending on the valuation purpose, specific statutory references and legal bases are detailed in each certified report.'
                  : 'Tùy theo mục đích thẩm định, nội dung đối chiếu và căn cứ pháp lý cụ thể sẽ được nêu rõ trong từng báo cáo.'}
              </p>
            </section>

            <hr style={{ border: 'none', borderTop: '1px solid #ebe9e4', margin: '0' }} />

            {/* 02. QUY TRÌNH SÁU BƯỚC */}
            <section id="quy-trinh" style={{ scrollMarginTop: 110 }}>
              <span style={{ fontSize: '.74rem', fontWeight: 700, color: 'var(--c-accent, #d94f0a)', display: 'block', marginBottom: '.35rem' }}>
                02
              </span>
              <h2 style={{ fontSize: 'clamp(1.1rem, 1.02rem + 0.3vw, 1.45rem)', fontWeight: 700, color: 'var(--c-ink, #16181c)', marginBottom: '.75rem' }}>
                {isEn ? 'Six-Step Valuation Process' : 'Quy trình sáu bước'}
              </h2>
              <p style={{ fontSize: 'clamp(0.86rem, 0.82rem + 0.15vw, 0.95rem)', color: 'var(--c-muted, #5f656d)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                {isEn
                  ? 'All valuation engagements are conducted sequentially through the following six steps. Results from each step are archived in the official engagement dossier.'
                  : 'Mọi hồ sơ thẩm định giá được thực hiện tuần tự qua sáu bước dưới đây. Kết quả của từng bước được lưu trong hồ sơ thẩm định giá.'}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {sixSteps.map((s, idx, arr) => (
                  <div
                    key={idx}
                    className="mhd-process-step-item"
                    style={{
                      borderBottom: idx < arr.length - 1 ? '1px solid #eee' : 'none',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Be Vietnam Pro', sans-serif",
                        fontSize: 'clamp(0.95rem, 0.9rem + 0.15vw, 1.05rem)',
                        fontWeight: 700,
                        color: 'var(--c-accent, #d94f0a)',
                        lineHeight: 1.4,
                        flexShrink: 0,
                        minWidth: '24px',
                      }}
                    >
                      {s.step}
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '.3rem', minWidth: 0, flex: 1 }}>
                      <h4 style={{ fontSize: 'clamp(0.88rem, 0.84rem + 0.15vw, 0.98rem)', fontWeight: 700, color: 'var(--c-ink, #16181c)', margin: 0, lineHeight: 1.4 }}>
                        {s.title}
                      </h4>
                      <p style={{ fontSize: 'clamp(0.82rem, 0.78rem + 0.15vw, 0.88rem)', color: 'var(--c-muted, #5f656d)', lineHeight: 1.55, margin: 0 }}>
                        {s.desc}
                      </p>
                      <span style={{ fontSize: 'clamp(0.74rem, 0.7rem + 0.1vw, 0.8rem)', color: 'var(--c-faint, #8a8f96)', fontStyle: 'italic', marginTop: '2px' }}>
                        {s.citation}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <hr style={{ border: 'none', borderTop: '1px solid #ebe9e4', margin: '0' }} />

            {/* 03. KIỂM SOÁT CHẤT LƯỢNG */}
            <section id="kiem-soat" style={{ scrollMarginTop: 110 }}>
              <span style={{ fontSize: '.74rem', fontWeight: 700, color: 'var(--c-accent, #d94f0a)', display: 'block', marginBottom: '.35rem' }}>
                03
              </span>
              <h2 style={{ fontSize: 'clamp(1.1rem, 1.02rem + 0.3vw, 1.45rem)', fontWeight: 700, color: 'var(--c-ink, #16181c)', marginBottom: '.75rem' }}>
                {isEn ? 'Quality Control System' : 'Kiểm soát chất lượng'}
              </h2>
              <p style={{ fontSize: 'clamp(0.86rem, 0.82rem + 0.15vw, 0.95rem)', color: 'var(--c-muted, #5f656d)', lineHeight: 1.65, marginBottom: '1.2rem' }}>
                {isEn
                  ? 'Prior to issuance, every valuation report and certificate passes through three tiers of verification:'
                  : 'Trước khi phát hành, mỗi báo cáo và chứng thư đều qua ba cấp kiểm soát:'}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.85rem', fontSize: 'clamp(0.84rem, 0.8rem + 0.15vw, 0.92rem)', color: 'var(--c-ink, #16181c)', lineHeight: 1.6 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.65rem' }}>
                  <span style={{ color: 'var(--c-accent, #d94f0a)', fontSize: '1rem', lineHeight: '1.4', flexShrink: 0 }}>•</span>
                  <span>
                    <strong>{isEn ? 'Lead Appraiser: ' : 'Thẩm định viên phụ trách: '}</strong>
                    {isEn
                      ? 'bears direct professional responsibility for methodology, calculations, and valuations within assigned scope.'
                      : 'chịu trách nhiệm chuyên môn về phương pháp, số liệu và kết quả trong phạm vi nhiệm vụ được giao.'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.65rem' }}>
                  <span style={{ color: 'var(--c-accent, #d94f0a)', fontSize: '1rem', lineHeight: '1.4', flexShrink: 0 }}>•</span>
                  <span>
                    <strong>{isEn ? 'Quality Review Department: ' : 'Bộ phận kiểm soát chất lượng: '}</strong>
                    {isEn
                      ? 'conducts independent peer review of assumptions and regulatory compliance before submitting to signing authority.'
                      : 'rà soát độc lập trước khi trình người có thẩm quyền ký phát hành.'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.65rem' }}>
                  <span style={{ color: 'var(--c-accent, #d94f0a)', fontSize: '1rem', lineHeight: '1.4', flexShrink: 0 }}>•</span>
                  <span>
                    <strong>{isEn ? 'Signing Officer: ' : 'Người có thẩm quyền ký: '}</strong>
                    {isEn
                      ? 'reviews total dossier integrity and approves formal issuance of the Valuation Certificate.'
                      : 'xem xét tính tương thích và quyết định việc phát hành chứng thư.'}
                  </span>
                </div>
              </div>
            </section>

            <hr style={{ border: 'none', borderTop: '1px solid #ebe9e4', margin: '0' }} />

            {/* 04. LƯU TRỮ HỒ SƠ */}
            <section id="luu-tru" style={{ scrollMarginTop: 110 }}>
              <span style={{ fontSize: '.74rem', fontWeight: 700, color: 'var(--c-accent, #d94f0a)', display: 'block', marginBottom: '.35rem' }}>
                04
              </span>
              <h2 style={{ fontSize: 'clamp(1.1rem, 1.02rem + 0.3vw, 1.45rem)', fontWeight: 700, color: 'var(--c-ink, #16181c)', marginBottom: '.75rem' }}>
                {isEn ? 'Dossier Retention' : 'Lưu trữ hồ sơ'}
              </h2>
              <p style={{ fontSize: 'clamp(0.86rem, 0.82rem + 0.15vw, 0.95rem)', color: 'var(--c-muted, #5f656d)', lineHeight: 1.65, marginBottom: '1.2rem' }}>
                {isEn
                  ? 'The valuation dossier comprising client documents, survey records, market datasets, calculation models, and issued certificates is archived under strict governance:'
                  : 'Hồ sơ thẩm định giá gồm tài liệu do khách hàng cung cấp, biên bản khảo sát, thông tin thu thập bằng tính và báo cáo chứng thư được lưu trữ:'}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.85rem', fontSize: 'clamp(0.84rem, 0.8rem + 0.15vw, 0.92rem)', color: 'var(--c-ink, #16181c)', lineHeight: 1.6 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.65rem' }}>
                  <span style={{ color: 'var(--c-accent, #d94f0a)', fontSize: '1rem', lineHeight: '1.4', flexShrink: 0 }}>•</span>
                  <span>
                    {isEn
                      ? 'Physical and digital records retained for a minimum statutory period per Ministry of Finance standards.'
                      : 'Hồ sơ giấy và điện tử được lưu tối thiểu theo thời hạn quy định.'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.65rem' }}>
                  <span style={{ color: 'var(--c-accent, #d94f0a)', fontSize: '1rem', lineHeight: '1.4', flexShrink: 0 }}>•</span>
                  <span>
                    {isEn
                      ? 'Dossier access strictly governed by granular role-based authorization.'
                      : 'Truy cập hồ sơ được phân quyền theo vai trò.'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.65rem' }}>
                  <span style={{ color: 'var(--c-accent, #d94f0a)', fontSize: '1rem', lineHeight: '1.4', flexShrink: 0 }}>•</span>
                  <span>
                    {isEn
                      ? 'Dossiers readily available for supervisory inspection by regulatory authorities.'
                      : 'Hồ sơ sẵn sàng phục vụ kiểm tra của cơ quan quản lý.'}
                  </span>
                </div>
              </div>
            </section>

            <hr style={{ border: 'none', borderTop: '1px solid #ebe9e4', margin: '0' }} />

            {/* 05. TIẾN ĐỘ THỰC HIỆN */}
            <section id="tien-do" style={{ scrollMarginTop: 110 }}>
              <span style={{ fontSize: '.74rem', fontWeight: 700, color: 'var(--c-accent, #d94f0a)', display: 'block', marginBottom: '.35rem' }}>
                05
              </span>
              <h2 style={{ fontSize: 'clamp(1.1rem, 1.02rem + 0.3vw, 1.45rem)', fontWeight: 700, color: 'var(--c-ink, #16181c)', marginBottom: '.75rem' }}>
                {isEn ? 'Engagement Timeline' : 'Tiến độ thực hiện'}
              </h2>
              <p style={{ fontSize: 'clamp(0.86rem, 0.82rem + 0.15vw, 0.95rem)', color: 'var(--c-muted, #5f656d)', lineHeight: 1.65, marginBottom: '1.4rem' }}>
                {isEn
                  ? 'Engagement turnaround times vary depending on asset category, title completeness, and analytical complexity. Timelines are explicitly agreed upon in the engagement contract.'
                  : 'Thời gian xem xét hoàn thành tuỳ thuộc vào loại tài sản, tính pháp lý và độ phức tạp của hồ sơ. Tiến độ được thống nhất rõ ràng trong hợp đồng thẩm định giá.'}
              </p>

              {/* Exact Dark Pill Button with Arrow matching screenshot */}
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '.6rem',
                  background: 'var(--c-ink, #16181c)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '.88rem',
                  padding: '.8rem 1.5rem',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(22, 24, 28, 0.18)',
                  transition: 'all .2s ease',
                  width: 'fit-content',
                }}
              >
                {isEn ? 'Request a Valuation' : 'Gửi yêu cầu thẩm định'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}

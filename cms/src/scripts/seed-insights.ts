import { Client } from 'pg'

const client = new Client({
  connectionString: 'postgresql://postgres:mhd_cms_password_2026@localhost:5434/mhd_payload',
})

const extraCategories = [
  {
    slug: 'case-study',
    name_vi: 'Case study thực tế',
    name_en: 'Case Studies',
    desc_vi: 'Phân tích hồ sơ đã ẩn thông tin bảo mật',
    desc_en: 'Dossier analysis with anonymized confidential data',
  },
  {
    slug: 'bao-cao',
    name_vi: 'Báo cáo thị trường',
    name_en: 'Market Reports',
    desc_vi: 'Báo cáo thị trường định kỳ',
    desc_en: 'Periodic market intelligence and industry reports',
  },
]

const posts = [
  {
    slug: 'bien-dong-gia-bds-trung-tam-q3',
    catSlug: 'thi-truong',
    publishedAt: '2026-09-05',
    readingTime: '5 phút đọc',
    title_vi: 'Biến động giá bất động sản khu vực trung tâm TP.HCM quý 3',
    title_en: 'Real Estate Price Movements in Central HCMC - Q3',
    summary_vi: 'Phân tích xu hướng giá nhà phố và căn hộ tại các phường trung tâm dựa trên dữ liệu thẩm định thực tế.',
    summary_en: 'Analysis of townhouse and apartment price trends in central wards based on actual valuation data.',
  },
  {
    slug: 'ba-phuong-phap-tdg-doanh-nghiep',
    catSlug: 'kien-thuc',
    publishedAt: '2026-09-01',
    readingTime: '6 phút đọc',
    title_vi: '3 cách tiếp cận phổ biến khi thẩm định giá trị doanh nghiệp',
    title_en: '3 Common Approaches in Professional Enterprise Valuation',
    summary_vi: 'Tiếp cận từ thị trường, từ thu nhập và từ chi phí: mỗi cách phù hợp với loại doanh nghiệp và mục đích khác nhau.',
    summary_en: 'Market, income, and cost approaches: choosing the right methodology for each corporate purpose.',
  },
  {
    slug: 'cap-nhat-thong-tu-36-2024',
    catSlug: 'chinh-sach',
    publishedAt: '2026-08-28',
    readingTime: '5 phút đọc',
    title_vi: 'Cập nhật Thông tư 36/2024/TT-BTC về thẩm định giá doanh nghiệp',
    title_en: 'Key Updates on Circular 36/2024/TT-BTC on Business Valuation',
    summary_vi: 'Những điểm doanh nghiệp cần chuẩn bị khi thực hiện thẩm định giá theo chuẩn mực hiện hành.',
    summary_en: 'What enterprises should prepare when conducting valuation under current Ministry of Finance standards.',
  },
  {
    slug: 'luat-gia-2023-diem-moi',
    catSlug: 'chinh-sach',
    publishedAt: '2026-08-20',
    readingTime: '4 phút đọc',
    title_vi: 'Luật Giá 2023: những điểm cần biết về hoạt động thẩm định giá',
    title_en: 'Price Law 2023: Essential Points on Valuation Practice',
    summary_vi: 'Tóm lược các quy định về thẩm định viên, doanh nghiệp thẩm định giá và giá trị sử dụng của chứng thư.',
    summary_en: 'Summary of regulations on certified valuers, valuation firms, and legal validity of certificates.',
  },
  {
    slug: 'gia-thue-dat-kcn-phia-nam',
    catSlug: 'thi-truong',
    publishedAt: '2026-08-14',
    readingTime: '5 phút đọc',
    title_vi: 'Giá thuê đất khu công nghiệp phía Nam sau nửa đầu năm',
    title_en: 'Southern Industrial Land Rental Rates Post H1',
    summary_vi: 'Nhu cầu thuê đất công nghiệp tiếp tục tập trung tại các khu có hạ tầng kết nối và quỹ đất sẵn sàng bàn giao.',
    summary_en: 'Demand for industrial land remains concentrated in zones with connected infrastructure and ready handover.',
  },
  {
    slug: 'case-study-day-chuyen-thanh-ly',
    catSlug: 'case-study',
    publishedAt: '2026-08-08',
    readingTime: '6 phút đọc',
    title_vi: 'Thẩm định giá dây chuyền sản xuất phục vụ thanh lý tài sản',
    title_en: 'Valuation of Manufacturing Lines for Asset Liquidation',
    summary_vi: 'Một hồ sơ thẩm định giá dây chuyền đã qua sử dụng, khi thị trường thứ cấp có ít giao dịch so sánh.',
    summary_en: 'Valuing synchronized production equipment when secondary market comparable transactions are sparse.',
  },
  {
    slug: 'bao-cao-can-ho-ha-noi-q2',
    catSlug: 'bao-cao',
    publishedAt: '2026-07-30',
    readingTime: '5 phút đọc',
    title_vi: 'Báo cáo thị trường căn hộ Hà Nội quý 2/2026',
    title_en: 'Hanoi Apartment Market Report Q2/2026',
    summary_vi: 'Tóm tắt nguồn cung, mức giá và thanh khoản căn hộ theo khu vực tại Hà Nội.',
    summary_en: 'Summary of supply, pricing, and liquidity of apartments across Hanoi districts.',
  },
  {
    slug: 'ho-so-tham-dinh-gia-vay-von',
    catSlug: 'kien-thuc',
    publishedAt: '2026-07-22',
    readingTime: '4 phút đọc',
    title_vi: 'Hồ sơ cần chuẩn bị khi thẩm định giá tài sản thế chấp vay vốn',
    title_en: 'Required Dossier for Loan Collateral Valuation',
    summary_vi: 'Danh mục hồ sơ cơ bản giúp rút ngắn thời gian khảo sát và phát hành chứng thư.',
    summary_en: 'Basic document checklist helping expedite inspection and certificate issuance for bank credit.',
  },
  {
    slug: 'case-study-thuong-hieu-gop-von',
    catSlug: 'case-study',
    publishedAt: '2026-07-15',
    readingTime: '7 phút đọc',
    title_vi: 'Xác định giá trị thương hiệu phục vụ góp vốn liên doanh',
    title_en: 'Trademark Valuation for Joint Venture Capital Contribution',
    summary_vi: 'Cách tách dòng thu nhập do thương hiệu tạo ra khi hai bên góp vốn thành lập doanh nghiệp mới.',
    summary_en: 'Isolating brand-generated income streams when partners form a new joint venture entity.',
  },
  {
    slug: 'doi-chieu-chung-thu-qr',
    catSlug: 'kien-thuc',
    publishedAt: '2026-07-08',
    readingTime: '3 phút đọc',
    title_vi: 'Cách đối chiếu thông tin chứng thư thẩm định giá bằng mã QR',
    title_en: 'How to Verify Valuation Certificates Using QR Codes',
    summary_vi: 'Ba bước kiểm tra thông tin phát hành của chứng thư MHD trên hệ thống tra cứu.',
    summary_en: 'Three simple steps to verify certificate authenticity on MHD digital lookup system.',
  },
  {
    slug: 'bao-cao-dat-nen-tphcm-6-thang',
    catSlug: 'bao-cao',
    publishedAt: '2026-07-01',
    readingTime: '6 phút đọc',
    title_vi: 'Báo cáo giá đất nền TP.HCM và vùng ven 6 tháng đầu năm 2026',
    title_en: 'HCMC & Suburbs Land Price Report - First 6 Months of 2026',
    summary_vi: 'Diễn biến giá đất nền theo khu vực và các yếu tố cần lưu ý khi sử dụng làm tài sản so sánh.',
    summary_en: 'Suburban land price dynamics and key considerations when using as comparable market assets.',
  },
  {
    slug: 'co-so-gia-tri-thi-truong',
    catSlug: 'kien-thuc',
    publishedAt: '2026-06-24',
    readingTime: '5 phút đọc',
    title_vi: 'Cơ sở giá trị thị trường và phi thị trường: khi nào áp dụng?',
    title_en: 'Market vs. Non-Market Value Basis: When to Apply',
    summary_vi: 'Lựa chọn cơ sở giá trị phù hợp với mục đích thẩm định là bước đầu tiên của mọi hồ sơ.',
    summary_en: 'Selecting the appropriate basis of value aligned with the valuation purpose as step one.',
  },
]

async function seed() {
  await client.connect()
  console.log('Seeding extra categories...')
  const catMap: Record<string, number> = {}

  // Get existing categories
  const curCats = await client.query('SELECT id, slug FROM categories')
  curCats.rows.forEach((r) => {
    catMap[r.slug] = r.id
  })

  // Insert extra categories
  for (const c of extraCategories) {
    if (!catMap[c.slug]) {
      const ins = await client.query(
        `INSERT INTO categories (slug, updated_at, created_at) VALUES ($1, NOW(), NOW()) RETURNING id`,
        [c.slug]
      )
      const id = ins.rows[0].id
      catMap[c.slug] = id
      console.log(`Added category: ${c.slug} (ID ${id})`)
    }
    const id = catMap[c.slug]
    await client.query(
      `INSERT INTO categories_locales (_parent_id, _locale, name, description)
       VALUES ($1, 'vi', $2, $3)
       ON CONFLICT (_parent_id, _locale) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description`,
      [id, c.name_vi, c.desc_vi]
    )
    await client.query(
      `INSERT INTO categories_locales (_parent_id, _locale, name, description)
       VALUES ($1, 'en', $2, $3)
       ON CONFLICT (_parent_id, _locale) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description`,
      [id, c.name_en, c.desc_en]
    )
  }

  console.log('Seeding posts...')
  for (const p of posts) {
    const catId = catMap[p.catSlug] || 1
    const existing = await client.query('SELECT id FROM posts WHERE slug = $1', [p.slug])
    let postId = null
    if (existing.rows.length === 0) {
      const ins = await client.query(
        `INSERT INTO posts (slug, category_id, published_at, updated_at, created_at, _status)
         VALUES ($1, $2, $3, NOW(), NOW(), 'published') RETURNING id`,
        [p.slug, catId, p.publishedAt]
      )
      postId = ins.rows[0].id
      console.log(`Inserted post ID ${postId}: ${p.slug}`)
    } else {
      postId = existing.rows[0].id
      await client.query(`UPDATE posts SET category_id = $1, published_at = $2 WHERE id = $3`, [catId, p.publishedAt, postId])
      console.log(`Updated post ID ${postId}: ${p.slug}`)
    }

    // Insert or update locales
    await client.query(
      `INSERT INTO posts_locales (_parent_id, _locale, title, summary, reading_time)
       VALUES ($1, 'vi', $2, $3, $4)
       ON CONFLICT (_parent_id, _locale) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, reading_time = EXCLUDED.reading_time`,
      [postId, p.title_vi, p.summary_vi, p.readingTime]
    )
    await client.query(
      `INSERT INTO posts_locales (_parent_id, _locale, title, summary, reading_time)
       VALUES ($1, 'en', $2, $3, $4)
       ON CONFLICT (_parent_id, _locale) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary, reading_time = EXCLUDED.reading_time`,
      [postId, p.title_en, p.summary_en, p.readingTime]
    )
  }

  console.log('All Insights seeded successfully!')
  await client.end()
}

seed().catch((err) => {
  console.error('Error seeding insights:', err)
  process.exit(1)
})

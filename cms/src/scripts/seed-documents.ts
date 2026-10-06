import { Client } from 'pg'

const client = new Client({
  connectionString: 'postgresql://postgres:mhd_cms_password_2026@localhost:5434/mhd_payload',
})

const docs = [
  {
    docNumber: 'MHD-2026-001234',
    type: 'standard',
    issuingAuthority: 'Trần Thị B · TĐV-00456',
    title_vi: 'Chứng thư thẩm định giá: Nhà ở và quyền sử dụng đất tại TP. Hồ Chí Minh',
    title_en: 'Valuation Certificate: Residential property and land use rights in HCMC',
    summary_vi: 'Nhà ở và quyền sử dụng đất tại TP. Hồ Chí Minh - Mục đích vay vốn ngân hàng',
    summary_en: 'Residential property and land use rights in HCMC - Bank lending purpose',
    effectiveDate: '2026-08-15',
  },
  {
    docNumber: 'MHD-2026-000987',
    type: 'standard',
    issuingAuthority: 'Nguyễn Văn A · TĐV-00123',
    title_vi: 'Chứng thư thẩm định giá: Giá trị vốn chủ sở hữu của doanh nghiệp',
    title_en: 'Valuation Certificate: Enterprise Equity Valuation',
    summary_vi: 'Giá trị vốn chủ sở hữu của doanh nghiệp - Mục đích chuyển nhượng vốn',
    summary_en: 'Enterprise Equity Valuation - Capital transfer purpose',
    effectiveDate: '2026-07-02',
  },
  {
    docNumber: 'MHD-2025-004521',
    type: 'standard',
    issuingAuthority: 'Lê Văn C · TĐV-00789',
    title_vi: 'Chứng thư thẩm định giá: Dây chuyền sản xuất bao bì',
    title_en: 'Valuation Certificate: Packaging manufacturing line',
    summary_vi: 'Dây chuyền sản xuất bao bì - Mục đích thanh lý tài sản',
    summary_en: 'Packaging manufacturing line - Asset liquidation purpose',
    effectiveDate: '2025-03-10',
  },
  {
    docNumber: '30/2024/TT-BTC',
    type: 'standard',
    issuingAuthority: 'Bộ Tài chính',
    title_vi: 'Thông tư 30/2024/TT-BTC - Chuẩn mực thẩm định giá Việt Nam về quy tắc đạo đức và chuẩn mực chung',
    title_en: 'Circular 30/2024/TT-BTC - Vietnam Valuation Standards on Ethics and General Standards',
    summary_vi: 'Chuẩn mực chung: quy tắc đạo đức nghề nghiệp, phạm vi công việc, cơ sở giá trị và hồ sơ thẩm định giá.',
    summary_en: 'General valuation standards: ethical rules, scope of work, basis of value, and valuation dossier.',
    effectiveDate: '2024-05-16',
  },
  {
    docNumber: '31/2024/TT-BTC',
    type: 'standard',
    issuingAuthority: 'Bộ Tài chính',
    title_vi: 'Thông tư 31/2024/TT-BTC - Chuẩn mực về cách tiếp cận từ thị trường, từ chi phí và từ thu nhập',
    title_en: 'Circular 31/2024/TT-BTC - Valuation approaches: Market, Cost, and Income approaches',
    summary_vi: 'Chuẩn mực về 3 cách tiếp cận thẩm định giá cốt lõi tại Việt Nam.',
    summary_en: 'Standards covering the three core valuation approaches in Vietnam.',
    effectiveDate: '2024-05-16',
  },
  {
    docNumber: '36/2024/TT-BTC',
    type: 'standard',
    issuingAuthority: 'Bộ Tài chính',
    title_vi: 'Thông tư 36/2024/TT-BTC - Chuẩn mực thẩm định giá doanh nghiệp',
    title_en: 'Circular 36/2024/TT-BTC - Enterprise Valuation Standard',
    summary_vi: 'Chuẩn mực thẩm định giá doanh nghiệp và các khoản đầu tư tài chính.',
    summary_en: 'Vietnam valuation standards for enterprises and financial investments.',
    effectiveDate: '2024-05-16',
  },
]

async function seed() {
  await client.connect()
  console.log('Connected to DB for seeding documents...')
  
  for (const doc of docs) {
    const existing = await client.query('SELECT id FROM documents WHERE doc_number = $1', [doc.docNumber])
    let parentId = null
    if (existing.rows.length === 0) {
      const ins = await client.query(
        `INSERT INTO documents (doc_number, type, issuing_authority, effective_date, updated_at, created_at)
         VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING id`,
        [doc.docNumber, doc.type, doc.issuingAuthority, doc.effectiveDate]
      )
      parentId = ins.rows[0].id
      console.log(`Inserted document ID ${parentId}: ${doc.docNumber}`)
    } else {
      parentId = existing.rows[0].id
      console.log(`Document ID ${parentId} already exists: ${doc.docNumber}`)
    }

    // Insert or update locales
    await client.query(
      `INSERT INTO documents_locales (_parent_id, _locale, title, summary)
       VALUES ($1, 'vi', $2, $3)
       ON CONFLICT (_parent_id, _locale) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary`,
      [parentId, doc.title_vi, doc.summary_vi]
    )
    await client.query(
      `INSERT INTO documents_locales (_parent_id, _locale, title, summary)
       VALUES ($1, 'en', $2, $3)
       ON CONFLICT (_parent_id, _locale) DO UPDATE SET title = EXCLUDED.title, summary = EXCLUDED.summary`,
      [parentId, doc.title_en, doc.summary_en]
    )
  }

  console.log('Documents seeded successfully!')
  await client.end()
}

seed().catch((err) => {
  console.error('Error seeding documents:', err)
  process.exit(1)
})

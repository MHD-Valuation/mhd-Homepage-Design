import { Client } from 'pg'
import fs from 'fs'
import path from 'path'

const client = new Client({
  connectionString: 'postgresql://postgres:mhd_cms_password_2026@localhost:5434/mhd_payload',
})

async function seed() {
  await client.connect()
  const raw = fs.readFileSync(path.resolve('..', '_svc_data.json'), 'utf8')
  const svcList = JSON.parse(raw)

  console.log(`Found ${svcList.length} services in _svc_data.json`)

  for (const s of svcList) {
    const existing = await client.query('SELECT id FROM services WHERE slug = $1', [s.slug])
    if (existing.rows.length === 0) {
      console.log(`Service ${s.slug} not found, inserting...`)
      await client.query(
        `INSERT INTO services (slug, "order", icon, updated_at, created_at)
         VALUES ($1, 1, 'building', NOW(), NOW())`,
        [s.slug]
      )
    }

    const res = await client.query('SELECT id FROM services WHERE slug = $1', [s.slug])
    const parentId = res.rows[0].id

    // Update localized title & shortDescription
    await client.query(
      `INSERT INTO services_locales (_parent_id, _locale, title, short_description)
       VALUES ($1, 'vi', $2, $3)
       ON CONFLICT (_parent_id, _locale) DO UPDATE SET title = EXCLUDED.title, short_description = EXCLUDED.short_description`,
      [parentId, s.title, s.sub]
    )

    // English titles
    const enTitles: Record<string, { title: string; sub: string }> = {
      'Dich-vu-Doanh-nghiep': {
        title: 'Enterprise & Business Valuation',
        sub: 'Comprehensive enterprise valuation for M&A, equitization, restructuring, and equity transfers.',
      },
      'Dich-vu-Bat-dong-san': {
        title: 'Real Estate Valuation',
        sub: 'Valuation of land, residential, commercial buildings, and development projects for lending and transactions.',
      },
      'Dich-vu-May-thiet-bi': {
        title: 'Machinery & Equipment Valuation',
        sub: 'Appraisal of production lines, industrial machinery, and commercial vehicles for financing and liquidation.',
      },
      'Dich-vu-Thuong-hieu': {
        title: 'Brand & Intangible Asset Valuation',
        sub: 'Valuation of trademarks, patents, IP rights, and intangible assets for investment, licensing, and M&A.',
      },
      'Dich-vu-Du-an-dau-tu': {
        title: 'Investment Project Feasibility & Valuation',
        sub: 'Financial feasibility and economic viability analysis of investment and infrastructure projects.',
      },
      'Dich-vu-Chung-minh-tai-chinh': {
        title: 'Asset Valuation for Financial Proof',
        sub: 'Bilingual certified asset valuation for overseas study, immigration, travel, and international visas.',
      },
    }

    const en = enTitles[s.slug] || { title: s.title, sub: s.sub }
    await client.query(
      `INSERT INTO services_locales (_parent_id, _locale, title, short_description)
       VALUES ($1, 'en', $2, $3)
       ON CONFLICT (_parent_id, _locale) DO UPDATE SET title = EXCLUDED.title, short_description = EXCLUDED.short_description`,
      [parentId, en.title, en.sub]
    )
    console.log(`Updated service ${s.slug} (ID: ${parentId})`)
  }

  console.log('Services updated successfully!')
  await client.end()
}

seed().catch((err) => {
  console.error('Error seeding services:', err)
  process.exit(1)
})

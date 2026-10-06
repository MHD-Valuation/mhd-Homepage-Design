import { getPayload } from 'payload'
import config from '../payload.config'
import { DEFAULT_PROJECTS } from '../app/(frontend)/projects/defaultProjects'

async function seedAndTestProjects() {
  console.log('--- Seeding Projects into Payload CMS ---')
  const payload = await getPayload({ config })

  // 1. Check existing projects count
  const existing = await payload.find({
    collection: 'projects',
    limit: 100,
  })

  console.log(`Current existing projects in Payload CMS: ${existing.totalDocs}`)

  // If already seeded, log them; otherwise insert defaultProjects
  if (existing.totalDocs === 0) {
    console.log('Seeding 10 projects in VI and EN...')
    const viList = DEFAULT_PROJECTS.vi
    const enList = DEFAULT_PROJECTS.en

    for (let i = 0; i < viList.length; i++) {
      const pVi = viList[i]
      const pEn = enList[i] || pVi

      // Create in 'vi'
      const doc = await payload.create({
        collection: 'projects',
        locale: 'vi',
        data: {
          title: pVi.title,
          category: pVi.category as any,
          client: pVi.client,
          valuationPurpose: pVi.valuationPurpose,
          scale: pVi.scale,
          year: pVi.year || 2025,
        },
      })

      // Update in 'en'
      await payload.update({
        collection: 'projects',
        id: doc.id,
        locale: 'en',
        data: {
          title: pEn.title,
          category: pEn.category as any,
          client: pEn.client,
          valuationPurpose: pEn.valuationPurpose,
          scale: pEn.scale,
          year: pEn.year || 2025,
        },
      })

      console.log(`Created project [${doc.id}]: ${pVi.title.slice(0, 50)}...`)
    }
  }

  // 2. Test Publishing a New Project Article via Payload API
  console.log('\n--- Testing Posting / Publishing New Project via Payload CMS ---')
  const testProjectVi = {
    title: '[TEST BÀI ĐĂNG MỚI] Thẩm định giá tổ hợp Cảng Quốc tế Cái Mép — Thị Vải mở rộng',
    category: 'ha-tang',
    client: 'Tập đoàn Cảng biển Quốc tế Liên doanh',
    valuationPurpose: 'Góp vốn đầu tư mở rộng cầu bến đón tàu container 200.000 DWT',
    scale: '18.600 Tỷ VNĐ',
    year: 2026,
  }

  const testProjectEn = {
    title: '[TEST NEW PUBLICATION] Valuation of Cai Mep — Thi Vai International Deep-Water Port Expansion',
    category: 'ha-tang',
    client: 'International Seaport Joint Venture Consortium',
    valuationPurpose: 'Equity Contribution for 200,000 DWT Container Berth Expansion',
    scale: '$745M USD',
    year: 2026,
  }

  // Check if test project already created
  const existingTest = await payload.find({
    collection: 'projects',
    where: {
      title: {
        contains: 'Cái Mép',
      },
    },
  })

  let testId: string | number
  if (existingTest.totalDocs === 0) {
    const created = await payload.create({
      collection: 'projects',
      locale: 'vi',
      data: testProjectVi as any,
    })
    testId = created.id

    await payload.update({
      collection: 'projects',
      id: testId,
      locale: 'en',
      data: testProjectEn as any,
    })
    console.log(`✅ TEST POST CREATED SUCCESSFULLY! ID: ${testId}`)
  } else {
    testId = existingTest.docs[0].id
    console.log(`✅ Test project already exists in CMS. ID: ${testId}`)
  }

  // 3. Query back projects to verify
  const verifyVi = await payload.find({
    collection: 'projects',
    locale: 'vi',
    limit: 20,
    sort: '-year',
  })

  const verifyEn = await payload.find({
    collection: 'projects',
    locale: 'en',
    limit: 20,
    sort: '-year',
  })

  console.log(`\n🎉 Verification Complete:`)
  console.log(`Total VI projects in CMS: ${verifyVi.totalDocs}`)
  console.log(`Total EN projects in CMS: ${verifyEn.totalDocs}`)
  console.log(`Latest Project: ${verifyVi.docs[0]?.title}`)

  process.exit(0)
}

seedAndTestProjects().catch((err) => {
  console.error('Projects Seed & Test Failed:', err)
  process.exit(1)
})

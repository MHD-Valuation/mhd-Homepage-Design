import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function seedPartners() {
  console.log('Seeding Partners collection...')
  const payload = await getPayload({ config })

  const partnersData = [
    {
      name: 'Vietcombank',
      category: 'bank' as const,
      website: 'https://vietcombank.com.vn',
      order: 1,
      active: true,
      featured: true,
    },
    {
      name: 'BIDV',
      category: 'bank' as const,
      website: 'https://bidv.com.vn',
      order: 2,
      active: true,
      featured: true,
    },
    {
      name: 'VietinBank',
      category: 'bank' as const,
      website: 'https://vietinbank.vn',
      order: 3,
      active: true,
      featured: true,
    },
    {
      name: 'Agribank',
      category: 'bank' as const,
      website: 'https://agribank.com.vn',
      order: 4,
      active: true,
      featured: true,
    },
    {
      name: 'Techcombank',
      category: 'bank' as const,
      website: 'https://techcombank.com',
      order: 5,
      active: true,
      featured: true,
    },
    {
      name: 'MB Bank',
      category: 'bank' as const,
      website: 'https://mbbank.com.vn',
      order: 6,
      active: true,
      featured: true,
    },
    {
      name: 'VPBank',
      category: 'bank' as const,
      website: 'https://vpbank.com.vn',
      order: 7,
      active: true,
      featured: true,
    },
    {
      name: 'ACB',
      category: 'bank' as const,
      website: 'https://acb.com.vn',
      order: 8,
      active: true,
      featured: true,
    },
    {
      name: 'Vingroup',
      category: 'corporate' as const,
      website: 'https://vingroup.net',
      order: 9,
      active: true,
      featured: true,
    },
    {
      name: 'Sun Group',
      category: 'corporate' as const,
      website: 'https://sungroup.com.vn',
      order: 10,
      active: true,
      featured: true,
    },
    {
      name: 'Masan Group',
      category: 'corporate' as const,
      website: 'https://masangroup.com',
      order: 11,
      active: true,
      featured: true,
    },
    {
      name: 'Novaland',
      category: 'corporate' as const,
      website: 'https://novaland.com.vn',
      order: 12,
      active: true,
      featured: true,
    },
    {
      name: 'FPT Corporation',
      category: 'corporate' as const,
      website: 'https://fpt.com',
      order: 13,
      active: true,
      featured: true,
    },
    {
      name: 'KPMG Vietnam',
      category: 'audit' as const,
      website: 'https://kpmg.com/vn',
      order: 14,
      active: true,
      featured: true,
    },
    {
      name: 'PwC Vietnam',
      category: 'audit' as const,
      website: 'https://pwc.com/vn',
      order: 15,
      active: true,
      featured: true,
    },
    {
      name: 'Deloitte Vietnam',
      category: 'audit' as const,
      website: 'https://deloitte.com/vn',
      order: 16,
      active: true,
      featured: true,
    },
  ]

  for (const p of partnersData) {
    const existing = await payload.find({
      collection: 'partners',
      where: {
        name: {
          equals: p.name,
        },
      },
    })

    if (!existing.docs || existing.docs.length === 0) {
      await payload.create({
        collection: 'partners',
        data: p,
      })
      console.log(`Created partner: ${p.name}`)
    } else {
      console.log(`Partner ${p.name} already exists`)
    }
  }

  console.log('Seeding Partners completed successfully!')
  process.exit(0)
}

seedPartners().catch((err) => {
  console.error('Seed partners error:', err)
  process.exit(1)
})

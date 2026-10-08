import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function seedExactPartners() {
  console.log('--- Đang cập nhật 36 đối tác thực tế từ hồ sơ MHD vào Payload CMS ---')
  const payload = await getPayload({ config })

  const exactPartners = [
    // -------------------------------------------------------------------
    // 1. NGÂN HÀNG & TỔ CHỨC TÍN DỤNG (bank) - 10 đối tác
    // -------------------------------------------------------------------
    { name: 'Vietcombank', category: 'bank', website: 'https://vietcombank.com.vn', order: 1 },
    { name: 'Agribank', category: 'bank', website: 'https://agribank.com.vn', order: 2 },
    { name: 'BIDV', category: 'bank', website: 'https://bidv.com.vn', order: 3 },
    { name: 'MB Bank', category: 'bank', website: 'https://mbbank.com.vn', order: 4 },
    { name: 'ACB', category: 'bank', website: 'https://acb.com.vn', order: 5 },
    { name: 'SHB', category: 'bank', website: 'https://shb.com.vn', order: 6 },
    { name: 'Sacombank', category: 'bank', website: 'https://sacombank.com.vn', order: 7 },
    { name: 'HDBank', category: 'bank', website: 'https://hdbank.com.vn', order: 8 },
    { name: 'KienlongBank', category: 'bank', website: 'https://kienlongbank.com', order: 9 },
    { name: 'VBSP', category: 'bank', website: 'https://vbsp.org.vn', order: 10 },

    // -------------------------------------------------------------------
    // 2. DOANH NGHIỆP & TẬP ĐOÀN (corporate) - 21 đối tác
    // -------------------------------------------------------------------
    { name: 'Hưng Thịnh Corporation', category: 'corporate', website: 'https://hungthinhcorp.com.vn', order: 11 },
    { name: 'Vạn Phúc Group', category: 'corporate', website: 'https://vanphuc.vn', order: 12 },
    { name: 'T&T Group', category: 'corporate', website: 'https://ttgroup.com.vn', order: 13 },
    { name: 'KITA Group', category: 'corporate', website: 'https://kitagroup.com.vn', order: 14 },
    { name: 'GOTEC LAND', category: 'corporate', website: 'https://gotecland.vn', order: 15 },
    { name: 'GOTECH', category: 'corporate', website: 'https://gotech.vn', order: 16 },
    { name: 'Saigontourist', category: 'corporate', website: 'https://saigontourist.com.vn', order: 17 },
    { name: 'Gạch Men Ý Mỹ', category: 'corporate', website: 'https://ymyceramic.com.vn', order: 18 },
    { name: 'The Sailing Bay Beach Resort', category: 'corporate', website: 'https://thesailingbay.com', order: 19 },
    { name: 'DICcons', category: 'corporate', website: 'https://diccons.com.vn', order: 20 },
    { name: 'Sơn Oseven', category: 'corporate', website: 'https://osevenpaint.com', order: 21 },
    { name: 'Sơn Sonata', category: 'corporate', website: 'https://sonata.vn', order: 22 },
    { name: 'Thiên An Corp', category: 'corporate', website: 'https://thienancorp.vn', order: 23 },
    { name: 'Catherine Denoual Maison', category: 'corporate', website: 'https://catherinedenoual.com', order: 24 },
    { name: 'Rectorseal', category: 'corporate', website: 'https://rectorseal.com', order: 25 },
    { name: 'Shimez Engineering', category: 'corporate', order: 26 },
    { name: 'Wasol', category: 'corporate', website: 'https://wasol-vn.com', order: 27 },
    { name: 'Nhất Thống', category: 'corporate', website: 'https://nhatthong.com.vn', order: 28 },
    { name: 'Bình Minh Én', category: 'corporate', order: 29 },
    { name: 'Đại Phúc Lộc Thọ', category: 'corporate', order: 30 },
    { name: 'Yeebo', category: 'corporate', website: 'https://yeebo.com.vn', order: 31 },

    // -------------------------------------------------------------------
    // 3. KHU VỰC CÔNG & NĂNG LƯỢNG / HẠ TẦNG (public) - 2 đối tác
    // -------------------------------------------------------------------
    { name: 'PV GAS', category: 'public', website: 'https://pvgas.com.vn', order: 32 },
    { name: 'Petrolimex', category: 'public', website: 'https://petrolimex.com.vn', order: 33 },

    // -------------------------------------------------------------------
    // 4. NHÀ ĐẦU TƯ, CHỨNG KHOÁN & BĐS QUỐC TẾ (investor) - 3 đối tác
    // -------------------------------------------------------------------
    { name: 'Viet Capital Securities', category: 'investor', website: 'https://vietcap.com.vn', order: 34 },
    { name: 'Savills', category: 'investor', website: 'https://savills.com.vn', order: 35 },
    { name: 'JLL', category: 'investor', website: 'https://jll.com.vn', order: 36 },
  ]

  let added = 0
  let updated = 0

  for (const p of exactPartners) {
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
        data: {
          name: p.name,
          category: p.category as any,
          website: p.website || null,
          order: p.order,
          active: true,
          featured: true,
        },
      })
      added++
      console.log(`[Thêm mới] ${p.name} - nhóm: ${p.category}`)
    } else {
      // Giữ nguyên 100% logo user đã thêm, chỉ đồng bộ category và order
      const doc = existing.docs[0]
      await payload.update({
        collection: 'partners',
        id: doc.id,
        data: {
          category: p.category as any,
          order: p.order,
          website: p.website || doc.website,
        },
      })
      updated++
      console.log(`[Đồng bộ nhóm] ${p.name} -> ${p.category} (Giữ nguyên logo)`)
    }
  }

  // Xóa bất kỳ đối tác nào không thuộc danh sách 36 đối tác
  const exactNames = exactPartners.map((p) => p.name.toLowerCase().trim())
  const allCurrent = await payload.find({
    collection: 'partners',
    limit: 200,
  })
  let deleted = 0
  for (const doc of allCurrent.docs) {
    if (!exactNames.includes(doc.name.toLowerCase().trim())) {
      await payload.delete({
        collection: 'partners',
        id: doc.id,
      })
      deleted++
      console.log(`[Đã xóa dư thừa] ${doc.name}`)
    }
  }

  console.log(`\nHoàn tất đồng bộ 36 đối tác! Thêm mới: ${added}, Đã cập nhật: ${updated}, Đã xóa dư thừa: ${deleted}`)
  process.exit(0)
}

seedExactPartners().catch((err) => {
  console.error('Lỗi cập nhật đối tác:', err)
  process.exit(1)
})

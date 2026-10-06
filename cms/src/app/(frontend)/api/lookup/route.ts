import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

import { createRateLimiter, getClientIp } from '@/lib/security'

/*
 * Certificate verification endpoint used by /phap-ly/tra-cuu.
 *
 * Trust model: a bank officer relies on this answer, so it must only ever say
 * "valid" for records that actually exist in the CMS. The hardcoded demo
 * certificates below are for local development / sales demos and are disabled
 * in production unless ENABLE_DEMO_CERTIFICATES=true is set explicitly.
 */

// 20 lookups / minute / IP — enough for humans, too slow to enumerate numbers
const limiter = createRateLimiter({ limit: 20, windowMs: 60 * 1000 })

const CERT_NUMBER = /^[A-Z0-9][A-Z0-9/-]{3,39}$/
const VALIDITY_DAYS = 180

const DEMO_ENABLED =
  process.env.ENABLE_DEMO_CERTIFICATES === 'true' ||
  (process.env.NODE_ENV !== 'production' && process.env.ENABLE_DEMO_CERTIFICATES !== 'false')

type Certificate = { date: string; until: string; asset: string; purpose: string; valuer: string }

const DEMO_CERTIFICATES: Record<string, Certificate> = {
  'MHD-2025-0891': {
    date: '18/10/2025',
    until: '18/10/2026',
    asset: 'Tổ hợp dây chuyền cán thép tấm & Hệ thống kho lạnh phụ trợ 15.000m²',
    purpose: 'Thế chấp hạn mức tín dụng ngân hàng BIDV',
    valuer: 'Nguyễn Văn Anh (Thẻ TĐV 18.042/BTC) · Trần Minh Hoàng (Thẻ TĐV 20.115/BTC)',
  },
  'MHD-2026-001234': {
    date: '15/08/2026',
    until: '15/02/2027',
    asset: 'Nhà ở và quyền sử dụng đất tại Quận 1, TP. Hồ Chí Minh',
    purpose: 'Vay vốn ngân hàng Vietcombank',
    valuer: 'Trần Thị B · TĐV-00456',
  },
  'MHD-2026-000987': {
    date: '02/07/2026',
    until: '02/01/2027',
    asset: 'Giá trị phần vốn chủ sở hữu Doanh nghiệp Năng lượng Tái tạo',
    purpose: 'Chuyển nhượng vốn & M&A',
    valuer: 'Nguyễn Văn A · TĐV-00123',
  },
  'MHD-2025-004521': {
    date: '10/03/2025',
    until: '10/09/2025',
    asset: 'Dây chuyền sản xuất bao bì tự động Krones',
    purpose: 'Đánh giá lại tài sản khấu hao',
    valuer: 'Lê Văn C · TĐV-00789',
  },
}

function parseVnDate(dateStr: string): number {
  const [d, m, y] = dateStr.split('/').map(Number)
  return new Date(y, m - 1, d, 23, 59, 59).getTime()
}

function toResult(no: string, cert: Certificate, expiresAt: number) {
  const isValid = expiresAt >= Date.now()
  return {
    found: true,
    data: {
      no,
      ...cert,
      status: isValid ? 'Còn hiệu lực' : 'Hết hiệu lực',
      statusColor: isValid ? '#1f7a4d' : '#b3261e',
      statusBg: isValid ? 'rgba(31,122,77,.1)' : 'rgba(179,38,30,.08)',
    },
  }
}

const notFound = (number: string) =>
  NextResponse.json({ found: false, message: `Không tìm thấy chứng thư ${number}` })

export async function GET(request: Request) {
  const retryAfter = limiter.check(getClientIp(request))
  if (retryAfter) {
    return NextResponse.json(
      { found: false, error: 'Bạn tra cứu quá nhanh. Vui lòng thử lại sau ít giây.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
  }

  const number = new URL(request.url).searchParams.get('number')?.trim().toUpperCase() || ''
  if (!CERT_NUMBER.test(number)) {
    return NextResponse.json({ found: false, error: 'Số chứng thư không hợp lệ.' }, { status: 400 })
  }

  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'documents',
      where: { docNumber: { equals: number } },
      limit: 1,
      depth: 0,
    })

    const doc = docs[0]
    if (doc) {
      const effective = doc.effectiveDate ? new Date(doc.effectiveDate) : null
      if (!effective) return notFound(number) // an undated record can't be vouched for

      const expiresAt = effective.getTime() + VALIDITY_DAYS * 24 * 3600 * 1000
      return NextResponse.json(
        toResult(
          doc.docNumber,
          {
            date: effective.toLocaleDateString('vi-VN'),
            until: new Date(expiresAt).toLocaleDateString('vi-VN'),
            asset: (doc.summary as string) || (doc.title as string),
            purpose: doc.type === 'license' ? 'Giấy phép hành nghề' : 'Chuẩn mực thẩm định giá',
            valuer: doc.issuingAuthority || 'MHD Valuation',
          },
          expiresAt,
        ),
      )
    }
  } catch (err) {
    console.error('[lookup] database error', err)
    // Fail closed: never report a certificate as valid when we couldn't verify it
    return NextResponse.json(
      { found: false, error: 'Hệ thống tra cứu tạm thời gián đoạn. Vui lòng thử lại sau.' },
      { status: 503 },
    )
  }

  const demo = DEMO_ENABLED ? DEMO_CERTIFICATES[number] : undefined
  if (demo) return NextResponse.json(toResult(number, demo, parseVnDate(demo.until)))

  return notFound(number)
}

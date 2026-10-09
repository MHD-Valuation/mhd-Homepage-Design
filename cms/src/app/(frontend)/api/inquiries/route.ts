import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { randomInt } from 'crypto'
import fs from 'fs'
import path from 'path'

import {
  MAX_UPLOAD_BYTES,
  cleanText,
  createRateLimiter,
  getClientIp,
  isValidEmail,
  isValidPhone,
  safeFileName,
  validateUpload,
} from '@/lib/security'
import { PRIVATE_UPLOAD_DIR } from '@/lib/privateUploads'

/* -------------------------------------------------------------------------- */

const limiter = createRateLimiter({ limit: 5, windowMs: 5 * 60 * 1000 })

const DOSSIER_TYPES = ['request', 'quote', 'recruitment', 'general'] as const
type DossierType = (typeof DOSSIER_TYPES)[number]

// Must mirror the `serviceType` options in collections/Inquiries.ts
const SERVICE_TYPES = [
  'doanh-nghiep', 'Dich-vu-Doanh-nghiep',
  'bat-dong-san', 'Dich-vu-Bat-dong-san',
  'may-thiet-bi', 'Dich-vu-May-thiet-bi',
  'tai-san-vo-hinh', 'Dich-vu-Thuong-hieu',
  'du-an', 'Dich-vu-Du-an-dau-tu',
  'chung-minh-tai-chinh', 'Dich-vu-Chung-minh-tai-chinh',
  'recruitment', 'khac',
] as const
type ServiceType = (typeof SERVICE_TYPES)[number]

const LIMITS = { name: 120, phone: 20, email: 254, org: 200, message: 4000, notes: 2000 }

function pick<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return allowed.includes(value as T) ? (value as T) : fallback
}

function getRealtimeYear(): number {
  try {
    const vnYear = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
    }).format(new Date())
    const parsed = parseInt(vnYear, 10)
    return isNaN(parsed) ? new Date().getFullYear() : parsed
  } catch {
    return new Date().getFullYear()
  }
}

function generateTicket(type: DossierType): string {
  const prefix = type === 'recruitment' ? 'TD' : 'HS'
  return `${prefix}-${getRealtimeYear()}-${randomInt(100000, 1000000)}`
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

const error = (message: string, status: number, headers?: HeadersInit) =>
  NextResponse.json({ success: false, error: message }, { status, headers })

/* -------------------------------------------------------------------------- */

export async function POST(request: Request) {
  // 1. Rate limit
  const retryAfter = limiter.check(getClientIp(request))
  if (retryAfter) {
    return error('Bạn đã gửi quá nhiều yêu cầu trong thời gian ngắn. Vui lòng thử lại sau ít phút.', 429, {
      'Retry-After': String(retryAfter),
    })
  }

  // 2. Reject oversized bodies before parsing (20MB file + form overhead)
  const declaredLength = Number(request.headers.get('content-length') || 0)
  if (declaredLength > MAX_UPLOAD_BYTES + 1024 * 1024) {
    return error('Dung lượng tệp đính kèm vượt quá giới hạn 20MB cho phép.', 413)
  }

  // 3. Parse body (multipart or JSON) into a plain record
  const contentType = request.headers.get('content-type') || ''
  let fields: Record<string, unknown> = {}
  let file: File | null = null

  try {
    if (contentType.includes('multipart/form-data')) {
      const form = await request.formData()
      for (const [key, value] of form.entries()) {
        if (typeof value === 'string') fields[key] = value
        else if (key === 'file' && value.size > 0) file = value
      }
    } else if (contentType.includes('application/json')) {
      const body = await request.json()
      if (body && typeof body === 'object' && !Array.isArray(body)) fields = body
    } else {
      return error('Định dạng yêu cầu không được hỗ trợ.', 415)
    }
  } catch {
    return error('Dữ liệu gửi lên không hợp lệ.', 400)
  }

  // 4. Honeypot — pretend success so bots don't adapt
  if (cleanText(fields.website_url, 200)) {
    return NextResponse.json({ success: true, ticketNumber: generateTicket('request') })
  }

  // 5. Validate & normalise
  const fullName = cleanText(fields.fullName, LIMITS.name)
  const phone = cleanText(fields.phone, LIMITS.phone)
  const email = cleanText(fields.email, LIMITS.email)
  const organization = cleanText(fields.organization, LIMITS.org)
  const message = cleanText(fields.message ?? fields.assetDescription, LIMITS.message)
  const notes = cleanText(fields.notes, LIMITS.notes)
  const dossierType = pick<DossierType>(fields.dossierType, DOSSIER_TYPES, 'request')
  const serviceType = pick<ServiceType>(fields.serviceType, SERVICE_TYPES, 'khac')

  if (!fullName || !phone) return error('Vui lòng điền đầy đủ họ tên và số điện thoại liên hệ.', 400)
  if (!isValidPhone(phone)) return error('Số điện thoại liên hệ không hợp lệ. Vui lòng kiểm tra lại.', 400)
  if (email && !isValidEmail(email)) return error('Địa chỉ email không hợp lệ.', 400)

  const ticketNumber = generateTicket(dossierType)

  // 6. Validate & store attachment privately (never under /public)
  let fileName: string | undefined
  let fileUrl: string | undefined
  let fileSize: string | undefined

  if (file) {
    if (file.size > MAX_UPLOAD_BYTES) return error('Dung lượng tệp đính kèm vượt quá giới hạn 20MB cho phép.', 413)

    const buffer = Buffer.from(await file.arrayBuffer())
    const check = validateUpload(file.name, buffer)
    if (!check.ok) {
      return error(
        check.reason === 'size'
          ? 'Dung lượng tệp đính kèm vượt quá giới hạn 20MB cho phép.'
          : 'Định dạng tệp không được hỗ trợ. Chỉ chấp nhận PDF, Word, Excel, ảnh JPG/PNG/WEBP hoặc ZIP.',
        400,
      )
    }

    const storedName = `${ticketNumber}-${Date.now()}-${safeFileName(file.name)}`
    await fs.promises.mkdir(PRIVATE_UPLOAD_DIR, { recursive: true })
    await fs.promises.writeFile(path.join(PRIVATE_UPLOAD_DIR, storedName), buffer, { flag: 'wx' })

    fileName = cleanText(file.name, 255)
    fileSize = formatBytes(buffer.length)
    // Served only to authenticated CMS users — see api/inquiries/file/[name]
    fileUrl = `/api/inquiries/file/${encodeURIComponent(storedName)}`
  }

  // 7. Persist
  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'inquiries',
      overrideAccess: true, // public visitors may create, never read
      data: {
        ticketNumber,
        dossierType,
        serviceType,
        fullName,
        phone,
        email: email || undefined,
        organization: organization || undefined,
        message: message || undefined,
        notes: notes || undefined,
        fileName,
        fileUrl,
        fileSize,
        status: 'new',
      },
    })
  } catch (err) {
    console.error('[inquiries] failed to persist inquiry', ticketNumber, err)
    return error('Hệ thống đang bận, chưa thể lưu hồ sơ. Vui lòng thử lại sau hoặc liên hệ hotline.', 500)
  }

  // Only return what the visitor needs — no internal ids or file paths
  return NextResponse.json({
    success: true,
    ticketNumber,
    message: 'Hồ sơ đã được tiếp nhận thành công vào hệ thống MHD.',
  })
}

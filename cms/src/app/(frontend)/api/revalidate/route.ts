import { revalidateTag, revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const tag = searchParams.get('tag')
  const path = searchParams.get('path')

  if (tag) {
    revalidateTag(tag)
  } else {
    revalidateTag('partners')
    revalidateTag('about')
    revalidateTag('homepage')
    revalidateTag('about-vi')
    revalidateTag('about-en')
    revalidateTag('partners-list-vi')
    revalidateTag('partners-list-en')
  }

  if (path) {
    revalidatePath(path)
  } else {
    revalidatePath('/about')
    revalidatePath('/about/doi-tac')
    revalidatePath('/')
  }

  return NextResponse.json({
    revalidated: true,
    tag: tag || 'all',
    timestamp: new Date().toISOString(),
  })
}

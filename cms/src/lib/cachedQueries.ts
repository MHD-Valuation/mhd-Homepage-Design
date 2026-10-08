import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Cached global getter (Header, Footer, SiteSettings).
 * Revalidated via revalidateTag('globals') or timed (default 1 hour).
 */
export async function getCachedGlobal(slug: 'header' | 'footer' | 'site-settings', locale: 'vi' | 'en') {
  return unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        return await payload.findGlobal({
          slug,
          locale,
        }).catch(() => null)
      } catch (err) {
        return null
      }
    },
    [`global-${slug}-${locale}`],
    {
      revalidate: 3600,
      tags: ['globals', `global-${slug}`, `global-${slug}-${locale}`],
    }
  )()
}

/**
 * Cached homepage data getter.
 * Revalidated via revalidateTag('homepage') or timed (default 10 mins).
 */
export async function getCachedHomepageData(locale: 'vi' | 'en') {
  return unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const [pagesResult, servicesResult, teamResult, postsResult] = await Promise.all([
          payload.find({
            collection: 'pages',
            where: {
              slug: {
                equals: 'home',
              },
            },
            locale,
            depth: 1,
          }).catch(() => ({ docs: [] })),
          payload.find({
            collection: 'services',
            sort: 'order',
            locale,
            limit: 10,
          }).catch(() => ({ docs: [] })),
          payload.find({
            collection: 'team',
            sort: 'order',
            locale,
            limit: 6,
          }).catch(() => ({ docs: [] })),
          payload.find({
            collection: 'posts',
            sort: '-publishedDate',
            locale,
            limit: 3,
          }).catch(() => ({ docs: [] })),
        ])

        return {
          homePage: pagesResult.docs?.[0] || null,
          servicesList: servicesResult.docs || [],
          teamList: teamResult.docs || [],
          postsList: postsResult.docs || [],
        }
      } catch (err) {
        return {
          homePage: null,
          servicesList: [],
          teamList: [],
          postsList: [],
        }
      }
    },
    [`homepage-data-${locale}`],
    {
      revalidate: 600,
      tags: ['homepage', 'services', 'posts', 'team', `homepage-${locale}`],
    }
  )()
}

/**
 * Cached About page data getter (Team & Partners).
 * Revalidated via revalidateTag('team') / revalidateTag('partners') or timed (10 mins).
 */
export async function getCachedAboutData(locale: 'vi' | 'en') {
  return unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const [teamResult, partnersResult] = await Promise.all([
          payload.find({
            collection: 'team',
            sort: 'order',
            locale,
            limit: 12,
          }).catch(() => ({ docs: [] })),
          payload.find({
            collection: 'partners',
            where: { active: { equals: true } },
            sort: 'order',
            limit: 100,
          }).catch(() => ({ docs: [] })),
        ])

        return {
          teamList: teamResult.docs || [],
          partnersList: partnersResult.docs || [],
        }
      } catch (err) {
        return {
          teamList: [],
          partnersList: [],
        }
      }
    },
    [`about-data-${locale}`],
    {
      revalidate: 600,
      tags: ['about', 'team', 'partners', `about-${locale}`],
    }
  )()
}

/**
 * Cached Projects page data getter.
 * Revalidated via revalidateTag('projects') or timed (10 mins).
 */
export async function getCachedProjectsData(locale: 'vi' | 'en') {
  return unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const res = await payload.find({
          collection: 'projects',
          locale,
          limit: 50,
          sort: '-year',
        }).catch(() => ({ docs: [] }))

        return res.docs || []
      } catch (err) {
        return []
      }
    },
    [`projects-data-${locale}`],
    {
      revalidate: 600,
      tags: ['projects', `projects-${locale}`],
    }
  )()
}
/**
 * Cached Posts list getter.
 * Revalidated via revalidateTag('posts') or timed (10 mins).
 */
export async function getCachedPostsList(locale: 'vi' | 'en') {
  return unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const res = await payload.find({
          collection: 'posts',
          locale,
          limit: 100,
          sort: '-publishedAt',
        }).catch(() => ({ docs: [] }))

        return res.docs || []
      } catch (err) {
        return []
      }
    },
    [`posts-list-${locale}`],
    {
      revalidate: 600,
      tags: ['posts', `posts-${locale}`],
    }
  )()
}

/**
 * Cached Partners list getter.
 * Revalidated via revalidateTag('partners') or timed (10 mins).
 */
export async function getCachedPartnersList(locale: 'vi' | 'en') {
  return unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const res = await payload.find({
          collection: 'partners',
          where: { active: { equals: true } },
          sort: 'order',
          limit: 100,
        }).catch(() => ({ docs: [] }))
        return res.docs || []
      } catch (err) {
        return []
      }
    },
    [`partners-list-${locale}`],
    {
      revalidate: 600,
      tags: ['partners', `partners-${locale}`],
    }
  )()
}

/**
 * Cached Team directory getter.
 * Revalidated via revalidateTag('team') or timed (10 mins).
 */
export async function getCachedTeamList(locale: 'vi' | 'en') {
  return unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const res = await payload.find({
          collection: 'team',
          sort: 'order',
          locale,
          limit: 50,
        }).catch(() => ({ docs: [] }))
        return res.docs || []
      } catch (err) {
        return []
      }
    },
    [`team-list-${locale}`],
    {
      revalidate: 600,
      tags: ['team', `team-${locale}`],
    }
  )()
}

/**
 * Cached Documents list getter.
 * Revalidated via revalidateTag('documents') or timed (10 mins).
 */
export async function getCachedDocumentsList(locale: 'vi' | 'en') {
  return unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const res = await payload.find({
          collection: 'documents',
          locale,
          limit: 20,
        }).catch(() => ({ docs: [] }))
        return res.docs || []
      } catch (err) {
        return []
      }
    },
    [`documents-list-${locale}`],
    {
      revalidate: 600,
      tags: ['documents', `documents-${locale}`],
    }
  )()
}

/**
 * Cached Service detail getter (to supplement static catalog with CMS edits).
 * Revalidated via revalidateTag('services') or timed (10 mins).
 */
export async function getCachedServiceUpdates(slug: string, locale: 'vi' | 'en') {
  return unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const res = await payload.find({
          collection: 'services',
          where: { slug: { equals: slug } },
          locale,
          limit: 1,
        }).catch(() => ({ docs: [] }))
        if (res.docs && res.docs.length > 0) {
          const doc = res.docs[0] as any
          return {
            title: (doc.title as string) || null,
            shortDescription: (doc.shortDescription as string) || null,
          }
        }
        return null
      } catch (err) {
        return null
      }
    },
    [`service-cms-${slug}-${locale}`],
    {
      revalidate: 600,
      tags: ['services', `service-${slug}`, `service-${slug}-${locale}`],
    }
  )()
}

/**
 * Cached Insight article getter.
 * Revalidated via revalidateTag('posts') or timed (10 mins).
 */
export async function getCachedInsightArticle(slug: string, locale: 'vi' | 'en') {
  return unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const res = await payload.find({
          collection: 'posts',
          where: { slug: { equals: slug } },
          locale,
          limit: 1,
        }).catch(() => ({ docs: [] }))
        return res.docs && res.docs.length > 0 ? res.docs[0] : null
      } catch (err) {
        return null
      }
    },
    [`post-${slug}-${locale}`],
    {
      revalidate: 600,
      tags: ['posts', `post-${slug}`, `post-${slug}-${locale}`],
    }
  )()
}

import type { Metadata } from 'next'
import { wpGraphQLPersistedQuery } from '@/lib/wp-graphql'

// Canonical URLs must point at the public frontend (instapost.co), never at the
// WordPress host. The WP backend (admin.instapost.co) serves
// `noindex, nofollow`, so passing through its Yoast canonicalUrl would tell
// Google to canonicalise every page to a non-indexable URL — leaving nothing to
// index. We keep title/description/keywords from WP but derive the canonical
// from our own route path instead.
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://instapost.co'
).replace(/\/$/, '')

/** Absolute canonical URL for a frontend route path (e.g. `/about`). */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

// ── Types ────────────────────────────────────────────────────────────────────

export interface PageSEO {
  seo: {
    title: string | null
    focusKeywords: string | null
    description: string | null
    canonicalUrl: string | null
    breadcrumbTitle: string | null
  } | null
  slug: string
  uri: string
}

export interface AllPagesSEOData {
  pages: {
    nodes: PageSEO[]
  }
}

// ── Persisted Query ID ──────────────────────────────────────────────────────

const ALL_PAGES_SEO_QUERY_ID =
  '4d45c72014d814b4f254d5ecea5caec5fddb44df5f54f731a052fbe19d0f35ad'

// ── Cache ────────────────────────────────────────────────────────────────────

let seoCache: Map<string, PageSEO> | null = null
let cacheTimestamp = 0
const CACHE_DURATION = 60 * 1000 // 1 minute

// ── Fetch ────────────────────────────────────────────────────────────────────

async function fetchAllPagesSEO(): Promise<Map<string, PageSEO>> {
  const now = Date.now()

  // Return cached data if still fresh
  if (seoCache && now - cacheTimestamp < CACHE_DURATION) {
    return seoCache
  }

  const data = await wpGraphQLPersistedQuery<AllPagesSEOData>(
    ALL_PAGES_SEO_QUERY_ID,
    ['wordpress-pages', 'wordpress-seo'],
  )

  // Build map by slug for fast lookup
  const map = new Map<string, PageSEO>()
  data.pages.nodes.forEach((page) => {
    map.set(page.slug, page)
  })

  // Update cache
  seoCache = map
  cacheTimestamp = now

  return map
}

export async function getPageSEO(slug: string): Promise<PageSEO | null> {
  const map = await fetchAllPagesSEO()
  return map.get(slug) || null
}

/**
 * Builds page metadata from WordPress Yoast fields (title/description/keywords)
 * while forcing the canonical to our own frontend route (`path`). This keeps the
 * client's WP-managed SEO content but avoids the noindex admin.instapost.co
 * canonical leak. Returns {} when the CMS page has no SEO data so callers can
 * fall back to their own static metadata.
 */
export async function getPageMetadata(
  slug: string,
  path: string,
  overrides?: Partial<Metadata>,
): Promise<Metadata> {
  const pageSEO = await getPageSEO(slug)
  if (!pageSEO?.seo) return {}
  return {
    title: pageSEO.seo.title,
    description: pageSEO.seo.description,
    keywords: pageSEO.seo.focusKeywords ?? undefined,
    alternates: { canonical: absoluteUrl(path) },
    ...overrides,
  }
}

import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://instapost.co'
const WP_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://instapost.beta01.site'

// ── Static routes ──────────────────────────────────────────────────────────────

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: '/', changeFrequency: 'daily', priority: 1.0 },
  { url: '/about', changeFrequency: 'monthly', priority: 0.7 },
  { url: '/agency', changeFrequency: 'monthly', priority: 0.7 },
  { url: '/contact', changeFrequency: 'monthly', priority: 0.8 },
  { url: '/faq', changeFrequency: 'monthly', priority: 0.6 },
  { url: '/industries', changeFrequency: 'weekly', priority: 0.8 },
  { url: '/packages', changeFrequency: 'weekly', priority: 0.8 },
  { url: '/services', changeFrequency: 'weekly', priority: 0.8 },
  { url: '/works', changeFrequency: 'weekly', priority: 0.8 },
  { url: '/shop', changeFrequency: 'daily', priority: 0.7 },
  { url: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
  { url: '/cookie-policy', changeFrequency: 'yearly', priority: 0.3 },
]

// ── WordPress REST helpers ─────────────────────────────────────────────────────

type WPItem = { slug: string; modified?: string; modified_gmt?: string }

/**
 * Safely parse a date string into a valid Date object.
 * Returns the current date if the input is missing, empty, or invalid
 * (e.g. WordPress "0000-00-00T00:00:00").
 */
function safeDate(raw: string | undefined | null, fallback: Date): Date {
  if (!raw) return fallback
  const d = new Date(raw)
  return Number.isNaN(d.getTime()) ? fallback : d
}

async function fetchWPRest(
  endpoint: string,
  perPage = 100,
): Promise<WPItem[]> {
  try {
    const url = `${WP_URL}/wp-json/wp/v2/${endpoint}?per_page=${perPage}&_fields=slug,modified,modified_gmt`
    const res = await fetch(url, {
      next: { revalidate: 3600, tags: ['wordpress-sitemap'] },
    })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

async function fetchWooProducts(perPage = 100): Promise<WPItem[]> {
  try {
    const url = `${WP_URL}/wp-json/wc/v3/products?per_page=${perPage}&_fields=slug,date_modified`
    const res = await fetch(url, {
      next: { revalidate: 3600, tags: ['wordpress-sitemap'] },
    })
    if (!res.ok) return []
    const products: Array<{ slug: string; date_modified?: string }> =
      await res.json()
    return products.map((p) => ({ slug: p.slug, modified: p.date_modified }))
  } catch {
    return []
  }
}

// ── Sitemap generator ──────────────────────────────────────────────────────────

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Fetch all dynamic content in parallel.
  // NOTE: WP "pages" are intentionally NOT emitted here. Every marketing page
  // already lives in STATIC_ROUTES with its real frontend path, and the WP page
  // slugs (about-us, contact-us, home…) do not match those routes — emitting them
  // produced duplicate URLs and dead /about-us //contact-us entries.
  const [posts, industries, products] = await Promise.all([
    fetchWPRest('posts'),
    fetchWPRest('industry'),
    fetchWooProducts(),
  ])

  // Posts → /blog/[slug]
  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `/blog/${p.slug}`,
    changeFrequency: 'weekly',
    priority: 0.6,
    lastModified: safeDate(p.modified_gmt ?? p.modified, now),
  }))

  // Industries → /industries/[slug]
  const industryEntries: MetadataRoute.Sitemap = industries.map((p) => ({
    url: `/industries/${p.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
    lastModified: safeDate(p.modified_gmt ?? p.modified, now),
  }))

  // Products → /product/[slug]
  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `/product/${p.slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
    lastModified: safeDate(p.modified_gmt ?? p.modified, now),
  }))

  // Combine: static routes get SITE_URL prefix, dynamic ones too
  const allEntries = [
    ...STATIC_ROUTES.map((r) => ({ ...r, url: `${SITE_URL}${r.url}` })),
    ...postEntries.map((r) => ({ ...r, url: `${SITE_URL}${r.url}` })),
    ...industryEntries.map((r) => ({ ...r, url: `${SITE_URL}${r.url}` })),
    ...productEntries.map((r) => ({ ...r, url: `${SITE_URL}${r.url}` })),
  ]

  return allEntries
}

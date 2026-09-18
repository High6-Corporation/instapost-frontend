import { wpGraphQLPersistedQuery } from '@/lib/wp-graphql'
import type { OfferArchive, ServiceOffer } from '@/components/sections/services/ServicesListSection'

// ── Persisted Query ID ───────────────────────────────────────────────────────

// SHA-256 of the saved `GetServicesPage` query in WPGraphQL → Saved GraphQL Queries.
// Re-save the query in WP admin and update this ID whenever the document changes;
// a stale ID fails the whole fetch and silently reverts every section to fallback copy.
const SERVICES_PAGE_QUERY_ID =
  '8f1fc52f098883b20b31b2c55a32a623a54022b300d22394e49ccf501fd0c99b'

// ── Raw CMS shapes (mirrors the GetServicesPage persisted query) ─────────────

interface CmsHeroSection {
  preHeader: string | null
  mainHeading: string | null
  subtext: string | null
}

interface CmsEngineStage {
  title: string | null
  description: string | null
}

interface CmsEngineSection {
  mainHeading: string | null
  services: CmsEngineStage[] | null
  footerText: string | null
}

interface CmsClientHighlight {
  preHeader: string | null
  metricValue: string | null
  metricLabel: string | null
  textDescription: string | null
}

interface CmsServicesListRow {
  mainHeading: string | null
  subtext: string | null
  /** WYSIWYG bullet list — one <li> renders as one tag pill. */
  categories: string | null
  clientHighlight: CmsClientHighlight[] | null
}

interface CmsStandardItem {
  title: string | null
  description: string | null
}

interface CmsOneRoofSection {
  preHeader: string | null
  mainHeading: string | null
  subtext: string | null
  // NOTE: the query no longer selects redirectionLink (removed from the saved
  // query in WP) — the One Roof button stays static (/packages fallback).
}

interface CmsCtaSection {
  mainHeading: string | null
  subtext: string | null
}

interface CmsDynamicContent {
  heroSection: CmsHeroSection | null
  howTheEngineSection: CmsEngineSection | null
  servicesListSection: CmsServicesListRow[] | null
  standardSection: CmsStandardItem[] | null
  oneRoofSection: CmsOneRoofSection | null
  ctaSection: CmsCtaSection | null
}

// ── Prepared output (one entry per section, shaped for its component's `data` prop)

export interface ServicesPageData {
  hero: { preHeader?: string | null; mainHeading?: string | null; subtext?: string | null } | null
  engine: {
    preHeader?: string | null
    stageList?: { title: string; description: string }[] | null
    bottomNote?: string | null
  } | null
  list: { offers: ServiceOffer[] } | null
  standards: { items: { title: string; description: string }[] } | null
  oneRoof: {
    preHeader?: string | null
    mainHeading?: string | null
    subtext?: string | null
    redirectionLink?: { url: string; title: string; target: string } | null
  } | null
  cta: { mainHeading: string; subtext: string } | null
}

// ── Decisions baked into the transforms (agreed with the team) ───────────────
// 1. Services List eyebrows: the number is generated from the row index, and the
//    category text is reused from the How The Engine stage title at the same
//    index (per the ACF design — no separate fields for either).
// 2. Services List bottom links are NOT dynamic: hardcoded per index below.
//    If the client reorders blocks, links drift — intentional trade-off.
// 3. `categories` WYSIWYG follows the one-bullet = one-pill rule.

const FALLBACK_CATEGORIES = [
  'Strategy & Content',
  'Creative Production',
  'KOL & Creators',
  'Paid Social Advertising',
  'Measurement & Reporting',
]

const OFFER_LINKS: { label: string; href: string }[] = [
  { label: 'See it inside every retainer', href: '/packages' },
  { label: 'See shoot packages & rates', href: '/packages' },
  { label: 'See KOL campaign rates', href: '/packages' },
  { label: 'Ask about the Performance Package', href: '/contact' },
  { label: 'See a sample report on your discovery call', href: '/contact' },
]

// ── Helpers ──────────────────────────────────────────────────────────────────

function hasText(v: string | null | undefined): v is string {
  return typeof v === 'string' && v.trim() !== ''
}

const HTML_ENTITIES: Record<string, string> = {
  '&nbsp;': ' ',
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&apos;': "'",
  '&#8211;': '–',
  '&#8212;': '—',
  '&#8216;': '‘',
  '&#8217;': '’',
  '&lsquo;': '‘',
  '&rsquo;': '’',
  '&ldquo;': '“',
  '&rdquo;': '”',
  '&ndash;': '–',
  '&mdash;': '—',
  '&#039;': "'",
  '&#39;': "'",
}

function decodeEntities(value: string): string {
  return value.replace(/&[a-z#0-9]+;/gi, (m) => HTML_ENTITIES[m.toLowerCase()] ?? m)
}

function stripTags(value: string): string {
  return value.replace(/<[^>]*>/g, '')
}

/**
 * Parse the `categories` WYSIWYG HTML into individual pill labels.
 * Rule: one <li> = one pill. Falls back to <p> blocks, then raw newlines,
 * so numbered lists pasted as plain text still split reasonably.
 */
export function parseBulletListToTags(html: string | null | undefined): string[] {
  if (!html) return []

  const listItems = [...html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((m) => m[1])
  const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => m[1])
  const sources = listItems.length > 0 ? listItems : paragraphs.length > 0 ? paragraphs : html.split(/\r?\n/)

  return sources
    .map((item) => decodeEntities(stripTags(item)).trim())
    .filter(Boolean)
}

// ── Section builders — return null when a section has no usable CMS content,
//    so each component falls back to its own hardcoded copy independently.

function buildHero(s: CmsHeroSection | null) {
  if (!s || (!hasText(s.preHeader) && !hasText(s.mainHeading) && !hasText(s.subtext))) return null
  return { preHeader: s.preHeader, mainHeading: s.mainHeading, subtext: s.subtext }
}

function buildEngine(s: CmsEngineSection | null) {
  if (!s) return null
  const stages = (s.services ?? [])
    .filter((st) => hasText(st.title) || hasText(st.description))
    .map((st) => ({ title: (st.title ?? '').trim(), description: (st.description ?? '').trim() }))

  if (!hasText(s.mainHeading) && stages.length === 0 && !hasText(s.footerText)) return null
  return { preHeader: s.mainHeading, stageList: stages.length > 0 ? stages : null, bottomNote: s.footerText }
}

function buildList(rows: CmsServicesListRow[] | null, engineTitles: string[]) {
  if (!rows) return null
  const offers = rows
    .filter((r) => hasText(r.mainHeading) || hasText(r.subtext))
    .map((r, index): ServiceOffer => {
      const link = OFFER_LINKS[index % OFFER_LINKS.length]
      return {
        number: String(index + 1).padStart(2, '0'),
        // Category text comes from the How The Engine stage at the same index;
        // static titles cover the "engine has fewer stages" edge case.
        category: engineTitles[index] ?? FALLBACK_CATEGORIES[index % FALLBACK_CATEGORIES.length],
        heading: (r.mainHeading ?? '').trim(),
        description: (r.subtext ?? '').trim(),
        tags: parseBulletListToTags(r.categories),
        archives: (r.clientHighlight ?? [])
          .filter((h) => hasText(h.preHeader) || hasText(h.metricValue) || hasText(h.textDescription))
          .map(
            (h): OfferArchive => ({
              eyebrow: (h.preHeader ?? '').trim(),
              value: (h.metricValue ?? '').trim(),
              suffix: (h.metricLabel ?? '').trim(),
              description: (h.textDescription ?? '').trim(),
            }),
          ),
        linkLabel: link.label,
        linkHref: link.href,
      }
    })
  return offers.length > 0 ? { offers } : null
}

function buildStandards(rows: CmsStandardItem[] | null) {
  if (!rows) return null
  const items = rows
    .filter((r) => hasText(r.title) || hasText(r.description))
    .map((r) => ({ title: (r.title ?? '').trim(), description: (r.description ?? '').trim() }))
  return items.length > 0 ? { items } : null
}

function buildOneRoof(s: CmsOneRoofSection | null) {
  if (!s || (!hasText(s.preHeader) && !hasText(s.mainHeading) && !hasText(s.subtext))) {
    return null
  }
  return {
    preHeader: s.preHeader,
    mainHeading: s.mainHeading,
    subtext: s.subtext,
  }
}

function buildCta(s: CmsCtaSection | null) {
  if (!s || (!hasText(s.mainHeading) && !hasText(s.subtext))) return null
  return { mainHeading: s.mainHeading ?? '', subtext: s.subtext ?? '' }
}

// ── Fetch ────────────────────────────────────────────────────────────────────

export async function getServicesPageData(): Promise<ServicesPageData | null> {
  try {
    const data = await wpGraphQLPersistedQuery<{
      pageBy: { dynamicContentServices: CmsDynamicContent | null } | null
    }>(SERVICES_PAGE_QUERY_ID, ['wordpress-pages'])

    const dc = data.pageBy?.dynamicContentServices
    if (!dc) return null

    const engine = buildEngine(dc.howTheEngineSection)

    return {
      hero: buildHero(dc.heroSection),
      engine,
      list: buildList(dc.servicesListSection, engine?.stageList?.map((s) => s.title) ?? []),
      standards: buildStandards(dc.standardSection),
      oneRoof: buildOneRoof(dc.oneRoofSection),
      cta: buildCta(dc.ctaSection),
    }
  } catch (err) {
    console.error('[services] Failed to load Services page data:', err)
    return null
  }
}

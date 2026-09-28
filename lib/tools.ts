// ─── lib/tools.ts ─────────────────────────────────────────────────────────────
// Pricing data + recommendation logic for the Free Tools pages
// (/tools, /tools/smm-pricing, /tools/ads-pricing).
//
// NOTE FOR MAINTAINERS: all numbers below are seeded from the same values used
// on the Packages page (app/(pages)/packages/page.tsx and
// components/sections/packages/AddOnsSection.tsx). The client will hand over
// final calculator rules/data later — until then this module is the single
// source of truth, and can be swapped to a WPGraphQL persisted query
// following the same pattern as lib/services-page.ts without touching
// any component.
// ─────────────────────────────────────────────────────────────────────────────

// ── Formatting ────────────────────────────────────────────────────────────────

export function formatPeso(amount: number): string {
  return '₱' + Math.round(amount).toLocaleString('en-PH')
}

// ── SMM package data (mirrors packages page) ─────────────────────────────────

export interface SmmPackage {
  name: string
  tagline: string
  /** Ads management included in the package (ad budget itself is client-funded). */
  includedAdBudget: number
  features: string[]
}

export const SMM_PACKAGES: SmmPackage[] = [
  {
    name: 'Launch',
    tagline: 'Strategic content ready-to-post — client provides materials',
    includedAdBudget: 10000,
    features: [
      '6 static posts + 1 carousel (up to 5 slides)',
      '5 story frames, captions included',
      '1 reel (15–30s) edited from our shoot',
      'Ads management for ₱10,000 ad budget (client funded)',
    ],
  },
  {
    name: 'Momentum',
    tagline: 'For businesses that want more volume + stronger ad testing',
    includedAdBudget: 20000,
    features: [
      'Organic shoot (2 hours) for materials — 25 edited photos',
      '10 static posts + 2 carousels + 8 story frames',
      '2 reels (15–30s) edited from our shoot',
      '2 micro influencers posting FB/IG',
      'Ads management for ₱20,000 ad budget (client funded)',
    ],
  },
  {
    name: 'Scale',
    tagline: 'For businesses pushing consistency + heavier performance',
    includedAdBudget: 30000,
    features: [
      'Organic shoot (2 hours) for materials — 25 edited photos',
      '12 static posts + 4 carousels + 10 story frames',
      '4 reels (15–30s) edited from our shoot',
      '4 micro influencers posting FB/IG',
      'Ads management for ₱30,000 ad budget (client funded)',
    ],
  },
]

// ── Ads management fee tiers (mirrors AddOnsSection add-on pricing) ──────────

export interface AdsFeeTier {
  /** Monthly ad budget (client-funded) this tier covers. */
  adBudget: number
  /** InstaPost management fee per month for that budget. */
  managementFee: number
}

export const ADS_FEE_TIERS: AdsFeeTier[] = [
  { adBudget: 10000, managementFee: 4000 },
  { adBudget: 20000, managementFee: 8000 },
  { adBudget: 30000, managementFee: 12000 },
]

/**
 * Find the management fee for a suggested ad budget.
 * Budgets above the known tiers are quoted as "custom" (fee returned as null).
 */
export function findAdsFeeTier(adBudget: number): AdsFeeTier | null {
  return ADS_FEE_TIERS.find((tier) => tier.adBudget === adBudget) ?? null
}

// ── SMM calculator: questions, scoring, recommendation ───────────────────────

export type SmmAnswerKey = 'stage' | 'frequency' | 'shoot' | 'influencers' | 'adBudget'

export type SmmRecommendation = 'Launch' | 'Momentum' | 'Scale'

/**
 * Each answer carries a weight; the total score maps to a package.
 * Thresholds may be re-tuned once the client hands over their real rules.
 */
export const SMM_ANSWER_WEIGHTS: Record<SmmAnswerKey, Record<string, number>> = {
  stage: { new: 0, growing: 1, established: 2 },
  frequency: { few: 0, weekly: 1, daily: 2 },
  shoot: { provide: 0, yes: 1 },
  influencers: { no: 0, yes: 2 },
  adBudget: { none: 0, tenK: 1, twentyK: 1, thirtyK: 2 },
}

export function recommendSmmPackage(answers: Partial<Record<SmmAnswerKey, string>>): SmmRecommendation {
  let score = 0
  ;(Object.keys(SMM_ANSWER_WEIGHTS) as SmmAnswerKey[]).forEach((key) => {
    const value = answers[key]
    if (value) score += SMM_ANSWER_WEIGHTS[key][value] ?? 0
  })

  if (score <= 2) return 'Launch'
  if (score <= 5) return 'Momentum'
  return 'Scale'
}

export function getSmmPackage(name: SmmRecommendation): SmmPackage {
  return SMM_PACKAGES.find((pkg) => pkg.name === name) ?? SMM_PACKAGES[0]
}

// ── Ads calculator: budget estimation ────────────────────────────────────────

export interface AdsInputs {
  /** Current monthly revenue in pesos. */
  currentRevenue: number
  /** Target EXTRA monthly revenue in pesos. */
  growthTarget: number
  /** Average order/deal value in pesos. */
  avgOrderValue: number
}

/**
 * Conservative working assumption for Philippine Meta/Google ads in our
 * client base. Placeholder until the client provides their real benchmark.
 */
export const EXPECTED_ROAS = 3

/** Round a peso figure up to the nearest ₱1,000 for a presentable suggestion. */
function roundUpToThousand(amount: number): number {
  return Math.max(1000, Math.ceil(amount / 1000) * 1000)
}

export interface AdsEstimate {
  suggestedBudget: number
  suggestedBudgetMax: number
  tier: AdsFeeTier | null
  estimatedExtraOrders: number
}

/**
 * Suggested monthly ad budget = extra revenue target ÷ expected ROAS,
 * rounded up to the nearest thousand. A management-fee tier is only
 * returned when the budget matches a published tier exactly; anything
 * else is quoted as custom.
 */
export function estimateAdsBudget(inputs: AdsInputs): AdsEstimate {
  const raw = inputs.growthTarget / EXPECTED_ROAS
  const suggestedBudget = roundUpToThousand(raw)
  const suggestedBudgetMax = roundUpToThousand(raw * 1.5)
  const estimatedExtraOrders =
    inputs.avgOrderValue > 0 ? Math.floor(inputs.growthTarget / inputs.avgOrderValue) : 0

  return {
    suggestedBudget,
    suggestedBudgetMax,
    tier: findAdsFeeTier(suggestedBudget),
    estimatedExtraOrders,
  }
}

// ── CMS-driven content contracts (fallback-first) ────────────────────────────
// These mirror the shape a future persisted query would return for the tools
// pages. Sections render FALLBACK copy (declared inside each component) when
// no data is passed.

export interface ToolsHeroContent {
  preHeader?: string | null
  heading?: string | null
  subtext?: string | null
}

export interface ToolsPageData {
  hero?: ToolsHeroContent | null
}

export interface ToolDetailContent {
  preHeader?: string | null
  heading?: string | null
  subtext?: string | null
}

export interface ToolHowItWorksContent {
  heading?: string | null
  steps?: string[] | null
  disclaimer?: string | null
}

export interface ToolPageData {
  intro?: ToolDetailContent | null
  howItWorks?: ToolHowItWorksContent | null
}

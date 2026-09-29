// ─── lib/tools.ts ─────────────────────────────────────────────────────────────
// Pricing data + calculation logic for the Free Tools pages
// (/tools, /tools/smm-pricing, /tools/ads-pricing).
//
// The calculators follow the "live estimate" pattern of the reference the
// client provided (brainnexdigitalmarketing.com/tools): sliders + dropdowns
// that re-compute on every input change, no submit button. The *structure* of
// the maths mirrors the reference (cost-per-lead back-calculation for ads,
// base + per-unit + add-on build-up for social media), but every rate is
// InstaPost's own — published ads management tiers and Launch/Momentum/Scale
// package inclusions.
//
// NOTE FOR MAINTAINERS: package data below is seeded from the Packages page
// (app/(pages)/packages/page.tsx and components/sections/packages/AddOnsSection.tsx).
// Items marked PLACEHOLDER are working assumptions the client has not signed off
// on yet — they are isolated in this module so they can be swapped (or moved to
// a WPGraphQL persisted query, see lib/services-page.ts) without touching any
// component.
// ─────────────────────────────────────────────────────────────────────────────

// ── Formatting ───────────────────────────────────────────────────────────────

export function formatPeso(amount: number): string {
  return '₱' + Math.round(amount).toLocaleString('en-PH')
}

/** Compact peso for tight result tiles: 74300 -> "₱74.3K". */
export function formatPesoCompact(amount: number): string {
  if (amount >= 1_000_000) {
    return '₱' + (amount / 1_000_000).toFixed(amount % 1_000_000 === 0 ? 0 : 1) + 'M'
  }
  if (amount >= 1000) {
    return '₱' + (amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1) + 'K'
  }
  return formatPeso(amount)
}

/** Compact count for reach tiles: 279000 -> "279K+". */
export function formatCountCompact(count: number): string {
  if (count >= 1_000_000) {
    return (count / 1_000_000).toFixed(count % 1_000_000 === 0 ? 0 : 1) + 'M+'
  }
  if (count >= 1000) {
    return Math.round(count / 1000) + 'K+'
  }
  return String(count)
}

/** Round a peso figure up to the nearest ₱500 for a presentable suggestion. */
function roundUpToFiveHundred(amount: number): number {
  return Math.max(500, Math.ceil(amount / 500) * 500)
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

export function getSmmPackage(name: string): SmmPackage {
  return SMM_PACKAGES.find((pkg) => pkg.name === name) ?? SMM_PACKAGES[0]
}

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
 * Match a suggested ad budget to an InstaPost management tier. The reference
 * tool quotes a percentage fee; InstaPost publishes flat tiers, so we round the
 * suggestion up to the smallest tier that covers it. Budgets beyond the largest
 * published tier are quoted custom (null).
 */
export function findAdsFeeTier(adBudget: number): AdsFeeTier | null {
  const sorted = [...ADS_FEE_TIERS].sort((a, b) => a.adBudget - b.adBudget)
  const match = sorted.find((tier) => tier.adBudget >= adBudget)
  return match ?? null
}

// ── Ads calculator: cost-per-lead back-calculation ───────────────────────────

export interface IndustryCpl {
  value: string
  label: string
  /**
   * Metro Manila cost per lead used by the calculator. Benchmarks are the
   * client-facing range shown in the Market Benchmarks table.
   */
  cpl: number
  benchmark: string
}

/** PLACEHOLDER: industry CPLs follow common PH agency ranges, not InstaPost-verified data. */
export const INDUSTRIES: IndustryCpl[] = [
  { value: 'ecommerce', label: 'E-commerce / Retail', cpl: 400, benchmark: '₱400 – ₱600' },
  { value: 'fnb', label: 'F&B / Restaurant', cpl: 600, benchmark: '₱500 – ₱800' },
  { value: 'education', label: 'Education / Training', cpl: 700, benchmark: '₱600 – ₱900' },
  { value: 'services', label: 'Services / B2B', cpl: 900, benchmark: '₱800 – ₱1,100' },
  { value: 'healthcare', label: 'Healthcare / Medical', cpl: 1200, benchmark: '₱900 – ₱1,400' },
  { value: 'realestate', label: 'Real Estate', cpl: 1500, benchmark: '₱1,200 – ₱1,800' },
]

export interface PlatformMix {
  value: string
  label: string
  /** Multiplier applied to the mid ad spend — Google+Meta is the 1.0 baseline. */
  multiplier: number
}

/** PLACEHOLDER: relative-efficiency weights, to be confirmed with the client's media buyer. */
export const PLATFORM_MIXES: PlatformMix[] = [
  { value: 'google', label: 'Google Ads Only', multiplier: 1.1 },
  { value: 'meta', label: 'Meta Ads Only', multiplier: 0.85 },
  { value: 'google-meta', label: 'Google + Meta', multiplier: 1 },
  { value: 'google-meta-yt', label: 'Google + Meta + YouTube', multiplier: 0.95 },
  { value: 'all', label: 'All Platforms', multiplier: 0.9 },
]

/** Conservative / aggressive band around the mid spend, matching the reference tool. */
export const AD_SPEND_BAND = { min: 0.85, max: 1.35 }

export interface AdsInputs {
  /** Target monthly revenue in pesos. */
  revenueTarget: number
  /** Average order / deal value in pesos. */
  avgOrderValue: number
  /** Lead-to-client close rate as a whole percentage (20 = 20%). */
  closeRate: number
  /** One of INDUSTRIES[].value */
  industry: string
  /** One of PLATFORM_MIXES[].value */
  platformMix: string
}

export const ADS_DEFAULT_INPUTS: AdsInputs = {
  revenueTarget: 500000,
  avgOrderValue: 5000,
  closeRate: 20,
  industry: 'services',
  platformMix: 'google-meta',
}

export const ADS_SLIDER_RANGE = {
  revenueTarget: { min: 50000, max: 5000000, step: 50000 },
  avgOrderValue: { min: 500, max: 200000, step: 500 },
  closeRate: { min: 5, max: 80, step: 5 },
}

export interface AdsEstimate {
  leadsNeeded: number
  minAdSpend: number
  maxAdSpend: number
  midAdSpend: number
  /** Return on ad spend as a ratio, e.g. 1.2 */
  roas: number
  /** Weighted-average cost per lead actually used. */
  cpl: number
  tier: AdsFeeTier | null
}

/**
 * orders      = revenue target ÷ average order value
 * leads       = orders ÷ close rate
 * mid spend   = leads × industry CPL × platform multiplier
 * min / max   = mid ±15%
 * management  = InstaPost flat tier covering the suggested budget
 */
export function estimateAdsBudget(inputs: AdsInputs): AdsEstimate {
  const industry = INDUSTRIES.find((i) => i.value === inputs.industry) ?? INDUSTRIES[3]
  const platform = PLATFORM_MIXES.find((p) => p.value === inputs.platformMix) ?? PLATFORM_MIXES[2]

  const safeOrderValue = inputs.avgOrderValue > 0 ? inputs.avgOrderValue : 1
  const safeCloseRate = inputs.closeRate > 0 ? inputs.closeRate : 1

  const orders = inputs.revenueTarget / safeOrderValue
  const leadsNeeded = Math.ceil(orders / (safeCloseRate / 100))
  const midAdSpend = leadsNeeded * industry.cpl * platform.multiplier

  const minAdSpend = roundUpToFiveHundred(midAdSpend * AD_SPEND_BAND.min)
  const maxAdSpend = roundUpToFiveHundred(midAdSpend * AD_SPEND_BAND.max)
  const boundedMid = (minAdSpend + maxAdSpend) / 2

  return {
    leadsNeeded,
    minAdSpend,
    maxAdSpend,
    midAdSpend: boundedMid,
    roas: boundedMid > 0 ? Math.round((inputs.revenueTarget / boundedMid) * 10) / 10 : 0,
    cpl: industry.cpl,
    tier: findAdsFeeTier(boundedMid),
  }
}

// ── SMM calculator: base + per-unit + add-on build-up ────────────────────────

export interface SmmTier {
  /** Mirrors the package name on the Packages page. */
  value: string
  label: string
  description: string
  /** PLACEHOLDER: InstaPost publishes package inclusions, not monthly fees. */
  baseFee: number
}

export const SMM_TIERS: SmmTier[] = [
  {
    value: 'Launch',
    label: 'Launch',
    description: 'Ready-to-post content, you provide the materials',
    baseFee: 12000,
  },
  {
    value: 'Momentum',
    label: 'Momentum',
    description: 'Monthly shoot + higher volume + ad testing',
    baseFee: 22000,
  },
  {
    value: 'Scale',
    label: 'Scale',
    description: 'Consistency plus heavier performance',
    baseFee: 35000,
  },
]

/** PLACEHOLDER: per-unit rates modelled on the reference tool's build-up. */
export const SMM_RATES = {
  /** Added per platform managed. */
  perPlatform: 3000,
  /** Added per weekly post (design + copy). */
  perPostPerWeek: 800,
  /** Monthly fee when paid-ads management is added (percentage of ad budget). */
  adsManagementRate: 0.15,
  addOns: {
    reels: 6000,
    community: 5000,
    influencer: 10000,
  },
  /** Organic reach per published content piece (PH estimate). */
  organicReachPerPiece: 1200,
  /** Paid impressions per peso of ad budget (≈₱125 CPM). */
  paidImpressionsPerPeso: 8,
}

export type SmmAddOnKey = 'reels' | 'ads' | 'community' | 'influencer'

export interface SmmAddOnOption {
  value: SmmAddOnKey
  label: string
  description: string
}

export const SMM_ADD_ONS: SmmAddOnOption[] = [
  { value: 'reels', label: 'Reels / short-form video', description: 'Edited 15–30s reels from our shoot' },
  { value: 'ads', label: 'Paid social ads management', description: 'Setup, optimization and monthly reporting' },
  { value: 'community', label: 'Community management', description: 'DMs, comments and inbox follow-ups' },
  { value: 'influencer', label: 'Micro-influencer posts', description: 'Influencers posting on FB/IG with usage rights' },
]

export const SMM_SLIDER_RANGE = {
  platforms: { min: 1, max: 5, step: 1 },
  postsPerWeek: { min: 2, max: 14, step: 1 },
  adBudget: { min: 10000, max: 300000, step: 5000 },
}

export interface SmmInputs {
  /** One of SMM_TIERS[].value */
  tier: string
  platforms: number
  postsPerWeek: number
  addOns: SmmAddOnKey[]
  /** Monthly client-funded ad budget, only counted when 'ads' is checked. */
  adBudget: number
}

export const SMM_DEFAULT_INPUTS: SmmInputs = {
  tier: 'Momentum',
  platforms: 2,
  postsPerWeek: 4,
  addOns: ['reels'],
  adBudget: 20000,
}

export interface SmmEstimate {
  managementFee: number
  totalMonthly: number
  /** Organic reach + paid impressions, when ads are enabled. */
  monthlyReach: number
  contentPieces: number
  tier: SmmTier
  /** The published InstaPost package matching the selected tier. */
  pkg: SmmPackage
}

/**
 * fee   = tier base + (per platform × platforms) + (per post × posts/week) + add-ons
 * total = fee + client-funded ad budget (only when ads management is checked)
 */
export function estimateSmmPricing(inputs: SmmInputs): SmmEstimate {
  const tier = SMM_TIERS.find((t) => t.value === inputs.tier) ?? SMM_TIERS[1]
  const hasAds = inputs.addOns.includes('ads')

  let fee =
    tier.baseFee +
    SMM_RATES.perPlatform * inputs.platforms +
    SMM_RATES.perPostPerWeek * inputs.postsPerWeek

  if (inputs.addOns.includes('reels')) fee += SMM_RATES.addOns.reels
  if (inputs.addOns.includes('community')) fee += SMM_RATES.addOns.community
  if (inputs.addOns.includes('influencer')) fee += SMM_RATES.addOns.influencer

  const adBudget = hasAds ? inputs.adBudget : 0
  if (hasAds) fee += adBudget * SMM_RATES.adsManagementRate

  const contentPieces = inputs.postsPerWeek * 4 * inputs.platforms
  const monthlyReach =
    contentPieces * SMM_RATES.organicReachPerPiece + adBudget * SMM_RATES.paidImpressionsPerPeso

  return {
    managementFee: Math.round(fee),
    totalMonthly: Math.round(fee + adBudget),
    monthlyReach,
    contentPieces,
    tier,
    pkg: getSmmPackage(tier.value),
  }
}

// ── Market benchmarks + FAQ content (fallback copy for the tool pages) ────────

export interface BenchmarkRow {
  label: string
  value: string
}

export const ADS_BENCHMARKS: BenchmarkRow[] = [
  { label: 'E-commerce / Retail CPL', value: '₱400 – ₱600' },
  { label: 'Services / B2B CPL', value: '₱800 – ₱1,100' },
  { label: 'Real Estate CPL', value: '₱1,200 – ₱1,800' },
  { label: 'Healthcare / Medical CPL', value: '₱900 – ₱1,400' },
  { label: 'Typical ROAS (PH SME)', value: '3x – 6x' },
  { label: 'InstaPost ads management fee', value: '₱4,000 / ₱8,000 / ₱12,000 per month' },
]

export const SMM_BENCHMARKS: BenchmarkRow[] = [
  { label: 'Launch package', value: '6 static posts + 1 carousel + 1 reel' },
  { label: 'Momentum package', value: '10 static posts + 2 carousels + 2 reels + 2 influencers' },
  { label: 'Scale package', value: '12 static posts + 4 carousels + 4 reels + 4 influencers' },
  { label: 'Organic shoot', value: '2 hours, 25 edited photos (Momentum & Scale)' },
  { label: 'Ads management included', value: '₱10,000 / ₱20,000 / ₱30,000 ad budget' },
  { label: 'Facebook reach rate (PH)', value: '1% – 5% organic' },
]

export interface FaqItem {
  question: string
  answer: string
}

export const ADS_FAQ: FaqItem[] = [
  {
    question: 'How much should a Philippine SME spend on ads each month?',
    answer:
      'Most small to mid-size businesses start between ₱30,000 and ₱80,000 a month. Below ₱20,000 the platforms rarely gather enough data to optimise, so results stay inconsistent. Use the slider to see what your revenue target implies.',
  },
  {
    question: 'Is the ad budget the same as the management fee?',
    answer:
      'No. The ad budget is paid directly to Meta and Google. InstaPost charges a separate flat management fee — ₱4,000 for a ₱10,000 budget, ₱8,000 for ₱20,000 and ₱12,000 for ₱30,000 — for setup, optimization, targeting protocol and monthly reporting.',
  },
  {
    question: 'What ROAS should I expect?',
    answer:
      'A good working benchmark is 3x to 5x for e-commerce and 4x to 8x for high-ticket services. Months one and two usually land nearer 2x to 3x while the pixel learns; anything above 5x is typical after six months of consistent testing.',
  },
  {
    question: 'Should I run Google, Meta, or both?',
    answer:
      'Google captures demand that already exists — people searching for you. Meta creates demand with people who have never heard of you. Most InstaPost clients get the cheapest blended cost per lead running both, which is why Google + Meta is the calculator baseline.',
  },
  {
    question: 'How fast will I see leads?',
    answer:
      'First leads usually arrive in week one or two. The real work is optimisation: cost per lead normally settles around month three once the creative and audience data have matured.',
  },
]

export const SMM_FAQ: FaqItem[] = [
  {
    question: 'What is actually included in the monthly fee?',
    answer:
      'Content planning, design, captions, publishing and monthly reporting for the post volume you select. Reels, community management, influencer coordination and ads management are separate line items in the calculator so you can see what each one costs.',
  },
  {
    question: 'Why does InstaPost not publish package prices online?',
    answer:
      'Because scope drives price more than anything else — a food brand needing weekly shoots costs more to serve than a B2B firm with ready-made materials. The calculator gives you a working range; your strategy session locks the final number.',
  },
  {
    question: 'Do you shoot the content or do I send it?',
    answer:
      'Both work. Launch is built around materials you provide. Momentum and Scale include a two-hour organic shoot with 25 edited photos plus raw clips for reels.',
  },
  {
    question: 'Can I change packages mid-contract?',
    answer:
      'Yes. Most clients start on Launch or Momentum and step up once ads start returning. We re-scope at the start of a billing month so nothing is prorated awkwardly.',
  },
  {
    question: 'Is the ad budget included in the management fee?',
    answer:
      'No — ad spend is client-funded and paid straight to the platforms. The management fee covers the work of running it, and each package already includes management for a set ad budget (₱10,000 / ₱20,000 / ₱30,000).',
  },
]

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
  benchmarksHeading?: string | null
  benchmarks?: BenchmarkRow[] | null
}

export interface ToolFaqContent {
  preHeader?: string | null
  heading?: string | null
  items?: FaqItem[] | null
}

export interface ToolSidebarContent {
  aboutHeading?: string | null
  aboutBody?: string | null
  quoteHeading?: string | null
  quoteBody?: string | null
}

export interface ToolPageData {
  intro?: ToolDetailContent | null
  howItWorks?: ToolHowItWorksContent | null
  faq?: ToolFaqContent | null
  sidebar?: ToolSidebarContent | null
}

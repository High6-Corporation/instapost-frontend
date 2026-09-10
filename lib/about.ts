import { wpGraphQLPersistedQuery } from '@/lib/wp-graphql'

// ── Reusable shapes ──────────────────────────────────────────────────────────

/** Single image relation (e.g. hero background) → { node { ... } } */
interface ImageField {
  node: {
    sourceUrl: string
    altText: string
  } | null
}

/** Image relation queried for sourceUrl only (e.g. mission image, founder profile) */
interface MediaField {
  node: {
    sourceUrl: string
  } | null
}

// ── Section types (mirrors the GetAboutUsPage persisted query) ─────────────────

export interface AboutHeroSection {
  preHeader: string
  mainHeading: string
  subtext: string
  backgroundImage: ImageField | null
}

export interface AboutIntroductionSection {
  mainHeading: string
  subtext: string
  introductionImage: MediaField | null
}

export interface AboutVideoListItem {
  video: {
    node: {
      guid: string
    }
  } | null
}

export interface AboutMissionContent {
  missionTitle: string
  missionParagraph: string
}
export interface AboutVisionContent {
  visionTitle: string
  visionParagraph: string
}
export interface AboutMissionVisionSection {
  missionAndVisionImage: MediaField | null
  missionContents: AboutMissionContent[]
  visionContents: AboutVisionContent[]
}

export interface AboutWhyWeExistSection {
  preHeader: string
  mainHeading: string
  bodyContent: string
  highlightQuote: string
  footerContent: string
}

export interface AboutPromiseItem {
  itemText: string
}
export interface AboutSignatureItem {
  name: string
  position: string
}
export interface AboutOurPromiseSection {
  preHeaderLeft: string
  preHeaderRight: string
  promiseList: AboutPromiseItem[]
  signatureList: AboutSignatureItem[]
}

export interface AboutValueItem {
  valueTitle: string
  valueDescription: string
}
export interface AboutWhyWeStandSection {
  mainHeading: string
  subtext: string
  valuesList: AboutValueItem[]
}

export interface AboutStatItem {
  statValue: string
  subtext: string
}
export interface AboutStatsSection {
  statsList: AboutStatItem[]
}

export interface AboutFounderItem {
  profile: MediaField | null
  name: string
  position: string
  description: string
}
export interface AboutFoundersSection {
  mainHeading: string
  subtext: string
  foundersList: AboutFounderItem[]
  footerNote: string
}

export interface AboutRedirectionLink {
  url: string
  title: string
  target: string | null
}
export interface AboutEmpoweringSection {
  preHeader: string
  mainHeading: string
  subtext: string
  redirectionLink: AboutRedirectionLink | null
}

export interface AboutCtaSection {
  mainHeading: string
  subtext: string
}

export interface AboutDynamicContent {
  heroSection: AboutHeroSection
  introductionSection: AboutIntroductionSection
  videoListSection: AboutVideoListItem[]
  missionAndVisionSection: AboutMissionVisionSection
  whyWeExistSection: AboutWhyWeExistSection
  ourPromiseSection: AboutOurPromiseSection
  whyWeStandSection: AboutWhyWeStandSection
  statsSection: AboutStatsSection
  foundersSection: AboutFoundersSection
  empoweringSection: AboutEmpoweringSection
  ctaSection: AboutCtaSection
}

export interface AboutPageData {
  title: string
  dynamicContentAboutUsPage: AboutDynamicContent
}

// ── Persisted Query ID ───────────────────────────────────────────────────────

const ABOUT_PAGE_QUERY_ID =
  'f165d99b6bae1c3a0e6dd74e7513026fa803c828686968bfd1cc7658ca263c57'

// ── Fetch ────────────────────────────────────────────────────────────────────

export async function getAboutPageData(): Promise<AboutPageData | null> {
  try {
    const data = await wpGraphQLPersistedQuery<{ pageBy: AboutPageData }>(
      ABOUT_PAGE_QUERY_ID,
      ['wordpress-pages'],
    )
    return data.pageBy
  } catch (err) {
    console.error('[about] Failed to load About page data:', err)
    return null
  }
}

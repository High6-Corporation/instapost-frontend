import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import BackToTop from "@/components/global/BackToTop"
import { Hero } from "@/components/sections/homepage/Hero"
import { RoasArchiveSection } from "@/components/sections/homepage/RoasArchiveSection"
import { HighlightsSection } from "@/components/sections/homepage/HighlightsSection"
import { BrandsSection } from "@/components/sections/homepage/BrandsSection"
import { ProjectsSection } from "@/components/shared/ProjectsSection"
import { SwitchToInstaPostSection } from "@/components/sections/homepage/SwitchToInstaPostSection"
import { ServicesSection } from "@/components/sections/homepage/ServicesSection"
import { PerformancePackageSection } from "@/components/sections/homepage/PerformancePackageSection"
import { BuiltForBrandsSection } from "@/components/sections/homepage/BuiltForBrandsSection"
import { HowWeWorkSection } from "@/components/sections/homepage/HowWeWorkSection"
import { GuaranteeSection } from "@/components/sections/homepage/GuaranteeSection"
import { MarketingSection } from "@/components/sections/homepage/MarketingSection"
import { IndustriesSection } from "@/components/sections/homepage/IndustriesSection"
import { TestimonialsSection } from "@/components/sections/homepage/TestimonialsSection"
import { ProofSection } from "@/components/sections/homepage/ProofSection"
import { HomeCtaSection } from "@/components/sections/homepage/HomeCtaSection"
import type { Metadata } from 'next'
import { getPageMetadata } from '@/lib/seo'
import { wpGraphQLPersistedQuery } from '@/lib/wp-graphql'

// Hero section types
interface HeroSectionData {
  mainHeading: string
  subtext: string
}

// RoasArchive section types
interface RoasArchiveSectionData {
  mainHeading: string
  subtext: string
  bottomSummary: {
    title: string
    description: string
    resultLabel: string
    resultValue: string
  }
}

// Proof section types
interface ProofSectionData {
  mainHeading: string
  subtext: string
  buttonLinkForViewAllCaseStudies: {
    url: string
    title: string
    target: string
  } | null
}

// SwitchToInstaPost section types
interface SwitchToInstaPostSectionData {
  mainHeading: string
  subtext: string
  list: Array<{
    cardIcon: {
      node: {
        sourceUrl: string
        altText: string
      } | null
    }
    cardTitle: string
    cardDescription: string
  }>
  statBadges: string // Single rich text HTML field with bullet list
}

// PerformancePackage section types
interface PerformancePackageSectionData {
  preHeader: string
  mainHeading: string
  subtextPackage: string
  performancePackageLink: {
    url: string
    title: string
    target: string
  } | null
}

// BuiltForBrands section types
interface BuiltForBrandsSectionData {
  mainHeading: string
  subtext: string
  industriesList: Array<{
    industryName: string
    industryDescription: string
  }>
  footerTestShort: string
}

// HowWeWork section types
interface HowWeWorkSectionData {
  mainHeading: string
  subtext: string
  steps: Array<{
    stepTitle: string
    stepDescription: string
  }>
  bottomNoteBox: string
}

// Guarantee section types
interface GuaranteeSectionData {
  preHeader: string
  mainHeading: string
  subtext: string
}

// Testimonial section types
interface TestimonialSectionData {
  mainHeading: string
  subtext: string
  clients: Array<{
    brandName: string
    clientName: string
    position: string
    customThumbnailOptional: {
      node: {
        sourceUrl: string
      } | null
    } | null
    video: {
      node: {
        guid: string
      } | null
    } | null
  }>
}

// CTA section types
interface CtaSectionData {
  mainHeading: string
  subtext: string
}

// Client data types (shared between RoasArchive and Proof sections)
interface ClientNode {
  title: string
  content: string
  slug: string
  clientCategories: {
    nodes: Array<{
      name: string
      slug: string
    }>
  }
  dynamicContentForClient: {
    metricValue: string | null
    metricLabel: string | null
    redirectionLink: {
      url: string
      title: string
      target: string
    } | null
  }
}

interface ClientsData {
  clients: {
    nodes: ClientNode[]
  }
}

interface HomePageData {
  pageBy: {
    dynamicContentHomepage: {
      heroSection: HeroSectionData
      roasArchiveSection: RoasArchiveSectionData
      proofSection: ProofSectionData
      switchToInstaPostSection: SwitchToInstaPostSectionData
      performancePackageSection: PerformancePackageSectionData
      builtForBrandsSection: BuiltForBrandsSectionData
      howWeWorkSection: HowWeWorkSectionData
      instaPostGuaranteeSection: GuaranteeSectionData
      testimonialSection: TestimonialSectionData
      ctaSection: CtaSectionData
    }
  }
}

// Persisted query IDs
const HOMEPAGE_QUERY_ID = '3b54aaa4a17ae14f1bcba83981249447f2bd21a290cba208fd10508a4b409e57'
const CLIENTS_QUERY_ID = '15529439a63f75d6da84def5dc65e1143b41386acb0f63b27e12886b8b4dd055'

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('home', '/')
}

export default async function Home() {
  // Fetch homepage data from WordPress
  let heroData: HeroSectionData | null = null
  let roasArchiveData: RoasArchiveSectionData | null = null
  let proofData: ProofSectionData | null = null
  let switchToInstaData: SwitchToInstaPostSectionData | null = null
  let performancePackageData: PerformancePackageSectionData | null = null
  let builtForBrandsData: BuiltForBrandsSectionData | null = null
  let howWeWorkData: HowWeWorkSectionData | null = null
  let guaranteeData: GuaranteeSectionData | null = null
  let testimonialData: TestimonialSectionData | null = null
  let ctaData: CtaSectionData | null = null
  let clientsData: ClientNode[] | null = null

  try {
    // Fetch both queries in parallel
    const [homepageResult, clientsResult] = await Promise.all([
      wpGraphQLPersistedQuery<HomePageData>(HOMEPAGE_QUERY_ID, ['homepage']),
      wpGraphQLPersistedQuery<ClientsData>(CLIENTS_QUERY_ID, ['clients']),
    ])

    console.log('Homepage GraphQL Response:', JSON.stringify(homepageResult, null, 2))
    console.log('Clients GraphQL Response:', JSON.stringify(clientsResult, null, 2))

    heroData = homepageResult?.pageBy?.dynamicContentHomepage?.heroSection || null
    roasArchiveData = homepageResult?.pageBy?.dynamicContentHomepage?.roasArchiveSection || null
    proofData = homepageResult?.pageBy?.dynamicContentHomepage?.proofSection || null
    switchToInstaData = homepageResult?.pageBy?.dynamicContentHomepage?.switchToInstaPostSection || null
    performancePackageData = homepageResult?.pageBy?.dynamicContentHomepage?.performancePackageSection || null
    builtForBrandsData = homepageResult?.pageBy?.dynamicContentHomepage?.builtForBrandsSection || null
    howWeWorkData = homepageResult?.pageBy?.dynamicContentHomepage?.howWeWorkSection || null
    guaranteeData = homepageResult?.pageBy?.dynamicContentHomepage?.instaPostGuaranteeSection || null
    testimonialData = homepageResult?.pageBy?.dynamicContentHomepage?.testimonialSection || null
    ctaData = homepageResult?.pageBy?.dynamicContentHomepage?.ctaSection || null
    clientsData = clientsResult?.clients?.nodes || null

    console.log('Hero Data:', heroData)
    console.log('RoasArchive Data:', roasArchiveData)
    console.log('Proof Data:', proofData)
    console.log('SwitchToInstaPost Data:', switchToInstaData)
    console.log('PerformancePackage Data:', performancePackageData)
    console.log('BuiltForBrands Data:', builtForBrandsData)
    console.log('HowWeWork Data:', howWeWorkData)
    console.log('Guarantee Data:', guaranteeData)
    console.log('Testimonial Data:', testimonialData)
    console.log('CTA Data:', ctaData)
    console.log('Clients Data:', clientsData)
  } catch (error) {
    console.error('Failed to fetch homepage data:', error)
  }

  return (
    <main className="bg-white min-h-screen w-full overflow-x-hidden">
      <Header />
      <Hero data={heroData} />
      <RoasArchiveSection data={roasArchiveData} clients={clientsData} />
      <HighlightsSection />
      <BrandsSection />
      <ProjectsSection 
        showBadge={true}
        title="Discover how we bring brands to life through content and campaigns that deliver."
        showDescription={false}
      />
      <SwitchToInstaPostSection data={switchToInstaData} />
      <ServicesSection />
      <PerformancePackageSection data={performancePackageData} />
      <BuiltForBrandsSection data={builtForBrandsData} />
      <HowWeWorkSection data={howWeWorkData} />
      <GuaranteeSection data={guaranteeData} />
      <MarketingSection />
      <IndustriesSection />
      <TestimonialsSection data={testimonialData} />
      <ProofSection data={proofData} clients={clientsData} />
      <HomeCtaSection data={ctaData} />
      <Footer />
      <BackToTop />
    </main>
  )
}

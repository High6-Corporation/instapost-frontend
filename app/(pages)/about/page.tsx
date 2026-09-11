import Header from '@/components/layout/Header'
import { HeroSection } from '@/components/sections/about/HeroSection'
import { VideoListSection } from '@/components/sections/about/VideoListSection'
import { MediaTextSection } from '@/components/shared/MediaTextSection'
import { MissionVisionSection } from '@/components/sections/about/MissionVisionSection'
import { WhyWeExistSection } from '@/components/sections/about/WhyWeExistSection'
import { OurPromiseSection } from '@/components/sections/about/OurPromiseSection'
import { WhatWeStandSection } from '@/components/sections/about/WhatWeStandSection'
import { StatsSection } from '@/components/sections/about/StatsSection'
import { FoundersSection } from '@/components/sections/about/FoundersSection'
import { EmpoweringSection } from '@/components/sections/about/EmpoweringSection'
import { CtaSection } from '@/components/global/CtaSection'
import Footer from '@/components/layout/Footer'
import { getAboutPageData, type AboutPageData } from '@/lib/about'
import type { Metadata } from 'next'
import { getPageSEO } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const pageSEO = await getPageSEO('about-us')
  if (!pageSEO?.seo) return {}
  return {
    title: pageSEO.seo.title,
    description: pageSEO.seo.description,
    keywords: pageSEO.seo.focusKeywords ?? undefined,
    alternates: {
      canonical: pageSEO.seo.canonicalUrl ?? undefined,
    },
  }
}

export default async function AboutPage() {
  const data: AboutPageData | null = await getAboutPageData()

  const dc = data?.dynamicContentAboutUsPage

  // Mission & Vision (first item from each array)
  const mission = dc?.missionAndVisionSection?.missionContents?.[0]
  const vision = dc?.missionAndVisionSection?.visionContents?.[0]

  return (
    <>
      {/* Sticky Header */}
      <Header variant="sticky" />

      {/* Hero Section */}
      <HeroSection data={dc?.heroSection} />

      {/* Introduction — temporary render until its dedicated section is built */}
      <MediaTextSection
        variant="light"
        title={dc?.introductionSection?.mainHeading}
        description={dc?.introductionSection?.subtext}
        imageSrc={dc?.introductionSection?.introductionImage?.node?.sourceUrl}
        buttonText="Inquire Now"
        buttonLink="/contact"
      />

      {/* Video List Section */}
      <VideoListSection data={dc?.videoListSection} />

      {/* Mission & Vision Section */}
      <MissionVisionSection
        imageSrc={dc?.missionAndVisionSection?.missionAndVisionImage?.node?.sourceUrl}
        missionTitle={mission?.missionTitle}
        missionParagraph={mission?.missionParagraph}
        visionTitle={vision?.visionTitle}
        visionParagraph={vision?.visionParagraph}
      />

      {/* Why We Exist Section */}
      <WhyWeExistSection data={dc?.whyWeExistSection} />

      {/* Our Promise Section */}
      <OurPromiseSection data={dc?.ourPromiseSection} />

      {/* What We Stand Section */}
      <WhatWeStandSection data={dc?.whatWeStandSection} />

      {/* Stats Section */}
      <StatsSection data={dc?.statsSection} />

      {/* Founders Section */}
      <FoundersSection data={dc?.foundersSection} />

      {/* Empowering Section */}
      <EmpoweringSection data={dc?.empoweringSection} />

      {/* CTA Section */}
      <CtaSection data={dc?.ctaSection} />

      {/* Footer */}
      <Footer />
    </>
  )
}

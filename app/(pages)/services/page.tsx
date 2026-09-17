import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ServicesHeroSection } from "@/components/sections/services/ServicesHeroSection";
import { HowTheEngineSection } from "@/components/sections/services/HowTheEngineSection";
import { ServicesListSection } from "@/components/sections/services/ServicesListSection";
import { StandardsSection } from "@/components/sections/services/StandardsSection";
import { OneRoofSection } from "@/components/sections/services/OneRoofSection";
import { ServicesCtaSection } from "@/components/sections/services/ServicesCtaSection";
import type { Metadata } from 'next'
import { getPageSEO } from '@/lib/seo'
import { getServicesPageData } from '@/lib/services-page'

export async function generateMetadata(): Promise<Metadata> {
  const pageSEO = await getPageSEO('services')
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

export default async function ServicesPage() {
  // CMS-driven content; null sections make each component render its fallback copy.
  const services = await getServicesPageData()

  return (
      <>
        <main className="bg-white min-h-screen w-full">
          <Header variant="sticky" />
          <ServicesHeroSection data={services?.hero} />
          <HowTheEngineSection data={services?.engine} />
          <ServicesListSection data={services?.list} />
          <StandardsSection data={services?.standards} />
          <OneRoofSection data={services?.oneRoof} />
          <ServicesCtaSection data={services?.cta} />
        </main>
        <Footer />
      </>
  )
}

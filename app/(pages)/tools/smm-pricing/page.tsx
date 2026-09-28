import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SubpageBanner from '@/components/shared/SubpageBanner'
import { CtaSection } from '@/components/global/CtaSection'
import { ToolIntroSection } from '@/components/sections/tools/ToolIntroSection'
import { ToolHowItWorksSection } from '@/components/sections/tools/ToolHowItWorksSection'
import { SmmCalculator } from '@/components/sections/tools/SmmCalculator'
import type { Metadata } from 'next'
import { getPageSEO } from '@/lib/seo'

// Pre-launch: these pages are intentionally unlisted (no nav/footer link), but they are
// still reachable by direct URL. Keep them out of search results until the client approves.
// Remove this once the tools go public and re-add the nav links.
const NO_INDEX: Metadata['robots'] = { index: false, follow: false }

export async function generateMetadata(): Promise<Metadata> {
  // CMS page slug may not exist yet — fall back to static metadata.
  const pageSEO = await getPageSEO('smm-pricing-tool')
  if (!pageSEO?.seo) {
    return {
      title: 'Social Media Pricing Tool | InstaPost',
      robots: NO_INDEX,
      description:
        'Answer a few quick questions and get an instant InstaPost social media management package recommendation for your business.',
    }
  }
  return {
    title: pageSEO.seo.title,
    description: pageSEO.seo.description,
    keywords: pageSEO.seo.focusKeywords ?? undefined,
    alternates: {
      canonical: pageSEO.seo.canonicalUrl ?? undefined,
    },
    robots: NO_INDEX,
  }
}

export default async function SmmPricingToolPage() {
  // CMS-driven content; null sections make each component render its fallback copy.
  // Future: replace with a getToolPageData('smm') persisted query once ACF fields exist.

  return (
    <>
      <main className="bg-white min-h-screen w-full">
        <Header variant="sticky" />
        <SubpageBanner title="Social Media Pricing Tool" />
        <ToolIntroSection />
        <SmmCalculator />
        <ToolHowItWorksSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}

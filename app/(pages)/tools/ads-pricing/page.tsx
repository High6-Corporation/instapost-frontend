import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SubpageBanner from '@/components/shared/SubpageBanner'
import { CtaSection } from '@/components/global/CtaSection'
import { ToolIntroSection } from '@/components/sections/tools/ToolIntroSection'
import { ToolHowItWorksSection } from '@/components/sections/tools/ToolHowItWorksSection'
import { AdsCalculator } from '@/components/sections/tools/AdsCalculator'
import type { Metadata } from 'next'
import { getPageSEO } from '@/lib/seo'

// Pre-launch: these pages are intentionally unlisted (no nav/footer link), but they are
// still reachable by direct URL. Keep them out of search results until the client approves.
// Remove this once the tools go public and re-add the nav links.
const NO_INDEX: Metadata['robots'] = { index: false, follow: false }

export async function generateMetadata(): Promise<Metadata> {
  // CMS page slug may not exist yet — fall back to static metadata.
  const pageSEO = await getPageSEO('ads-pricing-tool')
  if (!pageSEO?.seo) {
    return {
      title: 'Ads Budget Calculator | InstaPost',
      robots: NO_INDEX,
      description:
        'Calculate how much you should spend on Facebook, Instagram and Google ads to hit your revenue target, plus the matching InstaPost management fee.',
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

export default async function AdsPricingToolPage() {
  // CMS-driven content; null sections make each component render its fallback copy.
  // Future: replace with a getToolPageData('ads') persisted query once ACF fields exist.

  return (
    <>
      <main className="bg-white min-h-screen w-full">
        <Header variant="sticky" />
        <SubpageBanner title="Ads Budget Calculator" />
        <ToolIntroSection />
        <AdsCalculator />
        <ToolHowItWorksSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}

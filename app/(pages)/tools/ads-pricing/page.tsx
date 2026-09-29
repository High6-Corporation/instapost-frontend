import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SubpageBanner from '@/components/shared/SubpageBanner'
import { CtaSection } from '@/components/global/CtaSection'
import { ToolIntroSection } from '@/components/sections/tools/ToolIntroSection'
import { AdsCalculator } from '@/components/sections/tools/AdsCalculator'
import { ToolHowItWorksSection } from '@/components/sections/tools/ToolHowItWorksSection'
import { ToolFaqSection } from '@/components/sections/tools/ToolFaqSection'
import { ADS_BENCHMARKS, ADS_FAQ } from '@/lib/tools'
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
        'Slide to your revenue target and get an instant estimate of the monthly ad spend, cost per lead and InstaPost ads management fee behind it.',
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

const HOW_IT_WORKS_STEPS = [
  'Set the monthly revenue you want your ads to produce.',
  'Enter what one customer typically spends and how often you close a lead.',
  'Pick your industry and the platform mix you plan to run.',
  'Read the lead volume, spend range and return on ad spend behind that target — live, as you move each slider.',
  'Bring the numbers to a strategy session and we will confirm them against real account data.',
]

export default async function AdsPricingToolPage() {
  // CMS-driven content; null sections make each component render its fallback copy.
  // Future: replace with a getToolPageData('ads') persisted query once ACF fields exist.

  return (
    <>
      <main className="bg-white min-h-screen w-full">
        <Header variant="sticky" />
        <SubpageBanner title="Ads Budget Calculator" />
        <ToolIntroSection
          preHeader="Paid Ads Tool · Free"
          heading="How much should you spend on ads to hit your revenue target?"
          subtext="Move the sliders to match your business. The calculator works backwards from your revenue goal through Philippine cost-per-lead benchmarks to the monthly ad budget — and the InstaPost management tier that covers it."
        />
        <AdsCalculator />
        <ToolHowItWorksSection
          heading="How this calculator works"
          steps={HOW_IT_WORKS_STEPS}
          benchmarksHeading="Philippines cost-per-lead benchmarks"
          benchmarks={ADS_BENCHMARKS}
        />
        <ToolFaqSection items={ADS_FAQ} />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}

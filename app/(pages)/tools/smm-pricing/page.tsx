import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SubpageBanner from '@/components/shared/SubpageBanner'
import { CtaSection } from '@/components/global/CtaSection'
import { ToolIntroSection } from '@/components/sections/tools/ToolIntroSection'
import { SmmCalculator } from '@/components/sections/tools/SmmCalculator'
import { ToolHowItWorksSection } from '@/components/sections/tools/ToolHowItWorksSection'
import { ToolFaqSection } from '@/components/sections/tools/ToolFaqSection'
import { SMM_BENCHMARKS, SMM_FAQ } from '@/lib/tools'
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
        'Pick your tier, platforms, posting frequency and add-ons to get an instant monthly social media management estimate from InstaPost.',
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
  'Choose the management tier that matches how active you want to be.',
  'Set how many platforms we run and how many posts go out each week.',
  'Tick the add-ons you need — reels, ads management, community or influencers.',
  'Watch the monthly fee, total investment, reach and content volume update as you go.',
  'We match your setup to the closest published InstaPost package in your strategy session.',
]

export default async function SmmPricingToolPage() {
  // CMS-driven content; null sections make each component render its fallback copy.
  // Future: replace with a getToolPageData('smm') persisted query once ACF fields exist.

  return (
    <>
      <main className="bg-white min-h-screen w-full">
        <Header variant="sticky" />
        <SubpageBanner title="Social Media Pricing Tool" />
        <ToolIntroSection
          preHeader="Social Media Tool · Free"
          heading="What should social media management cost your business?"
          subtext="Build the scope you actually need — platforms, posting frequency and add-ons — and see the monthly investment update live, using the same package structure InstaPost publishes."
        />
        <SmmCalculator />
        <ToolHowItWorksSection
          heading="How this calculator works"
          steps={HOW_IT_WORKS_STEPS}
          benchmarksHeading="InstaPost package benchmarks"
          benchmarks={SMM_BENCHMARKS}
        />
        <ToolFaqSection items={SMM_FAQ} />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}

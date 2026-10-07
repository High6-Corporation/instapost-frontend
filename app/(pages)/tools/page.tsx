import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { CtaSection } from '@/components/global/CtaSection'
import { ToolsHeroSection } from '@/components/sections/tools/ToolsHeroSection'
import { ToolsGridSection } from '@/components/sections/tools/ToolsGridSection'
import type { Metadata } from 'next'
import { getPageSEO, absoluteUrl } from '@/lib/seo'

// Pre-launch: these pages are intentionally unlisted (no nav/footer link), but they are
// still reachable by direct URL. Keep them out of search results until the client approves.
// Remove this once the tools go public and re-add the nav links.
const NO_INDEX: Metadata['robots'] = { index: false, follow: false }

export async function generateMetadata(): Promise<Metadata> {
  // CMS page "tools" may not exist yet — fall back to static metadata.
  const pageSEO = await getPageSEO('tools')
  if (!pageSEO?.seo) {
    return {
      title: 'Free Marketing Pricing Tools | InstaPost',
      robots: NO_INDEX,
      description:
        'Instantly estimate your social media management package and paid ads budget with InstaPost\u2019s free marketing pricing tools.',
    }
  }
  return {
    title: pageSEO.seo.title,
    description: pageSEO.seo.description,
    keywords: pageSEO.seo.focusKeywords ?? undefined,
    alternates: {
      canonical: absoluteUrl('/tools'),
    },
    robots: NO_INDEX,
  }
}

export default async function ToolsPage() {
  // CMS-driven content; null sections make each component render its fallback copy.
  // Future: replace with getToolsPageData() persisted query once ACF fields exist.

  return (
    <>
      <main className="bg-white min-h-screen w-full">
        <Header variant="sticky" />
        <ToolsHeroSection />
        <ToolsGridSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}

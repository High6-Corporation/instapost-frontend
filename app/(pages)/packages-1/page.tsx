import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { PackagesHeroSection } from "@/components/sections/packages/PackagesHeroSection";
import { ReceiptTapeSection } from "@/components/sections/packages/ReceiptTapeSection";
import { IndustryMatcherSection } from "@/components/sections/packages/IndustryMatcherSection";
import { PackagesSection } from "@/components/sections/packages/PackagesSection";
import { GuaranteeSection } from "@/components/sections/packages/GuaranteeSection";
import { AddOnsSection } from "@/components/sections/packages/AddOnsSection";
import { OnboardingTimelineSection } from "@/components/sections/packages/OnboardingTimelineSection";
import { PackagesFaqSection } from "@/components/sections/packages/PackagesFaqSection";
import { PackagesCtaSection } from "@/components/sections/packages/PackagesCtaSection";
import type { Metadata } from 'next'
import { getPageSEO } from '@/lib/seo'
import { getPackagesClientStats } from '@/lib/packages'

// ─── INTERNAL DESIGN PREVIEW (not in the menu) ───────────────────────────────
// /packages-1 serves the REDESIGNED Packages page ("Services & Rate Card v2").
// The public /packages still shows the original design so client viewing is
// unaffected. This route is deliberately hidden: not in the nav, not in the
// sitemap, noindexed, and its canonical points at /packages.
export async function generateMetadata(): Promise<Metadata> {
  const pageSEO = await getPageSEO('packages')
  if (!pageSEO?.seo) return {}
  return {
    title: `${pageSEO.seo.title} (New Design Preview)`,
    description: pageSEO.seo.description,
    keywords: pageSEO.seo.focusKeywords ?? undefined,
    robots: { index: false, follow: false },
    alternates: {
      canonical: '/packages',
    },
  }
}

// Packages page — rebuilt from the "Services & Rate Card v2" mockup.
// Sections render their FALLBACK_ copy until the CMS fields exist; the receipt
// tape is already dynamic, fed by the same client posts as the homepage ROAS
// Archive (lib/packages.ts).
export default async function PackagesPreviewPage() {
  // Client posts for the results tape; null falls back to the local copy.
  const clientStats = await getPackagesClientStats()

  return (
    <>
      <main className="bg-white min-h-screen w-full overflow-x-hidden">
        <Header variant="sticky" />

        {/* ── Hero (replaces the old SubpageBanner) ── */}
        <PackagesHeroSection />

        {/* ── Documented client results, from the WP client posts ── */}
        <ReceiptTapeSection data={{ stats: clientStats }} />

        {/* ── "What do you sell?" industry matcher ── */}
        <IndustryMatcherSection />

        {/* ── Monthly retainers: flagship + 4 tiers ── */}
        <PackagesSection />

        {/* ── The on-time guarantee ── */}
        <GuaranteeSection />

        {/* ── Shoots, videos & campaigns rate card ── */}
        <AddOnsSection />

        {/* ── Signed to posting in 21 days ── */}
        <OnboardingTimelineSection />

        {/* ── Before you ask (FAQ) ── */}
        <PackagesFaqSection />

        {/* ── Final CTA (retained styling, CMS-ready `data` prop) ── */}
        <PackagesCtaSection />
        <Footer />
      </main>
    </>
  )
}

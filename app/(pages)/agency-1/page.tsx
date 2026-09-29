import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AgencyHeroSection } from "@/components/sections/agency/AgencyHeroSection";
import { RateCatalogSection } from "@/components/sections/agency/RateCatalogSection";
import { GuaranteeStripSection } from "@/components/sections/agency/GuaranteeStripSection";
import { AgencyCtaSection } from "@/components/sections/agency/AgencyCtaSection";
import type { Metadata } from 'next'
import { getPageSEO } from '@/lib/seo'

// ─── INTERNAL DESIGN PREVIEW (not in the menu) ───────────────────────────────
// /agency-1 serves the redesigned "Full Catalog" Agency page. The public /agency
// still shows the original card-stack design so client viewing is unaffected.
// Deliberately hidden: not in the nav, not in the sitemap, noindexed, canonical
// points at /agency.
export async function generateMetadata(): Promise<Metadata> {
  const pageSEO = await getPageSEO('agency')
  if (!pageSEO?.seo) return {}
  return {
    title: `${pageSEO.seo.title} (New Design Preview)`,
    description: pageSEO.seo.description,
    keywords: pageSEO.seo.focusKeywords ?? undefined,
    robots: { index: false, follow: false },
    alternates: {
      canonical: '/agency',
    },
  }
}

// Agency page — rebuilt as "The Full Catalog": one printable master rate sheet
// (sections A–F) instead of the old stack of per-package detail cards.
// Sections render their FALLBACK_ copy; none is CMS-wired yet, and each takes
// an optional `data` prop so it can be wired the way the Packages tape is.
export default function AgencyPreviewPage() {
  return (
    <>
      <main className="bg-white min-h-screen w-full overflow-x-hidden">
        <Header variant="sticky" />

        {/* ── Hero + proofline (replaces the old SubpageBanner) ── */}
        <AgencyHeroSection />

        {/* ── The rate sheet: A Monthly Retainers → F Customer Service ── */}
        <RateCatalogSection />

        {/* ── Four brand promises on red ── */}
        <GuaranteeStripSection />

        {/* ── Closing CTA (retained site CTA styling) ── */}
        <AgencyCtaSection />

        <Footer />
      </main>
    </>
  );
}

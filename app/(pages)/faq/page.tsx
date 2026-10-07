import Header from '@/components/layout/Header';
import SubpageBanner from '@/components/shared/SubpageBanner';
import FAQSection from '@/components/sections/faq/FAQSection';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/global/BackToTop';
import type { Metadata } from 'next'
import { getPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('faq', '/faq')
}

export default function FAQPage() {
  return (
    <main className="bg-white min-h-screen w-full overflow-x-hidden">
      <Header variant="sticky" />
      <SubpageBanner 
        title="FAQs"
      />
      <FAQSection />
      <Footer />
      <BackToTop />
    </main>
  );
}

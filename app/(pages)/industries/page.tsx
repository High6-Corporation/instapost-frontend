import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SubpageBanner from '@/components/shared/SubpageBanner'
import BackToTop from '@/components/global/BackToTop'
import { IntroText } from '@/components/sections/industries/IntroText'
import { IndustryCard } from '@/components/shared/IndustryCard'
import { CtaSection } from '@/components/global/CtaSection'
import { getIndustries } from '@/lib/industries'
import type { Metadata } from 'next'
import { getPageMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('industries', '/industries')
}

export default async function IndustriesPage() {
  const industries = await getIndustries()

  return (
    <main className="bg-white min-h-screen w-full overflow-x-hidden">
      <Header variant="sticky" />
      <SubpageBanner title="Industries" />
      <IntroText />
      
      {/* Industry Sections - Alternating White/Red Pattern */}
      {industries.map((industry, index) => {
        const isEven = index % 2 === 1
        return (
          <IndustryCard
            key={industry.id}
            theme={isEven ? 'red' : 'white'}
            isReversed={isEven}
            title={industry.title}
            description={industry.description}
            imageSrc={industry.imageSrc}
            imageAlt={industry.imageAlt}
            iconSrc={industry.iconSrc ?? undefined}
            iconAlt={industry.iconAlt}
            buttonText="Learn More"
            buttonLink={`/industries/${industry.slug}`}
          />
        )
      })}
      
      {/* CTA Section */}
      <CtaSection />
      
      <Footer />
      <BackToTop />
    </main>
  )
}

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import SubpageBanner from '@/components/shared/SubpageBanner'
import ScrollAnimationWrapper from '@/components/global/ScrollAnimationWrapper'
import { CtaSection } from '@/components/global/CtaSection'
import BackToTop from '@/components/global/BackToTop'
import WorksGridSection from '@/components/sections/works/WorksGridSection'
import type { WorkCardData } from '@/components/blocks/WorkCard'
import type { Metadata } from 'next'
import { getPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('works', '/works')
}

// Card background palette (cycled through 15 cards)
const CARD_COLORS = [
  '#0F2FEB', // blue
  '#F8311A', // red-orange
  '#FEF102', // yellow
  '#000000', // black
  '#F6F6F6', // light gray
  '#CA202D', // dark red
]

// Brand logo configs (repeating for 15 cards)
const BRAND_LOGOS = [
  { src: '/images/sm_logo.png', alt: 'SM Supermalls' },
  { src: '/logo/fat-cousins-proj.png', alt: 'Fat Cousins' },
  { src: '/logo/kanzen-proj.jpg', alt: 'Kanzen' },
  { src: '/logo/onesimus-proj.jpg', alt: 'Onésimus' },
  { src: '/logo/arisun-proj.png', alt: 'Arisun' },
  { src: '/logo/nissan-proj.jpg', alt: 'Nissan' },
]

// Generate 15 work cards
const works: WorkCardData[] = Array.from({ length: 15 }, (_, i) => {
  const brand = BRAND_LOGOS[i % BRAND_LOGOS.length]
  return {
    id: i + 1,
    bgColor: CARD_COLORS[i % CARD_COLORS.length],
    logoSrc: brand.src,
    logoAlt: brand.alt,
    category: 'Videography',
    title: brand.alt,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    images: ['/images/sample-slides.jpg', '/images/sample-slides.jpg'],
    results: [
      { value: '150k', label: 'Lorem Ipsum Dolor' },
      { value: '150k', label: 'Lorem Ipsum Dolor' },
      { value: '150k', label: 'Lorem Ipsum Dolor' },
    ],
  }
})

export default function WorksPage() {
  return (
    <main className="bg-white min-h-screen w-full overflow-x-hidden">
      <Header variant="sticky" />

      {/* Subpage Banner */}
      <SubpageBanner title="Works" />

      {/* Intro description */}
      <ScrollAnimationWrapper>
        <Section className="bg-white pt-[32px] md:pt-[40px] lg:pt-[70px] pb-[32px] md:pb-[40px] lg:pb-[50px]">
          <Row className="!max-w-[1064px]">
            <p className="body-md text-neutral-500 text-center leading-[26px]">
              Explore our work—where creativity meets strategy. Each project
              reflects our commitment to delivering high-quality visuals that
              engage, inspire, and drive results.
            </p>
          </Row>
        </Section>
      </ScrollAnimationWrapper>

      {/* Works Grid + Popup */}
      <WorksGridSection works={works} initialCount={12} step={6} />

      {/* CTA Section */}
      <CtaSection />

      {/* Footer */}
      <Footer />

      {/* Back to Top Button */}
      <BackToTop />
    </main>
  )
}

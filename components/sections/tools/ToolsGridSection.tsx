import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import ScrollAnimationWrapper from '@/components/global/ScrollAnimationWrapper'
import Image from 'next/image'
import Link from 'next/link'

interface ToolCard {
  category: string
  title: string
  description: string
  cta: string
  href: string
  imageSrc: string
}

const TOOL_CARDS: ToolCard[] = [
  {
    category: 'Social Media Tool',
    title: 'Social Media Pricing Tool',
    description:
      'Set your tier, platforms, posting frequency and add-ons to see an instant monthly management fee, matched to InstaPost’s published packages.',
    cta: 'Get My SMM Estimate',
    href: '/tools/smm-pricing',
    imageSrc: '/images/momentum.jpg',
  },
  {
    category: 'Paid Ads Tool',
    title: 'Ads Budget Calculator',
    description:
      'Slide to your revenue target and get the lead volume, ad spend range and matching InstaPost ads management fee behind it — updating live.',
    cta: 'Calculate My Ad Budget',
    href: '/tools/ads-pricing',
    imageSrc: '/images/ads-manager.jpg',
  },
]

// Fallback heading — used until the CMS fields are filled.
const FALLBACK_HEADING = 'Pick a tool and get your estimate in under a minute'

function ToolsGridSection() {
  return (
    <Section className="bg-white py-[60px] md:py-[80px] lg:py-[100px]">
      <Row className="flex flex-col items-start gap-10">
        <ScrollAnimationWrapper className="w-full">
          <h2 className="heading-2 font-medium text-text-primary">{FALLBACK_HEADING}</h2>
        </ScrollAnimationWrapper>

        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
          {TOOL_CARDS.map((card) => (
            <ScrollAnimationWrapper key={card.href} className="w-full">
              <Link
                href={card.href}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0px_0px_7px_rgba(0,0,0,0.08)] transition-shadow duration-200 hover:shadow-[0px_8px_24px_rgba(0,0,0,0.12)]"
              >
                <div className="relative h-[220px] w-full overflow-hidden">
                  <Image
                    src={card.imageSrc}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col items-start gap-3 p-7">
                  <span className="rounded-full bg-bg-secondary px-3 py-1 caption font-semibold uppercase tracking-[1px] text-primary">
                    {card.category}
                  </span>
                  <h3 className="heading-3 font-medium text-text-primary">{card.title}</h3>
                  <p className="body-md leading-relaxed text-text-secondary">{card.description}</p>
                  <span className="mt-auto pt-4 label-md font-semibold uppercase tracking-[1px] text-primary">
                    {card.cta} →
                  </span>
                </div>
              </Link>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </Row>
    </Section>
  )
}

export { ToolsGridSection }
export default ToolsGridSection

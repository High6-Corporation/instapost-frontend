import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import ScrollAnimationWrapper from '@/components/global/ScrollAnimationWrapper'

// Fallback content (mirrors the reference copy) — used only until the CMS fields are filled.
const FALLBACK_PREHEADER = 'One roof, one invoice'
const FALLBACK_HEADING = 'These five work best as one retainer.'
const FALLBACK_SUBTEXT =
  'Every package bundles the system — from Essentials at ₱60,000/month to the revenue-accountable Performance Package. Fixed prices, no surprise line items.'
const FALLBACK_LINK_TEXT = 'See packages & rates'

// Same gold radial as the About "Empowering" section, painted full-bleed on the section.
const GOLD_GRADIENT =
  'radial-gradient(circle at 50% 30%, rgba(253, 209, 13, 0.15) 0%, rgba(253, 209, 13, 1) 100%)'

interface RedirectionLink {
  url: string
  title: string
  target: string
}

interface OneRoofSectionProps {
  data?: {
    preHeader?: string | null
    mainHeading?: string | null
    subtext?: string | null
    redirectionLink?: RedirectionLink | null
  } | null
}

export function OneRoofSection({ data }: OneRoofSectionProps) {
  const preHeader = data?.preHeader || FALLBACK_PREHEADER
  const heading = data?.mainHeading || FALLBACK_HEADING
  const subtext = data?.subtext || FALLBACK_SUBTEXT

  const link = data?.redirectionLink
  const href = link?.url || '/packages'
  const linkText = link?.title || FALLBACK_LINK_TEXT
  const isExternal = link?.target === '_blank'

  return (
    <ScrollAnimationWrapper>
      <Section className="relative overflow-hidden py-[60px] md:py-[80px] lg:py-[100px]">
        {/* Full-bleed gold background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: GOLD_GRADIENT }}
        />

        <Row className="relative z-10 !max-w-[1197px] flex flex-col items-center text-center gap-6">
          {/* Eyebrow — same caption treatment as the About hero eyebrow (HeroSection) */}
          <p className="caption w-full text-center uppercase tracking-[2px] text-primary">
            {preHeader}
          </p>

          {/* Heading — HTML-in-field; <strong> renders in brand red (near-black base on gold) */}
          <div
            className="heading-1 mx-auto max-w-[900px] font-medium text-text-primary [&_p]:m-0 [&_strong]:font-bold [&_strong]:text-primary"
            dangerouslySetInnerHTML={{ __html: heading }}
          />

          {/* Subtext */}
          <p className="body-md mx-auto max-w-[640px] text-text-secondary">{subtext}</p>

          {/* CTA */}
          <div className="mt-2">
            <Link
              href={href}
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <Button variant="primary" showArrow={true}>
                {linkText}
              </Button>
            </Link>
          </div>
        </Row>
      </Section>
    </ScrollAnimationWrapper>
  )
}

export default OneRoofSection

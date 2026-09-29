import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import ScrollAnimationWrapper from '@/components/global/ScrollAnimationWrapper'

// Packages hero — rebuilt from the "Services & Rate Card v2" mockup.
// The mockup's navy/gold palette is mapped to brand tokens: red base +
// halftone dots (same treatment as the Services hero), yellow accents.
// mainHeading supports inline HTML; the accent phrase is wrapped in <strong>
// and renders in the brand yellow token (HTML-in-field pattern).
const FALLBACK_PREHEADER = 'Services & Rates'
const FALLBACK_HEADING = 'Packages engineered to <strong>pay for themselves.</strong>'
const FALLBACK_SUBTEXT =
  "Content, shoots, KOL, and paid ads from one accountable team — every retainer runs to a target we agree in writing, reported to you weekly. Here's exactly what it costs, and exactly what you get."
const FALLBACK_BUTTON_LABEL = 'Book a Discovery Call'
const FALLBACK_MICRO_LINE =
  'Walk away with a <strong>proposal within 24 hours.</strong>'

interface PackagesHeroSectionProps {
  data?: {
    preHeader?: string | null
    mainHeading?: string | null
    subtext?: string | null
    buttonLabel?: string | null
    microLine?: string | null
  } | null
}

const DOT_PATTERN = '/images/cta-background.png'

export function PackagesHeroSection({ data }: PackagesHeroSectionProps) {
  const preHeader = data?.preHeader || FALLBACK_PREHEADER
  const heading = data?.mainHeading || FALLBACK_HEADING
  const subtext = data?.subtext || FALLBACK_SUBTEXT
  const buttonLabel = data?.buttonLabel || FALLBACK_BUTTON_LABEL
  const microLine = data?.microLine || FALLBACK_MICRO_LINE

  return (
    <ScrollAnimationWrapper>
      <Section className="bg-primary relative overflow-hidden py-[60px] md:py-[80px] lg:py-[110px]">
        {/* Halftone dot overlay (same asset + opacity as ServicesHeroSection) */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url("${DOT_PATTERN}")`,
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            opacity: 0.2,
          }}
        />

        <Row className="relative z-10 !max-w-[1000px] flex flex-col items-center text-center text-white">
          {/* Eyebrow — uppercase label in the brand yellow token */}
          <p className="caption w-full uppercase tracking-[2px] text-secondary">
            {preHeader}
          </p>

          {/* Main heading — <strong> accent renders in the brand yellow token */}
          <h1
            className="heading-1 !font-normal w-full text-white [&_p]:m-0 [&_strong]:font-normal [&_strong]:text-secondary"
            dangerouslySetInnerHTML={{ __html: heading }}
          />

          {/* Subtext — w-full so text-center holds even when the copy is short
              (the Row is items-start by default, so a bare <p> would shrink). */}
          <p className="body-lg w-full text-center mt-6 font-normal text-white/90">
            {subtext}
          </p>

          {/* CTA + micro line */}
          <div className="mt-10 flex flex-col items-center gap-4">
            <Link href="/contact">
              <Button variant="white" showArrow={true}>
                {buttonLabel}
              </Button>
            </Link>
            <p
              className="body-sm text-white [&_strong]:font-semibold [&_strong]:text-secondary"
              dangerouslySetInnerHTML={{ __html: microLine }}
            />
          </div>
        </Row>
      </Section>
    </ScrollAnimationWrapper>
  )
}

export default PackagesHeroSection

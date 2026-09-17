import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import ScrollAnimationWrapper from '@/components/global/ScrollAnimationWrapper'

// Fallback content — mirrors the reference mockup copy, used until the CMS fields are wired.
// mainHeading supports inline HTML; the client wraps the accent phrase in <strong>,
// which renders in the brand yellow token (same HTML-in-field pattern as the About hero).
const FALLBACK_PREHEADER = 'What We Do'
const FALLBACK_HEADING = 'Not a menu of services.<br /><strong>A revenue system.</strong>'
const FALLBACK_SUBTEXT =
  "Most agencies sell you parts — a content team here, an ads vendor there, an influencer platform on the side. We run five capabilities as one engine, where every part feeds the next. That's not a slogan; it's the mechanics behind 39.20×."

interface ServicesHeroSectionProps {
  data?: {
    preHeader?: string | null
    mainHeading?: string | null
    subtext?: string | null
  } | null
}

// Reuse the About "Our Promise" / Services red treatment: brand-red base + halftone dots.
const DOT_PATTERN = '/images/cta-background.png'

export function ServicesHeroSection({ data }: ServicesHeroSectionProps) {
  const preHeader = data?.preHeader || FALLBACK_PREHEADER
  const heading = data?.mainHeading || FALLBACK_HEADING
  const subtext = data?.subtext || FALLBACK_SUBTEXT

  return (
    <ScrollAnimationWrapper>
      <Section className="bg-primary relative overflow-hidden py-[60px] md:py-[80px] lg:py-[110px]">
        {/* Halftone dot overlay (same asset + opacity as OurPromiseSection) */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url("${DOT_PATTERN}")`,
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            opacity: 0.2,
          }}
        />

        <Row className="relative z-10 !max-w-[1000px] flex flex-col items-start text-left text-neutral-0">
          {/* Eyebrow — dash + uppercase label in the brand yellow token */}
          <p className="caption w-full text-center uppercase tracking-[2px] text-secondary">
            {preHeader}
          </p>

          {/* Main heading — <strong> accent renders in the brand yellow token */}
          <h1
            className="heading-1 text-center !font-normal w-full text-neutral-0 [&_p]:m-0 [&_strong]:font-normal [&_strong]:text-secondary"
            dangerouslySetInnerHTML={{ __html: heading }}
          />

          {/* Subtext — w-full so text-center holds even when the copy is short
              (the Row is items-start, so a bare <p> would shrink to its content). */}
          <p className="body-lg w-full text-center mt-6 font-normal text-neutral-0/90">
            {subtext}
          </p>
        </Row>
      </Section>
    </ScrollAnimationWrapper>
  )
}

export default ServicesHeroSection

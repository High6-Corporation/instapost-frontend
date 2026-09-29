import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import ScrollAnimationWrapper from '@/components/global/ScrollAnimationWrapper'

// The on-time guarantee band — from the "Services & Rate Card v2" mockup,
// where it is a solid deep-red section. Maps straight onto the brand red
// token; same halftone-dot treatment as the hero.

interface GuaranteeSectionProps {
  data?: {
    preHeader?: string | null
    mainHeading?: string | null
    subtext?: string | null
  } | null
}

const FALLBACK_PREHEADER = 'The On-Time Guarantee'
const FALLBACK_HEADING = 'Miss a deadline, and the cashback is yours.'
const FALLBACK_SUBTEXT =
  'If we miss an agreed delivery date, you get cashback on that month’s balance — written into the contract, not the fine print. We can promise it because our system ships daily: most agencies fear deadlines; ours are the product.'

const DOT_PATTERN = '/images/cta-background.png'

export function GuaranteeSection({ data }: GuaranteeSectionProps) {
  const preHeader = data?.preHeader || FALLBACK_PREHEADER
  const heading = data?.mainHeading || FALLBACK_HEADING
  const subtext = data?.subtext || FALLBACK_SUBTEXT

  return (
    <ScrollAnimationWrapper>
      <Section className="bg-primary relative overflow-hidden py-[56px] md:py-[64px]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url("${DOT_PATTERN}")`,
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            opacity: 0.2,
          }}
        />

        <Row className="relative z-10 !max-w-[840px] flex flex-col items-center text-center gap-5">
          <p className="caption w-full uppercase tracking-[2px] text-secondary">
            {preHeader}
          </p>
          <h2 className="heading-2 !font-normal w-full text-white">{heading}</h2>
          <p className="body-md font-normal w-full text-white/90">{subtext}</p>
        </Row>
      </Section>
    </ScrollAnimationWrapper>
  )
}

export default GuaranteeSection

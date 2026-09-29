import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import ScrollAnimationWrapper from '@/components/global/ScrollAnimationWrapper'

// Agency hero — "The Full Catalog" (InstaPost-Agency-FullCatalog-v1 mockup).
// The mockup's navy hero maps to the brand red + halftone treatment used by
// the Packages/Services heroes; its gold italic accent maps to the brand
// yellow token via the HTML-in-field <strong> pattern.
// Left-aligned per the site's section convention (the mockup is left-aligned too).
const FALLBACK_PREHEADER = 'The Full Catalog'
const FALLBACK_HEADING = 'Everything we do, <strong>on one page.</strong>'
const FALLBACK_SUBTEXT =
  'Every retainer, shoot, video product, creator campaign, and support service — with the rate beside it. Built for procurement teams, comparison spreadsheets, and anyone who wants the whole menu without a sales call first.'
const FALLBACK_PRIMARY_BUTTON = 'Book a Discovery Call'
const FALLBACK_PRINT_BUTTON = 'Save as PDF / Print'
const FALLBACK_PRINT_NOTE = 'Coming soon'

// Proofline — three stats in a wrapping strip above a hairline, not a grid.
export interface CatalogProofStat {
  value: string
  label: string
}

const FALLBACK_PROOF_STATS: CatalogProofStat[] = [
  { value: '140+', label: 'Filipino brands served' },
  { value: '39.20×', label: 'best documented ROAS' },
  { value: '24h', label: 'from call to priced proposal' },
]

interface AgencyHeroSectionProps {
  data?: {
    preHeader?: string | null
    mainHeading?: string | null
    subtext?: string | null
    buttonLabel?: string | null
    proofStats?: CatalogProofStat[] | null
  } | null
}

const DOT_PATTERN = '/images/cta-background.png'

export function AgencyHeroSection({ data }: AgencyHeroSectionProps) {
  const preHeader = data?.preHeader || FALLBACK_PREHEADER
  const heading = data?.mainHeading || FALLBACK_HEADING
  const subtext = data?.subtext || FALLBACK_SUBTEXT
  const buttonLabel = data?.buttonLabel || FALLBACK_PRIMARY_BUTTON
  const proofStats =
    data?.proofStats && data.proofStats.length > 0
      ? data.proofStats
      : FALLBACK_PROOF_STATS

  return (
    <ScrollAnimationWrapper>
      <Section className="bg-primary relative overflow-hidden py-[60px] md:py-[80px] lg:py-[100px]">
        {/* Halftone dot overlay (same asset + opacity as the Packages hero) */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url("${DOT_PATTERN}")`,
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            opacity: 0.2,
          }}
        />

        <Row className="relative z-10 flex flex-col items-start gap-6">
          {/* Eyebrow — the mockup's gold dash before the label */}
          <p className="caption flex items-center gap-3 uppercase tracking-[2px] text-secondary">
            <span aria-hidden="true" className="h-px w-[26px] bg-secondary" />
            {preHeader}
          </p>

          {/* 14ch (not the mockup's 16ch) puts the break after "do," — at 16ch
              the 76px heading has 27px of slack and strands "on" on line 1.
              The accent phrase is kept nowrap + italic so it always moves to
              its own line as one unit, the way the mockup's <em> reads. */}
          <h1
            className="heading-1 w-full max-w-[14ch] font-normal text-white [&_p]:m-0 [&_strong]:font-normal [&_strong]:italic [&_strong]:text-secondary [&_strong]:whitespace-nowrap"
            dangerouslySetInnerHTML={{ __html: heading }}
          />

          {/* w-full so the measure cap holds even though the Row is items-start */}
          <p className="body-lg w-full max-w-[60ch] font-normal text-white/90">
            {subtext}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Link href="/contact">
              <Button variant="white" showArrow={true}>
                {buttonLabel}
              </Button>
            </Link>

            {/* The mockup's primary action is window.print(); the print
                stylesheet is not built yet, so the control ships disabled.
                The "coming soon" status sits OUTSIDE the button — nesting it
                inside grew the line box and made this control 4-10px taller
                than its sibling. */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled
                aria-disabled="true"
                title={`${FALLBACK_PRINT_BUTTON} — ${FALLBACK_PRINT_NOTE}`}
                className="cursor-not-allowed whitespace-nowrap rounded-lg border border-white/60 bg-white/10 px-6 py-4 font-sans text-[18px] font-semibold leading-[21px] text-white max-md:px-4 max-md:py-3 max-md:text-[16px]"
              >
                {FALLBACK_PRINT_BUTTON}
              </button>
              <span className="caption whitespace-nowrap rounded-full bg-white/15 px-2.5 py-1 font-semibold uppercase tracking-[1px] text-white">
                {FALLBACK_PRINT_NOTE}
              </span>
            </div>
          </div>

          {/* Proofline */}
          <div className="mt-4 flex w-full flex-wrap gap-x-7 gap-y-2 border-t border-white/20 pt-6">
            {proofStats.map((stat) => (
              <span key={stat.label} className="body-sm text-white">
                <span className="heading-4 mr-1 font-semibold tabular-nums text-secondary">
                  {stat.value}
                </span>
                {stat.label}
              </span>
            ))}
          </div>
        </Row>
      </Section>
    </ScrollAnimationWrapper>
  )
}

export default AgencyHeroSection

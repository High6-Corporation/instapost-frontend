import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import ScrollAnimationWrapper from '@/components/global/ScrollAnimationWrapper'

// Guarantee strip — the mockup's red band of four brand promises, placed
// between the rate catalog and the closing CTA.
// The mockup jumps 1 → 4 columns at 820px, which leaves a very tall stack on
// tablet; a 2-up sm step is added.
export interface GuaranteePromise {
  title: string
  description: string
}

interface GuaranteeStripSectionProps {
  data?: {
    promises?: GuaranteePromise[] | null
  } | null
}

const FALLBACK_PROMISES: GuaranteePromise[] = [
  {
    title: 'Consistent quality',
    description:
      'High-quality content that consistently meets or exceeds expectations — the work carries our name too.',
  },
  {
    title: 'Connects & converts',
    description:
      'Content that engages your audience, builds trust, and turns followers into customers.',
  },
  {
    title: 'More results, less drama',
    description:
      "Exceptional results without excuses or hassle. You'll hear bad news from us first, with the fix attached.",
  },
  {
    title: 'On time, or cashback',
    description:
      "Miss an agreed deadline and you get cashback on that month's balance — written into the contract.",
  },
]

const DOT_PATTERN = '/images/cta-background.png'

export function GuaranteeStripSection({ data }: GuaranteeStripSectionProps) {
  const promises =
    data?.promises && data.promises.length > 0 ? data.promises : FALLBACK_PROMISES

  return (
    <ScrollAnimationWrapper>
      <Section className="bg-primary relative overflow-hidden py-[44px] md:py-[56px]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url("${DOT_PATTERN}")`,
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            opacity: 0.2,
          }}
        />

        <Row className="relative z-10">
          {/* 4-up waits for xl: at lg (1024) the columns are 209px and every
              description wraps to 4 lines. */}
          <div className="grid grid-cols-1 gap-x-7 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
            {promises.map((promise) => (
              <div key={promise.title} className="flex flex-col gap-1.5">
                <h3 className="heading-4 font-semibold text-white">
                  {promise.title}
                </h3>
                <p className="body-sm font-normal text-white">{promise.description}</p>
              </div>
            ))}
          </div>
        </Row>
      </Section>
    </ScrollAnimationWrapper>
  )
}

export default GuaranteeStripSection

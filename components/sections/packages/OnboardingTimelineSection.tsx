import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import ScrollAnimationWrapper from '@/components/global/ScrollAnimationWrapper'

// "Signed to posting in 21 days" — the fixed onboarding clock from the
// "Services & Rate Card v2" mockup. Two-column ledger rows (day label left,
// title + description right) separated by hairlines. Mockup's gold day
// labels map to the brand red token.

export interface TimelineStep {
  /** Left-column label, e.g. "Day 1" or "Post!" */
  day: string
  title: string
  description: string
}

interface OnboardingTimelineSectionProps {
  data?: {
    mainHeading?: string | null
    subtext?: string | null
    steps?: TimelineStep[] | null
  } | null
}

const FALLBACK_HEADING = 'Signed to posting in 21 days'
const FALLBACK_SUBTEXT =
  'A fixed onboarding clock, in the contract. You’ll know exactly what happens on which day — starting the day you say go.'

const FALLBACK_STEPS: TimelineStep[] = [
  {
    day: 'Day 1',
    title: 'Confirm & kickoff',
    description: 'Downpayment, signing, and your onboarding questionnaire — your slot is locked.',
  },
  {
    day: 'Day 4',
    title: 'Kickoff meeting',
    description: 'Alignment call with your full team — strategist, creatives, and accounts lead.',
  },
  {
    day: 'Day 7',
    title: 'Strategy presentation',
    description: 'The plan to your target: positioning, content pillars, and how we’ll measure it.',
  },
  {
    day: 'Day 12',
    title: 'Concept deck',
    description: 'Creative concepts and pegs — you approve the direction before anything ships.',
  },
  {
    day: 'Day 21',
    title: 'Content calendar',
    description: 'The full month, planned and presented for approval.',
  },
  {
    day: 'Post!',
    title: 'You’re live',
    description:
      'First post on the nearest 1st or 15th — then daily execution, bi-weekly alignment, and a monthly business review.',
  },
]

export function OnboardingTimelineSection({ data }: OnboardingTimelineSectionProps) {
  const heading = data?.mainHeading || FALLBACK_HEADING
  const subtext = data?.subtext || FALLBACK_SUBTEXT
  const steps = data?.steps && data.steps.length > 0 ? data.steps : FALLBACK_STEPS

  return (
    <ScrollAnimationWrapper>
      <Section className="bg-bg-primary border-y border-border py-[60px] md:py-[70px] lg:py-[80px]">
        <Row className="flex !max-w-[1080px] flex-col items-start gap-8">
          <div className="w-full flex flex-col gap-4">
            <h2 className="heading-2 font-normal text-text-primary">{heading}</h2>
            <p className="body-md font-normal text-text-secondary max-w-[60ch]">{subtext}</p>
          </div>

          <div className="w-full flex flex-col">
            {steps.map((step, index) => (
              <div
                key={step.day}
                className={`w-full grid grid-cols-[72px_1fr] md:grid-cols-[110px_1fr] gap-4 md:gap-8 items-start py-5 ${
                  index > 0 ? 'border-t border-border' : ''
                }`}
              >
                <p className="body-sm font-semibold text-primary whitespace-nowrap">{step.day}</p>
                <div className="flex flex-col gap-1.5">
                  <h3 className="heading-4 font-semibold text-text-primary">{step.title}</h3>
                  <p className="body-sm text-text-secondary max-w-[75ch]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Row>
      </Section>
    </ScrollAnimationWrapper>
  )
}

export default OnboardingTimelineSection

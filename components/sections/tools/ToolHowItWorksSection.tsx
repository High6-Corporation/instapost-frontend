import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import ScrollAnimationWrapper from '@/components/global/ScrollAnimationWrapper'
import type { ToolHowItWorksContent } from '@/lib/tools'

// Fallback content — used until the CMS fields are filled. A section must never render empty.
const FALLBACK_HEADING = 'How this works'
const FALLBACK_STEPS = [
  'Answer a few short questions about your business and goals.',
  'Our tool matches your answers against InstaPost\u2019s current packages and rates.',
  'Get an instant recommendation, then bring it to our team for a precise plan.',
]
const FALLBACK_DISCLAIMER =
  'Estimates are indicative and based on typical Philippine market results. Final pricing is confirmed during your strategy session.'

interface ToolHowItWorksSectionProps {
  data?: ToolHowItWorksContent | null
}

function ToolHowItWorksSection({ data }: ToolHowItWorksSectionProps) {
  const heading = data?.heading || FALLBACK_HEADING
  const steps = data?.steps && data.steps.length > 0 ? data.steps : FALLBACK_STEPS
  const disclaimer = data?.disclaimer || FALLBACK_DISCLAIMER

  return (
    <Section className="bg-bg-secondary py-[60px] md:py-[80px]">
      <Row className="flex flex-col items-start gap-8">
        <ScrollAnimationWrapper className="w-full">
          <h2 className="heading-3 font-medium text-text-primary">{heading}</h2>
        </ScrollAnimationWrapper>

        <ol className="flex w-full flex-col gap-5">
          {steps.map((step, i) => (
            <ScrollAnimationWrapper key={i} className="w-full">
              <li className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary body-md text-neutral-0">
                  {i + 1}
                </span>
                <p className="body-md leading-relaxed text-text-secondary">{step}</p>
              </li>
            </ScrollAnimationWrapper>
          ))}
        </ol>

        <ScrollAnimationWrapper className="w-full">
          <p className="caption leading-relaxed text-text-secondary">{disclaimer}</p>
        </ScrollAnimationWrapper>
      </Row>
    </Section>
  )
}

export { ToolHowItWorksSection }
export default ToolHowItWorksSection

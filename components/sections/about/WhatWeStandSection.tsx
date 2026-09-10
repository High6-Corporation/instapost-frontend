import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import ScrollAnimationWrapper from '@/components/global/ScrollAnimationWrapper'
import type { AboutWhatWeStandSection } from '@/lib/about'

// Fallback content (mirrors the reference copy) — used only until the CMS fields are filled.
const FALLBACK_HEADING = 'What we stand for'
const FALLBACK_SUBTEXT =
  'Five values we hire, review, by, and — when we have to — part ways by. Here’s what each one means when you’re the client.'
const FALLBACK_VALUES = [
  {
    valueTitle: 'Lead with Integrity',
    valueDescription:
      'We tell you the truth about what’s working — especially when it isn’t. Bad news travels fast here, on purpose.',
  },
  {
    valueTitle: 'Committed to Excellence',
    valueDescription:
      'Big-brand craft standards on every account, whatever the budget. The work carries our name too.',
  },
  {
    valueTitle: 'Own with Responsibility',
    valueDescription:
      'One team, fully accountable. No vendor finger-pointing, no “that was the other agency’s part.”',
  },
  {
    valueTitle: 'Care with Intention',
    valueDescription:
      'Heritage brands carry decades of trust. We treat your story like it’s ours to protect — because for a while, it is.',
  },
  {
    valueTitle: 'Grow Through Collaboration & Creativity',
    valueDescription:
      'The best idea wins, whether it comes from the creative director or the newest editor — or from you.',
  },
]

interface WhatWeStandSectionProps {
  data?: AboutWhatWeStandSection | null
}

// Mirrors the homepage BuiltForBrandsSection treatment: gold radial card + divided title/description list.
export function WhatWeStandSection({ data }: WhatWeStandSectionProps) {
  const heading = data?.mainHeading || FALLBACK_HEADING
  const subtext = data?.subtext || FALLBACK_SUBTEXT

  const values =
    data?.valuesList && data.valuesList.length > 0 ? data.valuesList : FALLBACK_VALUES

  return (
    <ScrollAnimationWrapper>
      <Section className="bg-white py-[40px] md:py-[60px] lg:py-[80px]">
        <Row
          className="!max-w-[1270px] relative rounded-[32px] px-4 md:px-8 py-[32px] md:py-[48px] lg:py-[60px]"
          style={{
            background:
              'radial-gradient(circle at 50% 30%, rgba(253, 209, 13, 0.15) 0%, rgba(253, 209, 13, 1) 100%)',
          }}
        >
          <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-10">
            {/* Header Row */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-[32px] md:mb-[48px]">
              <h2 className="heading-2 font-medium text-text-primary max-md:text-center">
                {heading}
              </h2>
              <p className="body-md text-text-secondary max-md:text-center lg:max-w-[480px]">
                {subtext}
              </p>
            </div>

            {/* Values List */}
            <div className="flex flex-col border-t border-border">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8 border-b border-border py-[16px] md:py-[22px]"
                >
                  <h3 className="heading-3 font-semibold text-text-primary md:w-[38%] lg:w-[33%] md:shrink-0">
                    {value.valueTitle}
                  </h3>
                  <p className="body-sm text-text-secondary md:flex-1">{value.valueDescription}</p>
                </div>
              ))}
            </div>
          </div>
        </Row>
      </Section>
    </ScrollAnimationWrapper>
  )
}

export default WhatWeStandSection

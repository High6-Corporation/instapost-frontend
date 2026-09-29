import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import type { ToolDetailContent } from '@/lib/tools'

// Fallback content — used until the CMS fields are filled. A section must never render empty.
const FALLBACK_PREHEADER = 'Free Tool'
const FALLBACK_HEADING = 'Get your instant estimate'
const FALLBACK_SUBTEXT =
  'Answer a few quick questions and get an instant estimate matched to InstaPost\u2019s current packages and rates.'

interface ToolIntroSectionProps {
  data?: ToolDetailContent | null
  /** Per-tool copy, since one route cannot pass distinct CMS fields for each tool yet. */
  preHeader?: string
  heading?: string
  subtext?: string
}

function ToolIntroSection({ data, preHeader, heading, subtext }: ToolIntroSectionProps) {
  const resolvedPreHeader = preHeader || data?.preHeader || FALLBACK_PREHEADER
  const resolvedHeading = heading || data?.heading || FALLBACK_HEADING
  const resolvedSubtext = subtext || data?.subtext || FALLBACK_SUBTEXT

  return (
    <Section className="bg-white py-[40px] md:py-[50px]">
      <Row className="flex flex-col items-center gap-4 text-center">
        <p className="caption w-full uppercase tracking-[2px] text-primary">{resolvedPreHeader}</p>
        <h2 className="heading-2 font-medium text-text-primary">{resolvedHeading}</h2>
        <p className="body-md leading-relaxed text-text-secondary max-w-[720px]">{resolvedSubtext}</p>
      </Row>
    </Section>
  )
}

export { ToolIntroSection }
export default ToolIntroSection

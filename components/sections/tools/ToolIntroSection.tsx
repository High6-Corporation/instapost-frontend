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
}

function ToolIntroSection({ data }: ToolIntroSectionProps) {
  const preHeader = data?.preHeader || FALLBACK_PREHEADER
  const heading = data?.heading || FALLBACK_HEADING
  const subtext = data?.subtext || FALLBACK_SUBTEXT

  return (
    <Section className="bg-white py-[40px] md:py-[50px]">
      <Row className="flex flex-col items-center gap-4 text-center">
        <p className="caption w-full uppercase tracking-[2px] text-primary">{preHeader}</p>
        <h2 className="heading-2 font-medium text-text-primary">{heading}</h2>
        <p className="body-md leading-relaxed text-text-secondary max-w-[720px]">{subtext}</p>
      </Row>
    </Section>
  )
}

export { ToolIntroSection }
export default ToolIntroSection

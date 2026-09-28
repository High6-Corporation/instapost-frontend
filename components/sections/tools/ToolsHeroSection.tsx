import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import Image from 'next/image'
import type { ToolsHeroContent } from '@/lib/tools'

// Fallback content — used until the CMS fields are filled. A section must never render empty.
const FALLBACK_PREHEADER = 'Free Tools'
const FALLBACK_HEADING = 'Know your marketing budget before you commit a single peso'
const FALLBACK_SUBTEXT =
  'Use our free pricing tools to get an instant estimate for social media management and paid ads — no signup, no sales calls.'

const TRUST_POINTS = [
  { title: 'Free', description: 'Both tools are 100% free to use — no signup required' },
  { title: 'PH-Specific', description: 'Estimates based on Philippine market rates and budgets' },
  { title: 'Instant', description: 'Get results in seconds — no waiting, no sales calls' },
]

interface ToolsHeroSectionProps {
  data?: ToolsHeroContent | null
}

function ToolsHeroSection({ data }: ToolsHeroSectionProps) {
  const preHeader = data?.preHeader || FALLBACK_PREHEADER
  const heading = data?.heading || FALLBACK_HEADING
  const subtext = data?.subtext || FALLBACK_SUBTEXT

  return (
    <Section className="relative bg-primary py-[60px] md:py-[80px] lg:py-[100px] overflow-hidden">
      {/* Halftone overlay pattern, same treatment as colored sections elsewhere */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <Image
          src="/images/cta-background.png"
          alt=""
          fill
          className="object-cover mix-blend-soft-light"
        />
      </div>
      <Row className="relative flex flex-col items-center gap-6 text-center">
        <p className="caption uppercase tracking-[2px] text-neutral-0">{preHeader}</p>
        <h1 className="heading-1 font-normal text-neutral-0 max-w-[900px]">{heading}</h1>
        <p className="body-md leading-relaxed text-neutral-0 max-w-[640px]">{subtext}</p>

        <div className="mt-8 grid w-full max-w-[960px] grid-cols-1 gap-6 md:grid-cols-3">
          {TRUST_POINTS.map((point) => (
            <div
              key={point.title}
              className="rounded-xl bg-white p-6 text-left shadow-[0px_0px_14px_rgba(0,0,0,0.16)]"
            >
              <p className="label-md font-semibold uppercase tracking-[1px] text-primary">
                {point.title}
              </p>
              <p className="body-md mt-2 leading-relaxed text-text-secondary">{point.description}</p>
            </div>
          ))}
        </div>
      </Row>
    </Section>
  )
}

export { ToolsHeroSection }
export default ToolsHeroSection

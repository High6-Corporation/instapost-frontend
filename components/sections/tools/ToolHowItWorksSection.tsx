import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import ScrollAnimationWrapper from '@/components/global/ScrollAnimationWrapper'
import type { BenchmarkRow, ToolHowItWorksContent } from '@/lib/tools'

// Fallback content — used until the CMS fields are filled. A section must never render empty.
const FALLBACK_HEADING = 'How this works'
const FALLBACK_STEPS = [
  'Answer a few short questions about your business and goals.',
  'Our tool matches your answers against InstaPost’s current packages and rates.',
  'Get an instant recommendation, then bring it to our team for a precise plan.',
]
const FALLBACK_DISCLAIMER =
  'Estimates are indicative and based on typical Philippine market results. Final pricing is confirmed during your strategy session.'
const FALLBACK_BENCHMARKS_HEADING = 'Philippines market benchmarks'

interface ToolHowItWorksSectionProps {
  data?: ToolHowItWorksContent | null
  /** Per-tool copy, since one route cannot pass distinct CMS fields for each tool yet. */
  heading?: string
  steps?: string[]
  benchmarksHeading?: string
  benchmarks?: BenchmarkRow[]
  disclaimer?: string
}

/**
 * Reference tool layout pairs the method explanation with a market-data table
 * in the same band: numbered steps on the left, benchmark rows on the right.
 */
function ToolHowItWorksSection({
  data,
  heading,
  steps,
  benchmarksHeading,
  benchmarks,
  disclaimer,
}: ToolHowItWorksSectionProps) {
  const resolvedHeading = heading || data?.heading || FALLBACK_HEADING
  const stepList = steps ?? (data?.steps && data.steps.length > 0 ? data.steps : FALLBACK_STEPS)
  const note = disclaimer || data?.disclaimer || FALLBACK_DISCLAIMER
  const benchmarksTitle = benchmarksHeading || data?.benchmarksHeading || FALLBACK_BENCHMARKS_HEADING
  const benchmarkRows = benchmarks ?? data?.benchmarks ?? []

  return (
    <Section className="bg-bg-secondary py-[60px] md:py-[80px] lg:py-[100px]">
      <Row className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col items-start gap-8">
          <ScrollAnimationWrapper className="w-full">
            <div className="flex flex-col gap-3">
              <p className="caption font-semibold uppercase tracking-[2px] text-primary">
                How it works
              </p>
              <h2 className="heading-3 font-medium text-text-primary">{resolvedHeading}</h2>
            </div>
          </ScrollAnimationWrapper>

          <ol className="flex w-full flex-col gap-5">
            {stepList.map((step, i) => (
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
            <p className="caption leading-relaxed text-text-secondary">{note}</p>
          </ScrollAnimationWrapper>
        </div>

        <div className="flex flex-col items-start gap-8">
          <ScrollAnimationWrapper className="w-full">
            <div className="flex flex-col gap-3">
              <p className="caption font-semibold uppercase tracking-[2px] text-primary">
                Market data
              </p>
              <h2 className="heading-3 font-medium text-text-primary">{benchmarksTitle}</h2>
            </div>
          </ScrollAnimationWrapper>

          <div className="flex w-full flex-col gap-3">
            {benchmarkRows.map((row) => (
              <ScrollAnimationWrapper key={row.label} className="w-full">
                <div className="flex w-full items-start justify-between gap-4 rounded-xl border border-neutral-500 bg-white p-4">
                  <span className="label-md text-text-secondary">{row.label}</span>
                  <span className="label-md text-right font-semibold text-text-primary">
                    {row.value}
                  </span>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>

          <ScrollAnimationWrapper className="w-full">
            <p className="caption leading-relaxed text-text-secondary">
              Benchmarks reflect Metro Manila agency rates and are updated periodically.
            </p>
          </ScrollAnimationWrapper>
        </div>
      </Row>
    </Section>
  )
}

export { ToolHowItWorksSection }
export default ToolHowItWorksSection

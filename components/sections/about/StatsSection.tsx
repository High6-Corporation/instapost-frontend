import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import ScrollAnimationWrapper from '@/components/global/ScrollAnimationWrapper'
import type { AboutStatsSection } from '@/lib/about'

// Fallback content (mirrors the reference copy) — used only until the CMS fields are filled.
const FALLBACK_STATS = [
  { statValue: '5', subtext: 'Years, founder-led' },
  { statValue: '100+', subtext: 'Filipino brands served' },
  { statValue: '17', subtext: 'In-house specialists' },
  { statValue: '39.20×', subtext: 'Best documented ROAS' },
]

interface StatsSectionProps {
  data?: AboutStatsSection | null
}

export function StatsSection({ data }: StatsSectionProps) {
  const stats =
    data?.statsList && data.statsList.length > 0 ? data.statsList : FALLBACK_STATS

  return (
    <ScrollAnimationWrapper>
      <Section className="border border-[#d5d5d5] bg-bg-secondary py-[60px] md:py-[70px] lg:py-[80px]">
        <Row className="max-w-[700px] lg:!max-w-[1197px]">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:gap-y-12 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col gap-2">
                <span className="heading-1 text-primary max-lg:text-center font-semibold leading-none">
                  {stat.statValue}
                </span>
                <span className="body-xs max-lg:text-center font-semibold uppercase tracking-[0.15em] text-text-secondary">
                  {stat.subtext}
                </span>
              </div>
            ))}
          </div>
        </Row>
      </Section>
    </ScrollAnimationWrapper>
  )
}

export default StatsSection

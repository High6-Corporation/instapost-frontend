import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import ScrollAnimationWrapper from '@/components/global/ScrollAnimationWrapper'

interface GuaranteeItem {
  title: string
  description: string
}

// Fallback content — mirrors the reference mockup copy, used until CMS fields are wired.
const FALLBACK_GUARANTEES: GuaranteeItem[] = [
  {
    title: 'A strategist + accounts lead',
    description: 'on every account — named, reachable, accountable',
  },
  {
    title: '< 2-day revisions',
    description: 'so campaigns never stall in an approval loop',
  },
  {
    title: '24-hour proposals',
    description: 'from discovery call to a priced plan, one business day',
  },
  {
    title: 'On-time, or cashback',
    description: "missed deadlines earn you money back — it's in the contract",
  },
]

interface StandardsSectionProps {
  data?: {
    items?: GuaranteeItem[] | null
  } | null
}

export function StandardsSection({ data }: StandardsSectionProps) {
  const items = data?.items && data.items.length > 0 ? data.items : FALLBACK_GUARANTEES

  return (
    <ScrollAnimationWrapper>
      <Section className="border border-border bg-bg-secondary py-[60px] md:py-[70px] lg:py-[80px]">
        <Row className="!max-w-[1270px]">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
            {items.map((item, index) => (
              <div key={index} className="flex flex-col gap-2">
                <h3 className="heading-4 max-md:text-center font-semibold text-text-primary">{item.title}</h3>
                <span className="body-sm max-md:text-center text-text-secondary">{item.description}</span>
              </div>
            ))}
          </div>
        </Row>
      </Section>
    </ScrollAnimationWrapper>
  )
}

export default StandardsSection

import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import ScrollAnimationWrapper from '@/components/global/ScrollAnimationWrapper'

// "Before you ask" FAQ — from the "Services & Rate Card v2" mockup. Hairline-
// separated <details> accordion with +/– indicators (native, no JS).
// Mockup's gold +/– maps to the brand red token.

export interface FaqItem {
  question: string
  answer: string
}

interface PackagesFaqSectionProps {
  data?: {
    mainHeading?: string | null
    subtext?: string | null
    items?: FaqItem[] | null
  } | null
}

const FALLBACK_HEADING = 'Before you ask'
const FALLBACK_SUBTEXT = 'The questions every smart client asks on the first call — answered straight.'

const FALLBACK_ITEMS: FaqItem[] = [
  {
    question: 'What are the payment terms?',
    answer:
      'A downpayment on signing locks your slot and starts the 21-day onboarding clock; the balance follows on agreed terms. Retainers bill monthly. Everything is in the contract before you commit a peso.',
  },
  {
    question: 'On paid ads, what do I actually pay for?',
    answer:
      'Two things, kept separate on purpose: your ad budget, which goes 100% to Meta or TikTok, and the Campaign Strategy Fee (40% of spend), which pays for the system that makes the budget perform — strategy, creative testing, daily optimization, and live reporting. You see both numbers, always.',
  },
  {
    question: 'Can I start small and upgrade?',
    answer:
      'Yes — most clients do. Start at the tier that fits today; upgrades take effect the next content cycle with no re-onboarding. Your strategist will tell you when the numbers say it’s time.',
  },
  {
    question: 'Who owns the content?',
    answer:
      'You do. That includes the creator-made assets in KOL packages — licensed for your reuse across posts, ads, and campaigns.',
  },
  {
    question: 'Why not just hire freelancers for less?',
    answer:
      'You can — and you’ll spend your week coordinating a shooter, an editor, a poster, and an ads person who’ve never met. One accountable team is faster, and it’s why 140+ Filipino brands run through this system with documented results — 39.20× and 16.51× ROAS came from content, creators, and media working as one. Ask for the receipts on your discovery call.',
  },
  {
    question: 'How fast can we start?',
    answer:
      'We onboard a limited number of new retainers each month to protect delivery quality. Book the call, get your proposal in 24 hours, and if there’s a slot open you can be in kickoff within the week.',
  },
]

export function PackagesFaqSection({ data }: PackagesFaqSectionProps) {
  const heading = data?.mainHeading || FALLBACK_HEADING
  const subtext = data?.subtext || FALLBACK_SUBTEXT
  const items = data?.items && data.items.length > 0 ? data.items : FALLBACK_ITEMS

  return (
    <ScrollAnimationWrapper>
      <Section id="faq" className="bg-bg-secondary py-[60px] md:py-[70px] lg:py-[80px]">
        <Row className="!max-w-[860px] flex flex-col items-start gap-8">
          <div className="w-full flex flex-col gap-4">
            <h2 className="heading-2 font-normal text-text-primary">{heading}</h2>
            <p className="body-md font-normal text-text-secondary">{subtext}</p>
          </div>

          <div className="w-full flex flex-col">
            {items.map((item, index) => (
              <details
                key={item.question}
                className={`group py-5 ${index > 0 ? 'border-t border-border' : ''} [&_summary::-webkit-details-marker]:hidden`}
              >
                <summary className="heading-4 font-semibold text-text-primary cursor-pointer list-none flex items-start justify-between gap-6">
                  {item.question}
                  <span className="shrink-0 text-primary text-[22px] leading-none font-semibold group-open:hidden">
                    +
                  </span>
                  <span className="shrink-0 text-primary text-[22px] leading-none font-semibold hidden group-open:inline">
                    –
                  </span>
                </summary>
                <p className="body-sm text-text-secondary mt-3 max-w-[70ch]">{item.answer}</p>
              </details>
            ))}
          </div>
        </Row>
      </Section>
    </ScrollAnimationWrapper>
  )
}

export default PackagesFaqSection

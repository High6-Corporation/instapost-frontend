'use client'

import { useState } from 'react'
import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import ScrollAnimationWrapper from '@/components/global/ScrollAnimationWrapper'

// "What do you sell?" industry matcher — rebuilt from the
// "Services & Rate Card v2" mockup. Tap a category chip, the match panel
// appears with the documented results, the bench of brands, and a button
// that scrolls to the matching tier card and pulses its border.
// Mockup navy panel mapped to brand tokens: red base + halftone dots
// (same treatment as the hero), yellow accents.

export interface IndustryMatch {
  /** Chip label, e.g. "Food & Beverage" */
  label: string
  /** Count line, e.g. "25+ F&B brands served" */
  count: string
  /** Proof paragraph — documented results for the category */
  proof: string
  /** "The bench" — brand names shown as pills */
  bench: string[]
  /** Panel button label */
  buttonText: string
  /** DOM id of the tier card to scroll to (client-side anchor), or a route */
  target: string
}

interface IndustryMatcherSectionProps {
  data?: {
    mainHeading?: string | null
    subtext?: string | null
    staticNote?: string | null
    matches?: IndustryMatch[] | null
  } | null
}

const FALLBACK_HEADING = "What do you sell? We'll show you your receipts."
const FALLBACK_SUBTEXT =
  "Tap your category — see the documented results for brands like yours, the bench we've built there, and where they usually start."
const FALLBACK_STATIC_NOTE =
  'Already shooting your own content? <strong>Essentials starts at ₱60,000.</strong>'

const FALLBACK_MATCHES: IndustryMatch[] = [
  {
    label: 'Food & Beverage',
    count: '25+ F&B brands served',
    proof:
      "Razon's by Glenn: +36% franchisee closings in two months. Fat Cousins: store traffic doubled in a week after the creator campaign. Buenas: GMV up 32% in one cycle.",
    bench: ['Razon’s by Glenn', 'Fat Cousins', 'Buenas', 'Milk Magic', 'Mister Kabab', '7-Eleven'],
    buttonText: 'See where F&B brands start — Amplify, ₱170K',
    target: 't-amplify',
  },
  {
    label: 'Beauty & Personal Care',
    count: '20+ beauty & personal-care brands served',
    proof:
      'Dermcare: 16.51× ROAS — ₱30,782 in ad spend returned ₱508,114 across 232 tracked purchases. Beauty is our content-to-checkout category.',
    bench: ['Dermcare', 'Batiste', 'Senka PH', 'Hapee', 'Daily Glam', 'Cuts 4 Tots'],
    buttonText: 'See the model behind the 16.51× — Performance',
    target: 't-performance',
  },
  {
    label: 'Fashion & Jewelry',
    count: 'Fashion, jewelry & heritage retail — incl. 4 fine jewelers',
    proof:
      "Onesimus: +36% sales in three months. The data found a younger buyer; the Fun Barong it inspired is now the brand's second best-seller.",
    bench: ['Onesimus', 'JAC Footwear Shoemanship', 'Les Alajeras', 'SIS Jewelry', 'TempusMNL'],
    buttonText: 'See where heritage brands start — Growth, ₱120K',
    target: 't-growth',
  },
  {
    label: 'Home & Construction',
    count: '18 home, construction & essentials brands served',
    proof:
      'Bosch, Scrub Daddy, Tough Mama and fifteen more run their social through this system — product content built to demonstrate, not just decorate.',
    bench: ['Bosch', 'Scrub Daddy', 'Tough Mama', 'Yankon', 'Onduline', 'My Strong Home'],
    buttonText: 'See where home brands start — Presence, ₱100K',
    target: 't-presence',
  },
  {
    label: 'Mom, Baby & Pets',
    count: '15 mom & baby and pet-care brands served',
    proof:
      'From Shapee to Pet Lovers Centre — categories built on trust, where consistent, credible content does the selling long before the ad does.',
    bench: ['Shapee', 'Babeeboo', 'Timeflys', 'Pet Lovers Centre', 'Petsure', 'Food4Pets'],
    buttonText: 'See where these brands start — Presence, ₱100K',
    target: 't-presence',
  },
  {
    label: 'Health & Wellness',
    count: '10 health & wellness brands served',
    proof:
      'From Metro Pacific Health to homegrown wellness lines — clear, compliant content that builds trust and holds up to scrutiny.',
    bench: ['Metro Pacific Health', 'Clandex', 'GFoxx', 'Smile & Co', 'Teraki Fitness'],
    buttonText: 'See where health brands start — Growth, ₱120K',
    target: 't-growth',
  },
  {
    label: 'Enterprise & National',
    count: 'Enterprise & national brands',
    proof:
      "ABS-CBN: 39.20× ROAS — and the 2026 concert outsold both prior years' launch weeks. Boardroom-grade reporting comes standard.",
    bench: ['ABS-CBN', 'SM', 'Nike', 'Castrol', 'Abenson', 'Metro Pacific Health'],
    buttonText: 'Apply for the Performance Package',
    target: 't-performance',
  },
  {
    label: 'Something else',
    count: '140+ brands across 20+ categories',
    proof:
      "Tourism, automotive, financial services, events, education — if Filipinos buy it, chances are it's in the archive. Tell us your category and we'll bring the closest cases.",
    bench: ['CVM Pawnshop', 'Goshawk', 'Villa Ole', 'APlus Tires PH', 'Bert Lozada'],
    buttonText: 'Book a call — get matched cases in 24 hours',
    target: '/contact',
  },
]

const DOT_PATTERN = '/images/cta-background.png'

/** Scroll to a tier card by DOM id and pulse its border; route targets navigate. */
function goToTarget(target: string) {
  if (target.startsWith('/')) {
    window.location.href = target
    return
  }
  const card = document.getElementById(target)
  if (!card) return
  card.scrollIntoView({ behavior: 'smooth', block: 'center' })
  card.classList.add('ring-2', 'ring-primary')
  window.setTimeout(() => card.classList.remove('ring-2', 'ring-primary'), 1600)
}

export function IndustryMatcherSection({ data }: IndustryMatcherSectionProps) {
  const matches =
    data?.matches && data.matches.length > 0 ? data.matches : FALLBACK_MATCHES
  const heading = data?.mainHeading || FALLBACK_HEADING
  const subtext = data?.subtext || FALLBACK_SUBTEXT
  const staticNote = data?.staticNote || FALLBACK_STATIC_NOTE

  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const active = activeIndex === null ? null : matches[activeIndex]

  return (
    <ScrollAnimationWrapper>
      <Section className="bg-bg-primary py-[60px] md:py-[70px] lg:py-[80px]">
        <Row className="flex flex-col items-start gap-6">
          <h2 className="heading-2 font-normal text-text-primary w-full">{heading}</h2>
          <p className="body-md font-normal text-text-secondary w-full max-w-[60ch]">
            {subtext}
          </p>

          {/* Category chips */}
          <div className="w-full flex flex-wrap gap-2.5 mt-2">
            {matches.map((item, index) => {
              const isActive = index === activeIndex
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  className={`caption px-4 py-2.5 rounded-full border transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-primary text-white border-primary'
                      : 'bg-bg-secondary text-text-primary border-border hover:border-primary hover:text-primary'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>

          {/* Match panel — brand red + halftone, appears on chip tap */}
          {active && (
            <div className="relative w-full overflow-hidden rounded-lg bg-primary mt-2">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage: `url("${DOT_PATTERN}")`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'repeat',
                  opacity: 0.2,
                }}
              />
              <div className="relative z-10 p-6 md:p-8 flex flex-col gap-5 text-white">
                <p className="caption uppercase tracking-[2px] text-secondary">
                  {active.count}
                </p>
                <p className="body-md font-normal w-full max-w-[80ch]">{active.proof}</p>

                <div className="flex flex-col gap-3">
                  <p className="body-xs uppercase tracking-[1px] text-white font-semibold">
                    The bench
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {active.bench.map((brand) => (
                      <span
                        key={brand}
                        className="body-xs px-3 py-1.5 rounded-full border border-white/25 text-white"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => goToTarget(active.target)}
                  className="caption self-start px-5 py-3 rounded-md bg-white text-primary hover:bg-secondary hover:text-neutral-900 transition-colors cursor-pointer"
                >
                  {active.buttonText} →
                </button>
              </div>
            </div>
          )}

          {/* Static teaser under the chips — <strong> accent, HTML-in-field pattern */}
          <p
            className="body-sm text-text-secondary w-full [&_strong]:font-semibold [&_strong]:text-text-primary"
            dangerouslySetInnerHTML={{ __html: staticNote }}
          />
        </Row>
      </Section>
    </ScrollAnimationWrapper>
  )
}

export default IndustryMatcherSection

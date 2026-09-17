import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import ScrollAnimationWrapper from '@/components/global/ScrollAnimationWrapper'
import { CountUp } from '@/components/ui/CountUp'

// One "From the Archive" stat card shown on the right of each offer block.
export interface OfferArchive {
  eyebrow: string // e.g. "From the Archive · Buenas"
  value: string // big number, e.g. "30,000"
  suffix: string // smaller trailing text, e.g. "+ followers"
  description: string
}

// A single service offer block. All blocks share the same layout — only the
// content differs per service, so the whole section maps over this shape.
export interface ServiceOffer {
  number: string // "01"
  category: string // "Strategy & Content"
  heading: string
  description: string
  tags: string[]
  archives: OfferArchive[] // one or two archive cards
  linkLabel: string
  linkHref: string
}

// Fallback content — mirrors the reference mockup copy, used until CMS fields are wired.
const FALLBACK_OFFERS: ServiceOffer[] = [
  {
    number: '01',
    category: 'Strategy & Content',
    heading: "A daily presence that's going somewhere",
    description:
      "Sixteen posts and fifteen stories a month is table stakes. What makes ours different is that every piece is planned against a strategy your brand strategist presents, defends, and reports on — content with a job, not content for content's sake.",
    tags: [
      'Content strategy & planning',
      'Social media management',
      'Copywriting',
      'Community management, Mon–Fri',
      'Event social coverage',
      'FB · IG · TikTok',
    ],
    archives: [
      {
        eyebrow: 'From the Archive · Buenas',
        value: '30,000',
        suffix: '+ followers',
        description:
          'Page growth in one campaign cycle — while GMV rose 32%. Audience and revenue, same engine.',
      },
    ],
    linkLabel: 'See it inside every retainer',
    linkHref: '/packages',
  },
  {
    number: '02',
    category: 'Creative Production',
    heading: 'Big-brand craft, at social speed',
    description:
      'An in-house studio for photo, video, graphics, and animation — from 10-second reels to broadcast-grade brand films. Shoots deliver edited output within 24 hours, because momentum is a creative decision too.',
    tags: [
      'Photo & video shoots',
      'Short-form / reels',
      'Corporate & AVP films',
      'Graphics & animation',
      'Edited output in 24 hours',
      'Full-rights packages',
    ],
    archives: [
      {
        eyebrow: 'From the Archive · Onesimus',
        value: '+36',
        suffix: '% sales',
        description:
          'In three months, creative that reintroduced a heritage menswear icon — and made the Fun Barong its second best-seller.',
      },
    ],
    linkLabel: 'See shoot packages & rates',
    linkHref: '/packages',
  },
  {
    number: '03',
    category: 'KOL & Creators',
    heading: 'Borrowed trust, managed like media',
    description:
      "Vetted Filipino creators matched to your brand within 24 hours — then briefed, managed, and measured the way we'd run any ad placement. And the content they make is licensed back to you, so one campaign keeps working in your posts and ads long after it ends.",
    tags: [
      'Creator identification & vetting',
      'Nano to celebrity tiers',
      'Briefing & campaign management',
      'Content licensed for brand reuse',
      'Campaign reporting',
    ],
    archives: [
      {
        eyebrow: 'From the Archive · Fat Cousins',
        value: '2',
        suffix: '× store traffic',
        description:
          'Store visits nearly doubled within a week of the creator campaign — with a measurable rise in Grab orders behind it.',
      },
    ],
    linkLabel: 'See KOL campaign rates',
    linkHref: '/packages',
  },
  {
    number: '04',
    category: 'Paid Social Advertising',
    heading: 'Where content becomes revenue',
    description:
      'This is where everything upstream pays off. We test creative continuously, kill the losers fast, and put the budget behind proven winners — optimized daily against a ROAS target we agree in writing. Your budget goes straight to Meta and TikTok; our Campaign Strategy Fee covers the system that makes it perform. Both numbers, always visible.',
    tags: [
      'Meta & TikTok advertising',
      'Continuous creative testing',
      'Daily optimization',
      'Run to a ROAS target',
      'Social commerce — Shopee · Lazada · TikTok Shop',
    ],
    archives: [
      {
        eyebrow: 'From the Archive · ABS-CBN',
        value: '39.20',
        suffix: '× ROAS',
        description:
          "₱71,232 in ad spend returned ₱2,791,984 — and the 2026 concert sold out both prior years' launch weeks.",
      },
      {
        eyebrow: 'From the Archive · Milk Magic',
        value: '+₱600K',
        suffix: 'GMV',
        description:
          'A new revenue stream unlocked through social-led selling straight into e-commerce — not just engagement.',
      },
    ],
    linkLabel: 'Ask about the Performance Package',
    linkHref: '/contact',
  },
  {
    number: '05',
    category: 'Measurement & Reporting',
    heading: 'The receipts, every single week',
    description:
      'Most agencies treat reporting as homework. We treat it as the product: weekly numbers you can hold us to, monthly business reviews with a post-cycle action plan, and results filed to the ROAS Archive. If a test loses, you\'ll hear it from us first — with what we\'re changing next.',
    tags: [
      'Weekly performance reporting',
      'Monthly business reviews',
      'Post-cycle action plans',
      'Integrated content + KOL + ads view',
      'Every result archived',
    ],
    archives: [
      {
        eyebrow: 'From the Archive · ABS-CBN ASAP 2026',
        value: '24',
        suffix: '% sold, week one',
        description:
          'Measured testing across audiences and creatives found the winners early — beating the 2024 (13%) and 2026 (12%) launches.',
      },
    ],
    linkLabel: 'See a sample report on your discovery call',
    linkHref: '/contact',
  },
]

interface ServicesListSectionProps {
  data?: {
    offers?: ServiceOffer[] | null
  } | null
}

export function ServicesListSection({ data }: ServicesListSectionProps) {
  const offers = data?.offers && data.offers.length > 0 ? data.offers : FALLBACK_OFFERS

  return (
    <>
      {offers.map((offer, index) => {
        // Alternating full-bleed background: gray → no bg → gray → no bg …
        // The gray matches the homepage ROAS Archive band (bg-bg-secondary).
        const isGray = index % 2 === 0

        return (
          <ScrollAnimationWrapper key={index}>
            <Section className={`${isGray ? 'bg-bg-secondary' : 'bg-bg-primary'} py-[40px] md:py-[60px] lg:py-[80px]`}>
              <Row className="!max-w-[1270px]">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16">
                  {/* Left: eyebrow + heading + description — sticks below the fixed nav
                      while the taller right column scrolls, then releases at the section bottom. */}
                  <div className="lg:sticky lg:top-[150px] lg:w-1/2 lg:self-start">
                    <div className="flex items-center gap-4">
                      <span className="caption whitespace-nowrap uppercase tracking-[1px] text-primary">
                        {offer.number} · {offer.category}
                      </span>
                      <div className="hidden flex-1 border-t border-border lg:block" />
                    </div>

                    <h2 className="heading-2 mt-4 font-semibold text-text-primary">{offer.heading}</h2>

                    <p className="body-md mt-4 max-w-[540px] text-text-secondary">{offer.description}</p>
                  </div>

                  {/* Right: tags + archive card(s) + link */}
                  <div className="lg:w-1/2">
                    <div className="flex flex-wrap gap-2">
                      {offer.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="body-sm rounded-full border border-border bg-bg-primary px-4 py-2 text-text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className={`mt-6 grid gap-4 ${offer.archives.length > 1 ? 'sm:grid-cols-2' : ''}`}>
                      {offer.archives.map((card, cardIndex) => (
                        <div
                          key={cardIndex}
                          className="rounded-lg border border-border border-l-4 border-l-primary bg-bg-primary p-5 shadow-sm"
                        >
                          <p className="caption uppercase tracking-[1px] text-primary">{card.eyebrow}</p>
                          <p className="heading-2 mt-2 flex flex-wrap items-baseline gap-x-1 font-bold text-primary">
                            <CountUp value={card.value} />
                            <span className="body-md font-semibold text-text-primary">{card.suffix}</span>
                          </p>
                          <p className="body-sm mt-2 text-text-secondary">{card.description}</p>
                        </div>
                      ))}
                    </div>

                    <a
                      href={offer.linkHref}
                      className="body-sm mt-6 inline-flex items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      {offer.linkLabel}
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                </div>
              </Row>
            </Section>
          </ScrollAnimationWrapper>
        )
      })}
    </>
  )
}

export default ServicesListSection

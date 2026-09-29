import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import Link from 'next/link'
import ScrollAnimationWrapper from '@/components/global/ScrollAnimationWrapper'

// "The Full Catalog" rate sheet — sections A–F of the
// InstaPost-Agency-FullCatalog-v1 mockup. Package names are kept verbatim from
// the mockup (Launch / Momentum / Momentum + TikTok / Scale), which is the
// older naming the /packages page has since replaced.
//
// Mockup palette mapped to brand tokens (same convention as /packages):
//   ivory band      -> bg-bg-secondary      ivory card -> bg-bg-primary
//   navy ink        -> text-text-primary    ink-muted    -> text-text-secondary
//   hairlines       -> border-neutral-400 (border-border #E5E7EB measures
//                     1.18:1 on this band and disappears on screen and in print)
//   red prices      -> text-primary
//   gold accents    -> text-primary, NOT text-secondary: #FDD10D on #F9FAFB is
//                     ~1.5:1 and unreadable as small text on a light band.
export interface CatalogItem {
  /** Item name, e.g. "Momentum + TikTok". */
  name: string
  /** Inline uppercase tag after the name, e.g. "Most popular". */
  badge?: string | null
  /** Display price, e.g. "₱120,000" or "from ₱350,000". */
  price?: string | null
  /** Small line under the price, e.g. "/month · FB + IG". */
  priceUnit?: string | null
  /** Renders "On inquiry" in place of a price. */
  priceOnInquiry?: boolean
  /** Short bold text in the price column instead of a number (Paid Media). */
  priceNote?: string | null
  description: string
  /** Draws the gold-boxed treatment the mockup gives the flagship row. */
  flagship?: boolean
}

export interface CatalogGroup {
  /** Letter shown before the heading. */
  index: string
  title: string
  subtitle?: string | null
  items: CatalogItem[]
  /** Trailing link under the group (section A only in the mockup). */
  footnoteLink?: { label: string; href: string } | null
}

interface RateCatalogSectionProps {
  data?: {
    groups?: CatalogGroup[] | null
  } | null
}

const FALLBACK_GROUPS: CatalogGroup[] = [
  {
    index: 'A',
    title: 'Monthly Retainers',
    subtitle:
      'Every retainer includes a brand strategist, an accounts lead, daily community management (Mon–Fri), scheduling and publishing, and a monthly report. Fixed monthly rates — no surprise line items.',
    items: [
      {
        name: 'Launch',
        price: '₱60,000',
        priceUnit: '/month · FB + IG',
        description:
          'Strategic content, ready to post — you provide the footage; we handle strategy, copy, design, editing, posting, and community. 16 posts + 15 stories monthly.',
      },
      {
        name: 'Momentum',
        price: '₱100,000',
        priceUnit: '/month · FB + IG',
        description:
          'Full production end to end with a 3-hour monthly shoot — 16 posts + 15 stories made for you, every cycle.',
      },
      {
        name: 'Momentum + TikTok',
        price: '₱120,000',
        priceUnit: '/month · FB + IG + TikTok',
        description:
          'Momentum extended to TikTok with channel-native cutdowns, captions, and community management.',
      },
      {
        name: 'Scale',
        badge: 'Most popular',
        price: '₱170,000',
        priceUnit: '/month · FB + IG + TikTok',
        description:
          'Everything in Momentum + TikTok, plus a fully managed monthly KOL campaign with 5 vetted creators — and 5 creator-made assets you keep for posts, ads, and campaigns.',
      },
      {
        name: '360 Marketing',
        priceOnInquiry: true,
        description:
          'Scale with a doubled creator program — 10 influencers and 10 reusable creator assets per month. Our heaviest always-on package.',
      },
      {
        name: 'The Performance Package',
        badge: 'Flagship · Revenue-accountable',
        price: 'from ₱350,000',
        priceUnit: '/month',
        flagship: true,
        description:
          'Everything in Scale, plus paid media on Meta & TikTok run daily to a ROAS target agreed in writing — continuous creative testing, live reporting, and quarterly business reviews. The engagement model behind the 39.20× and 16.51×.',
      },
    ],
    footnoteLink: {
      label: 'Compare retainers in detail on the Packages page →',
      href: '/packages',
    },
  },
  {
    index: 'B',
    title: 'Production Shoots',
    subtitle:
      'Photography and videography with enhanced, colored, edited output delivered within 24 hours of the shoot. Raw video files included.',
    items: [
      {
        name: 'Shoot A — 4 hours',
        price: '₱80,000',
        description: 'Photo & video for social media use.',
      },
      {
        name: 'Shoot B — 6 hours',
        price: '₱120,000',
        description:
          'Everything in A, plus a 20–30s product/service hero video for social.',
      },
      {
        name: 'Shoot C — 6 hours, full rights',
        price: '₱150,000',
        description:
          'Extended usage rights — print, ads, TV, cinema, billboards. One shoot, every channel.',
      },
    ],
  },
  {
    index: 'C',
    title: 'Video Products',
    items: [
      {
        name: 'Short-form video — 30s reel',
        price: '₱30,000',
        description: 'Built for reels: engagement, promos, hype.',
      },
      {
        name: 'Short-form 5-pack',
        price: '₱120,000',
        description:
          'Five 30s reels at a bundle rate — a month of scroll-stopping video.',
      },
      {
        name: 'Corporate / AVP — 60 seconds',
        price: '₱60,000',
        description:
          'Credibility-building brand film for your page, pitches, and events.',
      },
      {
        name: 'Corporate / AVP — 120 seconds',
        price: '₱120,000',
        description: 'The full brand story, broadcast-grade.',
      },
    ],
  },
  {
    index: 'D',
    title: 'KOL & Creator Campaigns',
    subtitle:
      'Identification, selection, briefing, management, and campaign reporting — with creator-made content licensed for your reuse across posts, ads, and campaigns.',
    items: [
      {
        name: '5-creator campaign',
        price: '₱50,000',
        description: 'Five vetted creators, fully managed, five reusable assets.',
      },
      {
        name: '10-creator campaign',
        price: '₱90,000',
        description:
          'Double the voices, same full management, ten reusable assets.',
      },
    ],
  },
  {
    index: 'E',
    title: 'Paid Media Management',
    items: [
      {
        name: 'Your ad budget + Campaign Strategy Fee',
        priceNote: '40% of ad spend',
        description:
          'Your budget goes 100% to Meta/TikTok. The fee covers what makes it perform: strategy, continuous creative testing, daily optimization, and live ROAS reporting — the system behind the 39.20×. Both numbers visible, always.',
      },
    ],
  },
  {
    index: 'F',
    title: 'Customer Service & Community Care',
    subtitle:
      'Dedicated daily support for brands whose inboxes never sleep — run in your brand voice, with approved response templates protecting tone and reputation.',
    items: [
      {
        name: 'Daily support package — 9AM–5PM',
        priceOnInquiry: true,
        description:
          'Monitoring and response across Facebook & Instagram comments, DMs, and inquiries · complaint and compliment handling with empathy and consistency · UGC and key-comment highlighting for social proof · monthly report with response stats and recommendations.',
      },
    ],
  },
]

const INQUIRY_LABEL = 'On inquiry'

function CatalogRow({
  item,
  bordered = true,
}: {
  item: CatalogItem
  /** Off for the flagship row, whose card border already closes it. */
  bordered?: boolean
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-x-5 gap-y-1 pt-4 pb-6 sm:grid-cols-[1fr_auto] sm:items-baseline ${
        bordered ? 'border-b border-neutral-400' : ''
      }`}
    >
      {/* Name + inline badge */}
      <div className="body-md font-bold text-text-primary">
        {item.name}
        {item.badge ? (
          <span className="body-xs ml-2 font-bold uppercase tracking-[1px] text-primary">
            {item.badge}
          </span>
        ) : null}
      </div>

      {/* Price column — right-aligned from sm up, baseline-aligned with the
          name. The unit line is absolutely positioned at sm+ so a two-line
          price cell cannot push this row's description down: with
          items-baseline, an in-flow unit line made name→description spacing
          jump between 4px and 22px across the table. */}
      <div className="sm:relative sm:text-right">
        {item.priceOnInquiry ? (
          <span className="body-sm font-bold uppercase tracking-[1px] text-primary">
            {INQUIRY_LABEL}
          </span>
        ) : item.priceNote ? (
          <span className="body-sm font-bold text-primary">{item.priceNote}</span>
        ) : (
          <>
            <span className="heading-4 font-semibold tabular-nums text-primary">
              {item.price}
            </span>
            {item.priceUnit ? (
              <span className="body-xs block font-bold tracking-[0.5px] text-text-secondary sm:absolute sm:right-0 sm:top-full">
                {item.priceUnit}
              </span>
            ) : null}
          </>
        )}
      </div>

      {/* Description stays in the left column, leaving the price column empty
          underneath — that whitespace is the mockup's design. */}
      <p className="body-sm max-w-[70ch] text-text-secondary sm:col-start-1">
        {item.description}
      </p>
    </div>
  )
}

export function RateCatalogSection({ data }: RateCatalogSectionProps) {
  const groups =
    data?.groups && data.groups.length > 0 ? data.groups : FALLBACK_GROUPS

  return (
    <ScrollAnimationWrapper>
      <Section className="bg-bg-secondary py-[56px] md:py-[64px]">
        <Row className="flex flex-col items-start gap-12 md:gap-14">
          {groups.map((group) => (
            <div key={group.index} className="flex w-full flex-col gap-3">
              {/* Heading with the trailing hairline that fills the row.
                  The title is allowed to wrap (min-w-0, no shrink-0) and the
                  hairline is dropped below sm — with both set to shrink-0/flex-1
                  the long section-F title was clipped 27px past the viewport at
                  320px and the rule collapsed to 0px width. */}
              <h2 className="heading-3 flex w-full items-baseline gap-3.5 font-semibold text-text-primary">
                <span className="body-sm shrink-0 font-bold text-primary">
                  {group.index}
                </span>
                <span className="min-w-0">{group.title}</span>
                <span
                  aria-hidden="true"
                  className="hidden h-px min-w-[40px] flex-1 bg-neutral-400 sm:block"
                />
              </h2>

              {group.subtitle ? (
                <p className="body-sm max-w-[70ch] text-text-secondary">
                  {group.subtitle}
                </p>
              ) : null}

              {/* mt-4 keeps the table's top rule clear of the heading rule in
                  the two groups that have no subtitle. */}
              <div className="mt-4 w-full border-t border-neutral-400">
                {group.items.map((item) =>
                  item.flagship ? (
                    /* Flagship box — the mockup wraps a normal row in a
                       bordered card instead of building a new component.
                       No horizontal padding: px-4 threw its name 17px right of
                       the table grid and its price 17px short of the right
                       edge. The fill is near-invisible on this band
                       (1.04:1), so the lift comes from the shadow, matching the
                       /packages flagship card. */
                    <div
                      key={item.name}
                      className="my-3 rounded-md border border-primary bg-bg-primary shadow-[0px_0px_16px_rgba(208,31,37,0.12)]"
                    >
                      <CatalogRow item={item} bordered={false} />
                    </div>
                  ) : (
                    <CatalogRow key={item.name} item={item} />
                  ),
                )}
              </div>

              {group.footnoteLink ? (
                <Link
                  href={group.footnoteLink.href}
                  className="body-sm mt-1 font-bold text-primary hover:underline"
                >
                  {group.footnoteLink.label}
                </Link>
              ) : null}
            </div>
          ))}
        </Row>
      </Section>
    </ScrollAnimationWrapper>
  )
}

export default RateCatalogSection

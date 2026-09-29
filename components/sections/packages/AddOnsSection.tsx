import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import ScrollAnimationWrapper from '@/components/global/ScrollAnimationWrapper'

// Shoots, videos & campaigns — the add-ons rate card from the
// "Services & Rate Card v2" mockup. Ledger style (no cards): each group is
// a heading plus hairline-separated rows with name + description left and
// the price right, like a printed rate card. Brand tokens: red prices,
// border-border hairlines on the light band.

export interface AddOnItem {
  name: string
  description: string
  price: string
}

export interface AddOnGroup {
  title: string
  /** Small label under the group heading, e.g. "Edited output in 24 hours" */
  note?: string | null
  items: AddOnItem[]
}

interface AddOnsSectionProps {
  data?: {
    mainHeading?: string | null
    subtext?: string | null
    groups?: AddOnGroup[] | null
    closingNote?: string | null
  } | null
}

const FALLBACK_HEADING = 'Shoots, videos & campaigns'
const FALLBACK_SUBTEXT =
  'Add to any retainer, or book on their own. Every shoot delivers edited output within 24 hours.'

const FALLBACK_GROUPS: AddOnGroup[] = [
  {
    title: 'Production Shoots',
    note: 'Edited output in 24 hours',
    items: [
      {
        name: 'Shoot A — 4 hours',
        price: '₱80,000',
        description:
          'Photography & videography, enhanced and edited, plus raw video files. For social media use.',
      },
      {
        name: 'Shoot B — 6 hours',
        price: '₱120,000',
        description: 'Everything in A, plus a 20–30s product/service hero video for social.',
      },
      {
        name: 'Shoot C — 6 hours, full rights',
        price: '₱150,000',
        description:
          'Extended usage rights: print, ads, TV, cinema, billboards — one shoot, every channel.',
      },
    ],
  },
  {
    title: 'Video Production',
    items: [
      {
        name: 'Short-form video (30s reel)',
        price: '₱30,000',
        description: 'Built for reels — engagement, promos, hype.',
      },
      {
        name: 'Short-form 5-pack',
        price: '₱120,000',
        description: 'Five 30s reels — a month of scroll-stopping video at a bundle rate.',
      },
      {
        name: 'Corporate / AVP — 60s',
        price: '₱60,000',
        description: 'Credibility-building brand film for your page, pitches, and events.',
      },
      {
        name: 'Corporate / AVP — 120s',
        price: '₱120,000',
        description: 'The full brand story, broadcast-grade.',
      },
    ],
  },
  {
    title: 'KOL Campaigns',
    note: 'Content you keep',
    items: [
      {
        name: '5 creators',
        price: '₱50,000',
        description:
          'Identification, selection, briefing, management & reporting — with creator content licensed for your reuse.',
      },
      {
        name: '10 creators',
        price: '₱90,000',
        description: 'Double the voices, same full management. Ten reusable creator assets.',
      },
    ],
  },
  {
    title: 'Paid Media Management',
    items: [
      {
        name: 'Your ad budget + Campaign Strategy Fee',
        price: '40% of ad spend',
        description:
          'Your budget goes straight to Meta/TikTok. The fee covers what makes it perform: strategy, continuous creative testing, daily optimization, and live ROAS reporting — the system behind the 39.20×.',
      },
    ],
  },
]

const FALLBACK_CLOSING_NOTE =
  '<strong>Not sure what to combine?</strong> Tell us the business result you need on the discovery call — we’ll build the exact mix into your 24-hour proposal, priced to the peso.'

export function AddOnsSection({ data }: AddOnsSectionProps) {
  const heading = data?.mainHeading || FALLBACK_HEADING
  const subtext = data?.subtext || FALLBACK_SUBTEXT
  const groups = data?.groups && data.groups.length > 0 ? data.groups : FALLBACK_GROUPS
  const closingNote = data?.closingNote || FALLBACK_CLOSING_NOTE

  return (
    <ScrollAnimationWrapper>
      <Section id="addons" className="bg-bg-secondary py-[60px] md:py-[70px] lg:py-[80px]">
        <Row className="flex !max-w-[1080px] flex-col items-start gap-10">
          <div className="w-full flex flex-col gap-4">
            <h2 className="heading-2 font-normal text-text-primary">{heading}</h2>
            <p className="body-md font-normal text-text-secondary max-w-[60ch]">{subtext}</p>
          </div>

          {/* Ledger groups — full Row width; only the text column is measured
              so the price stays pinned to the right edge of the hairline. */}
          <div className="w-full !max-w-auto flex flex-col gap-10">
            {groups.map((group) => (
              <div key={group.title} className="w-full flex flex-col gap-1">
                <div className="flex flex-col gap-1 pb-3">
                  <h3 className="heading-4 font-semibold text-text-primary">{group.title}</h3>
                  {group.note && (
                    <p className="body-xs uppercase tracking-[1px] font-semibold text-primary">
                      {group.note}
                    </p>
                  )}
                </div>

                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 md:gap-8 items-start border-t border-border py-4"
                  >
                    <div className="flex flex-col gap-1 max-w-[85ch]">
                      <p className="body-sm font-semibold text-text-primary">{item.name}</p>
                      <p className="body-xs text-text-secondary">{item.description}</p>
                    </div>
                    <p className="body-md font-semibold text-primary tabular-nums md:text-right whitespace-nowrap">
                      {item.price}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Closing note — red left border, mockup's gold-border callout */}
          <div className="w-full rounded-r-md border-l-4 border-primary bg-bg-primary p-5 md:p-6">
            <p
              className="body-sm text-text-primary [&_strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: closingNote }}
            />
          </div>
        </Row>
      </Section>
    </ScrollAnimationWrapper>
  )
}

export default AddOnsSection

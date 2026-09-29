import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import Link from 'next/link'
import ScrollAnimationWrapper from '@/components/global/ScrollAnimationWrapper'

// Monthly retainers — rebuilt from the "Services & Rate Card v2" mockup:
// one full-width flagship card (Performance) above a 4-up tier grid
// (Essentials / Presence / Growth / Amplify). Mockup navy flagship mapped to
// brand red + halftone dots; tiers are light bordered cards, the "hot" tier
// (Amplify) gets the red frame and red button per the mockup's MOST POPULAR
// treatment. "Everything included" blocks use native <details> accordions.

export interface PackageTier {
  /** DOM id used by the industry matcher scroll targets, e.g. "t-essentials" */
  id: string
  title: string
  tagline: string
  price: string
  period: string
  platforms: string[]
  bullets: string[]
  /** Lines shown under the "Everything included" accordion */
  included: string[]
  buttonText: string
  /** Renders with the red frame + MOST POPULAR badge + solid red button */
  hot?: boolean
}

export interface FlagshipPackage {
  id: string
  tag: string
  title: string
  description: string
  modelLine: string
  price: string
  period: string
  bullets: string[]
  buttonText: string
  buttonHref: string
}

interface PackagesSectionProps {
  data?: {
    mainHeading?: string | null
    subtext?: string | null
    flagship?: FlagshipPackage | null
    tiers?: PackageTier[] | null
  } | null
}

const FALLBACK_HEADING = 'Monthly retainers'
const FALLBACK_SUBTEXT =
  'Four retainers and one flagship — every tier is a full team: strategist, designer, editor, community, and accounts lead, priced transparently.'

const FALLBACK_FLAGSHIP: FlagshipPackage = {
  id: 't-performance',
  tag: 'Flagship · Revenue-Accountable',
  title: 'The Performance Package',
  description:
    'For brands ready to treat social as a revenue channel: everything we make — content, shoots, creators — feeds a paid engine optimized daily against a return target.',
  modelLine: "The engagement model behind the archive's biggest numbers — 39.20× and 16.51×.",
  price: 'from ₱350,000',
  period: '/month',
  bullets: [
    'Run to a ROAS target agreed in writing before launch — the number we report against every week',
    'Everything in Amplify: full content production, monthly shoot, and a 5-creator KOL campaign',
    'Paid media on Meta & TikTok with continuous creative testing — winners scale, losers die fast',
    'Live reporting — see spend and return anytime, not at month-end',
    'Quarterly business reviews with your brand strategist',
    'Priority production queue and dedicated accounts lead',
  ],
  buttonText: 'Apply for the Performance Package',
  buttonHref: '/contact',
}

const FALLBACK_TIERS: PackageTier[] = [
  {
    id: 't-essentials',
    title: 'Essentials',
    tagline: 'You shoot or supply the footage — we turn it into a brand-grade presence.',
    price: '₱60,000',
    period: '/mo',
    platforms: ['FB', 'IG'],
    bullets: [
      '16 posts + 15 stories crafted from your footage — strategy, copy, and design included',
      'A brand strategist aligning every post to your goals',
      'Daily community management, Mon–Fri',
      'Monthly report on what moved and what’s next',
    ],
    included: [
      '16 posts/month (static, carousels, 5–10s reels) · 15 stories/month (5 video)',
      'Copywriting for all captions · Production & post-production on supplied assets',
      'Content scheduling & publishing · Spam/troll monitoring · Accounts lead',
      'Client shoots own footage or add a Shoot Package below',
    ],
    buttonText: 'Start with Essentials',
  },
  {
    id: 't-presence',
    title: 'Presence',
    tagline: 'Full content production with a monthly shoot — the feed never runs dry.',
    price: '₱100,000',
    period: '/mo',
    platforms: ['FB', 'IG'],
    bullets: [
      'Everything in Essentials, made for you end to end',
      '3-hour monthly shoot — fresh photo & video every cycle',
      'Full production & post-production team',
      'Monthly integrated performance report',
    ],
    included: [
      '3-hour monthly shoot (photo + video) · 16 posts + 15 stories/month',
      'Brand strategist · Copywriting · Production & post-prod · Accounts lead',
      'Daily community management Mon–Fri · Scheduling & publishing · Monthly report',
    ],
    buttonText: 'Start with Presence',
  },
  {
    id: 't-growth',
    title: 'Growth',
    tagline: 'Presence, plus TikTok — built for where Filipino attention actually lives.',
    price: '₱120,000',
    period: '/mo',
    platforms: ['FB', 'IG', 'TikTok'],
    bullets: [
      'Everything in Presence, across three platforms',
      'Reels & TikTok-native short-form built into your 16 posts',
      '3-hour monthly shoot planned for vertical video',
      'One integrated report across all platforms',
    ],
    included: [
      'All Presence inclusions, extended to TikTok',
      'Platform-native cutdowns and captions per channel',
      'Community management and monitoring across FB, IG, TikTok',
    ],
    buttonText: 'Start with Growth',
  },
  {
    id: 't-amplify',
    title: 'Amplify',
    tagline: 'Full production plus five creators talking about you — every single month.',
    price: '₱170,000',
    period: '/mo',
    platforms: ['FB', 'IG', 'TikTok'],
    bullets: [
      'Everything in Growth',
      'Monthly KOL campaign with 5 vetted creators — fully managed',
      '5 influencer-made assets you keep for posts, ads & campaigns',
      'One report covering content + creator results',
    ],
    included: [
      'All Growth inclusions',
      'KOL identification, selection, briefing, management & campaign reporting',
      'Influencer-owned content licensed for brand reuse',
      'Dedicated KOL team alongside your accounts lead',
    ],
    buttonText: 'Start with Amplify',
    hot: true,
  },
]

const DOT_PATTERN = '/images/cta-background.png'

function CheckBullet({ text, onDark = false }: { text: string; onDark?: boolean }) {
  return (
    <li className="flex items-start gap-2.5">
      <span
        className={`mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${
          onDark ? 'bg-secondary text-neutral-900' : 'bg-[#D01F251A] text-primary'
        }`}
      >
        <svg width="9" height="7" viewBox="0 0 10 8" fill="none" aria-hidden="true">
          <path d="M1 4L3.7 6.7L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className={`body-sm ${onDark ? 'text-white' : 'text-text-primary'}`}>{text}</span>
    </li>
  )
}

function TierCard({ tier }: { tier: PackageTier }) {
  return (
    <div
      id={tier.id}
      className={`scroll-mt-28 rounded-lg border bg-bg-primary p-6 flex flex-col gap-4 transition-shadow ${
        tier.hot ? 'border-primary shadow-[0px_0px_16px_rgba(208,31,37,0.12)] relative' : 'border-border'
      }`}
    >
      {tier.hot && (
        <span className="caption absolute -top-3 right-4 px-3 py-1 rounded-full bg-primary text-white">
          Most Popular
        </span>
      )}

      <div className="flex flex-col gap-1">
        <h4 className="heading-4 font-semibold text-text-primary">{tier.title}</h4>
        <p className="body-xs text-text-secondary">{tier.tagline}</p>
      </div>

      <div className="flex items-baseline gap-1">
        <span className="heading-2 font-semibold text-text-primary tabular-nums">{tier.price}</span>
        <span className="body-xs text-text-secondary">{tier.period}</span>
      </div>

      {/* Platform pills */}
      <div className="flex gap-1.5">
        {tier.platforms.map((p) => (
          <span
            key={p}
            className="body-xs font-semibold px-2.5 py-1 rounded-full border border-border bg-bg-secondary text-text-secondary"
          >
            {p}
          </span>
        ))}
      </div>

      <ul className="flex flex-col gap-2.5">
        {tier.bullets.map((b) => (
          <CheckBullet key={b} text={b} />
        ))}
      </ul>

      {/* "Everything included" accordion — native <details>, no JS needed */}
      <details className="group border-t border-border pt-3 [&_summary::-webkit-details-marker]:hidden">
        <summary className="body-sm font-semibold text-primary cursor-pointer list-none flex items-center justify-between">
          Everything included
          <span className="font-semibold group-open:hidden">+</span>
          <span className="font-semibold hidden group-open:inline">–</span>
        </summary>
        <div className="mt-2 flex flex-col gap-1.5">
          {tier.included.map((line) => (
            <p key={line} className="body-xs text-text-secondary">
              {line}
            </p>
          ))}
        </div>
      </details>

      <Link
        href="/contact"
        className={`mt-auto caption w-full text-center px-5 py-3.5 rounded-md transition-colors ${
          tier.hot
            ? 'bg-primary text-white hover:bg-secondary hover:text-neutral-900'
            : 'border border-primary text-primary hover:bg-primary hover:text-white'
        }`}
      >
        {tier.buttonText}
      </Link>
    </div>
  )
}

export function PackagesSection({ data }: PackagesSectionProps) {
  const heading = data?.mainHeading || FALLBACK_HEADING
  const subtext = data?.subtext || FALLBACK_SUBTEXT
  const flagship = data?.flagship || FALLBACK_FLAGSHIP
  const tiers = data?.tiers && data.tiers.length > 0 ? data.tiers : FALLBACK_TIERS

  return (
    <ScrollAnimationWrapper>
      <Section id="packages" className="bg-bg-secondary py-[60px] md:py-[70px] lg:py-[80px]">
        <Row className="flex flex-col items-start gap-10">
          {/* Section head */}
          <div className="w-full flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="heading-2 font-normal text-text-primary">{heading}</h2>
            <p className="body-md font-normal text-text-secondary lg:max-w-[480px]">{subtext}</p>
          </div>

          {/* Flagship card — brand red + halftone (mockup navy treatment) */}
          <div
            id={flagship.id}
            className="scroll-mt-28 relative w-full overflow-hidden rounded-lg bg-primary"
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: `url("${DOT_PATTERN}")`,
                backgroundPosition: 'center',
                backgroundRepeat: 'repeat',
                opacity: 0.2,
              }}
            />
            {/* Pill is pinned to the card's left padding at every breakpoint
                (it used to centre below lg, which read as a bug on tablet). */}
            <span className="caption absolute top-6 left-6 md:left-10 lg:left-8 z-10 px-4 py-1.5 rounded-full bg-secondary text-neutral-900 uppercase tracking-[1.5px]">
              {flagship.tag}
            </span>

            <div className="relative z-10 p-6 pt-20 md:p-10 md:pt-24 flex flex-col gap-8 lg:flex-row lg:gap-12 text-white">
              {/* Left: title + description */}
              <div className="flex flex-col gap-4 lg:w-1/2">
                <h3 className="heading-3 font-semibold text-white">{flagship.title}</h3>
                <p className="body-md font-normal text-white/90">{flagship.description}</p>
                <p className="body-xs font-semibold uppercase tracking-[1px] text-secondary">
                  {flagship.modelLine}
                </p>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="heading-2 font-semibold text-white tabular-nums">{flagship.price}</span>
                  <span className="body-sm text-white">{flagship.period}</span>
                </div>
              </div>

              {/* Right: bullets + button */}
              <div className="flex flex-col gap-6 lg:w-1/2">
                <ul className="flex flex-col gap-3">
                  {flagship.bullets.map((b) => (
                    <CheckBullet key={b} text={b} onDark />
                  ))}
                </ul>
                <Link
                  href={flagship.buttonHref}
                  className="caption self-start px-5 py-3.5 rounded-md bg-white text-primary hover:bg-secondary hover:text-neutral-900 transition-colors whitespace-nowrap"
                >
                  {flagship.buttonText} →
                </Link>
              </div>
            </div>
          </div>

          {/* Tier grid: 1 → 2 (sm) → 4 (xl) columns. Cards stretch to equal height
              (default) so the price and the CTA button line up across the row. */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {tiers.map((tier) => (
              <TierCard key={tier.id} tier={tier} />
            ))}
          </div>
        </Row>
      </Section>
    </ScrollAnimationWrapper>
  )
}

export default PackagesSection

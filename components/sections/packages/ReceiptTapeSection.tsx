import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import ScrollAnimationWrapper from '@/components/global/ScrollAnimationWrapper'
import type { ClientStatChip } from '@/lib/packages'

// "Receipt tape" — one chip per documented client result, under the Packages
// hero. Fed by the same WPGraphQL client posts as the homepage ROAS Archive
// (lib/packages.ts → getPackagesClientStats). Each chip is the client's
// metricValue over the client's post title; metricLabel is deliberately not
// shown — the client post has no per-metric category field.
// One chip per client post, never duplicated.
export type ReceiptStat = ClientStatChip

interface ReceiptTapeSectionProps {
  data?: {
    note?: string | null
    stats?: ReceiptStat[] | null
  } | null
}

// Mirrors the live client posts, used only if the CMS fetch fails.
const FALLBACK_STATS: ReceiptStat[] = [
  { value: '39.20×', label: 'ABS-CBN' },
  { value: '16.51×', label: 'Dermcare' },
  { value: '+36%', label: 'Onesimus' },
]

const FALLBACK_NOTE =
  'From the ROAS Archive — documented client results, receipts available in every proposal.'

export function ReceiptTapeSection({ data }: ReceiptTapeSectionProps) {
  const stats = data?.stats && data.stats.length > 0 ? data.stats : FALLBACK_STATS
  const note = data?.note || FALLBACK_NOTE

  return (
    <ScrollAnimationWrapper>
      <Section className="bg-bg-secondary border-y border-border py-[40px] md:py-[48px]">
        <Row className="flex flex-col items-start gap-6">
          {/* Chips are sized by their own content + padding (shrink-0, no
              flex-1), and the inner w-max group centres itself in the row.
              Centring is done with mx-auto rather than justify-center: when a
              long client list overflows, auto margins collapse to 0 and the
              strip scrolls from the first chip instead of clipping it. */}
          <div className="tape-scroll w-full overflow-x-auto">
            <div className="mx-auto flex w-max gap-3">
              {stats.map((stat) => (
                <div
                  key={`${stat.label}-${stat.value}`}
                  className="shrink-0 rounded-md border border-border bg-bg-primary px-4 py-3 flex flex-col gap-1"
                >
                  <span className="heading-4 font-semibold text-primary tabular-nums whitespace-nowrap">
                    {stat.value}
                  </span>
                  <span className="body-xs uppercase tracking-[1px] text-text-secondary whitespace-nowrap">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="body-sm text-text-secondary w-full text-center">{note}</p>
        </Row>
      </Section>
    </ScrollAnimationWrapper>
  )
}

export default ReceiptTapeSection

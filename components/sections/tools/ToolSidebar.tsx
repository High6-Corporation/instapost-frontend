import Link from 'next/link'
import Button from '@/components/ui/Button'
import type { ToolSidebarContent } from '@/lib/tools'

// Fallback content — used until the CMS fields are filled. A card must never render empty.
const FALLBACK_ABOUT_HEADING = 'About This Tool'
const FALLBACK_ABOUT_BODY =
  'InstaPost\u2019s free pricing tools translate your goals into a working budget using the same package inclusions and ads management rates we publish on our Packages page. The figures are indicative — your strategy session turns them into a precise plan.'
const FALLBACK_QUOTE_HEADING = 'Get a Precise Custom Quote'
const FALLBACK_QUOTE_BODY =
  'Estimates get you a range. A 30-minute session with our team gets you a plan built on real account data, creative capacity and Philippine market rates.'

const MORE_TOOLS = [
  { href: '/tools/smm-pricing', label: 'Social Media Pricing Tool' },
  { href: '/tools/ads-pricing', label: 'Ads Budget Calculator' },
]

interface ToolSidebarProps {
  data?: ToolSidebarContent | null
  /** Heading of the tool currently in use, hidden from the "More Free Tools" list. */
  currentToolHref: string
  aboutBody?: string
  quoteBody?: string
}

/**
 * Right-hand column of the reference tool layout: explainer card, inquiry card,
 * and cross-links to the rest of the free tools.
 */
export function ToolSidebar({
  data,
  currentToolHref,
  aboutBody = FALLBACK_ABOUT_BODY,
  quoteBody = FALLBACK_QUOTE_BODY,
}: ToolSidebarProps) {
  const aboutHeading = data?.aboutHeading || FALLBACK_ABOUT_HEADING
  const about = data?.aboutBody || aboutBody
  const quoteHeading = data?.quoteHeading || FALLBACK_QUOTE_HEADING
  const quote = data?.quoteBody || quoteBody
  const otherTools = MORE_TOOLS.filter((tool) => tool.href !== currentToolHref)

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl border border-neutral-500 bg-white p-6 shadow-[0px_0px_7px_rgba(0,0,0,0.06)]">
        <h3 className="label-md font-semibold text-text-primary">{aboutHeading}</h3>
        <p className="body-sm mt-3 leading-relaxed text-text-secondary">{about}</p>
      </div>

      <div className="rounded-2xl bg-bg-secondary p-6">
        <h3 className="label-md font-semibold text-text-primary">{quoteHeading}</h3>
        <p className="body-sm mt-3 leading-relaxed text-text-secondary">{quote}</p>
        <Link href="/contact" className="mt-5 inline-flex">
          <Button>Inquire Now</Button>
        </Link>
      </div>

      {otherTools.length > 0 && (
        <div className="rounded-2xl border border-neutral-500 bg-white p-6 shadow-[0px_0px_7px_rgba(0,0,0,0.06)]">
          <h3 className="label-md font-semibold text-text-primary">More Free Tools</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {otherTools.map((tool) => (
              <li key={tool.href}>
                <Link
                  href={tool.href}
                  className="group flex items-center justify-between gap-4 label-md text-text-secondary transition-colors duration-200 hover:text-primary"
                >
                  {tool.label}
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ToolSidebar

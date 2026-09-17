import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import { CountUp } from '@/components/ui/CountUp'

// Fallback content
const FALLBACK_MAIN_HEADING = 'From the ROAS Archive'
const FALLBACK_SUBTEXT = 'Documented Client Results'
const FALLBACK_BOTTOM_SUMMARY = {
  title: '100+ Filipino brands',
  description: 'scaled',
  resultLabel: 'Client retention above',
  resultValue: '95%',
}

// Fallback client results
const FALLBACK_CLIENTS = [
  {
    client: 'ABS-CBN',
    category: 'national media campaign',
    metric: '39.20×',
    label: 'RETURN ON AD SPEND',
  },
  {
    client: 'Dermcare',
    category: 'beauty & personal care',
    metric: '16.51×',
    label: 'RETURN ON AD SPEND',
  },
  {
    client: 'Onesimus',
    category: 'heritage menswear revival',
    metric: '+36%',
    label: 'IN-STORE SALES',
  },
]

// Client node type from GraphQL
interface ClientNode {
  title: string
  content: string
  slug: string
  clientCategories: {
    nodes: Array<{
      name: string
      slug: string
    }>
  }
  dynamicContentForClient: {
    metricValue: string | null
    metricLabel: string | null
    redirectionLink: {
      url: string
      title: string
      target: string
    } | null
  }
}

interface RoasArchiveProps {
  data?: {
    mainHeading: string
    subtext: string
    bottomSummary: {
      title: string
      description: string
      resultLabel: string
      resultValue: string
    }
  } | null
  clients?: ClientNode[] | null
}

export function RoasArchiveSection({ data, clients }: RoasArchiveProps) {
  const mainHeading = data?.mainHeading || FALLBACK_MAIN_HEADING
  const subtext = data?.subtext || FALLBACK_SUBTEXT
  const bottomSummary = data?.bottomSummary || FALLBACK_BOTTOM_SUMMARY

  // Transform clients data to display format, or use fallback
  const clientResults = clients && clients.length > 0
    ? clients.map((client) => ({
        client: client.title,
        category: client.clientCategories?.nodes?.[0]?.name || '',
        metric: client.dynamicContentForClient?.metricValue || '',
        label: client.dynamicContentForClient?.metricLabel || '',
      }))
    : FALLBACK_CLIENTS

  return (
    <Section className="bg-bg-secondary py-[40px] md:py-[60px] lg:py-[80px] mb-[40px] md:mb-[60px]">
      <Row className="!max-w-[1270px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-[24px] md:mb-[40px]">
          <span className="heading-4 font-bold max-md:text-center tracking-[2px] text-primary uppercase">
            {mainHeading}
          </span>
          <span className="heading-4 font-bold max-md:text-center tracking-[2px] text-primary uppercase">
            {subtext}
          </span>
        </div>

        {/* Separator */}
        <div className="border-t border-dotted border-primary/40 mb-[24px] md:mb-[32px]" />

        {/* Client Rows */}
        <div className="flex flex-col gap-[20px] md:gap-[24px] mb-[32px] md:mb-[40px]">
          {clientResults.map((result, index) => (
            <div key={index}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
                {/* Left: Client name + category */}
                <div className="flex items-baseline gap-3">
                  <h3 className="heading-3 font-semibold text-text-primary">
                    {result.client}
                  </h3>
                  <span className="body-sm text-text-secondary">
                    {result.category}
                  </span>
                </div>

                {/* Dotted connector (desktop only) */}
                <div className="hidden md:block flex-1 mx-4 border-b border-dotted border-primary/40" />

                {/* Right: Metric + label */}
                <div className="flex flex-col items-end gap-1">
                  <span className="heading-2 font-bold text-primary">
                    <CountUp value={result.metric} />
                  </span>
                  <span className="caption tracking-[1px] text-text-primary uppercase">
                    {result.label}
                  </span>
                </div>
              </div>

              {/* Row separator */}
              {index < clientResults.length - 1 && (
                <div className="border-t border-dotted border-primary/30 mt-[20px] md:mt-[24px]" />
              )}
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="border-t border-dotted border-primary/40 pt-[24px]">
          <div className="flex flex-col md:flex-row md:justify-between gap-2">
            <div className="flex items-baseline gap-3">
              <span className="body-md font-semibold text-text-primary">
                {bottomSummary.title}
              </span>
              <span className="body-sm text-text-secondary">
                {bottomSummary.description}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="body-md text-text-primary">
                {bottomSummary.resultLabel}
              </span>
              <span className="body-md font-bold text-primary">
                {bottomSummary.resultValue}
              </span>
            </div>
          </div>
        </div>
      </Row>
    </Section>
  )
}

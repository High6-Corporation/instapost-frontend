import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import type { AboutWhyWeExistSection } from '@/lib/about'

// Fallback content (mirrors the reference copy) — used until the CMS fields are filled.
const FALLBACK_PREHEADER = 'Why We Exist'
const FALLBACK_HEADING =
  'Advertising asked brands for faith. We thought they deserved proof.'
const FALLBACK_BODY = `<p>For decades, the deal was the same: hand an agency your budget, wait a month for a PDF deck, and hope it worked. Filipino brands — especially the heritage names and the family-built businesses — got the worst of it: big-agency prices, black-box results, and no straight answer to the only question that matters: <strong>what did it return?</strong></p><p>Jelyn and Julius Patricio started Insta Post in Marikina City to run an agency the other way around. Social-first, because that's where Filipinos actually are. One team for content, paid ads, and KOL, because handoffs between three vendors are where results go to die. And accountable to a number — a target agreed in writing before launch, reported every week.</p>`
const FALLBACK_QUOTE =
  'Every result we’ve ever delivered is on file. We call it the ROAS Archive — and it’s the reason we never have to say "trust us."'
const FALLBACK_FOOTER = `<p>That discipline built the archive: 39.20× return on ad spend for ABS-CBN, 16.51× for Dermcare, a +36% in-store sales lift that helped bring a heritage menswear icon back into the national conversation. From sari-sari-scale SMEs to SM Supermalls, the standard has never changed — if we can’t measure it, we won’t sell it.</p>`

interface WhyWeExistSectionProps {
  data?: AboutWhyWeExistSection | null
}

// Shared prose styling: paragraph rhythm + brand-red bold accents (HTML-in-field).
const proseClass =
  'body-md leading-relaxed text-text-secondary [&_p]:mb-5 [&_p:last-child]:mb-0 [&_strong]:font-bold [&_strong]:text-primary'

export function WhyWeExistSection({ data }: WhyWeExistSectionProps) {
  const preHeader = data?.preHeader || FALLBACK_PREHEADER
  const heading = data?.mainHeading || FALLBACK_HEADING
  const body = data?.bodyContent || FALLBACK_BODY
  const quote = data?.highlightQuote || FALLBACK_QUOTE
  const footer = data?.footerContent || FALLBACK_FOOTER

  return (
    <Section className="bg-bg-secondary py-[60px] md:py-[80px] lg:py-[100px]">
      <Row>
        <div className="flex max-w-[1197px] flex-col gap-6 mx-auto max-md:text-center">
          {/* Eyebrow / pre-header — same caption treatment as the About hero eyebrow (HeroSection) */}
          <p className="caption w-full uppercase tracking-[2px] text-primary max-md:text-center">
            {preHeader}
          </p>

          {/* Main heading */}
          <h2 className="heading-2 font-medium text-text-primary">{heading}</h2>

          {/* Body (rich text) */}
          <div className={proseClass} dangerouslySetInnerHTML={{ __html: body }} />

          {/* Highlight quote */}
          <blockquote className="border-l-4 border-primary pl-2 md:pl-6">
            <p className="heading-3 font-medium italic text-text-primary">{quote}</p>
          </blockquote>

          {/* Footer (rich text) */}
          <div className={proseClass} dangerouslySetInnerHTML={{ __html: footer }} />
        </div>
      </Row>
    </Section>
  )
}

export default WhyWeExistSection

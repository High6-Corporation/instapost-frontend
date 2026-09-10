import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import ScrollAnimationWrapper from '@/components/global/ScrollAnimationWrapper'
import type { AboutEmpoweringSection } from '@/lib/about'

// Fallback content (mirrors the reference copy) — used only until the CMS fields are filled.
const FALLBACK_PREHEADER = 'Where this is going'
const FALLBACK_HEADING = 'Empowering <strong>10,000 legacy brands</strong> by 2035.'
const FALLBACK_SUBTEXT =
  'That’s the mission on our wall: help the brands Filipinos grew up with — and the ones they’re building now — thrive in the digital age. Starting at home in the Philippines, and following Filipino brands wherever in the world they grow next.'
const FALLBACK_LINK_TEXT = 'We’re hiring — join the team'

// Same gold radial as the "What we stand" section, but painted full-bleed on the section.
const GOLD_GRADIENT =
  'radial-gradient(circle at 50% 30%, rgba(253, 209, 13, 0.15) 0%, rgba(253, 209, 13, 1) 100%)'

interface EmpoweringSectionProps {
  data?: AboutEmpoweringSection | null
}

export function EmpoweringSection({ data }: EmpoweringSectionProps) {
  const preHeader = data?.preHeader || FALLBACK_PREHEADER
  const heading = data?.mainHeading || FALLBACK_HEADING
  const subtext = data?.subtext || FALLBACK_SUBTEXT

  const link = data?.redirectionLink
  const href = link?.url || '/contact'
  const linkText = link?.title || FALLBACK_LINK_TEXT
  const isExternal = link?.target === '_blank'

  return (
    <ScrollAnimationWrapper>
      <Section className="relative overflow-hidden py-[60px] md:py-[80px] lg:py-[100px]">
        {/* Full-bleed gold background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: GOLD_GRADIENT }}
        />

        <Row className="relative z-10 !max-w-[1197px] max-lg:!items-center max-lg:text-center flex flex-col gap-6">
          {/* Eyebrow */}
          <span className="body-sm font-semibold uppercase tracking-[0.15em] text-primary">
            {preHeader}
          </span>

          {/* Heading — HTML-in-field; <strong> renders in brand red (near-black base on gold) */}
          <div
            className="heading-1 max-w-[900px] font-medium text-text-primary [&_p]:m-0 [&_strong]:font-bold [&_strong]:text-primary"
            dangerouslySetInnerHTML={{ __html: heading }}
          />

          {/* Subtext */}
          <p className="body-md max-w-[640px] text-text-secondary">{subtext}</p>

          {/* CTA */}
          <div className="mt-2">
            <Link
              href={href}
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <Button variant="primary" showArrow={true}>
                {linkText}
              </Button>
            </Link>
          </div>
        </Row>
      </Section>
    </ScrollAnimationWrapper>
  )
}

export default EmpoweringSection

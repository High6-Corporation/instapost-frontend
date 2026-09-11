import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import Image from 'next/image'
import ScrollAnimationWrapper from '@/components/global/ScrollAnimationWrapper'
import type { AboutFoundersSection, AboutFounderItem } from '@/lib/about'

// Fallback content (mirrors the reference copy) — used only until the CMS fields are filled.
const FALLBACK_HEADING = 'Founder-led, and staying that way'
const FALLBACK_SUBTEXT =
  'The two people whose names are on the manifesto are the same two people in the room for your brand.'
const FALLBACK_FOOTER_NOTE =
  '<p><strong>Behind them:</strong> 17 strategists, producers, editors, designers, ad specialists, and KOL managers — run on weekly scorecards and 90-day priorities. We manage the agency with the same discipline we bring to your account.</p>'
const FALLBACK_FOUNDERS: AboutFounderItem[] = [
  {
    profile: null,
    name: 'Jelyn Patricio',
    position: 'Founder & President',
    description:
      'Sets the vision, leads enterprise strategy, and still sits in the pitch room for every major brand. If Insta Post promised it, Jel answers for it.',
  },
  {
    profile: null,
    name: 'Julius Patricio',
    position: 'Co-Founder & Creative Director',
    description:
      'Runs the studio and the craft standard behind every frame that ships — from daily social content to national campaign films.',
  },
]

// Initials for the avatar fallback (e.g. "Jelyn Patricio" -> "JP").
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

interface FoundersSectionProps {
  data?: AboutFoundersSection | null
}

export function FoundersSection({ data }: FoundersSectionProps) {
  const heading = data?.mainHeading || FALLBACK_HEADING
  const subtext = data?.subtext || FALLBACK_SUBTEXT
  const footerNote = data?.footerNote || FALLBACK_FOOTER_NOTE

  const founders =
    data?.foundersList && data.foundersList.length > 0 ? data.foundersList : FALLBACK_FOUNDERS

  return (
    <ScrollAnimationWrapper>
      <Section className="bg-white py-[60px] md:py-[80px] lg:py-[100px]">
        <Row className="!max-w-[1197px] flex flex-col gap-8 md:gap-10">
          {/* Header row */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between max-lg:text-center">
            <h2 className="heading-2 font-medium text-text-primary lg:max-w-[620px]">{heading}</h2>
            <p className="body-md text-text-secondary lg:max-w-[420px]">{subtext}</p>
          </div>

          {/* Founder cards — portrait left, text right */}
          <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
            {founders.map((founder, index) => {
              const avatar = founder.profile?.node?.sourceUrl
              return (
                <div
                  key={index}
                  className="flex flex-col gap-5 rounded-[24px] border border-border bg-bg-secondary p-4 sm:flex-row sm:gap-6 sm:p-5"
                >
                  {/* Portrait — taller than the text block, and still stretches if the copy grows */}
                  {avatar ? (
                    <div className="relative min-h-[260px] w-full shrink-0 overflow-hidden rounded-[20px] max-sm:max-w-[250px] max-sm:mx-auto sm:min-h-[280px] sm:w-[180px] lg:min-h-[300px] lg:w-[200px]">
                      <Image
                        src={avatar}
                        alt={founder.name}
                        fill
                        sizes="(min-width: 1024px) 200px, (min-width: 640px) 180px, 100vw"
                        className="object-cover object-top"
                      />
                    </div>
                  ) : (
                    <div className="flex min-h-[260px] w-full shrink-0 items-center justify-center rounded-[20px] bg-[#0E1B33] font-sans text-2xl font-semibold text-secondary sm:min-h-[280px] sm:w-[180px] lg:min-h-[300px] lg:w-[200px]">
                      {getInitials(founder.name)}
                    </div>
                  )}

                  <div className="flex flex-col gap-3 sm:justify-center sm:gap-4 max-sm:text-center">
                    <div className="flex flex-col gap-1">
                      <h3 className="heading-3 font-medium text-text-primary">{founder.name}</h3>
                      <span className="body-sm text-primary">{founder.position}</span>
                    </div>

                    <p className="body-sm text-text-secondary">{founder.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Footer note — rich text with a gold left accent */}
          <div
            className="body-sm lg:max-w-[760px] border-l-4 border-secondary bg-bg-secondary p-6 text-text-secondary [&_p]:m-0 [&_strong]:font-bold [&_strong]:text-text-primary"
            dangerouslySetInnerHTML={{ __html: footerNote }}
          />
        </Row>
      </Section>
    </ScrollAnimationWrapper>
  )
}

export default FoundersSection

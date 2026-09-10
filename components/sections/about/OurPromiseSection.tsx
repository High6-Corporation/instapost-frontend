import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import ScrollAnimationWrapper from '@/components/global/ScrollAnimationWrapper'
import type { AboutOurPromiseSection } from '@/lib/about'

// Fallback content (mirrors the reference copy) — used only until the CMS fields are filled.
const FALLBACK_PREHEADER_LEFT = 'Our Promise, In Writing'
const FALLBACK_PREHEADER_RIGHT = 'Signed Before We Sign You'
const FALLBACK_PROMISES = [
  'We put the target in writing before we spend a peso of your budget.',
  'We show you the numbers weekly — the wins and the misses.',
  'We never report vanity metrics as results.',
  'We keep every result on file — because the next client deserves proof, not promises.',
]
const FALLBACK_SIGNATURES = [
  { name: 'Jelyn Patricio', position: 'Founder & President' },
  { name: 'Julius Patricio', position: 'Co-Founder & Creative Director' },
]

interface OurPromiseSectionProps {
  data?: AboutOurPromiseSection | null
}

// Reuse the Services/CTA "red + halftone dots" treatment (cta-background.png over brand red).
const DOT_PATTERN = '/images/cta-background.png'

export function OurPromiseSection({ data }: OurPromiseSectionProps) {
  const preHeaderLeft = data?.preHeaderLeft || FALLBACK_PREHEADER_LEFT
  const preHeaderRight = data?.preHeaderRight || FALLBACK_PREHEADER_RIGHT

  // Real numbering (1. 2. 3. …), same approach as the homepage HowWeWorkSection.
  const promises =
    data?.promiseList && data.promiseList.length > 0
      ? data.promiseList.map((item) => item.itemText)
      : FALLBACK_PROMISES

  const signatures =
    data?.signatureList && data.signatureList.length > 0
      ? data.signatureList
      : FALLBACK_SIGNATURES

  return (
    <ScrollAnimationWrapper>
      <Section className="bg-primary relative overflow-hidden py-[60px] md:py-[80px] lg:py-[100px]">
        {/* Halftone dot overlay (same asset as the Services red sections) */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url("${DOT_PATTERN}")`,
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            opacity: 0.2,
          }}
        />
        <Row className="relative z-10 !max-w-[1000px] flex flex-col text-neutral-0">
          {/* Top label row */}
          <div className="flex flex-col gap-2 min-[425px]:flex-row items-center min-[425px]:justify-between">
            <span className="caption uppercase tracking-[2px] text-neutral-0">{preHeaderLeft}</span>
            <span className="caption uppercase tracking-[2px] text-neutral-0/70">{preHeaderRight}</span>
          </div>
          <div className="mt-6 border-t border-white/20" />

          {/* Numbered promise list */}
          <div className="flex flex-col">
            {promises.map((text, index) => (
              <div key={index}>
                <div className="flex flex-row items-start gap-4 py-[20px] md:gap-6 md:py-[26px]">
                  <span className="heading-3 font-bold text-neutral-0 shrink-0">{index + 1}.</span>
                  <p className="heading-3 font-normal leading-snug text-neutral-0">{text}</p>
                </div>
                {index < promises.length - 1 && <div className="border-t border-white/20" />}
              </div>
            ))}
          </div>

          <div className="my-6 border-t border-white/20 md:my-8" />

          {/* Signatures */}
          <div className="flex flex-wrap gap-x-[60px] gap-y-6">
            {signatures.map((sig, index) => (
              <div key={index} className="flex flex-col gap-1">
                <span className="heading-3 italic text-neutral-0">{sig.name}</span>
                <span className="caption uppercase tracking-[1px] text-neutral-0/70">{sig.position}</span>
              </div>
            ))}
          </div>
        </Row>
      </Section>
    </ScrollAnimationWrapper>
  )
}

export default OurPromiseSection

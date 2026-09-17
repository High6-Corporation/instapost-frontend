import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import ScrollAnimationWrapper from '@/components/global/ScrollAnimationWrapper'

// Fallback content — mirrors the reference mockup copy, used until the CMS fields are wired.
const FALLBACK_PREHEADER = 'How the engine runs — tap any stage'

interface EngineStage {
  title: string
  description: string
}

const FALLBACK_STAGES: EngineStage[] = [
  { title: 'Strategy & Content', description: 'The daily presence, run against a plan' },
  { title: 'Creative Production', description: 'The assets that stop the scroll' },
  { title: 'KOL & Creators', description: 'Trusted voices, content you keep' },
  { title: 'Paid Social', description: 'The engine that scales the winners' },
  { title: 'Measurement', description: 'Receipts, weekly' },
]

// bottomNote supports inline HTML; <strong> renders semibold (same pattern as HowWeWorkSection).
const FALLBACK_BOTTOM_NOTE =
  'Every result is filed to the <strong>ROAS Archive</strong> — so the next campaign starts smarter than the last. That\'s the loop competitors can\'t copy.'

interface HowTheEngineSectionProps {
  data?: {
    preHeader?: string | null
    stageList?: EngineStage[] | null
    bottomNote?: string | null
  } | null
}

export function HowTheEngineSection({ data }: HowTheEngineSectionProps) {
  const preHeader = data?.preHeader || FALLBACK_PREHEADER
  const stages = data?.stageList && data.stageList.length > 0 ? data.stageList : FALLBACK_STAGES
  const bottomNote = data?.bottomNote || FALLBACK_BOTTOM_NOTE

  return (
    <ScrollAnimationWrapper>
      <Section className="bg-bg-primary py-[40px] md:py-[60px] lg:py-[80px]">
        <Row className="!max-w-[1270px]">
          {/* Outer bordered frame (matches the mockup's boxed layout) */}
          <div className="rounded-2xl border border-border p-6 md:p-10">
            {/* Eyebrow */}
            <p className="heading-4 font-bold max-md:text-center tracking-[2px] text-primary uppercase">{preHeader}</p>
            <div className="mt-5 border-t border-border" />

            {/* Stage cards */}
            <div className="mt-6 flex flex-col gap-4 xl:flex-row xl:items-stretch">
              {stages.map((stage, index) => (
                <div key={index} className="contents">
                  <div className="flex flex-1 flex-col gap-2 rounded-xl border border-border p-5">
                    <span className="heading-3 font-bold text-primary">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="heading-4 font-semibold text-text-primary">{stage.title}</h3>
                    <span className="body-sm text-text-secondary">{stage.description}</span>
                  </div>

                  {/* Arrow between stages — desktop only */}
                  {index < stages.length - 1 && (
                    <div className="hidden shrink-0 items-center xl:flex">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                        className="text-text-secondary"
                      >
                        <path
                          d="M4 12h15m0 0-6-6m6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-border" />

            {/* Bottom note with loop icon */}
            <div className="mt-6 flex items-start gap-3">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                className="mt-0.5 shrink-0 text-primary"
              >
                <path
                  d="M3 12a9 9 0 1 0 3-6.7L3 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M3 3v5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {/* div (not p) because the WYSIWYG footer_text can arrive wrapped in
                  <p> tags, which cannot nest inside a <p>. */}
              <div
                className="body-sm text-text-primary [&_p]:m-0 [&_p]:inline [&_strong]:font-semibold"
                dangerouslySetInnerHTML={{ __html: bottomNote }}
              />
            </div>
          </div>
        </Row>
      </Section>
    </ScrollAnimationWrapper>
  )
}

export default HowTheEngineSection

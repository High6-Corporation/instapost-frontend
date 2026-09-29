'use client'

import { useState } from 'react'
import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import Link from 'next/link'
import type { ToolFaqContent } from '@/lib/tools'

// Fallback content — used until the CMS fields are filled. A section must never render empty.
const FALLBACK_PREHEADER = 'Common questions'
const FALLBACK_HEADING = 'Frequently asked questions'

interface ToolFaqSectionProps {
  data?: ToolFaqContent | null
  /** Per-tool questions, since one route cannot pass distinct CMS fields for each tool yet. */
  items?: { question: string; answer: string }[]
}

/** Accordion FAQ, mirroring the reference tool pages' closing question band. */
function ToolFaqSection({ data, items }: ToolFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const preHeader = data?.preHeader || FALLBACK_PREHEADER
  const heading = data?.heading || FALLBACK_HEADING
  const faqItems = items ?? data?.items ?? []

  if (faqItems.length === 0) return null

  return (
    <Section className="bg-white py-[60px] md:py-[80px] lg:py-[100px]">
      <Row className="flex flex-col items-start gap-8">
        <div className="flex flex-col gap-3">
          <p className="caption font-semibold uppercase tracking-[2px] text-primary">{preHeader}</p>
          <h2 className="heading-3 font-medium text-text-primary">{heading}</h2>
        </div>

        <div className="flex w-full flex-col divide-y divide-neutral-500 border-y border-neutral-500">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div key={item.question}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="label-md font-semibold text-text-primary">{item.question}</span>
                  <span
                    aria-hidden="true"
                    className={`shrink-0 text-primary transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                      <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <p className="body-md max-w-[820px] pb-5 leading-relaxed text-text-secondary">
                    {item.answer}
                  </p>
                )}
              </div>
            )
          })}
        </div>

        <p className="body-md text-text-secondary">
          Have a question not answered here?{' '}
          <Link href="/contact" className="label-md font-semibold text-primary hover:text-primary-hover">
            Talk to our team — free consultation
          </Link>
        </p>
      </Row>
    </Section>
  )
}

export { ToolFaqSection }
export default ToolFaqSection

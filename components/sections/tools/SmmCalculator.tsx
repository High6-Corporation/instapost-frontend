'use client'

import { useState } from 'react'
import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { ToolOptionGroup, type ToolOption } from './ToolOptionGroup'
import {
  formatPeso,
  recommendSmmPackage,
  getSmmPackage,
  type SmmAnswerKey,
} from '@/lib/tools'

type SmmAnswers = Partial<Record<SmmAnswerKey, string>>

interface SmmStep {
  key: SmmAnswerKey
  question: string
  options: ToolOption[]
}

const SMM_STEPS: SmmStep[] = [
  {
    key: 'stage',
    question: 'What stage is your business at?',
    options: [
      { value: 'new', label: 'Just starting out', description: 'New brand, building our first audience' },
      { value: 'growing', label: 'Growing', description: 'Consistent customers, want more reach' },
      { value: 'established', label: 'Established', description: 'Well-known brand, pushing performance' },
    ],
  },
  {
    key: 'frequency',
    question: 'How often do you want to post?',
    options: [
      { value: 'few', label: 'A few posts a week', description: 'Stay visible with essential content' },
      { value: 'weekly', label: 'Every week, consistently', description: 'A full calendar of posts, carousels and stories' },
      { value: 'daily', label: 'Daily or more', description: 'High-volume content across formats' },
    ],
  },
  {
    key: 'shoot',
    question: 'Do you need professional photo/video content?',
    options: [
      { value: 'provide', label: 'I will provide my own materials' },
      { value: 'yes', label: 'Yes, shoot content for me', description: 'Studio shoot with edited photos and raw clips' },
    ],
  },
  {
    key: 'influencers',
    question: 'Do you want micro-influencer posts?',
    options: [
      { value: 'no', label: 'Not for now' },
      { value: 'yes', label: 'Yes', description: 'Influencers posting on FB/IG with usage rights' },
    ],
  },
  {
    key: 'adBudget',
    question: 'How much will you spend on ads each month?',
    options: [
      { value: 'none', label: 'No ads yet' },
      { value: 'tenK', label: 'Around ₱10,000' },
      { value: 'twentyK', label: 'Around ₱20,000' },
      { value: 'thirtyK', label: '₱30,000 or more' },
    ],
  },
]

/**
 * SMM pricing tool: a step wizard that scores the answers and recommends a
 * Launch / Momentum / Scale package. Scoring weights and package data live in
 * lib/tools.ts so the logic can be re-tuned (or CMS-wired) without touching
 * this component.
 */
export function SmmCalculator() {
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<SmmAnswers>({})

  const isResult = stepIndex >= SMM_STEPS.length
  const totalSteps = SMM_STEPS.length + 1 // + result step
  const currentStep = isResult ? SMM_STEPS.length : stepIndex
  const step = isResult ? null : SMM_STEPS[stepIndex]
  const selectedValue = step ? answers[step.key] : undefined

  const handleSelect = (key: SmmAnswerKey, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }

  const reset = () => {
    setAnswers({})
    setStepIndex(0)
  }

  const recommendation = isResult ? getSmmPackage(recommendSmmPackage(answers)) : null

  return (
    <Section className="bg-bg-secondary py-[60px] md:py-[80px]">
      <Row>
        <div className="mx-auto flex w-full max-w-[820px] flex-col gap-8 rounded-2xl bg-white p-6 shadow-[0px_0px_14px_rgba(0,0,0,0.10)] md:p-10">
          {/* Progress */}
          <div className="flex flex-col gap-2">
            <p className="caption uppercase tracking-[1px] text-text-secondary">
              Step {currentStep + 1} of {totalSteps}
            </p>
            <div className="h-1.5 w-full rounded-full bg-neutral-100">
              <div
                className="h-1.5 rounded-full bg-primary transition-all duration-300"
                style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {step && (
            <ToolOptionGroup
              question={step.question}
              options={step.options}
              value={selectedValue}
              onSelect={(value) => handleSelect(step.key, value)}
            />
          )}

          {isResult && recommendation && (
            <div className="flex flex-col items-start gap-5">
              <p className="caption uppercase tracking-[1px] text-primary">Your recommendation</p>
              <h3 className="heading-2 font-medium text-text-primary">
                {recommendation.name} Package
              </h3>
              <p className="body-md leading-relaxed text-text-secondary">{recommendation.tagline}</p>
              <ul className="flex flex-col gap-3">
                {recommendation.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span className="body-md leading-relaxed text-text-primary">{feature}</span>
                  </li>
                ))}
              </ul>
              <p className="caption leading-relaxed text-text-secondary">
                Includes ads management for a {formatPeso(recommendation.includedAdBudget)} monthly
                ad budget (ad spend is client-funded). Package pricing is confirmed in your
                strategy session.
              </p>
            </div>
          )}

          {/* Nav buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {isResult ? (
              <Button variant="secondary" showArrow={false} onClick={reset}>
                Start Over
              </Button>
            ) : (
              <Button
                variant="secondary"
                showArrow={false}
                onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
                disabled={stepIndex === 0}
                className={stepIndex === 0 ? 'pointer-events-none opacity-0' : ''}
              >
                Back
              </Button>
            )}

            {isResult ? (
              <Link href="/contact">
                <Button>Inquire Now</Button>
              </Link>
            ) : (
              <Button
                onClick={() => setStepIndex((i) => i + 1)}
                disabled={!selectedValue}
                className={!selectedValue ? 'pointer-events-none opacity-50' : ''}
              >
                {stepIndex === SMM_STEPS.length - 1 ? 'See My Match' : 'Next'}
              </Button>
            )}
          </div>
        </div>
      </Row>
    </Section>
  )
}

export default SmmCalculator

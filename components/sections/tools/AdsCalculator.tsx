'use client'

import { useState } from 'react'
import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import {
  ADS_FEE_TIERS,
  EXPECTED_ROAS,
  estimateAdsBudget,
  formatPeso,
  type AdsInputs,
} from '@/lib/tools'

interface AdsField {
  key: keyof AdsInputs
  label: string
  placeholder: string
  help: string
}

const ADS_FIELDS: AdsField[] = [
  {
    key: 'currentRevenue',
    label: 'Current monthly revenue',
    placeholder: 'e.g. 150000',
    help: 'Your average monthly sales across all channels.',
  },
  {
    key: 'growthTarget',
    label: 'Extra revenue you want each month',
    placeholder: 'e.g. 90000',
    help: 'The additional monthly sales you want ads to bring in.',
  },
  {
    key: 'avgOrderValue',
    label: 'Average order or deal value',
    placeholder: 'e.g. 1500',
    help: 'How much one customer typically spends with you.',
  },
]

const INITIAL_INPUTS: AdsInputs = { currentRevenue: 0, growthTarget: 0, avgOrderValue: 0 }

function parseAmount(raw: string): number {
  const parsed = Number(raw.replace(/[^0-9.]/g, ''))
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0
}

/**
 * Ads pricing tool: suggests a monthly ad budget from the growth target
 * (budget = extra revenue ÷ expected ROAS) and maps it to InstaPost's ads
 * management fee tiers. Formula constants live in lib/tools.ts.
 */
export function AdsCalculator() {
  const [inputs, setInputs] = useState<AdsInputs>(INITIAL_INPUTS)
  const [estimated, setEstimated] = useState(false)

  const growthTarget = parseAmount(String(inputs.growthTarget))
  const avgOrderValue = parseAmount(String(inputs.avgOrderValue))
  const canEstimate = growthTarget > 0 && avgOrderValue > 0
  const estimate = canEstimate ? estimateAdsBudget(inputs) : null

  const handleFieldChange = (key: keyof AdsInputs, raw: string) => {
    setInputs((prev) => ({ ...prev, [key]: parseAmount(raw) }))
    setEstimated(false)
  }

  return (
    <Section className="bg-bg-secondary py-[60px] md:py-[80px]">
      <Row>
        <div className="mx-auto flex w-full max-w-[820px] flex-col gap-8 rounded-2xl bg-white p-6 shadow-[0px_0px_14px_rgba(0,0,0,0.10)] md:p-10">
          <div className="flex flex-col gap-6">
            {ADS_FIELDS.map((field) => (
              <label key={field.key} className="flex flex-col gap-2">
                <span className="body-md font-semibold text-text-primary">{field.label}</span>
                <span className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 body-md text-text-secondary">
                    ₱
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={inputs[field.key] || ''}
                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-9 pr-4 body-md text-text-primary placeholder:text-neutral-500 focus:border-primary focus:outline-none"
                  />
                </span>
                <span className="caption text-text-secondary">{field.help}</span>
              </label>
            ))}
          </div>

          <Button
            onClick={() => setEstimated(true)}
            disabled={!canEstimate}
            className={!canEstimate ? 'pointer-events-none opacity-50' : ''}
          >
            Calculate My Ad Budget
          </Button>

          {estimated && estimate && (
            <div className="flex flex-col items-start gap-5 rounded-2xl bg-bg-secondary p-6 md:p-8">
              <p className="caption uppercase tracking-[1px] text-primary">Your estimate</p>
              <h3 className="heading-3 font-medium text-text-primary">
                {formatPeso(estimate.suggestedBudget)}
                {estimate.suggestedBudgetMax > estimate.suggestedBudget && (
                  <> – {formatPeso(estimate.suggestedBudgetMax)}</>
                )}{' '}
                per month in ad spend
              </h3>
              <p className="body-md leading-relaxed text-text-secondary">
                To add about {formatPeso(inputs.growthTarget)} in monthly revenue at a conservative{' '}
                {EXPECTED_ROAS}x return on ad spend, plan a monthly ad budget of{' '}
                {formatPeso(estimate.suggestedBudget)}
                {estimate.suggestedBudgetMax > estimate.suggestedBudget
                  ? ` to ${formatPeso(estimate.suggestedBudgetMax)}`
                  : ''}
                . That is roughly {estimate.estimatedExtraOrders.toLocaleString('en-PH')} extra
                orders a month at your average order value.
              </p>

              <div className="flex w-full flex-col gap-3">
                <p className="label-md font-semibold uppercase tracking-[1px] text-text-primary">
                  InstaPost ads management fee
                </p>
                {estimate.tier ? (
                  <p className="body-md leading-relaxed text-text-secondary">
                    {formatPeso(estimate.tier.managementFee)} per month to manage your{' '}
                    {formatPeso(estimate.tier.adBudget)} ad budget — includes optimizations,
                    targeting protocol, pixel integration support and monthly reporting. Ad spend
                    itself is client-funded.
                  </p>
                ) : (
                  <p className="body-md leading-relaxed text-text-secondary">
                    Your suggested budget is beyond our standard tiers ({ADS_FEE_TIERS.map((t) => formatPeso(t.adBudget)).join(', ')}),
                    so management is quoted custom — tell us your budget in your inquiry and
                    we will match it.
                  </p>
                )}
              </div>

              <p className="caption leading-relaxed text-text-secondary">
                Estimates assume a {EXPECTED_ROAS}x ROAS typical of Philippine Meta and Google
                campaigns and are not a guarantee of results.
              </p>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4">
            <Button
              variant="secondary"
              showArrow={false}
              onClick={() => {
                setInputs(INITIAL_INPUTS)
                setEstimated(false)
              }}
            >
              Reset
            </Button>
            <Link href="/contact">
              <Button>Inquire Now</Button>
            </Link>
          </div>
        </div>
      </Row>
    </Section>
  )
}

export default AdsCalculator

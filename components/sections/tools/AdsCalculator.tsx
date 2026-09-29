'use client'

import { useState } from 'react'
import { CalculatorShell } from './CalculatorShell'
import { SliderControl } from './SliderControl'
import { SelectControl } from './SelectControl'
import { ToolResultCard, type ResultTile } from './ToolResultCard'
import {
  ADS_DEFAULT_INPUTS,
  ADS_SLIDER_RANGE,
  INDUSTRIES,
  PLATFORM_MIXES,
  estimateAdsBudget,
  formatPeso,
  type AdsInputs,
} from '@/lib/tools'
import type { ToolSidebarContent } from '@/lib/tools'

const INDUSTRY_OPTIONS = INDUSTRIES.map((industry) => ({
  value: industry.value,
  label: industry.label,
}))

const PLATFORM_OPTIONS = PLATFORM_MIXES.map((platform) => ({
  value: platform.value,
  label: platform.label,
}))

const percent = (value: number) => `${value}%`

interface AdsCalculatorProps {
  data?: ToolSidebarContent | null
}

/**
 * Ads budget tool rebuilt on the reference tool's interaction: three sliders and
 * two dropdowns that recompute a cost-per-lead estimate on every change, shown
 * live in the dark estimate panel. All rates and the InstaPost management tier
 * mapping live in lib/tools.ts so the client can retune them without touching
 * this component.
 */
export function AdsCalculator({ data }: AdsCalculatorProps) {
  const [inputs, setInputs] = useState<AdsInputs>(ADS_DEFAULT_INPUTS)

  const setField = <K extends keyof AdsInputs>(key: K, value: AdsInputs[K]) =>
    setInputs((prev) => ({ ...prev, [key]: value }))

  const estimate = estimateAdsBudget(inputs)

  const tiles: ResultTile[] = [
    {
      value: estimate.leadsNeeded.toLocaleString('en-PH'),
      label: 'Leads needed / month',
      detail: `at ${inputs.closeRate}% close rate`,
    },
    {
      value: formatPeso(estimate.minAdSpend),
      label: 'Min ad spend',
      detail: 'conservative',
    },
    {
      value: formatPeso(estimate.maxAdSpend),
      label: 'Max ad spend',
      detail: 'aggressive',
    },
    {
      value: `${estimate.roas.toFixed(1)}x`,
      label: 'Est. ROAS',
      detail: 'return on ad spend',
    },
  ]

  const feeNote = estimate.tier
    ? `InstaPost ads management for a ${formatPeso(estimate.tier.adBudget)} monthly budget is ${formatPeso(estimate.tier.managementFee)} per month, billed separately from ad spend.`
    : 'Your suggested budget is beyond our published tiers (₱10,000 / ₱20,000 / ₱30,000), so ads management is quoted custom — tell us your budget when you inquire.'

  const footnote = `Estimated cost per lead for this industry: ${formatPeso(estimate.cpl)}. ${feeNote} The ROAS figure is deliberately conservative — it prices every lead at the full benchmark cost per lead, before any optimisation brings it down.`

  return (
    <CalculatorShell
      data={data}
      currentToolHref="/tools/ads-pricing"
      aboutBody="This calculator back-calculates your required ad budget from real Metro Manila cost-per-lead benchmarks across six industries. Enter the revenue you want, how much a customer spends, and how often you close leads — the tool returns the lead volume, spend range and return on ad spend behind that target, plus the InstaPost management tier that covers it."
    >
      <div className="flex flex-col gap-2">
        <p className="caption font-semibold uppercase tracking-[2px] text-primary">
          Adjust the inputs — results update instantly
        </p>
        <h2 className="heading-3 font-medium text-text-primary">Plan your monthly ad budget</h2>
      </div>

      <SliderControl
        label="Monthly revenue target"
        value={inputs.revenueTarget}
        min={ADS_SLIDER_RANGE.revenueTarget.min}
        max={ADS_SLIDER_RANGE.revenueTarget.max}
        step={ADS_SLIDER_RANGE.revenueTarget.step}
        onChange={(value) => setField('revenueTarget', value)}
      />

      <SliderControl
        label="Average order / deal value"
        value={inputs.avgOrderValue}
        min={ADS_SLIDER_RANGE.avgOrderValue.min}
        max={ADS_SLIDER_RANGE.avgOrderValue.max}
        step={ADS_SLIDER_RANGE.avgOrderValue.step}
        onChange={(value) => setField('avgOrderValue', value)}
      />

      <SliderControl
        label="Lead-to-client close rate"
        value={inputs.closeRate}
        min={ADS_SLIDER_RANGE.closeRate.min}
        max={ADS_SLIDER_RANGE.closeRate.max}
        step={ADS_SLIDER_RANGE.closeRate.step}
        format={percent}
        onChange={(value) => setField('closeRate', value)}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <SelectControl
          label="Industry"
          value={inputs.industry}
          options={INDUSTRY_OPTIONS}
          onChange={(value) => setField('industry', value)}
        />
        <SelectControl
          label="Ad platform mix"
          value={inputs.platformMix}
          options={PLATFORM_OPTIONS}
          onChange={(value) => setField('platformMix', value)}
        />
      </div>

      <ToolResultCard tiles={tiles} footnote={footnote} />

      <button
        type="button"
        onClick={() => setInputs(ADS_DEFAULT_INPUTS)}
        className="self-start caption font-semibold uppercase tracking-[1px] text-text-secondary underline transition-colors duration-200 hover:text-primary"
      >
        Reset to defaults
      </button>
    </CalculatorShell>
  )
}

export default AdsCalculator

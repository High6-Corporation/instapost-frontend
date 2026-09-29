'use client'

import { useState } from 'react'
import { CalculatorShell } from './CalculatorShell'
import { SliderControl } from './SliderControl'
import { SelectControl } from './SelectControl'
import { CheckboxGroup } from './CheckboxGroup'
import { ToolResultCard, type ResultTile } from './ToolResultCard'
import {
  SMM_ADD_ONS,
  SMM_DEFAULT_INPUTS,
  SMM_SLIDER_RANGE,
  SMM_TIERS,
  estimateSmmPricing,
  formatCountCompact,
  formatPeso,
  type SmmAddOnKey,
  type SmmInputs,
} from '@/lib/tools'
import type { ToolSidebarContent } from '@/lib/tools'

const TIER_OPTIONS = SMM_TIERS.map((tier) => ({ value: tier.value, label: tier.label }))

const count = (value: number) => String(value)

interface SmmCalculatorProps {
  data?: ToolSidebarContent | null
}

/**
 * Social media pricing tool rebuilt on the reference tool's interaction: one
 * screen of sliders, a tier dropdown and stackable add-on checkboxes that
 * recompute the monthly fee live. Base rates, per-unit rates and add-on prices
 * are isolated in lib/tools.ts.
 */
export function SmmCalculator({ data }: SmmCalculatorProps) {
  const [inputs, setInputs] = useState<SmmInputs>(SMM_DEFAULT_INPUTS)

  const setField = <K extends keyof SmmInputs>(key: K, value: SmmInputs[K]) =>
    setInputs((prev) => ({ ...prev, [key]: value }))

  const toggleAddOn = (value: string, checked: boolean) => {
    const key = value as SmmAddOnKey
    setInputs((prev) => ({
      ...prev,
      addOns: checked ? [...prev.addOns, key] : prev.addOns.filter((item) => item !== key),
    }))
  }

  const estimate = estimateSmmPricing(inputs)
  const hasAds = inputs.addOns.includes('ads')

  const tiles: ResultTile[] = [
    {
      value: formatPeso(estimate.managementFee),
      label: 'Management fee',
      detail: 'per month',
    },
    {
      value: formatPeso(estimate.totalMonthly),
      label: 'Total monthly investment',
      detail: hasAds ? 'including ad spend' : 'management only',
    },
    {
      value: formatCountCompact(estimate.monthlyReach),
      label: 'Est. monthly reach',
      detail: hasAds ? 'organic + paid' : 'organic',
    },
    {
      value: String(estimate.contentPieces),
      label: 'Content pieces / month',
      detail: `across ${inputs.platforms} platform${inputs.platforms > 1 ? 's' : ''}`,
    },
  ]

  const adsNote = hasAds
    ? `Ads management is included for up to a ${formatPeso(estimate.pkg.includedAdBudget)} monthly ad budget in the ${estimate.pkg.name} package; beyond that it is added at 15% of ad spend. Ad spend itself is client-funded.`
    : `The ${estimate.pkg.name} package already covers ads management up to a ${formatPeso(estimate.pkg.includedAdBudget)} monthly ad budget — tick the ads add-on to price it in. Ad spend itself is client-funded.`

  const footnote = `Closest published package: ${estimate.pkg.name} — ${estimate.pkg.tagline}. ${adsNote} Final pricing is confirmed in your strategy session.`

  return (
    <CalculatorShell
      data={data}
      currentToolHref="/tools/smm-pricing"
      aboutBody="This calculator builds your monthly social media management fee the way we scope it: a package base rate, plus a rate per platform and per weekly post, plus whichever add-ons you actually need. Move the sliders and tick the add-ons — the estimate updates as you go, so you can see exactly what each extra costs before you talk to us."
    >
      <div className="flex flex-col gap-2">
        <p className="caption font-semibold uppercase tracking-[2px] text-primary">
          Adjust the inputs — results update instantly
        </p>
        <h2 className="heading-3 font-medium text-text-primary">Build your content package</h2>
      </div>

      <SelectControl
        label="Management tier"
        value={inputs.tier}
        options={TIER_OPTIONS}
        onChange={(value) => setField('tier', value)}
      />
      <p className="-mt-4 caption leading-relaxed text-text-secondary">
        {estimate.tier.description}
      </p>

      <SliderControl
        label="Number of platforms"
        value={inputs.platforms}
        min={SMM_SLIDER_RANGE.platforms.min}
        max={SMM_SLIDER_RANGE.platforms.max}
        step={SMM_SLIDER_RANGE.platforms.step}
        format={count}
        onChange={(value) => setField('platforms', value)}
      />

      <SliderControl
        label="Posts per week"
        value={inputs.postsPerWeek}
        min={SMM_SLIDER_RANGE.postsPerWeek.min}
        max={SMM_SLIDER_RANGE.postsPerWeek.max}
        step={SMM_SLIDER_RANGE.postsPerWeek.step}
        format={count}
        onChange={(value) => setField('postsPerWeek', value)}
      />

      <CheckboxGroup
        label="Add-on services"
        options={SMM_ADD_ONS}
        values={inputs.addOns}
        onToggle={toggleAddOn}
      />

      {hasAds && (
        <SliderControl
          label="Monthly ad budget"
          value={inputs.adBudget}
          min={SMM_SLIDER_RANGE.adBudget.min}
          max={SMM_SLIDER_RANGE.adBudget.max}
          step={SMM_SLIDER_RANGE.adBudget.step}
          onChange={(value) => setField('adBudget', value)}
        />
      )}

      <ToolResultCard tiles={tiles} footnote={footnote} />

      <button
        type="button"
        onClick={() => setInputs(SMM_DEFAULT_INPUTS)}
        className="self-start caption font-semibold uppercase tracking-[1px] text-text-secondary underline transition-colors duration-200 hover:text-primary"
      >
        Reset to defaults
      </button>
    </CalculatorShell>
  )
}

export default SmmCalculator

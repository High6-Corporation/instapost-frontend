'use client'

import { formatPeso } from '@/lib/tools'

export interface SliderControlProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
  /** How the live value badge and the min/max captions render the number. */
  format?: (value: number) => string
}

/**
 * Reference-style slider row: label with a live value badge on the right,
 * full-width range input, min/max captions underneath. Results recompute on
 * every `input` event, so there is no commit step.
 */
export function SliderControl({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format = formatPeso,
}: SliderControlProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <span className="label-md font-semibold text-text-primary">{label}</span>
        <span className="shrink-0 rounded-lg bg-bg-secondary px-3 py-1 label-md font-semibold text-primary">
          {format(value)}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={label}
        className="h-2 w-full cursor-pointer rounded-full accent-brand"
      />

      <div className="flex items-center justify-between">
        <span className="caption text-text-secondary">{format(min)}</span>
        <span className="caption text-text-secondary">{format(max)}</span>
      </div>
    </div>
  )
}

export default SliderControl

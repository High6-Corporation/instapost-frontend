'use client'

export interface CheckboxOption {
  value: string
  label: string
  description?: string
}

interface CheckboxGroupProps {
  label: string
  options: CheckboxOption[]
  values: string[]
  onToggle: (value: string, checked: boolean) => void
}

/**
 * Add-on picker matching the reference tool: a grouped checkbox list rather
 * than toggles, so multiple services can stack onto the same estimate.
 */
export function CheckboxGroup({ label, options, values, onToggle }: CheckboxGroupProps) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="caption font-semibold uppercase tracking-[2px] text-text-secondary">
        {label}
      </legend>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const checked = values.includes(option.value)
          return (
            <label
              key={option.value}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors duration-200 ${
                checked ? 'border-primary bg-bg-secondary' : 'border-neutral-500 bg-white hover:border-primary'
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={(event) => onToggle(option.value, event.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-brand"
              />
              <span className="flex flex-col gap-1">
                <span className="label-md font-semibold text-text-primary">{option.label}</span>
                {option.description && (
                  <span className="caption leading-relaxed text-text-secondary">
                    {option.description}
                  </span>
                )}
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export default CheckboxGroup

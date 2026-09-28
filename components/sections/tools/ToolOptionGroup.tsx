'use client'

export interface ToolOption {
  value: string
  label: string
  description?: string
}

interface ToolOptionGroupProps {
  question: string
  options: ToolOption[]
  value: string | undefined
  onSelect: (value: string) => void
}

/**
 * One wizard question inside the pricing tools: a prompt plus a grid of
 * selectable option cards. Purely presentational — step state lives in the
 * calculator that renders it.
 */
export function ToolOptionGroup({ question, options, value, onSelect }: ToolOptionGroupProps) {
  return (
    <fieldset className="flex flex-col gap-4">
      <legend className="heading-4 font-medium text-text-primary">{question}</legend>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {options.map((option) => {
          const isSelected = value === option.value
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(option.value)}
              className={`flex flex-col items-start gap-1 rounded-xl border p-5 text-left transition-colors duration-200 ${
                isSelected
                  ? 'border-primary bg-neutral-100 shadow-[0px_0px_7px_rgba(0,0,0,0.10)]'
                  : 'border-neutral-200 bg-white hover:border-secondary'
              }`}
            >
              <span
                className={`body-md font-semibold ${
                  isSelected ? 'text-primary' : 'text-text-primary'
                }`}
              >
                {option.label}
              </span>
              {option.description && (
                <span className="caption leading-relaxed text-text-secondary">
                  {option.description}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

export default ToolOptionGroup

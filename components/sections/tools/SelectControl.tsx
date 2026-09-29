'use client'

export interface SelectOption {
  value: string
  label: string
}

interface SelectControlProps {
  label: string
  value: string
  options: SelectOption[]
  onChange: (value: string) => void
  className?: string
}

/** Dropdown styled to match the slider controls; used for industry / platform mix / tier. */
export function SelectControl({ label, value, options, onChange, className = '' }: SelectControlProps) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="label-md font-semibold text-text-primary">{label}</span>
      <span className="relative block">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-xl border border-neutral-500 bg-white px-4 py-3 pr-11 body-md text-text-primary focus:border-border-focus focus:outline-none"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
        >
          <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </label>
  )
}

export default SelectControl

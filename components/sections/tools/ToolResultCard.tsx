export interface ResultTile {
  value: string
  label: string
  detail?: string
}

interface ToolResultCardProps {
  heading?: string
  tiles: ResultTile[]
  /** Small print under the tiles, e.g. the CPL + management fee note. */
  footnote?: string
}

/**
 * Dark "Your Estimate" panel from the reference tool: a 2x2 grid of live
 * numbers rendered straight from component state, so results move with every
 * slider drag instead of waiting for a submit click.
 */
export function ToolResultCard({ heading = 'Your Estimate', tiles, footnote }: ToolResultCardProps) {
  return (
    <div className="mt-2 flex flex-col gap-5 rounded-2xl bg-neutral-900 p-6 md:p-8">
      <div className="flex items-center gap-3">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5 text-secondary"
        >
          <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" strokeLinecap="round" />
        </svg>
        <h3 className="label-md font-semibold uppercase tracking-[2px] text-neutral-0">{heading}</h3>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {tiles.map((tile) => (
          <div
            key={tile.label}
            className="flex flex-col items-center gap-1 rounded-xl border border-neutral-500 bg-neutral-900 p-4 text-center"
          >
            <span className="heading-4 font-semibold text-secondary">{tile.value}</span>
            <span className="label-md text-neutral-0">{tile.label}</span>
            {tile.detail && (
              <span className="caption text-neutral-0 opacity-70">{tile.detail}</span>
            )}
          </div>
        ))}
      </div>

      {footnote && (
        <p className="caption leading-relaxed text-neutral-0 opacity-60">{footnote}</p>
      )}
    </div>
  )
}

export default ToolResultCard

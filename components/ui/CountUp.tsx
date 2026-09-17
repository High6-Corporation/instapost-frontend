'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

interface CountUpProps {
  /** The display string, e.g. "39.20×", "+36%", "30,000", "+₱600K", "100+". */
  value: string
  /** Animation length in ms. */
  duration?: number
  className?: string
}

interface Parsed {
  prefix: string
  suffix: string
  target: number
  decimals: number
  grouped: boolean
}

/**
 * Split an arbitrary metric string into prefix / numeric core / suffix so the
 * number can animate while the decoration stays put. Works with CMS-driven
 * values since it parses at render time — no per-value config needed.
 * Returns null when there is no numeric core (e.g. "ROAS"), in which case the
 * component renders the raw string with no animation.
 */
function parseMetric(raw: string): Parsed | null {
  const match = raw.match(/^(\D*)(\d[\d,]*(?:\.\d+)?)(.*)$/)
  if (!match) return null
  const [, prefix, digits, suffix] = match
  const target = parseFloat(digits.replace(/,/g, ''))
  if (!Number.isFinite(target)) return null
  const dot = digits.indexOf('.')
  return {
    prefix,
    suffix,
    target,
    decimals: dot >= 0 ? digits.length - dot - 1 : 0,
    grouped: digits.includes(','),
  }
}

function formatMetric(p: Parsed, current: number): string {
  let text = current.toFixed(p.decimals)
  if (p.grouped) {
    const [int, frac] = text.split('.')
    text = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (frac ? `.${frac}` : '')
  }
  return `${p.prefix}${text}${p.suffix}`
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * Counts from 0 up to the value once the element scrolls into view (fires
 * once per value). Server-rendered markup always contains the final text, so
 * SEO/no-JS users see the real number and there is no hydration mismatch.
 */
export function CountUp({ value, duration = 1200, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const parsed = useMemo(() => parseMetric(value), [value])
  // null display → render the raw source string (initial SSR state and after
  // the animation completes).
  const [display, setDisplay] = useState<string | null>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!parsed || !el) return

    // Restart cleanly if the value changes (e.g. fresh CMS data).
    startedRef.current = false

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const runAnimation = () => {
      if (startedRef.current) return
      startedRef.current = true
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1)
        setDisplay(formatMetric(parsed, parsed.target * easeOutCubic(t)))
        if (t < 1) {
          requestAnimationFrame(tick)
        } else {
          // Snap back to the exact source string (guards rounding drift).
          setDisplay(null)
        }
      }
      requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runAnimation()
          } else if (!startedRef.current) {
            // Off-screen: show the starting frame so the number never
            // "snaps" from the final value mid-scroll.
            setDisplay(formatMetric(parsed, 0))
          }
        })
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [parsed, duration])

  if (!parsed) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    )
  }

  return (
    <span ref={ref} className={className}>
      {display ?? value}
    </span>
  )
}

export default CountUp

'use client'

import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import { ToolSidebar } from './ToolSidebar'
import type { ToolSidebarContent } from '@/lib/tools'

interface CalculatorShellProps {
  children: React.ReactNode
  data?: ToolSidebarContent | null
  currentToolHref: string
  aboutBody?: string
  quoteBody?: string
}

/**
 * Reference calculator layout: a 60/40 split with the live form card on the
 * left (controls stacked directly above the dark estimate panel) and the
 * explainer / inquiry / cross-link column on the right.
 */
export function CalculatorShell({
  children,
  data,
  currentToolHref,
  aboutBody,
  quoteBody,
}: CalculatorShellProps) {
  return (
    <Section className="bg-bg-secondary py-[60px] md:py-[80px]">
      <Row className="flex flex-col gap-8 lg:grid lg:grid-cols-5 lg:items-start">
        <div className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-[0px_0px_14px_rgba(0,0,0,0.10)] md:p-8 lg:col-span-3">
          {children}
        </div>

        <div className="lg:col-span-2">
          <ToolSidebar
            data={data}
            currentToolHref={currentToolHref}
            aboutBody={aboutBody}
            quoteBody={quoteBody}
          />
        </div>
      </Row>
    </Section>
  )
}

export default CalculatorShell

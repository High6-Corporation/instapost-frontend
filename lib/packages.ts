import { wpGraphQLPersistedQuery } from '@/lib/wp-graphql'

// ── Persisted Query ID ───────────────────────────────────────────────────────

// Same saved `GetAllClientsData` query the homepage ROAS Archive uses, so the
// Packages tape shows exactly the client posts the homepage shows. Re-tagged
// 'clients' — revalidating that tag refreshes both pages.
const CLIENTS_QUERY_ID =
  '15529439a63f75d6da84def5dc65e1143b41386acb0f63b27e12886b8b4dd055'

// ── Raw CMS shape ────────────────────────────────────────────────────────────

interface CmsClientNode {
  title: string
  dynamicContentForClient: {
    metricValue: string | null
    metricLabel: string | null
  } | null
}

interface CmsClientsResponse {
  clients: {
    nodes: CmsClientNode[]
  }
}

// ── View model ───────────────────────────────────────────────────────────────

export interface ClientStatChip {
  /** Headline number, e.g. "39.20×" — from the client post's metricValue. */
  value: string
  /** Brand name under the number, e.g. "ABS-CBN" — the client post title. */
  label: string
}

function hasText(v: string | null | undefined): v is string {
  return typeof v === 'string' && v.trim() !== ''
}

/**
 * Client posts that carry a metric, as tape chips.
 * Only the brand name and the number are shown — the client post has no
 * per-metric category field the tape could label, so metricLabel is ignored.
 * Returns null when nothing usable came back, so the section renders its
 * fallback chips instead.
 */
export async function getPackagesClientStats(): Promise<ClientStatChip[] | null> {
  try {
    const data = await wpGraphQLPersistedQuery<CmsClientsResponse>(
      CLIENTS_QUERY_ID,
      ['clients'],
    )

    const chips = (data.clients?.nodes ?? [])
      .filter((node) => hasText(node.title) && hasText(node.dynamicContentForClient?.metricValue))
      .map((node) => ({
        value: (node.dynamicContentForClient?.metricValue ?? '').trim(),
        label: node.title.trim(),
      }))

    return chips.length > 0 ? chips : null
  } catch (err) {
    console.error('[packages] Failed to load client stats:', err)
    return null
  }
}

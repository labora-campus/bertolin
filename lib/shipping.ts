import type { ShippingZone } from './supabase'

// Same matching rules as the SQL function shipping_cost_for():
// postal_codes entries are ranges ("1000-1499") or single values ("1650").
export function findShippingZone(zones: ShippingZone[], postalCode: string): ShippingZone | null {
  const digits = postalCode.replace(/\D/g, '')
  if (!digits) return null
  const cp = Number(digits)
  const matches = zones
    .filter((z) => z.is_active !== false)
    .filter((z) =>
      (z.postal_codes ?? []).some((entry) => {
        if (entry.includes('-')) {
          const [lo, hi] = entry.split('-').map(Number)
          return cp >= lo && cp <= hi
        }
        return entry.trim() !== '' && Number(entry) === cp
      })
    )
    .sort((a, b) => a.price - b.price)
  return matches[0] ?? null
}

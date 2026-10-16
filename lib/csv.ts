// Minimal CSV parser (RFC 4180 quotes, auto-detects , or ; separator)
export function parseCsv(text: string): Record<string, string>[] {
  const clean = text.replace(/^﻿/, '')
  const firstLine = clean.split(/\r?\n/, 1)[0] || ''
  const sep = (firstLine.match(/;/g)?.length ?? 0) > (firstLine.match(/,/g)?.length ?? 0) ? ';' : ','

  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let quoted = false
  for (let i = 0; i < clean.length; i++) {
    const c = clean[i]
    if (quoted) {
      if (c === '"' && clean[i + 1] === '"') { cell += '"'; i++ }
      else if (c === '"') quoted = false
      else cell += c
    } else if (c === '"') quoted = true
    else if (c === sep) { row.push(cell); cell = '' }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && clean[i + 1] === '\n') i++
      row.push(cell); cell = ''
      if (row.some((v) => v.trim())) rows.push(row)
      row = []
    } else cell += c
  }
  row.push(cell)
  if (row.some((v) => v.trim())) rows.push(row)

  const [header, ...body] = rows
  if (!header) return []
  const keys = header.map((h) => h.trim().toLowerCase())
  return body.map((r) => Object.fromEntries(keys.map((k, i) => [k, (r[i] ?? '').trim()])))
}

export const slugify = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

export function vttToPlainText(vtt: string): string {
  const lines = vtt.split(/\r?\n/)
  const out: string[] = []
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    if (trimmed === 'WEBVTT') continue
    if (trimmed.includes('-->')) continue
    if (/^\d+$/.test(trimmed)) continue
    out.push(trimmed)
  }
  return out.join('\n')
}


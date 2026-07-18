/**
 * The document importer stores `[Imported file.docx]` as a task's content when it
 * can't extract text from an uploaded file (and several such blocks, separated by
 * blank lines, for a multi-file import). That string is noise, not authored
 * content — hide it anywhere the real document / preview is already shown.
 *
 * Matches the whole (trimmed) string as one or more `[Imported …]` blocks, so
 * real authored content interleaved with such a block breaks the match and is
 * still shown.
 */
export function isImportPlaceholder(content: string | null | undefined): boolean {
  const s = (content ?? '').trim()
  return s.length > 0 && /^(\[Imported .+\]\s*)+$/.test(s)
}

/**
 * Placeholder convention: [LABEL: note] or [LABEL].
 * LABEL is upper-case and at least two characters (digits, spaces, / & ' . - allowed).
 * Lower-case brackets such as markdown links and single-letter index brackets are ignored. The same regex drives scripts/list-placeholders.mjs.
 */
export const PLACEHOLDER_RE = /\[([A-Z][A-Z0-9 /&'.\-]+?)(?::\s*([^\]]*))?\]/g;

export function escapeHtml(input: string): string {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

/** Escape text and wrap each placeholder in a highlighted <mark>. Safe for set:html. */
export function renderCopy(text: string, hint = 'Placeholder: to be supplied before launch'): string {
  const escaped = escapeHtml(text);
  return escaped.replace(PLACEHOLDER_RE, (match) => `<mark class="ph" title="${escapeHtml(hint)}">${match}</mark>`);
}

export function hasPlaceholder(text: string): boolean {
  PLACEHOLDER_RE.lastIndex = 0;
  return PLACEHOLDER_RE.test(text);
}

/** Return the plain text with placeholder notes stripped to their label, for meta tags. */
export function stripPlaceholderNotes(text: string): string {
  return text.replace(PLACEHOLDER_RE, (_m, label: string) => `[${label}]`);
}

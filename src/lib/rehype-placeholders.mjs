/**
 * Rehype plugin: wrap [LABEL: note] placeholders in markdown text nodes with
 * <mark class="ph">, matching renderCopy() for dictionary strings.
 * Hand-written walker to avoid an extra dependency.
 */
const PLACEHOLDER_RE = /\[([A-Z][A-Z0-9 /&'.\-]+?)(?::\s*([^\]]*))?\]/g;
const SKIP = new Set(['code', 'pre', 'script', 'style']);

export default function rehypePlaceholders() {
  return (tree) => visit(tree);
}

function visit(node, parent, index) {
  if (node.type === 'element' && SKIP.has(node.tagName)) return;
  if (node.type === 'text' && parent && typeof index === 'number') {
    const parts = split(node.value);
    if (parts) parent.children.splice(index, 1, ...parts);
    return;
  }
  if (Array.isArray(node.children)) {
    // iterate backwards so splices do not disturb indices
    for (let i = node.children.length - 1; i >= 0; i--) {
      visit(node.children[i], node, i);
    }
  }
}

function split(value) {
  PLACEHOLDER_RE.lastIndex = 0;
  if (!PLACEHOLDER_RE.test(value)) return null;
  PLACEHOLDER_RE.lastIndex = 0;
  const out = [];
  let last = 0;
  let m;
  while ((m = PLACEHOLDER_RE.exec(value)) !== null) {
    if (m.index > last) out.push({ type: 'text', value: value.slice(last, m.index) });
    out.push({
      type: 'element',
      tagName: 'mark',
      properties: { className: ['ph'], title: 'Placeholder: to be supplied before launch' },
      children: [{ type: 'text', value: m[0] }],
    });
    last = m.index + m[0].length;
  }
  if (last < value.length) out.push({ type: 'text', value: value.slice(last) });
  return out;
}

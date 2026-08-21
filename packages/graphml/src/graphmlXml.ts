/** Escapes XML text content (element bodies) — `&`/`<`/`>`, per the XML spec's minimum requirement. */
export function escapeXmlText(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** Escapes an XML attribute value meant to sit inside double quotes — text escaping plus `"`. */
export function escapeXmlAttribute(value: string): string {
  return escapeXmlText(value).replace(/"/g, '&quot;')
}

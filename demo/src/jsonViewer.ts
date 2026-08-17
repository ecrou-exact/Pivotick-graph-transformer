// A line-numbered, collapsible, syntax-highlighted JSON tree, built to the
// exact DOM shape ../vendor/pivotick/pivotick.css already styles for
// Pivotick's own properties-panel JSON viewer (.pvt-json-viewer,
// .pvt-json-viewer__line, .json-key/.json-string/...). We don't have that
// panel's internal JS (it's private to the vendored bundle), so this is our
// own implementation of the same markup contract, built with the DOM API
// (no innerHTML) so untrusted fixture content can never be interpreted as
// markup.

interface Counter {
  current: number
}

function makeLineNumber(counter: Counter): HTMLSpanElement {
  const span = document.createElement('span')
  span.className = 'pvt-json-viewer__line-number'
  span.textContent = String(counter.current++)
  return span
}

function makeLineContent(depth: number, caretVisible: boolean): HTMLSpanElement {
  const content = document.createElement('span')
  content.className = 'pvt-json-viewer__line-content'
  content.style.paddingLeft = `${depth * 1.25}rem`

  const caret = document.createElement('span')
  caret.className = 'pgt-json-caret'
  caret.textContent = '▸'
  caret.style.visibility = caretVisible ? 'visible' : 'hidden'
  content.append(caret)

  return content
}

function bracketSpan(text: string): HTMLSpanElement {
  const span = document.createElement('span')
  span.className = 'json-bracket'
  span.textContent = text
  return span
}

function keySpan(key: string): HTMLSpanElement {
  const span = document.createElement('span')
  span.className = 'json-key'
  span.textContent = JSON.stringify(key)
  return span
}

function primitiveSpan(value: unknown): HTMLSpanElement {
  const span = document.createElement('span')
  if (value === null) {
    span.className = 'json-null'
    span.textContent = 'null'
  } else if (typeof value === 'string') {
    span.className = 'json-string'
    span.textContent = JSON.stringify(value)
  } else if (typeof value === 'number') {
    span.className = 'json-number'
    span.textContent = String(value)
  } else if (typeof value === 'boolean') {
    span.className = 'json-boolean'
    span.textContent = String(value)
  } else {
    span.className = 'json-string'
    span.textContent = JSON.stringify(value)
  }
  return span
}

function renderLine(target: HTMLElement, depth: number, counter: Counter, build: (content: HTMLSpanElement) => void): void {
  const line = document.createElement('div')
  line.className = 'pvt-json-viewer__line'
  const content = makeLineContent(depth, false)
  build(content)
  line.append(makeLineNumber(counter), content)
  target.append(line)
}

function renderNode(target: HTMLElement, key: string | null, value: unknown, depth: number, counter: Counter, isLast: boolean): void {
  const isArray = Array.isArray(value)
  const isObject = !isArray && typeof value === 'object' && value !== null

  if (!isArray && !isObject) {
    renderLine(target, depth, counter, (content) => {
      if (key !== null) content.append(keySpan(key), document.createTextNode(': '))
      content.append(primitiveSpan(value))
      if (!isLast) content.append(document.createTextNode(','))
    })
    return
  }

  const entries: [string | null, unknown][] = isArray
    ? (value as unknown[]).map((item) => [null, item])
    : Object.entries(value as Record<string, unknown>)

  const openChar = isArray ? '[' : '{'
  const closeChar = isArray ? ']' : '}'

  if (entries.length === 0) {
    renderLine(target, depth, counter, (content) => {
      if (key !== null) content.append(keySpan(key), document.createTextNode(': '))
      content.append(bracketSpan(openChar + closeChar))
      if (!isLast) content.append(document.createTextNode(','))
    })
    return
  }

  const countLabel = isArray
    ? `${entries.length} item${entries.length === 1 ? '' : 's'}`
    : `${entries.length} key${entries.length === 1 ? '' : 's'}`

  const details = document.createElement('details')
  details.className = 'pvt-json-viewer__details'
  details.open = true

  const summary = document.createElement('summary')
  summary.className = 'pvt-json-viewer__line pvt-json-viewer__summary'
  const summaryContent = makeLineContent(depth, true)
  if (key !== null) summaryContent.append(keySpan(key), document.createTextNode(': '))
  summaryContent.append(bracketSpan(openChar))
  const meta = document.createElement('span')
  meta.className = 'pvt-json-viewer__meta'
  meta.textContent = countLabel
  summaryContent.append(meta)
  summary.append(makeLineNumber(counter), summaryContent)

  const children = document.createElement('div')
  children.className = 'pvt-json-viewer__children'
  entries.forEach(([childKey, childValue], index) => {
    renderNode(children, childKey, childValue, depth + 1, counter, index === entries.length - 1)
  })
  renderLine(children, depth, counter, (content) => {
    content.append(bracketSpan(closeChar))
    if (!isLast) content.append(document.createTextNode(','))
  })

  details.append(summary, children)
  target.append(details)
}

export function renderJsonViewer(container: HTMLElement, value: unknown): void {
  container.replaceChildren()
  container.classList.add('pvt-json-viewer')

  const toolbar = document.createElement('div')
  toolbar.className = 'pvt-json-viewer__toolbar'
  const copyButton = document.createElement('button')
  copyButton.type = 'button'
  copyButton.className = 'pvt-json-viewer__copy-btn'
  copyButton.textContent = 'Copy'
  copyButton.addEventListener('click', () => {
    void navigator.clipboard.writeText(JSON.stringify(value, null, 2))
    copyButton.textContent = 'Copied'
    setTimeout(() => {
      copyButton.textContent = 'Copy'
    }, 1200)
  })
  toolbar.append(copyButton)

  const body = document.createElement('div')
  body.className = 'pvt-json-viewer__body'
  renderNode(body, null, value, 0, { current: 1 }, true)

  container.append(toolbar, body)
}

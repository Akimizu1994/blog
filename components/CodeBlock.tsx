import type { ReactNode } from 'react'
import { getHighlighter } from '@/lib/shiki'
import { CopyButton } from '@/components/CopyButton'

function extractText(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (typeof node === 'object' && 'props' in node) {
    // @ts-expect-error — narrowing children
    return extractText(node.props.children)
  }
  return ''
}

export async function CodeBlock({
  lang,
  file,
  children,
}: {
  lang?: string
  file?: string
  children: ReactNode
}) {
  const code = (typeof children === 'string' ? children : extractText(children)).trim()
  const hl = await getHighlighter()
  const html = hl.codeToHtml(code, {
    lang: lang ?? 'text',
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false,
  })

  return (
    <div className="code-block">
      <div className="code-block-head">
        {lang && <span className="lang">{lang}</span>}
        {file && <span className="file">{file}</span>}
        <CopyButton text={code} />
      </div>
      {/* shiki outputs <pre><code> with --shiki-light/dark vars on each span */}
      <div className="shiki-wrap" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

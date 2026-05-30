import type { MDXComponents } from 'nextra/mdx-components'
import type { ReactNode, ReactElement } from 'react'
import Link from 'next/link'
import { Callout } from '@/components/Callout'
import { CodeBlock } from '@/components/CodeBlock'
import { Figure } from '@/components/Figure'
import { PreBlock } from '@/components/PreBlock'

type WrapperMetadata = {
  title?: string
  description?: string | null
  date?: string
  tags?: string[]
  pinned?: boolean
}

function PostWrapper({
  children,
  toc,
  metadata,
}: {
  children: ReactNode
  toc?: { value: string | ReactNode; id: string; depth: number }[]
  metadata?: WrapperMetadata
  [key: string]: unknown
}) {
  const date = metadata?.date ?? ''
  const title = metadata?.title ?? ''
  const tags = metadata?.tags ?? []
  return (
    <main>
      <div className="post-layout">
        <article>
          <header className="post-header">
            <div className="breadcrumb">
              <a href="/">~</a>
              <span className="sep">/</span>
              <a href="/posts">posts</a>
              {date && (
                <>
                  <span className="sep">/</span>
                  <span className="cur">{date}</span>
                </>
              )}
            </div>
            {title && <h1 className="post-title">{title}</h1>}
            <div className="post-meta">
              {date && (
                <span className="icon">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                  <time>{date}</time>
                </span>
              )}
              {tags.length > 0 && (
                <>
                  <span className="dot">·</span>
                  <span className="tags">
                    {metadata?.pinned && <span className="post-tag pinned">★ pinned</span>}
                    {tags.map(t => <Link key={t} href={`/tags?tag=${encodeURIComponent(t)}`} className="post-tag">#{t}</Link>)}
                  </span>
                </>
              )}
            </div>
          </header>

          <div className="post-prose">{children}</div>

          <footer className="post-end">
            <div className="post-end-meta">
              <span>last edited {date}</span>
            </div>
            {/* comments (GitHub Discussions) — hidden until giscus is wired up
            <div className="comments">
              <h4>comments</h4>
              <p>讨论托管在 <a href="#">GitHub Discussions</a>，需要 GitHub 账号登录。</p>
            </div>
            */}
          </footer>
        </article>

        {toc && toc.length > 0 && (
          <aside className="toc">
            <h4>on this page</h4>
            <ul>
              {toc.map(h => (
                <li key={h.id} className={h.depth === 3 ? 'lvl-3' : undefined}>
                  <a href={`#${h.id}`}>{h.value}</a>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </main>
  )
}

function slug(text: ReactNode): string {
  if (typeof text === 'string') return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-一-龥]/g, '')
  return ''
}

const ALERT_RE = /^\s*\[!([A-Z]+)\]\s*/i
const ALERT_TYPE_MAP: Record<string, 'note' | 'tip' | 'important' | 'warning' | 'caution'> = {
  note: 'note', tip: 'tip', important: 'important', warning: 'warning', caution: 'caution',
}

/**
 * Handles both GitHub alert syntaxes:
 *   > [!NOTE]           ← remark merges with next line → "[!NOTE] content"
 *   > content
 *
 *   > [!NOTE]           ← blank line keeps them as separate <p>s
 *   >
 *   > content
 */
function GitHubAlert({ children }: { children?: ReactNode }) {
  const kids: ReactNode[] = Array.isArray(children) ? children : [children]
  for (let i = 0; i < kids.length; i++) {
    const kid = kids[i] as ReactElement<{ children?: ReactNode }> | undefined
    const text = kid?.props?.children
    if (typeof text !== 'string') continue
    const m = text.match(ALERT_RE)
    if (!m) continue
    const type = ALERT_TYPE_MAP[m[1].toLowerCase()] ?? 'info'
    const remainder = text.slice(m[0].length).trim()
    // rebuild content: inline remainder + subsequent sibling paragraphs
    const content: ReactNode[] = [
      ...(remainder ? [<p key="r">{remainder}</p>] : []),
      ...kids.slice(i + 1).filter(k => k !== '\n' && k != null),
    ]
    return <Callout type={type}>{content}</Callout>
  }
  return <blockquote>{children}</blockquote>
}

const components: MDXComponents = {
  wrapper: PostWrapper,
  Callout,
  CodeBlock,
  Figure,
  blockquote: GitHubAlert,
  // Fenced code blocks → PreBlock ('use client') for copy button.
  // Language comes from `data-language` on <pre> (set by rehypePrettyCode).
  pre: ({ children, ...rest }) => {
    const props = rest as Record<string, unknown>
    const lang = (props['data-language'] as string | undefined) ?? ''
    // strip nextra-specific / non-DOM attrs before forwarding to <pre>
    const { 'data-language': _l, 'data-word-wrap': _w, 'data-copy': _c, 'data-pagefind-ignore': _p, ...safeRest } = props
    return <PreBlock lang={lang} preProps={safeRest}>{children}</PreBlock>
  },
  h2: ({ children, ...rest }) => {
    const id = (rest as { id?: string }).id ?? slug(children)
    return (
      <h2 id={id} {...rest}>
        <span className="anchor">#</span>
        {children}
      </h2>
    )
  },
}

export function useMDXComponents(extra?: MDXComponents): MDXComponents {
  return { ...components, ...extra }
}

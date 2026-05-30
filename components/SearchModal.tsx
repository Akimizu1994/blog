'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'

export function SearchModal({ posts }: { posts: PostMeta[] }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Open on ⌘K / Ctrl+K, or custom event dispatched by Nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(o => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    const onEvent = () => setOpen(o => !o)
    document.addEventListener('keydown', onKey)
    document.addEventListener('blog:search', onEvent)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('blog:search', onEvent)
    }
  }, [])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [open])

  const q = query.trim().toLowerCase()
  const results = q
    ? posts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.description ?? '').toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q))
      )
    : posts.slice(0, 6)

  if (!open) return null

  return (
    <div className="search-overlay" onClick={() => setOpen(false)}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-input-row">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            className="search-input"
            placeholder="search posts…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
          <kbd onClick={() => setOpen(false)}>Esc</kbd>
        </div>

        <div className="search-results">
          {results.length === 0 ? (
            <div className="search-empty">no results for &ldquo;{query}&rdquo;</div>
          ) : (
            <>
              {!q && <div className="search-hint">recent posts</div>}
              {results.map(p => (
                <Link
                  key={p.slug}
                  href={p.href}
                  className="search-item"
                  onClick={() => setOpen(false)}
                >
                  <span className="search-item-title">{highlight(p.title, q)}</span>
                  {p.description && (
                    <span className="search-item-desc">{highlight(p.description, q)}</span>
                  )}
                  <span className="search-item-tags">
                    {p.tags?.map(t => (
                      <span key={t} className={`search-item-tag${t.toLowerCase().includes(q) && q ? ' match' : ''}`}>
                        #{t}
                      </span>
                    ))}
                  </span>
                </Link>
              ))}
            </>
          )}
        </div>

        <div className="search-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>Esc</kbd> close</span>
        </div>
      </div>
    </div>
  )
}

// Wrap matched substring in <mark>
function highlight(text: string, q: string): React.ReactNode {
  if (!q) return text
  const idx = text.toLowerCase().indexOf(q)
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark>{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  )
}

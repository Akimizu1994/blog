'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { href: '/', label: 'Home', match: (p: string) => p === '/' },
  { href: '/posts', label: 'Posts', match: (p: string) => p.startsWith('/posts') },
  { href: '/tags', label: 'Tags', match: (p: string) => p.startsWith('/tags') },
  { href: '/about', label: 'About', match: (p: string) => p.startsWith('/about') },
]

export function Nav() {
  const pathname = usePathname() ?? '/'
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          <span className="caret">~/</span>
          <span>blog</span>
          <span className="blink">_</span>
        </Link>
        <div className="nav-links">
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} className={l.match(pathname) ? 'active' : undefined}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="nav-right">
          <div
            className="nav-search"
            role="button"
            tabIndex={0}
            onClick={() => document.dispatchEvent(new CustomEvent('blog:search'))}
            onKeyDown={e => e.key === 'Enter' && document.dispatchEvent(new CustomEvent('blog:search'))}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span>Search…</span>
            <kbd>⌘K</kbd>
          </div>
          <a href="https://github.com" className="nav-icon-btn" aria-label="GitHub">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.08 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.18c0 .31.21.68.8.56C20.22 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  )
}

'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type ThemeValue = 'light' | 'dark' | 'crt'

const STORE = {
  theme: 'blog.theme',
  accent: 'blog.accent',
  reduceMotion: 'blog.reduceMotion',
} as const

const DEFAULTS = {
  theme: 'light' as ThemeValue,
  accent: '#ff5ea0',
  reduceMotion: false,
}

const ACCENTS = [
  { value: '#ff5ea0', name: 'sakura' },
  { value: '#ff79c6', name: 'bubblegum' },
  { value: '#d946ef', name: 'orchid' },
  { value: '#8b5cf6', name: 'violet' },
  { value: '#06b6d4', name: 'aqua' },
  { value: '#22c55e', name: 'matrix' },
]

function readLS(key: string, fallback: string): string {
  try {
    return localStorage.getItem(key) ?? fallback
  } catch {
    return fallback
  }
}

function writeLS(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {}
}

function applyToDocument(s: {
  theme: ThemeValue
  accent: string
  reduceMotion: boolean
}) {
  const root = document.documentElement
  root.setAttribute('data-theme', s.theme)
  root.style.setProperty('--accent', s.accent)
  root.setAttribute('data-reduce-motion', String(s.reduceMotion))
}

export function Settings() {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [popPos, setPopPos] = useState<{ top: number; right: number | null } | null>(null)
  const [theme, setTheme] = useState<ThemeValue>(DEFAULTS.theme)
  const [accent, setAccent] = useState<string>(DEFAULTS.accent)
  const [reduceMotion, setReduceMotion] = useState<boolean>(DEFAULTS.reduceMotion)
  const popRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const navRightRef = useRef<HTMLElement | null>(null)

  // Hydrate from localStorage and find the .nav-right slot.
  useEffect(() => {
    setTheme(readLS(STORE.theme, DEFAULTS.theme) as ThemeValue)
    setAccent(readLS(STORE.accent, DEFAULTS.accent))
    setReduceMotion(readLS(STORE.reduceMotion, 'false') === 'true')
    navRightRef.current = document.querySelector('.nav .nav-right')
    setMounted(true)
  }, [])

  // Apply on every change.
  useEffect(() => {
    if (!mounted) return
    applyToDocument({ theme, accent, reduceMotion })
  }, [mounted, theme, accent, reduceMotion])

  // Close on Escape or outside click.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node
      if (popRef.current?.contains(t)) return
      if (btnRef.current?.contains(t)) return
      setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [open])

  // Honor #settings hash (used to preview the popover in the mobile canvas).
  useEffect(() => {
    if (!mounted) return
    if (typeof location !== 'undefined' && location.hash.replace('#', '') === 'settings') {
      const id = setTimeout(() => setOpen(true), 50)
      return () => clearTimeout(id)
    }
  }, [mounted])

  const updateTheme = useCallback((v: ThemeValue) => {
    setTheme(v)
    writeLS(STORE.theme, v)
  }, [])
  const updateAccent = useCallback((v: string) => {
    setAccent(v)
    writeLS(STORE.accent, v)
  }, [])
  const toggleReduceMotion = useCallback(() => {
    setReduceMotion(rm => {
      const next = !rm
      writeLS(STORE.reduceMotion, String(next))
      return next
    })
  }, [])
  const reset = useCallback(() => {
    Object.values(STORE).forEach(k => {
      try {
        localStorage.removeItem(k)
      } catch {}
    })
    setTheme(DEFAULTS.theme)
    setAccent(DEFAULTS.accent)
    setReduceMotion(DEFAULTS.reduceMotion)
  }, [])

  if (!mounted || !navRightRef.current) return null

  const button = (
    <button
      ref={btnRef}
      className="settings-btn nav-icon-btn"
      aria-label="Settings"
      aria-expanded={open}
      onClick={e => {
        e.stopPropagation()
        setOpen(o => {
          if (!o && btnRef.current) {
            const r = btnRef.current.getBoundingClientRect()
            setPopPos({
              top: r.bottom + 8,
              // on mobile let CSS handle right/left
              right: window.innerWidth <= 520 ? null : window.innerWidth - r.right,
            })
          }
          return !o
        })
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    </button>
  )

  const popover = (
    <div
      ref={popRef}
      className={`settings-popover${open ? ' open' : ''}`}
      role="dialog"
      aria-label="Site settings"
      hidden={!open}
      style={popPos ? {
        top: popPos.top,
        ...(popPos.right !== null ? { right: popPos.right } : {}),
      } : undefined}
    >
      <div className="settings-head">
        <div className="settings-title">
          <span className="prompt">$</span> settings <span className="dim">--user</span>
        </div>
        <button className="settings-close" aria-label="Close" onClick={() => setOpen(false)}>×</button>
      </div>

      <div className="settings-body">
        <section className="settings-row">
          <label className="settings-label">Theme</label>
          <div className="settings-segmented">
            <button className={theme === 'light' ? 'on' : ''} onClick={() => updateTheme('light')}>
              <span className="seg-glyph">☀</span> Light
            </button>
            <button className={theme === 'dark' ? 'on' : ''} onClick={() => updateTheme('dark')}>
              <span className="seg-glyph">☾</span> Dark
            </button>
            <button className={theme === 'crt' ? 'on' : ''} onClick={() => updateTheme('crt')}>
              <span className="seg-glyph">▤</span> CRT
            </button>
          </div>
        </section>

        <section className="settings-row">
          <label className="settings-label">Accent</label>
          <div className="settings-swatches">
            {ACCENTS.map(a => (
              <button
                key={a.value}
                className={accent === a.value ? 'on' : ''}
                title={a.name}
                aria-label={a.name}
                onClick={() => updateAccent(a.value)}
              >
                <span className="swatch-dot" style={{ background: a.value }} />
              </button>
            ))}
          </div>
        </section>

        <section className="settings-row settings-toggle-row">
          <div>
            <label className="settings-label">Reduce motion</label>
            <p className="settings-hint">Disables blinking cursor, hover slides.</p>
          </div>
          <button
            className={`settings-toggle${reduceMotion ? ' on' : ''}`}
            role="switch"
            aria-checked={reduceMotion}
            onClick={toggleReduceMotion}
          >
            <span className="toggle-track"><span className="toggle-thumb" /></span>
          </button>
        </section>
      </div>

      <div className="settings-foot">
        <button className="settings-reset" onClick={reset}>↺ reset to defaults</button>
        <div className="settings-foot-hint">
          stored locally · <kbd>Esc</kbd> close
        </div>
      </div>
    </div>
  )

  return (
    <>
      {createPortal(button, navRightRef.current)}
      {createPortal(popover, document.body)}
    </>
  )
}

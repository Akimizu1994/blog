'use client'

import { useRef, useState, type ReactNode } from 'react'

interface PreBlockProps {
  lang?: string
  preProps?: Record<string, unknown>
  children: ReactNode
}

export function PreBlock({ lang, preProps = {}, children }: PreBlockProps) {
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    const text = preRef.current?.innerText ?? ''
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  const display = lang && lang !== 'plaintext' && lang !== 'text' ? lang : ''

  return (
    <div className="code-block">
      <div className="code-block-head">
        {display && <span className="lang">{display}</span>}
        <button className="copy" onClick={handleCopy} aria-label="Copy code">
          {copied ? '✓ copied' : '⧉ copy'}
        </button>
      </div>
      <pre ref={preRef} {...(preProps as object)} style={{ margin: 0, padding: '14px 18px', overflowX: 'auto' }}>
        {children}
      </pre>
    </div>
  )
}

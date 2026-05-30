import type { ReactNode, ReactElement } from 'react'

type Variant = 'note' | 'tip' | 'important' | 'warning' | 'caution' | 'warn' | 'info'

function IconNote() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="8" cy="8" r="6.5" />
      <line x1="8" y1="7.5" x2="8" y2="11" />
      <circle cx="8" cy="5.2" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconTip() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2a4.5 4.5 0 0 1 2.5 8.2V12H5.5v-1.8A4.5 4.5 0 0 1 8 2z" />
      <line x1="5.5" y1="13.5" x2="10.5" y2="13.5" />
    </svg>
  )
}

function IconImportant() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 2.5h12v8H9.5L8 12.5 6.5 10.5H2V2.5z" />
      <line x1="8" y1="5" x2="8" y2="8" />
      <circle cx="8" cy="9.5" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconWarning() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2 L14.5 13.5 H1.5 Z" />
      <line x1="8" y1="6.5" x2="8" y2="10" />
      <circle cx="8" cy="11.5" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconCaution() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M5.5 1.5h5l4 4v5l-4 4h-5l-4-4v-5z" />
      <line x1="8" y1="5.5" x2="8" y2="9" />
      <circle cx="8" cy="10.5" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  )
}

const META: Record<Variant, { icon: () => ReactElement; label: string }> = {
  note:      { icon: IconNote,      label: 'Note' },
  tip:       { icon: IconTip,       label: 'Tip' },
  important: { icon: IconImportant, label: 'Important' },
  warning:   { icon: IconWarning,   label: 'Warning' },
  caution:   { icon: IconCaution,   label: 'Caution' },
  warn:      { icon: IconWarning,   label: 'Warning' },
  info:      { icon: IconNote,      label: 'Note' },
}

export function Callout({ type = 'note', children }: { type?: Variant; children: ReactNode }) {
  const { icon: Icon, label } = META[type] ?? META.note
  return (
    <div className={`callout ${type}`}>
      <div className="callout-head">
        <span className="ico"><Icon /></span>
        <span>{label}</span>
      </div>
      <div className="callout-body">{children}</div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'

// Blog "boot" time — uptime counts up from here.
const START = new Date('2026-05-30T18:00:00+08:00').getTime()

function format(ms: number): string {
  const totalMin = Math.max(0, Math.floor(ms / 60000))
  const days = Math.floor(totalMin / 1440)
  const hours = Math.floor((totalMin % 1440) / 60)
  const mins = totalMin % 60
  const dayLabel = days === 1 ? '1 day' : `${days} days`
  return `${dayLabel}, ${hours}:${String(mins).padStart(2, '0')}`
}

export function Uptime() {
  // null until mounted to avoid SSR/CSR hydration mismatch
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 30000)
    return () => clearInterval(id)
  }, [])
  return <span className="num">{now === null ? '…' : format(now - START)}</span>
}

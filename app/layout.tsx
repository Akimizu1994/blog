import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Settings } from '@/components/Settings'
import { SearchModal } from '@/components/SearchModal'
import { ThemeBoot } from '@/components/ThemeBoot'
import { getPosts } from '@/lib/posts'
import './globals.css'

export const metadata: Metadata = {
  title: 'blog — Akimizu@nextra',
  description: 'TUI-flavored blog built with Next.js + Nextra + MDX + Tailwind',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const posts = await getPosts()
  return (
    <html lang="zh-CN" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <ThemeBoot />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
        <Settings />
        <SearchModal posts={posts} />
      </body>
    </html>
  )
}

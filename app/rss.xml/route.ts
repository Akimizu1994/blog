import { getPosts } from '@/lib/posts'

export const dynamic = 'force-static'

// Absolute base URL baked into the RSS feed at build time.
//   prod (Cloudflare) → custom domain, root path
//   test (NUC)        → LAN IP, /blog subpath
const SITE_URL =
  process.env.DEPLOY_ENV === 'test'
    ? 'http://192.168.50.57/blog'
    : 'https://blog.akimizu.moe'
const SITE_TITLE = "Akimizu's Blog"
const SITE_DESC = 'TUI-flavored blog built with Next.js + Nextra + MDX + Tailwind'

function escapeXml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function toRfc822(dateStr: string): string {
  // dateStr: "2026-05-25"
  const d = new Date(dateStr + 'T00:00:00+08:00')
  return d.toUTCString()
}

export async function GET() {
  const posts = await getPosts()

  const items = posts
    .map(p => {
      const url = `${SITE_URL}/posts/${p.slug}`
      return `
  <item>
    <title>${escapeXml(p.title)}</title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <pubDate>${toRfc822(p.date)}</pubDate>
    <description>${escapeXml(p.description ?? '')}</description>
    ${(p.tags ?? []).map(t => `<category>${escapeXml(t)}</category>`).join('\n    ')}
  </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESC)}</description>
    <language>zh-CN</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${toRfc822(posts[0]?.date ?? new Date().toISOString().slice(0, 10))}</lastBuildDate>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

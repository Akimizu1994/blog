import { getPageMap } from 'nextra/page-map'

export type PostMeta = {
  slug: string
  href: string
  title: string
  description: string
  date: string
  tags?: string[]
  pinned?: boolean
}

type Frontmatter = {
  title?: string
  description?: string
  date?: string
  tags?: string[]
  pinned?: boolean
}

type MdxFile = {
  name: string
  route: string
  frontMatter?: Frontmatter
}

export async function getPosts(): Promise<PostMeta[]> {
  const pageMap = await getPageMap('/posts')
  const items: MdxFile[] = []
  for (const entry of pageMap) {
    if ('frontMatter' in entry && (entry as MdxFile).route && (entry as MdxFile).route !== '/posts') {
      items.push(entry as MdxFile)
    }
  }
  const posts: PostMeta[] = items.map(item => {
    const fm = item.frontMatter ?? {}
    return {
      slug: item.name,
      href: item.route,
      title: fm.title ?? item.name,
      description: fm.description ?? '',
      date: fm.date ?? '',
      tags: fm.tags ?? [],
      pinned: Boolean(fm.pinned),
    }
  })
  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  return posts
}

export function groupByYear(posts: PostMeta[]): { year: string; posts: PostMeta[] }[] {
  const byYear = new Map<string, PostMeta[]>()
  for (const p of posts) {
    const year = p.date.slice(0, 4) || 'undated'
    if (!byYear.has(year)) byYear.set(year, [])
    byYear.get(year)!.push(p)
  }
  return Array.from(byYear.entries())
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([year, posts]) => ({ year, posts }))
}

export function aggregateTags(posts: PostMeta[]): { tag: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const p of posts) {
    for (const t of p.tags ?? []) {
      counts.set(t, (counts.get(t) ?? 0) + 1)
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
}

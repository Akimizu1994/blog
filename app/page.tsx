import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { PostRow } from '@/components/PostRow'
import { getPosts, groupByYear } from '@/lib/posts'

export default async function Home() {
  const posts = await getPosts()
  const grouped = groupByYear(posts)
  const totalWords = posts.length * 1600 // rough estimate for the neofetch line

  return (
    <main>
      <Hero posts={posts.length} words={totalWords} />

      <div className="section-h">
        <h2><span className="ch">$</span> cat recent_posts.md</h2>
        <span className="meta">
          <Link href="/posts">all posts →</Link>
        </span>
      </div>

      {grouped.map(({ year, posts }) => (
        <div key={year}>
          <div className="year-row">— {year} —</div>
          <ul className="posts">
            {posts.map(p => <PostRow key={p.slug} post={p} />)}
          </ul>
        </div>
      ))}
    </main>
  )
}

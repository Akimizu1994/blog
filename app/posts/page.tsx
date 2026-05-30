import { PostRow } from '@/components/PostRow'
import { getPosts, groupByYear } from '@/lib/posts'

export const metadata = { title: 'Posts — Akimizu@nextra' }

export default async function PostsIndex() {
  const posts = await getPosts()
  const grouped = groupByYear(posts)
  const total = posts.length

  return (
    <main>
      <div className="page-head">
        <h1 className="title">
          <span className="prompt">$</span> ls <span className="arg">posts/</span> --by-year
        </h1>
        <div className="subtitle">
          <span className="num">{total}</span> entries · sorted desc
        </div>
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

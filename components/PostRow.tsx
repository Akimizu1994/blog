import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'

export function PostRow({ post }: { post: PostMeta }) {
  return (
    <li className="post-row">
      <time className="post-date">{post.date}</time>
      <div className="post-main">
        <h3>
          {post.href ? <Link href={post.href}>{post.title}</Link> : post.title}
        </h3>
        <p>{post.description}</p>
      </div>
      <div className="post-tags">
        {post.pinned && <span className="post-tag pinned">★ pinned</span>}
        {post.tags?.map(t => (
          <Link key={t} href={`/tags?tag=${encodeURIComponent(t)}`} className="post-tag">
            #{t}
          </Link>
        ))}
      </div>
    </li>
  )
}

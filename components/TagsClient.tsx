'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { PostRow } from '@/components/PostRow'
import type { PostMeta } from '@/lib/posts'

type TagEntry = { tag: string; count: number }

function sizeClass(count: number, max: number): string {
  if (max === 0) return 's2'
  const ratio = count / max
  if (ratio >= 0.85) return 's5'
  if (ratio >= 0.6) return 's4'
  if (ratio >= 0.4) return 's3'
  if (ratio >= 0.2) return 's2'
  return 's1'
}

function TagsContent({
  posts,
  tags,
  byName,
}: {
  posts: PostMeta[]
  tags: TagEntry[]
  byName: TagEntry[]
}) {
  const searchParams = useSearchParams()
  const activeTag = searchParams.get('tag') ?? undefined
  const max = tags[0]?.count ?? 1

  const filtered = activeTag
    ? posts.filter(p => p.tags?.includes(activeTag))
    : []

  return (
    <>
      <div className="page-head">
        <h1 className="title">
          <span className="prompt">$</span> grep -c <span className="arg">&quot;#tag&quot;</span> posts/*.md | sort -rn
        </h1>
        <div className="subtitle">
          <span className="num">{tags.length}</span> tags · <span className="num">{posts.length}</span> posts
          {activeTag ? (
            <> · filtering <strong style={{ color: 'var(--accent)' }}>#{activeTag}</strong> — <Link href="/tags">clear ✕</Link></>
          ) : ' · click to filter'}
        </div>
      </div>

      <div className="tag-cloud">
        {tags.map(({ tag, count }) => {
          const isActive = tag === activeTag
          return (
            <Link
              key={tag}
              href={isActive ? '/tags' : `/tags?tag=${encodeURIComponent(tag)}`}
              className={`tag-chip ${sizeClass(count, max)}${isActive ? ' active' : ''}`}
              style={isActive ? { outline: '1px solid var(--accent)', outlineOffset: 2 } : undefined}
            >
              <span className="hash">#</span>{tag}<span className="count">{count}</span>
            </Link>
          )
        })}
      </div>

      {activeTag ? (
        <>
          <div className="section-h">
            <h2><span className="ch">$</span> grep -rl &quot;#{activeTag}&quot; posts/</h2>
            <span className="meta">{filtered.length} {filtered.length === 1 ? 'post' : 'posts'}</span>
          </div>
          {filtered.length > 0 ? (
            <ul className="post-list">
              {filtered.map(p => <PostRow key={p.slug} post={p} />)}
            </ul>
          ) : (
            <p style={{ color: 'var(--muted)', padding: '1rem 0' }}>no posts found for #{activeTag}</p>
          )}
        </>
      ) : (
        <>
          <div className="section-h">
            <h2><span className="ch">$</span> sort tags/ --by name</h2>
            <span className="meta">a–z · {tags.length} tags</span>
          </div>
          <ul className="tag-table">
            {byName.map(({ tag, count }) => (
              <li key={tag} className="tag-row">
                <Link href={`/tags?tag=${encodeURIComponent(tag)}`} className="name">{tag}</Link>
                <span className="dots" />
                <span className="n">{count} {count === 1 ? 'post' : 'posts'}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}

export function TagsClient({
  posts,
  tags,
  byName,
}: {
  posts: PostMeta[]
  tags: TagEntry[]
  byName: TagEntry[]
}) {
  return (
    // useSearchParams() requires a Suspense boundary in static export
    <Suspense fallback={<div style={{ color: 'var(--muted)', padding: '2rem' }}>loading…</div>}>
      <TagsContent posts={posts} tags={tags} byName={byName} />
    </Suspense>
  )
}

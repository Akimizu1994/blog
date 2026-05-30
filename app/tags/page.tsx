import { aggregateTags, getPosts } from '@/lib/posts'
import { TagsClient } from '@/components/TagsClient'

export const metadata = { title: 'Tags — Akimizu@nextra' }

export default async function TagsPage() {
  const posts = await getPosts()
  const tags = aggregateTags(posts)
  const byName = [...tags].sort((a, b) => a.tag.localeCompare(b.tag))
  return (
    <main>
      <TagsClient posts={posts} tags={tags} byName={byName} />
    </main>
  )
}

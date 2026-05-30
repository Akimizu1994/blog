import fs from 'node:fs/promises'
import path from 'node:path'
import { notFound } from 'next/navigation'
import { importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '@/mdx-components'

type Params = { slug: string[] }

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'content', 'posts')
  const entries = await fs.readdir(dir, { withFileTypes: true })
  return entries
    .filter(e => e.isFile() && /\.mdx?$/.test(e.name))
    .map(e => ({ slug: [e.name.replace(/\.mdx?$/, '')] }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  try {
    const { metadata } = await importPage(['posts', ...slug])
    return metadata
  } catch {
    return {}
  }
}

const Wrapper = getMDXComponents().wrapper!

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  let result
  try {
    result = await importPage(['posts', ...slug])
  } catch {
    notFound()
  }
  const { default: MDXContent, ...rest } = result
  return (
    <Wrapper {...rest}>
      <MDXContent />
    </Wrapper>
  )
}

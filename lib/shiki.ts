import { createHighlighter, type Highlighter } from 'shiki'

let _hl: Highlighter | null = null

export async function getHighlighter() {
  if (_hl) return _hl
  _hl = await createHighlighter({
    themes: ['github-light', 'github-dark'],
    langs: [
      'tsx', 'ts', 'jsx', 'js', 'html', 'css', 'json',
      'bash', 'sh', 'text', 'markdown', 'mdx',
      'python', 'rust', 'go', 'yaml', 'toml', 'sql',
    ],
  })
  return _hl
}

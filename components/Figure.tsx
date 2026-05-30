import type { ReactNode } from 'react'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function Figure({
  src,
  alt,
  caption,
  children,
}: {
  src?: string
  alt?: string
  caption?: string
  children?: ReactNode
}) {
  // prefix basePath for root-relative srcs so images resolve under /blog too
  const resolved = src && src.startsWith('/') ? `${BASE}${src}` : src
  return (
    <figure className="figure">
      {resolved ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={resolved} alt={alt ?? caption ?? ''} loading="lazy" />
      ) : (
        children ?? <div className="placeholder">[ figure placeholder ]</div>
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

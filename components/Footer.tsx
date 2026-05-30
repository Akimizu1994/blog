const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function Footer() {
  return (
    <footer>
      <div>
        © 2026 Akimizu · built with <a href="https://nextra.site">Nextra</a> · source on <a href="https://github.com/Akimizu1994/blog">GitHub</a>
      </div>
      <div>
        made with <span className="heart">♥</span> &amp; <span className="heart">🍓</span> · <a href={`${BASE}/rss.xml`}>RSS</a>
      </div>
    </footer>
  )
}

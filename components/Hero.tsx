import { AIGirl } from './AIGirl'

export function Hero({ posts, words }: { posts: number; words: number }) {
  return (
    <section className="hero">
      <div className="term-titlebar">
        <div className="term-dots">
          <span className="term-dot r" />
          <span className="term-dot y" />
          <span className="term-dot g" />
        </div>
        <span className="term-title-text">
          <span className="path">~/blog</span> — zsh — 80×24
        </span>
      </div>

      <div className="hero-girl">
        <AIGirl size={248} />
      </div>

      <div className="hero-info">
        <div className="name-line">
          Akimizu<span className="at">@</span><span className="host">nextra</span>
        </div>
        <div className="rule">─────────────────────────────────</div>
        <dl>
          <dt>OS</dt>          <dd>Web 1.0 <span className="dim">(Markdown ❤ Pink)</span></dd>
          <dt>Host</dt>        <dd>Next.js + Nextra <span className="num">4.6</span></dd>
          <dt>Kernel</dt>      <dd><span className="num">15.5</span>-app-router</dd>
          <dt>Uptime</dt>      <dd><span className="num">1</span> day, <span className="num">3:14</span></dd>
          <dt>Posts</dt>       <dd><span className="num">{posts}</span> entries · <span className="num">{words.toLocaleString()}</span> words</dd>
          <dt>Tags</dt>        <dd><span className="tag">#web</span> <span className="tag">#blog</span> <span className="tag">#meta</span> <span className="dim">+ more</span></dd>
          <dt>Shell</dt>       <dd>nvim · tmux · <span className="dim">wezterm</span></dd>
          <dt>Mood</dt>        <dd><span className="num">◔ ◡ ◔</span> <span className="dim">/* feeling cute */</span></dd>
          <dt>Now playing</dt> <dd>♪ <span className="dim">YOASOBI — アイドル</span></dd>
          <dt>Theme</dt>
          <dd>
            pink-on-black
            <span className="colorbar">
              <i style={{ background: '#1a1a22' }} />
              <i style={{ background: '#ff5555' }} />
              <i style={{ background: '#5af78e' }} />
              <i style={{ background: '#f1fa8c' }} />
              <i style={{ background: '#8be9fd' }} />
              <i style={{ background: '#ff79c6' }} />
              <i style={{ background: '#bd93f9' }} />
              <i style={{ background: '#f8f8f2' }} />
            </span>
          </dd>
        </dl>

        <div className="term-prompt">
          <span className="pmpt">Akimizu@nextra</span>:<span style={{ color: 'var(--term-cyan)' }}>~/blog</span><span className="arrow"> ❯</span> ls posts/ | head
          <span className="cursor" />
        </div>
      </div>
    </section>
  )
}

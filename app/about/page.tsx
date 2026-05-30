export const metadata = { title: 'About — Akimizu@nextra' }

export default function About() {
  return (
    <main>
      <div className="page-head">
        <h1 className="title">
          <span className="prompt">$</span> whoami<span className="arg"> --verbose</span>
        </h1>
        <div className="subtitle">
          Akimizu · <span className="num">2026</span><br />
          <span style={{ opacity: 0.7 }}>last updated 2026-05-29</span>
        </div>
      </div>

      <div className="about-grid">
        <article className="prose">
          <p>
            你好，我是 <strong>秋水（Akimizu）</strong>。
          </p>

          <p>
            一个白天写 Java、晚上泡在二次元里的后端工程师。这些年在互联网支付和营销行业辗转，
            如今正把对技术的那点热爱，慢慢交给AI coding这片新海。
          </p>

          <p>
            作为一个技术宅，总觉得代码和动画一样，都有某种「构建一个世界」的浪漫。
            这个博客是我安放思考与心得的地方，更新随缘。
          </p>

          <h2><span className="ch">#</span> 我在做什么</h2>
          <ul>
            <li>白天是 Java 后端工程师</li>
            <li>业余在 vibe-coding 一个聊天 Agent —— 算是给自己造的一位 <strong>赛博 Soulmate</strong></li>
            <li>正在玩：米游全家桶、《极限竞速：地平线6》</li>
            <li>正在追：《上伊那牡丹，酒醉身姿似百合花般》</li>
            <li>我的好搭档：Claude Code &amp; Codex</li>
          </ul>

          <h2><span className="ch">#</span> 这个博客是怎么搭的</h2>
          <p>
            蓝图由 <strong>Claude Design</strong> 画下，<strong>Claude Code</strong> 一砖一瓦地实现，
            内核交给 <a href="https://nextra.site">Nextra</a> 驱动，最终安家在 <a href="https://www.cloudflare.com">Cloudflare</a>。
          </p>
          <p>
            设计里藏了些有趣的小东西：TUI 风格的信息展示、点缀其间的 BASH 命令，还有一位粉毛 AI 娘。
            主题给了三种 —— 浅色是暖灰的温柔，深色用经典的 <strong>Dracula</strong> 配色，还有一个带扫描线的 <strong>CRT</strong> 主题。
            字体选了 <code>JetBrains Mono</code>，希望每个字符落在你眼里时，都是舒服的模样。
          </p>
        </article>

        <aside className="sidebar">
          <h4>~ whoami</h4>
          <div className="rule">─────────────────────</div>
          <dl>
            <dt>name</dt>     <dd>Akimizu</dd>
            <dt>location</dt> <dd>Wuxi</dd>
            <dt>tz</dt>       <dd>UTC+8</dd>
          </dl>

          <h4>~ stack</h4>
          <ul>
            <li>Java · TypeScript</li>
            <li>JetBrains · VS Code</li>
            <li>Claude Code · Codex</li>
          </ul>

          <h4>~ elsewhere</h4>
          <div className="link-list">
            <ul>
              <li><a href="https://github.com/Akimizu1994">GitHub @Akimizu</a></li>
              <li><a href="/rss.xml">RSS feed</a></li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  )
}

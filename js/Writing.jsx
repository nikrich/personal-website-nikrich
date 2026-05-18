function Writing() {
  const posts = [
    { date: 'May 2026', title: 'Poltergeist — a quiet brain for loud apps.', time: '8 min', href: 'https://github.com/nikrich/poltergeist' },
    { date: 'Mar 2026', title: 'Hive — multi-agent orchestration modelled on agile teams.', time: '9 min', href: 'https://github.com/nikrich/hungry-ghost-hive' },
    { date: 'Feb 2026', title: 'Nexus — a TypeScript microservices reference stack.', time: '7 min', href: 'https://github.com/nikrich?tab=repositories&q=nexus' },
    { date: 'Jan 2026', title: 'An AoE2 build-order overlay in Rust.', time: '4 min', href: 'https://github.com/nikrich/aoe2-age-up' },
    { date: 'Dec 2025', title: 'Shipping music while shipping code.', time: '5 min', href: '#contact' },
    { date: 'Aug 2025', title: 'The AWS bill as a design document.', time: '6 min', href: '#contact' },
  ];
  return (
    <section className="jr-writing" id="writing">
      <div className="jr-writing__head">
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          <span className="jr-eyebrow">Notes</span>
          <h2>Writing &amp; notes<br/>on what I'm <i>building</i>.</h2>
        </div>
        <a className="jr-link" href="https://github.com/nikrich" target="_blank" rel="noopener noreferrer">All on GitHub →</a>
      </div>
      <ul className="jr-writing__list">
        {posts.map((p, i) => (
          <a key={i} className="jr-post" href={p.href} target={p.href.startsWith('http') ? '_blank' : undefined} rel={p.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
            <span className="jr-post__date">{p.date}</span>
            <span className="jr-post__title">{p.title}</span>
            <span className="jr-post__time">{p.time}</span>
            <span className="jr-post__arrow">→</span>
          </a>
        ))}
      </ul>
    </section>
  );
}

window.Writing = Writing;

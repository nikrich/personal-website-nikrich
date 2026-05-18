function WorkGrid() {
  const tiles = [
    {
      title: 'PoltergeistAI',
      tag: 'Founder · 2026',
      year: '2026',
      metric: 'Deterministic LLM programming on Claude',
      href: 'https://getpoltergeist.com',
      image: 'assets/projects/poltergeist.jpg',
      bg: 'linear-gradient(135deg,#1A1814 0%, #2A2620 50%, #1F4BFF 130%)',
    },
    {
      title: 'Hive',
      tag: 'Open Source · 12★',
      year: '2026',
      metric: 'Multi-agent orchestrator',
      href: 'https://github.com/nikrich/hungry-ghost-hive',
      image: 'assets/projects/hive.jpg',
      bg: 'linear-gradient(135deg,#1F4BFF 0%, #0F33D6 60%, #061A5C 100%)',
    },
    {
      title: 'Reduced Recipes',
      tag: 'Founder · 2026',
      year: '2026',
      metric: '45,685 recipes — reduced to what matters',
      href: 'https://reduced.recipes',
      image: 'assets/projects/reduced-recipes.jpg',
      bg: 'linear-gradient(135deg,#D9462B 0%, #A8331F 60%, #4A1A0E 100%)',
    },
    {
      title: 'Sanlam Fintech',
      tag: 'Day job · Distributed Systems',
      year: '2023 — Now',
      metric: 'Event-driven · Java · AWS · Cape Town',
      href: '#about',
      image: 'assets/projects/sanlam.jpg',
      bg: 'linear-gradient(135deg,#1A1814 0%, #3A332A 70%, #1A1814 100%)',
    },
    {
      title: 'News24 Platform',
      tag: 'Solutions Architect · 24.com',
      year: '2020 — 2023',
      metric: 'Rebuild → backbone for all 24.com brands',
      href: 'https://www.news24.com',
      image: 'assets/projects/news24.jpg',
      bg: 'linear-gradient(135deg,#2A2620 0%, #4A3F30 60%, #6B5230 100%)',
    },
    {
      title: 'Unreal Assets',
      tag: 'Open Source · 148★',
      year: '2022',
      metric: 'Most-starred SA Unreal repo',
      href: 'https://github.com/nikrich/unreal-assets',
      image: 'https://opengraph.githubassets.com/1/nikrich/unreal-assets',
      bg: 'linear-gradient(135deg,#D8C9AC 0%, #A98D5B 60%, #6E5520 100%)',
    },
  ];

  return (
    <section className="jr-work" id="work">
      <div className="jr-work__head">
        <span className="jr-eyebrow">Selected Work</span>
        <h2>Six projects<br/>worth <i>pointing at</i>.</h2>
      </div>
      <div className="jr-work__grid">
        {tiles.map(t => {
          const style = t.image
            ? { backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 100%), url(${t.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : { background: t.bg };
          return (
            <a key={t.title} href={t.href} target={t.href.startsWith('http') ? '_blank' : undefined} rel={t.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="jr-tile">
              <div className="jr-tile__photo" style={style}>
                <span className="jr-pill">{t.tag}</span>
                <span className="jr-tile__metric">{t.metric}</span>
              </div>
              <div className="jr-tile__meta">
                <h3>{t.title}</h3>
                <span className="jr-tile__year">{t.year}</span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

window.WorkGrid = WorkGrid;

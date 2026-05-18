function Services() {
  const items = [
    {
      n: '01',
      title: 'Distributed Systems & Architecture',
      blurb: 'Financial-services systems at Sanlam. Event-driven, horizontally scaled, observable. Sized for the load they actually carry.',
      tags: ['AWS', 'Event-driven', 'K8s'],
      illustration: 'assets/illustrations/services/distributed.svg',
      bg: 'linear-gradient(135deg, #1F4BFF 0%, #0F33D6 60%, #0A1F8A 100%)',
    },
    {
      n: '02',
      title: 'Multi-Agent Orchestration',
      blurb: 'Hive — my open source orchestrator for LLM agents, modelled on agile teams. Contributing across the wider agentic ecosystem.',
      tags: ['LLMs', 'TypeScript', 'OSS'],
      illustration: 'assets/illustrations/services/multi-agent.svg',
      bg: 'linear-gradient(135deg, #2A2620 0%, #4A3F30 100%)',
    },
    {
      n: '03',
      title: 'Full-Stack Engineering',
      blurb: 'Front-end through to database. React, Next.js, Node, TypeScript, Postgres. Same person writes the API and the UI.',
      tags: ['React', 'Node', 'TypeScript'],
      illustration: 'assets/illustrations/services/full-stack.svg',
      bg: 'linear-gradient(135deg, #D8C9AC 0%, #A98D5B 100%)',
    },
    {
      n: '04',
      title: 'Performance & Scale',
      blurb: 'Profiling, caching, edge compute. Sub-100ms TTFB on country-scale traffic.',
      tags: ['Profiling', 'Caching', 'Edge'],
      illustration: 'assets/illustrations/services/performance.svg',
      bg: 'linear-gradient(135deg, #1A1814 0%, #2A2620 60%, #1F4BFF 140%)',
    },
  ];
  const [open, setOpen] = React.useState(0);

  return (
    <section className="jr-services" id="services">
      <div className="jr-services__head">
        <span className="jr-eyebrow">What I do</span>
        <h2>Four areas I spend<br/><i>most</i> of my time in.</h2>
      </div>
      <ul className="jr-services__list">
        {items.map((it, i) => (
          <li key={it.n}
              className={"jr-service" + (open === i ? " is-open" : "")}
              onMouseEnter={() => setOpen(i)}
              onClick={() => setOpen(i)}>
            <div className="jr-service__row">
              <span className="jr-service__n">{it.n}</span>
              <h3>{it.title}</h3>
              <div className="jr-service__tags">
                {it.tags.map(t => <span key={t} className="jr-pill jr-pill--soft">{t}</span>)}
              </div>
              <span className="jr-service__toggle">{open === i ? '−' : '+'}</span>
            </div>
            <div className="jr-service__body">
              <p>{it.blurb}</p>
              <div className="jr-service__thumb" style={{background: it.bg}}>
                {it.illustration && <img className="jr-service__illustration" src={it.illustration} alt=""/>}
                <span className="jr-pill">See examples →</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

window.Services = Services;

function Experience() {
  const roles = [
    {
      when: '2026 — Now',
      title: 'Founder & CEO',
      where: 'PoltergeistAI · Cape Town (Remote)',
      blurb: 'A quiet brain for loud apps. Python, AI agents, deterministic LLM programming on Claude. TypeScript on the edges.',
    },
    {
      when: '2026 — Now',
      title: 'Founder · Head of Software Architecture',
      where: 'Reduced Recipes · Cape Town (Remote)',
      blurb: 'A small food-tech side venture, run lean.',
    },
    {
      when: '2023 — Now',
      title: 'Senior Solutions Engineer',
      where: 'Sanlam Fintech · Cape Town',
      blurb: 'Large-scale distributed systems for financial services. Event-driven on Kafka, Kinesis and Camel; AWS Lambda + DynamoDB underneath; DDD on the model. Java.',
    },
    {
      when: '2016 — 2023',
      title: 'Engineer → Solutions Architect',
      where: '24.com (Media24) · Cape Town',
      blurb: 'Joined as Fullstack Developer, grew through Senior Engineer to Software Solutions Architect over seven years. Led the News24 platform rebuild that became the backbone for all 24.com brands. .NET Core, TypeScript, React, edge compute on Cloudflare.',
    },
    {
      when: '2014 — 2016',
      title: 'Fullstack Web Developer',
      where: 'PBT Insurance Technologies · Cape Town',
      blurb: 'ASP.NET websites and cross-platform mobile work for the insurance industry.',
    },
    {
      when: '2013 — 2014',
      title: 'Software Developer',
      where: 'Nanoson Technology · Cape Town',
      blurb: 'Web, mobile, data and content. The classic early-career grab bag — and the part where the boring fundamentals stick.',
    },
    {
      when: '2012 — 2013',
      title: 'Website Developer',
      where: 'Freelance · Cape Town',
      blurb: 'First commercial work — websites and mobile apps for whoever would pay for them.',
    },
  ];
  return (
    <section className="jr-exp" id="experience">
      <img className="jr-exp__shape jr-shape" src="assets/shapes/hexagon-outline.svg" alt=""/>
      <div className="jr-exp__inner">
        <div className="jr-exp__head">
          <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
            <span className="jr-eyebrow">Experience</span>
            <h2>Fourteen years<br/>of <i>work</i>.</h2>
          </div>
          <div className="jr-exp__tally">
            14<span>years shipping</span>
          </div>
        </div>
        <ul className="jr-exp__list">
          {roles.map((r, i) => (
            <li key={i} className="jr-role">
              <span className="jr-role__when">{r.when}</span>
              <div className="jr-role__title">
                <h3>{r.title}</h3>
                <span>{r.where}</span>
              </div>
              <p className="jr-role__blurb">{r.blurb}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

window.Experience = Experience;

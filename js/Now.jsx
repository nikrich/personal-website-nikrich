function Now() {
  const items = [
    { kind: 'Engineering', txt: <>Distributed systems for <i>Sanlam Fintech</i>.</>, when: 'ongoing' },
    { kind: 'Founding', txt: <><i>PoltergeistAI</i> — deterministic LLM programming on Claude.</>, when: 'just started' },
    { kind: 'Shipping', txt: <>Releases on <i>Hive</i>. Contributing to <i>Agent Flow</i> and <i>Gas City</i>.</>, when: 'this quarter' },
    { kind: 'Building', txt: <>An <i>Age of Empires 2</i> build-order overlay in Rust.</>, when: 'on the side' },
    { kind: 'Playing', txt: <>Game prototypes in <i>Bevy</i> (Rust) and <i>MonoGame</i> (C#).</>, when: 'evenings' },
    { kind: 'Making', txt: <>A C++ monorepo of <i>VST plugins</i>. Mixing on weekends.</>, when: 'Q3 2026' },
    { kind: 'Reading', txt: <>Designing Data-Intensive Applications. Third pass.</>, when: 'on the desk' },
    { kind: 'Cooking', txt: <>Working through every regional curry I can find.</>, when: 'always' },
  ];
  return (
    <section className="jr-now" id="now">
      <div className="jr-now__head">
        <span className="jr-eyebrow">Now</span>
        <h2>What I'm working<br/>on <i>right now</i>.</h2>
        <span className="jr-now__pulse">Live · last updated May 2026</span>
        <span className="jr-now__caption">Inspired by nownownow.com.</span>
      </div>
      <ul className="jr-now__list">
        {items.map((it, i) => (
          <li key={i} className="jr-now__item">
            <span className="jr-now__kind">{it.kind}</span>
            <span className="jr-now__txt">{it.txt}</span>
            <span className="jr-now__when">{it.when}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

window.Now = Now;

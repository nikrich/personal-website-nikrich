function Checklist() {
  const items = [
    "Ten years of production systems — news platforms, elections, financial services.",
    "Full-stack, so fewer handoffs get lost in translation.",
    "I count engineering hours and cloud spend in the same budget.",
    "86 public repos on GitHub. A few people actually use.",
  ];
  return (
    <section className="jr-checks">
      <span className="jr-eyebrow">Why work with me</span>
      <h2>Four reasons<br/>worth <i>mentioning</i>.</h2>
      <ul className="jr-checks__list">
        {items.map((t, i) => (
          <li key={i} className="jr-check">
            <span className="jr-check__dot">
              <svg viewBox="0 0 28 28" fill="none">
                <path d="M5 14.5 L11 20 L23 7" stroke="#F1ECE2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <h3>{t}</h3>
          </li>
        ))}
      </ul>
    </section>
  );
}

window.Checklist = Checklist;

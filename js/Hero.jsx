function Hero() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const t = setTimeout(() => ref.current && ref.current.classList.add('is-mounted'), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <header className="jr-hero" id="index" ref={ref}>
      <img className="jr-hero__shape s-pill jr-shape" src="assets/shapes/pill-outline.svg" alt=""/>
      <img className="jr-hero__shape s-circle-o jr-shape" src="assets/shapes/circle-outline.svg" alt=""/>
      <img className="jr-hero__shape s-hex-b jr-shape" src="assets/shapes/hexagon-blue.svg" alt=""/>
      <img className="jr-hero__shape s-square jr-shape" src="assets/shapes/square-outline.svg" alt=""/>
      <img className="jr-hero__shape s-circle-b jr-shape" src="assets/shapes/circle-blue.svg" alt=""/>
      <img className="jr-hero__shape s-pill-b jr-shape" src="assets/shapes/pill-blue.svg" alt=""/>

      <div className="jr-hero__top">
        <span className="jr-hero__eyebrow">Senior Solutions Engineer · Sanlam Fintech · Cape Town</span>
      </div>

      <div className="jr-hero__name">
        <span>Jannik</span>
        <span>Richter</span>
      </div>

      <div className="jr-hero__line">
        <span className="jr-label-sm jr-annot">fourteen years</span>
        <h1>Distributed systems<br/>and the agents that run on them.</h1>
        <span className="jr-label-sm jr-annot">still here</span>
      </div>

      <div className="jr-hero__sub">
        <span className="jr-hero__role">Currently: Sanlam Fintech · PoltergeistAI · Hive · 2026</span>
        <span className="jr-label-sm jr-annot jr-hero__scroll">scroll ↓</span>
      </div>
    </header>
  );
}

window.Hero = Hero;

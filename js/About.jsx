function About() {
  return (
    <section className="jr-about" id="about">
      <div className="jr-about__left">
        <h2>Engineer at<br/><i>Sanlam Fintech</i>.<br/>Open source<br/>on the side.</h2>
      </div>
      <div className="jr-about__right">
        <div className="jr-about__portrait">
          <img src="assets/portrait.jpg" alt="Jannik Richter — Cape Town" loading="lazy"/>
        </div>
        <p className="jr-about__copy">
          Senior Solutions Engineer at <strong>Sanlam Fintech</strong>, fourteen
          years in. I work between modern front-ends and the distributed systems
          behind them — currently event-driven Java on AWS for financial services.
        </p>
        <p className="jr-about__copy">
          On the side: founder at <strong>PoltergeistAI</strong> (deterministic
          LLM programming on Claude) and <strong>Reduced Recipes</strong>.
          Open source as a habit — <strong>Hive</strong> (multi-agent orchestrator
          modelled on agile teams), and contributions across the agentic ecosystem.
          86 public repos, a few people actually use.
        </p>
        <p className="jr-about__copy">
          The rest of my time goes to game dev (Unreal, Bevy, MonoGame), music
          (a few albums, a C++ VST monorepo), and cooking through every regional
          curry I can find.
        </p>
        <a className="jr-link" href="#experience">See the timeline →</a>
      </div>
    </section>
  );
}

window.About = About;

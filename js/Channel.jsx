function Channel() {
  return (
    <section className="jr-channel" id="channel">
      <a className="jr-channel__inner" href="https://www.youtube.com/@nikrich" target="_blank" rel="noopener noreferrer">
        <div className="jr-channel__left">
          <span className="jr-eyebrow">Also on YouTube</span>
          <h2>I make videos<br/>about <i>building things</i>.</h2>
          <p className="jr-channel__copy">
            Distributed systems, game development, linear content creation,
            anything 3D. Long-form, no clickbait, a lot of editing.
          </p>
          <span className="jr-channel__cta">
            <span>youtube.com/@nikrich</span>
            <span className="jr-channel__arrow">→</span>
          </span>
        </div>
        <div className="jr-channel__right">
          <img className="jr-channel__avatar" src="assets/social/youtube-avatar.jpg" alt="Jannik Richter on YouTube"/>
          <svg className="jr-channel__play" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M8 5v14l11-7z" fill="currentColor"/>
          </svg>
        </div>
      </a>
    </section>
  );
}

window.Channel = Channel;

function Footer() {
  return (
    <footer className="jr-footer">
      <div className="jr-footer__meta">
        <div className="jr-footer__col">
          <span className="jr-eyebrow">Site built with</span>
          <ul>
            <li>React</li>
            <li>Vanilla CSS</li>
            <li>A lot of restraint</li>
          </ul>
        </div>
        <div className="jr-footer__col">
          <span className="jr-eyebrow">Find me</span>
          <ul>
            <li><a href="mailto:jannik811@gmail.com">Email</a></li>
            <li><a href="https://www.linkedin.com/in/nikrich/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="https://github.com/nikrich" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://www.youtube.com/@nikrich" target="_blank" rel="noopener noreferrer">YouTube</a></li>
            <li><a href="https://getpoltergeist.com" target="_blank" rel="noopener noreferrer">Poltergeist</a></li>
            <li><a href="https://reduced.recipes" target="_blank" rel="noopener noreferrer">Reduced Recipes</a></li>
          </ul>
        </div>
        <div className="jr-footer__col">
          <span className="jr-eyebrow">Elsewhere</span>
          <ul>
            <li><a href="#writing">Writing</a></li>
            <li><a href="#now">Now</a></li>
            <li><a href="#experience">Experience</a></li>
          </ul>
        </div>
      </div>

      <div className="jr-footer__billboard">
        <span>Jannik</span>
        <img src="assets/logo/monogram.svg" alt="JR" className="jr-footer__mono"/>
        <span>Richter</span>
      </div>

      <div className="jr-footer__base">
        <span className="jr-footer__role">Senior Solutions Engineer · Sanlam Fintech · Cape Town · 2026</span>
        <span className="jr-label">Open for select work — Q3</span>
      </div>
    </footer>
  );
}

window.Footer = Footer;

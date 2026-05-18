function Contact() {
  const [copied, setCopied] = React.useState(false);
  const email = 'jannik811@gmail.com';
  const copy = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="jr-contact" id="contact">
      <h2>Get in <i>touch</i>.</h2>
      <p className="jr-contact__sub">
        Distributed systems, agent orchestration, or just engineering talk —
        happy to hear from you.
      </p>
      <button className="jr-contact__cta" onClick={copy}>
        <span className="jr-contact__cta-lbl">{copied ? 'Copied — your move' : "Let's talk"}</span>
        <span className="jr-contact__cta-email">{email}</span>
      </button>
      <div className="jr-contact__socials">
        <a href="https://www.linkedin.com/in/nikrich/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://github.com/nikrich" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.youtube.com/@nikrich" target="_blank" rel="noopener noreferrer">YouTube</a>
        <a href="https://getpoltergeist.com" target="_blank" rel="noopener noreferrer">Poltergeist</a>
        <a href="https://reduced.recipes" target="_blank" rel="noopener noreferrer">Reduced Recipes</a>
        <a href={"mailto:" + email}>Email</a>
      </div>
      <div className="jr-contact__shapes">
        <img src="assets/shapes/circle-blue.svg" alt=""/>
        <img src="assets/shapes/pill-outline.svg" alt=""/>
        <img src="assets/shapes/hexagon-blue.svg" alt=""/>
      </div>
    </section>
  );
}

window.Contact = Contact;

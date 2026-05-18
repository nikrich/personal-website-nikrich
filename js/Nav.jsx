function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [section, setSection] = React.useState('index');

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = ['index', 'services', 'work', 'about', 'channel', 'writing'];
      let current = 'index';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top < 200) current = id;
      }
      setSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={"jr-nav" + (scrolled ? " is-scrolled" : "")}>
      <a href="#index" className="jr-nav__brand">
        <span className="jr-nav__first">Jannik</span>
        <span className="jr-nav__last">Richter</span>
      </a>
      <div className="jr-nav__center">
        <a href="#index" className={section === 'index' ? 'active' : ''}>Index</a>
        <a href="#work" className={section === 'work' || section === 'services' ? 'active' : ''}>Work</a>
        <a href="#about" className={section === 'about' ? 'active' : ''}>About</a>
        <a href="#channel" className={section === 'channel' ? 'active' : ''}>Channel</a>
        <a href="#writing" className={section === 'writing' ? 'active' : ''}>Writing</a>
      </div>
      <a href="#contact" className="jr-nav__cta">Let's talk
        <span className="jr-nav__dot"></span>
      </a>
    </nav>
  );
}

window.Nav = Nav;

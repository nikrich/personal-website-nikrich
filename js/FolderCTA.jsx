function FolderCTA() {
  return (
    <section className="jr-folder-cta">
      <div className="jr-folder-cta__row">
        <h2>Curious<i>?…</i><br/>Open the</h2>
        <a className="jr-folder-cta__folder" href="#work">
          <img src="assets/folder/folder.svg" alt="Projects folder"/>
          <span className="jr-label">projects</span>
        </a>
      </div>
      <div className="jr-folder-cta__or">
        <span className="jr-label">Or keep scrolling</span>
        <span className="jr-eyebrow">Selected Work</span>
      </div>
    </section>
  );
}

window.FolderCTA = FolderCTA;

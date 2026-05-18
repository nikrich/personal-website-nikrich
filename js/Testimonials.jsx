function Testimonials() {
  const quotes = [
    {
      text: "I worked with Jannik at 24.com for around 7 years and saw him grow from front-end developer through the ranks to solutions architect. His passion for technology is matched by his passion for people. He leads by example and shares without hesitation, uplifts when it's needed, and is brave when bravery is called for. There are very few I can recommend as highly.",
      name: 'Eldon Swart',
      role: 'Software Engineering Lead · 24.com',
      avatar: 'linear-gradient(135deg,#1F4BFF,#0F33D6)',
    },
    {
      text: "I've had the pleasure of working with Jannik for over four years — and in that time he's been far more than a colleague. Mentor, collaborator, and a huge influence on the developer I am today. A strong, capable developer with an exceptional ability to guide and support those around him. Any team would be lucky to have him.",
      name: 'Dylan Jones',
      role: 'Frontend Developer · 24.com',
      avatar: 'linear-gradient(135deg,#EAE2D2,#A98D5B)',
    },
    {
      text: "Six years at 24.com, partnered on some of the most technically demanding projects in the company — including the complete rebuild of News24. Kinetic energy that translates directly into results. Always ahead of the curve, often building prototypes before others have finished framing the problem. Relentless in his pursuit of elegant, scalable solutions. I'd work with him again in a heartbeat.",
      name: 'Eduard de Klerk',
      role: 'Solutions Architect · ex-24.com',
      avatar: 'linear-gradient(135deg,#2A2620,#5A4F3D)',
    },
    {
      text: "We overlapped for 5 years at 24.com. Hardworking, committed, passionate — always striving to improve the areas he worked on. Integral in our replatform project. Works well with team members from senior stakeholders to software interns while making everyone feel valued and respected. And brought a special flare of fun.",
      name: 'Reeza Odendaal',
      role: 'Senior Lead Product Manager · 24.com',
      avatar: 'linear-gradient(135deg,#7A5230,#4A3F30)',
    },
  ];
  return (
    <section className="jr-testi" id="testimonials">
      <div className="jr-testi__inner">
        <div className="jr-testi__head">
          <span className="jr-eyebrow">Kind words</span>
          <h2>From people<br/>I've <i>worked with</i>.</h2>
        </div>
        <div className="jr-testi__grid">
          {quotes.map((q, i) => (
            <article key={i} className="jr-quote">
              <span className="jr-quote__mark">"</span>
              <p>{q.text}</p>
              <div className="jr-quote__who">
                <div className="jr-quote__avatar" style={{background: q.avatar}}></div>
                <div>
                  <div className="jr-quote__name">{q.name}</div>
                  <div className="jr-quote__role">{q.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Testimonials = Testimonials;

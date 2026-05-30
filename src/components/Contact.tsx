import "./Contact.css";

const socials = [
  { label: "GitHub", url: "https://github.com/rahuldkjain" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/rahuldkjain/" },
  { label: "Fiverr", url: "https://www.fiverr.com/rahuldkjain" },
  { label: "Twitter", url: "https://twitter.com/Rahuldkjain" },
];

export default function Contact() {
  return (
    <footer id="contact" className="contact" aria-label="Contact">
      <div className="contact__content">
        <h2 className="contact__headline">
          Let's build
          <br />
          <em>something.</em>
        </h2>
        <div className="contact__details">
          <a href="mailto:rahuldkjain@gmail.com" className="contact__email">
            rahuldkjain@gmail.com
          </a>
          {/* <a href="tel:+919622777000" className="contact__phone">
            +91 9622 777 000
          </a> */}
        </div>
        <nav className="contact__socials" aria-label="Social links">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="contact__social-link"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="contact__foot">
        <span className="contact__copy">© 2026 Rahul Jain</span>
        <span className="contact__made">Crafted with precision.</span>
      </div>
    </footer>
  );
}

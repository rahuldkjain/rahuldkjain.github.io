import { useEffect, useRef } from 'react';
import './Brands.css';

const brands = [
  { name: 'Zolo', file: 'zolo.svg', url: 'https://zolostays.com' },
  { name: 'DoseMedbox', file: 'dosemedbox.svg', url: 'https://dosemedbox.com' },
  { name: 'CRED', file: 'cred.svg', url: 'https://cred.club' },
  { name: 'ThoughtSpot', file: 'thoughtspot.svg', url: 'https://thoughtspot.com' },
  { name: 'Ema', file: 'ema.svg', url: 'https://ema.co' },
  { name: 'Tradyon', file: 'tradyon.svg', url: '#' },
  { name: 'HelloCounsel', file: 'hellocounsel.svg', url: '#' },
  { name: 'Tenora', file: 'tenora.svg', url: '#' },
];

export default function Brands() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.brands__cell');
    if (!items) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="brands" ref={sectionRef} aria-label="Worked with">
      <div className="brands__header">
        <h2 className="brands__title">Worked With</h2>
        <p className="brands__lede">
          A decade of building for product teams &mdash; from venture-backed startups
          to public companies.
        </p>
      </div>
      <ul className="brands__grid">
        {brands.map((b, i) => (
          <li
            key={b.name}
            className="brands__cell reveal"
            style={{ '--delay': `${i * 0.04}s` } as Record<string, string>}
          >
            {b.url && b.url !== '#' ? (
              <a
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="brands__logo"
                aria-label={b.name}
                title={b.name}
              >
                <img
                  src={`/logos/${b.file}`}
                  alt={b.name}
                  className={`brands__img brands__img--${b.file.replace('.svg', '')}`}
                />
              </a>
            ) : (
              <span className="brands__logo" aria-label={b.name} title={b.name}>
                <img
                  src={`/logos/${b.file}`}
                  alt={b.name}
                  className={`brands__img brands__img--${b.file.replace('.svg', '')}`}
                />
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

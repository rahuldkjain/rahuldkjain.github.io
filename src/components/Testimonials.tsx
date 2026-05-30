import { useEffect, useRef } from 'react';
import './Testimonials.css';

const quotes = [
  {
    text: "Rahul is an incredibly talented developer. He delivered a high-quality product on time and went above and beyond what was asked.",
    author: "Client via Fiverr",
  },
  {
    text: "Working with Rahul was a pleasure. He understood the brief immediately and produced exactly what we needed, with impeccable attention to detail.",
    author: "Client via Fiverr",
  },
  {
    text: "Outstanding work! The animations were smooth, the code was clean, and communication was excellent throughout.",
    author: "Client via Fiverr",
  },
  {
    text: "Highly recommend Rahul for any frontend or animation work. He brings creative ideas and executes them perfectly.",
    author: "Client via Fiverr",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.testimonials__quote');
    if (!items) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="testimonials" ref={sectionRef} aria-label="Testimonials">
      <div className="testimonials__header">
        <h2 className="testimonials__title">What clients say</h2>
      </div>
      <div className="testimonials__grid">
        {quotes.map((q, i) => (
          <blockquote
            key={i}
            className="testimonials__quote reveal"
            style={{ '--delay': `${i * 0.1}s` } as Record<string, string>}
          >
            <p className="testimonials__text">"{q.text}"</p>
            <footer className="testimonials__author">— {q.author}</footer>
          </blockquote>
        ))}
      </div>
      <div className="testimonials__screenshots-note">
        <a
          href="https://www.fiverr.com/rahuldkjain"
          target="_blank"
          rel="noopener noreferrer"
          className="testimonials__fiverr-link"
        >
          See all reviews on Fiverr <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}

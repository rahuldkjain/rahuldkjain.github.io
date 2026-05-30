import { useEffect, useRef } from 'react';
import './Work.css';

const projects = [
  {
    num: '01',
    title: 'CRED Pay — notifyme',
    desc: 'Webpage for scan & pay launch on CRED app.',
    tags: 'Product · Frontend',
    url: 'https://cred.club/notifyme',
  },
  {
    num: '02',
    title: 'NeoPOP Component Library',
    desc: 'Brand new UI framework engineered to bring the magic of NeoPOP to life.',
    tags: 'Open Source · 800+ Stars',
    url: 'https://github.com/CRED-CLUB/neopop-web',
  },
  {
    num: '03',
    title: 'GitHub Profile README Generator',
    desc: 'Open source tool to create GitHub profile READMEs with stats and badges.',
    tags: 'Open Source · 21K+ Stars',
    url: 'https://github.com/rahuldkjain/github-profile-readme-generator',
  },
  {
    num: '04',
    title: 'Ema',
    desc: 'Full-stack web application built for client engagement and automation.',
    tags: 'Freelance · Full-stack',
    url: '#',
  },
  {
    num: '05',
    title: 'Tradyon',
    desc: 'Web platform built with modern CI/CD pipelines and production-grade infrastructure.',
    tags: 'Freelance · DevOps',
    url: '#',
  },
  {
    num: '06',
    title: 'Tenora',
    desc: 'Client project — interactive frontend with custom animations.',
    tags: 'Freelance · Frontend',
    url: '#',
  },
  {
    num: '07',
    title: 'HelloCounsel',
    desc: 'Legal tech platform with a focus on clean, accessible interface design.',
    tags: 'Freelance · Product',
    url: '#',
  },
  {
    num: '08',
    title: 'Dose Medbox',
    desc: 'E-commerce website to showcase and sell smart medication dispensers.',
    tags: 'Freelance · Gatsby · Tailwind',
    url: 'https://dosemedbox.com/',
  },
  {
    num: '09',
    title: 'Opportunities by Zolo',
    desc: 'Web app helping students land their first internships and professional roles.',
    tags: 'Next.js · styled-components',
    url: 'https://opportunity.zolostays.com/',
  },
  {
    num: '10',
    title: 'Grayzones Animation',
    desc: 'Interactive playground that triggers SVG animations from keyboard keystrokes.',
    tags: 'Interactive · SVG',
    url: 'https://grayzones-animation.vercel.app/',
  },
  {
    num: '11',
    title: 'SVG Animations',
    desc: 'Scalable SVG animations using GSAP & JS — a personal playground for animation craft.',
    tags: 'Personal · GSAP · CSS',
    url: 'https://rahuldkjain-animations.vercel.app/',
  },
];

export default function Work() {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const items = listRef.current?.querySelectorAll('.work__item');
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
    <section id="work" className="work" aria-label="Selected Work">
      <div className="work__header">
        <h2 className="work__title">Selected Work</h2>
      </div>
      <ol className="work__list" ref={listRef} role="list">
        {projects.map((p) => (
          <li key={p.num} className="work__item reveal">
            <a
              href={p.url}
              target={p.url !== '#' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="work__link"
            >
              <span className="work__num">{p.num}</span>
              <div className="work__info">
                <span className="work__name">{p.title}</span>
                <span className="work__desc">{p.desc}</span>
                <span className="work__tags">{p.tags}</span>
              </div>
              <span className="work__arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

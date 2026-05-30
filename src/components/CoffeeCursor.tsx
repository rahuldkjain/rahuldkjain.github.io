import { useEffect, useRef, useState } from 'react';
import './CoffeeCursor.css';

const HOVER_SELECTOR = 'a, button, [data-cursor]';
const LERP = 0.18;

export default function CoffeeCursor() {
  const [enabled, setEnabled] = useState(false);
  const beanRef = useRef<HTMLDivElement>(null);

  // Decide once whether to activate: fine + hovering pointer, motion allowed.
  useEffect(() => {
    const canHover =
      window.matchMedia('(pointer: fine)').matches &&
      window.matchMedia('(hover: hover)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(canHover);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const bean = beanRef.current;
    if (!bean) return;

    document.body.classList.add('has-coffee-cursor');

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let visible = false;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        bean.classList.add('coffee-cursor--visible');
      }
      const interactive = (e.target as Element | null)?.closest(HOVER_SELECTOR);
      bean.classList.toggle('coffee-cursor--hover', Boolean(interactive));
    };

    const onLeave = () => {
      visible = false;
      bean.classList.remove('coffee-cursor--visible');
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * LERP;
      pos.y += (target.y - pos.y) * LERP;
      bean.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.body.classList.remove('has-coffee-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={beanRef} className="coffee-cursor" aria-hidden="true">
      <div className="coffee-cursor__bean">
        <svg viewBox="0 0 32 32" width="32" height="32">
          <ellipse
            cx="16"
            cy="16"
            rx="9"
            ry="13"
            transform="rotate(-30 16 16)"
            fill="var(--ink, #3a2418)"
          />
          <path
            d="M16 5 C 11 11, 21 21, 16 27"
            transform="rotate(-30 16 16)"
            fill="none"
            stroke="var(--caramel, #8a5520)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

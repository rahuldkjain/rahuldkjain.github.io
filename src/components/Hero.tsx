import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Hero.css';

type WispPreset = {
  drawMin: number;
  drawMax: number;
  eraseMin: number;
  eraseMax: number;
  idleMin: number;
  idleMax: number;
  startYMin: number;
  startYMax: number;
  endYMin: number;
  endYMax: number;
  startDelay: number;
};

// Wide variance per wisp + tight idle range = cycles never fall into a pattern
// AND there's never a long silence (at worst ~0.9s with all three at max idle).
// Each wisp re-rolls every loop, so two wisps that happen to sync on cycle N
// will be very far apart by cycle N+1.
const WISP_PRESETS: WispPreset[] = [
  { drawMin: 1.8, drawMax: 2.5, eraseMin: 0.5, eraseMax: 0.8, idleMin: 0.10, idleMax: 0.7, startYMin: 6,  startYMax: 14, endYMin: -10, endYMax: -16, startDelay: 0.0 },
  { drawMin: 1.6, drawMax: 2.7, eraseMin: 0.6, eraseMax: 0.9, idleMin: 0.20, idleMax: 0.8, startYMin: 4,  startYMax: 12, endYMin: -8,  endYMax: -14, startDelay: 0.6 },
  { drawMin: 1.9, drawMax: 2.4, eraseMin: 0.5, eraseMax: 0.7, idleMin: 0.05, idleMax: 0.6, startYMin: 8,  startYMax: 16, endYMin: -12, endYMax: -18, startDelay: 1.2 },
];

const FADE_IN_DURATION = 0.35;

function animateWisp(path: SVGPathElement, preset: WispPreset): gsap.core.Timeline {
  const length = path.getTotalLength();

  // Static path setup — never changes during the animation.
  gsap.set(path, {
    strokeDasharray: length,
    transformOrigin: '50% 100%',
  });

  // Per-cycle state. onRepeat re-rolls these so paired tweens (e.g. the two
  // erase tweens) always share an identical duration and finish in lock-step.
  // Without this, dashoffset and opacity would each pick their own random
  // duration; the shorter one ending first caused the visible "blink" because
  // `>` then pointed to the wrong moment.
  const state = {
    startY: gsap.utils.random(preset.startYMin, preset.startYMax),
    endY: gsap.utils.random(preset.endYMin, preset.endYMax),
    drawDur: gsap.utils.random(preset.drawMin, preset.drawMax),
    eraseDur: gsap.utils.random(preset.eraseMin, preset.eraseMax),
    idleDur: gsap.utils.random(preset.idleMin, preset.idleMax),
  };

  const tl = gsap.timeline({
    repeat: -1,
    repeatRefresh: true,
    delay: preset.startDelay,
    onRepeat: () => {
      state.startY = gsap.utils.random(preset.startYMin, preset.startYMax);
      state.endY = gsap.utils.random(preset.endYMin, preset.endYMax);
      state.drawDur = gsap.utils.random(preset.drawMin, preset.drawMax);
      state.eraseDur = gsap.utils.random(preset.eraseMin, preset.eraseMax);
      state.idleDur = gsap.utils.random(preset.idleMin, preset.idleMax);
    },
  });

  // Cycle starts with a clean snap to the start state (re-rolled startY,
  // path fully un-drawn, fully invisible). Inside-timeline .set runs each
  // loop, eliminating any leftover state from the previous iteration.
  tl.set(path, {
    y: () => state.startY,
    strokeDashoffset: length,
    opacity: 0,
  });

  // Phase 1 — fade in + draw + rise (all parallel at position 0).
  // strokeDashoffset and y share `state.drawDur` so they finish together.
  tl.to(path, {
    opacity: 1,
    duration: FADE_IN_DURATION,
    ease: 'power1.out',
  }, 0)
    .to(path, {
      strokeDashoffset: 0,
      duration: () => state.drawDur,
      ease: 'none',
    }, 0)
    .to(path, {
      y: () => state.endY,
      duration: () => state.drawDur,
      ease: 'expo.out',
    }, 0);

  // Phase 2 — dissipate in place. Both share `state.eraseDur` so the dash
  // wipe and the opacity fade finish at exactly the same instant.
  tl.to(path, {
    strokeDashoffset: -length,
    duration: () => state.eraseDur,
    ease: 'none',
  }, '>')
    .to(path, {
      opacity: 0,
      duration: () => state.eraseDur,
      ease: 'power2.in',
    }, '<');

  // Idle gap — short and randomized. Tight range keeps the trio nearly
  // continuous (at worst ~1s of full silence if all three roll their max
  // idle simultaneously, which is rare and feels like a natural breath).
  tl.to({}, { duration: () => state.idleDur });

  return tl;
}

export default function Hero() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const steam1Ref = useRef<SVGPathElement>(null);
  const steam2Ref = useRef<SVGPathElement>(null);
  const steam3Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const refs = [steam1Ref, steam2Ref, steam3Ref];

    if (reduced) {
      // Static fully-drawn state when the user prefers reduced motion
      refs.forEach((r) => {
        if (!r.current) return;
        const length = r.current.getTotalLength();
        gsap.set(r.current, {
          strokeDasharray: length,
          strokeDashoffset: 0,
          opacity: 0.55,
          y: 0,
        });
      });
      return;
    }

    const ctx = gsap.context(() => {
      refs.forEach((r, i) => {
        if (r.current) animateWisp(r.current, WISP_PRESETS[i]);
      });
    }, scopeRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero__content">
        <p className="hero__eyebrow">Rahul Jain</p>
        <svg
          className="hero__flourish"
          viewBox="0 0 120 14"
          width="120"
          height="14"
          aria-hidden="true"
        >
          <path
            d="M2 8 C 22 2, 42 12, 62 6 S 102 10, 118 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <h1 className="hero__headline">
          I build web experiences<br />
          people <em>remember.</em>
        </h1>
        <p className="hero__sub">
          Freelance developer &amp; animator — full-stack, frontend-obsessed.
          Brewed slow, like a good cortado.
        </p>
        <a href="#work" className="hero__cta">
          See my work <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className="hero__art" aria-hidden="true" ref={scopeRef}>
        <svg viewBox="0 0 280 320" xmlns="http://www.w3.org/2000/svg">
          {/* steam — three wisps drifting up */}
          <g className="hero__steam" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path ref={steam1Ref} className="hero__steam-1" d="M120 100 C 116 84, 128 74, 122 56 S 116 32, 122 14" />
            <path ref={steam2Ref} className="hero__steam-2" d="M150 100 C 154 86, 144 72, 152 56 S 158 30, 150 14" />
            <path ref={steam3Ref} className="hero__steam-3" d="M180 100 C 176 86, 188 74, 180 56 S 176 32, 184 14" />
          </g>

          {/* cup */}
          <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="150" cy="118" rx="64" ry="10" />
            <path d="M86 118 L 96 232 Q 96 248, 112 250 L 188 250 Q 204 248, 204 232 L 214 118" />
            <ellipse cx="150" cy="118" rx="60" ry="8" opacity="0.45" />
            <path d="M212 142 C 240 144, 244 184, 226 200 C 222 204, 218 204, 214 200" />
            <ellipse cx="150" cy="262" rx="92" ry="10" />
            <path d="M58 262 Q 58 274, 80 276 L 220 276 Q 242 274, 242 262" />
          </g>

          <g className="hero__beans" fill="currentColor" opacity="0.7">
            <ellipse cx="240" cy="284" rx="8" ry="5" transform="rotate(18 240 284)" />
            <path d="M234 284 Q 240 281, 246 284" fill="none" stroke="var(--paper)" strokeWidth="1.2" strokeLinecap="round" transform="rotate(18 240 284)" />
          </g>
        </svg>
      </div>
    </section>
  );
}

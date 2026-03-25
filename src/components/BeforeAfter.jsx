/**
 * BeforeAfter Component
 * GSAP ScrollTrigger-based horizontal before/after image reveal
 * Scroll-pinned animation — after image wipes in from right as you scroll
 */

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BeforeAfter = ({
  beforeImage = '/images/Modern.png',
  afterImage = '/images/Modern 1.png',
  beforeLabel = 'Before',
  afterLabel = 'After',
}) => {
  const sectionRef = useRef(null);
  const afterDivRef = useRef(null);
  const afterImgRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const afterDiv = afterDivRef.current;
    const afterImg = afterImgRef.current;
    if (!section || !afterDiv || !afterImg) return;

    // Set initial state via gsap (not CSS transform) so GSAP owns it
    gsap.set(afterDiv, { xPercent: 100 });
    gsap.set(afterImg, { xPercent: -100 });

    // Small delay to allow ScrollTrigger to measure layout after paint
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // Desktop: Pinned animation
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => '+=' + section.offsetWidth,
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
          defaults: { ease: 'none' },
        });

        tl.to(afterDiv, { xPercent: 0 })
          .to(afterImg, { xPercent: 0 }, 0);
      });

      // Mobile: Unpinned, scrolly animation (no gap)
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',   // starts when image enters screen 
            end: 'bottom 20%',  // finishes before it leaves
            scrub: 1,
            pin: false,         // NO GAP!
          },
          defaults: { ease: 'none' },
        });

        tl.to(afterDiv, { xPercent: 0 })
          .to(afterImg, { xPercent: 0 }, 0);
      });
    }, section);

    // Refresh after a tick so measurements are correct
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      ctx.revert(); // cleanly kills only this component's triggers
    };
  }, []);

  return (
    /* Comparison section — GSAP will pin this */
    <div
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 9',
        backgroundColor: '#111',
        overflow: 'hidden',
      }}
    >
      {/* ── Before image (static, behind) ── */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          src={beforeImage}
          alt={beforeLabel}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* <span style={labelStyle('left')}>
          {beforeLabel}
        </span> */}
      </div>

      {/* ── After image (slides in from right) ── */}
      <div
        ref={afterDivRef}
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          /* initial position set by gsap.set above */
        }}
      >
        <img
          ref={afterImgRef}
          src={afterImage}
          alt={afterLabel}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            /* initial position set by gsap.set above */
          }}
        />
        {/* <span style={labelStyle('right')}>
          {afterLabel}
        </span> */}
      </div>
    </div>
  );
};

/* ── helpers ── */
const labelStyle = (side) => ({
  position: 'absolute',
  bottom: '1.5rem',
  [side]: '1.5rem',
  fontFamily: "'Urbanist', sans-serif",
  fontSize: '0.7rem',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: '#fff',
  background: side === 'left' ? 'rgba(0,0,0,0.45)' : 'rgba(43,0,10,0.6)',
  padding: '4px 14px',
  borderRadius: '2px',
});

export default BeforeAfter;

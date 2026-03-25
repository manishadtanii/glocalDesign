import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SectionHeader = ({ subtitle, title, titleAccent }) => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper to split text into letter spans without changing layout
  const splitLetters = (text) => {
    if (!text) return null;
    return text.split('').map((char, i) => (
      <span 
        key={i} 
        className="header-letter" 
        style={{ 
          display: 'inline-block', 
          lineHeight: '1.2em', 
          transformOrigin: '0% 50%',
          perspective: '1000px',
          backfaceVisibility: 'hidden'
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray('.header-letter');

      gsap.fromTo(letters,
        { 
          rotateY: -90,
          opacity: 0,
          scale: 0.8
        },
        { 
          rotateY: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.03,
          ease: "power2.out",
          duration: 1.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%", // Trigger when header is near bottom of viewport
            toggleActions: "play none none none"
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{ 
        padding: '6rem 2rem 4rem 2rem', 
        textAlign: 'center', 
        backgroundColor: '#FAF8F5',
        width: '100%',
        position: 'relative',
        zIndex: 10,
        perspective: '1000px'
      }}
    >
      <p style={{
        fontFamily: "'Urbanist', sans-serif",
        fontSize: '0.75rem',
        letterSpacing: '0.24em',
        textTransform: 'uppercase',
        color: '#8b8b8b',
        marginBottom: '1.2rem',
        fontWeight: 600,
        borderBottom: '1px solid #e2d8d8ff',
        paddingBottom: '2px',
        display: 'inline-block',
      }}>
        {splitLetters(subtitle || 'Services')}
      </p>
      <h2 style={{
        fontFamily: "'Lacroom', serif",
        fontWeight: 400,
        fontSize: isMobile ? 'clamp(1.8rem, 6vw, 2.5rem)' : 'clamp(2.5rem, 6vw, 4.2rem)',
        color: '#2b2b2b',
        lineHeight: 1.05,
      }}>
        {splitLetters(title || 'Where Ideas Become')}
        <br />
        <span style={{ color: '#b2000a' }}>{splitLetters(titleAccent || 'Beautiful Spaces')}</span>
      </h2>
    </div>
  );
};

export default SectionHeader;

/**
 * ProjectsCarousel Component
 * 3D Coverflow carousel — cards rotate in perspective like a circular wheel
 * Premium interior design portfolio showcase
 * Fully solid background — no canvas bleed-through
 */

import React, { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    title: "Bachelor's Pad",
    location: 'Mumbai',
    image: '/projectcarousel/BACHELOR\'S PAD, MUMBAI.jpeg',
  },
  {
    id: 2,
    title: 'Builder Apartment',
    location: 'Gurugram',
    image: '/projectcarousel/BUILDER APARTMENT, GURUGRAM.jpeg',
  },
  {
    id: 3,
    title: 'Classical House',
    location: 'Anand Niketan',
    image: '/projectcarousel/classical house, anand niketan.jpeg',
  },
  {
    id: 4,
    title: 'Jaipur Retreat',
    location: 'Jaipur',
    image: '/projectcarousel/JAIPUR RETREAT.png',
  },
  {
    id: 5,
    title: 'Kaveri House',
    location: 'Chennai',
    image: '/projectcarousel/KAVERI HOUSE, CHENNAI.jpeg',
  },
  {
    id: 6,
    title: 'Krishna Niwas',
    location: 'Chhatarpur',
    image: '/projectcarousel/KRISHNA NIWAS, CHATTARPUR.jpeg',
  },
  {
    id: 7,
    title: 'Lake House',
    location: 'Kochi',
    image: '/projectcarousel/LAKE HOUSE, KOCHI.png',
  },
  {
    id: 8,
    title: 'Modern House',
    location: 'Lucknow',
    image: '/projectcarousel/MODERN HOUSE, LUCKNOW.jpeg',
  },
  {
    id: 9,
    title: 'Modern Luxury Residence',
    location: 'Vasant Vihar',
    image: '/projectcarousel/MODERN LUXURY RESIDENCE, VASANT VIHAR.jpeg',
  },
  {
    id: 10,
    title: 'Scandinavian Holiday Home',
    location: 'Gurugram',
    image: '/projectcarousel/SCANDINAVIAN HOLIDAY HOME\'.jpeg',
  },
];

const CARD_W = 280;
const CARD_H = 420;

const ProjectsCarousel = ({ subtitle }) => {
  const [activeIdx, setActiveIdx] = useState(2);
  const [isMobile, setIsMobile] = useState(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragDelta = useRef(0);
  const sectionRef = useRef(null);

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
        className="carousel-header-letter" 
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
      const letters = gsap.utils.toArray('.carousel-header-letter');

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
          stagger: 0.02,
          ease: "power2.out",
          duration: 1.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);
// ... rest of the component ...

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  /* Navigate to next/prev */
  const goTo = useCallback((idx) => {
    setActiveIdx(clamp(idx, 0, PROJECTS.length - 1));
  }, []);

  /* Mouse drag */
  const onMouseDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragDelta.current = 0;
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    dragDelta.current = e.clientX - dragStartX.current;
  };

  const onMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
  };

  /* Touch support */
  const onTouchStart = (e) => {
    dragStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    const delta = e.changedTouches[0].clientX - dragStartX.current;
    if (delta < -50) goTo(activeIdx + 1);
    else if (delta > 50) goTo(activeIdx - 1);
  };

  /* Keyboard support */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') goTo(activeIdx + 1);
      if (e.key === 'ArrowLeft') goTo(activeIdx - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIdx, goTo]);

  /* Per-card 3D transform */
  const getCardStyle = (i) => {
    const offset = i - activeIdx;
    const absOff = Math.abs(offset);

    const rotateY = clamp(offset * -38, -80, 80);
    const scale = offset === 0 ? 1 : Math.max(0.72, 1 - absOff * 0.1);
    const tx = offset * (CARD_W * 0.58);
    const tz = offset === 0 ? 0 : -absOff * 80;
    const opacity = Math.max(0, 1 - absOff * 0.22);
    const zIndex = PROJECTS.length - absOff;

    return {
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: `${CARD_W}px`,
      height: `${CARD_H}px`,
      marginLeft: `-${CARD_W / 2}px`,
      marginTop: `-${CARD_H / 2}px`,
      borderRadius: '1.1rem',
      overflow: 'hidden',
      opacity,
      zIndex,
      transform: `translateX(${tx}px) translateZ(${tz}px) rotateY(${rotateY}deg) scale(${scale})`,
      transition: 'transform 0.65s cubic-bezier(0.34,1.1,0.64,1), opacity 0.5s ease',
      cursor: offset === 0 ? 'default' : 'pointer',
      boxShadow: offset === 0
        ? '0 32px 64px rgba(0,0,0,0.26)'
        : '0 12px 32px rgba(0,0,0,0.14)',
      willChange: 'transform',
    };
  };

  const active = PROJECTS[activeIdx];

  return (
    /* KEY FIX: solid background + relative positioning so canvas never shows */
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 20,
        width: '100%',
        backgroundColor: '#FAF8F5',
        paddingTop: '1.5rem', // Reduced from 5rem
        paddingBottom: '5rem',
        overflow: 'hidden',
        perspective: '1000px'
      }}
    >
      {/* ── Heading ── */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem', padding: '0 2rem' }}>
        
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
          {splitLetters(subtitle || 'Projects')}
        </p>

        <h2 style={{
          fontFamily: "'Lacroom', serif",
          fontWeight: 400,
          fontSize: isMobile ? 'clamp(1.8rem, 6vw, 2.5rem)' : 'clamp(2.5rem, 6vw, 4.2rem)',
          color: '#2b2b2b',
          lineHeight: 1.05,
          marginBottom: '1rem',
        }}>
          {splitLetters("A Testament To Excellence")}
        </h2>
        <p style={{
          fontFamily: "'Urbanist', sans-serif",
          fontWeight: 300,
          fontSize: isMobile ? '0.95rem' : '1.3rem',
          color: '#6b6b6b',
          maxWidth: '470px',
          lineHeight: 1.6,
          margin: '0 auto',
        }}>
          {splitLetters("A curated collection of ")}
          <span style={{ color: '#B2000A' }}>
            {splitLetters("spaces we’ve designed")}
          </span>
          {splitLetters(" and brought to life with thoughtful detail.")}
        </p>

        {/* ── View Projects Button ── */}
        <a
          href="https://glocaldesign.in/projects/"
          className="view-projects-btn"
          style={{
            marginTop: '2.5rem',
            padding: '0.85rem 2.6rem',
            backgroundColor: '#B2000A',
            color: '#FFFFFF',
            borderRadius: '50px',
            border: 'none',
            fontFamily: "'Urbanist', sans-serif",
            fontSize: '0.9rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 10px 30px rgba(178, 0, 10, 0.25)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            willChange: 'transform, box-shadow',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(178, 0, 10, 0.35)';
            e.currentTarget.style.backgroundColor = '#C7000B';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(178, 0, 10, 0.25)';
            e.currentTarget.style.backgroundColor = '#B2000A';
          }}
        >
          View Projects
        </a>
      </div>

      {/* ── 3D Stage ── */}
      <div
        style={{
          position: 'relative',
          height: `${CARD_H + 60}px`,
          perspective: '1100px',
          perspectiveOrigin: '50% 50%',
          userSelect: 'none',
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {PROJECTS.map((project, i) => (
          <div
            key={project.id}
            style={getCardStyle(i)}
            onClick={() => i !== activeIdx && goTo(i)}
            onMouseEnter={() => goTo(i)} // Automatically center on hover
          >
            <img
              src={project.image}
              alt={project.title}
              draggable={false}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                pointerEvents: 'none',
              }}
            />
            {/* Gradient overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)',
            }} />

            {/* Card info */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.1rem 1.3rem 1.4rem' }}>
              <h3 style={{
                fontFamily: "'Lacroom', serif",
                fontWeight: 400,
                fontSize: '1.15rem',
                color: '#fff',
                lineHeight: 1.2,
                marginBottom: '0.25rem',
              }}>
                {project.title}
              </h3>
              <p style={{
                fontFamily: "'Urbanist', sans-serif",
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.55)',
                letterSpacing: '0.05em',
              }}>
                📍 {project.location}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Active card label + dots ── */}
      <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
        <p style={{
          fontFamily: "'Urbanist', sans-serif",
          fontSize: '0.72rem',
          letterSpacing: '0.12em',
          color: '#9a9080',
          marginBottom: '1rem',
          textTransform: 'uppercase',
        }}>
          {activeIdx + 1} / {PROJECTS.length} — {active.title}
        </p>
        {/* Dot indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === activeIdx ? '1.8rem' : '0.45rem',
                height: '0.45rem',
                borderRadius: '100px',
                backgroundColor: i === activeIdx ? '#2b2b2b' : '#c8bfb5',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'width 0.4s cubic-bezier(0.34,1.1,0.64,1), background-color 0.3s ease',
              }}
            />
          ))}
        </div>
        {/* Arrow nav */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          {[
            { dir: -1, label: '←' },
            { dir: 1, label: '→' },
          ].map(({ dir, label }) => (
            <button
              key={dir}
              onClick={() => goTo(activeIdx + dir)}
              disabled={activeIdx + dir < 0 || activeIdx + dir >= PROJECTS.length}
              style={{
                width: '2.6rem',
                height: '2.6rem',
                borderRadius: '50%',
                border: '1px solid #d4c9be',
                background: 'transparent',
                color: '#2b2b2b',
                fontSize: '1.1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s, transform 0.2s',
                opacity: (activeIdx + dir < 0 || activeIdx + dir >= PROJECTS.length) ? 0.3 : 1,
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsCarousel;

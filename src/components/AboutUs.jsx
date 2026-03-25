/**
 * AboutUs Component
 * Interior design studio about section
 * Animations only - Preserving all original user styles
 */

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth < 768);
    updateMobile();
    window.addEventListener('resize', updateMobile);
    return () => window.removeEventListener('resize', updateMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = containerRef.current.querySelectorAll('.reveal-text');
      
      gsap.fromTo(
        elements,
        { 
          y: '105%', 
          rotate: 1, 
        },
        {
          y: '0%',
          rotate: 0,
          duration: 1.2,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%', // Trigger slightly earlier for better feel
            end: 'bottom 15%', // Hide slightly earlier for better feel
            toggleActions: 'play reverse play reverse', // REVEAL on enter, HIDE on leave
            invalidateOnRefresh: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full flex items-center justify-center"
      style={{
        backgroundColor: '#FAF8F5',
        minHeight: isMobile ? 'auto' : '100vh',
        paddingTop: isMobile ? '2rem' : '4rem',
        paddingBottom: isMobile ? '2rem' : '4rem',
      }}
    >
      <div 
        ref={containerRef}
        className="text-center px-6 max-w-3xl mx-auto"
      >
        {/* Label — ABOUT US */}
        <div className="flex justify-center mb-6">
          <div style={{ overflow: 'hidden' }}>
            <span
              className="reveal-text inline-block"
              style={{
                fontFamily: "'Urbanist', sans-serif",
                color: '#2b2b2b',
                fontSize: '0.80rem',
                fontWeight: 500,
                borderBottom: '1px solid #e2d8d8ff',
                textTransform: 'uppercase',
              }}
            >
              About Us
            </span>
          </div>
        </div>

        {/* Main Heading — Original Sizes & Weights Preserved */}
        <h2
          style={{
            fontFamily: "'Lacroom', serif",
            color: '#2b2b2b',
            fontWeight: 200,
            lineHeight: 1.0,
            fontSize: 'clamp(2.4rem, 6vw, 4.4rem)',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ overflow: 'hidden' }}>
            <span className="reveal-text block">America's Top Interior</span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <span className="reveal-text block">Design Expertise,</span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <span className="reveal-text block">
              <span style={{ color: '#b2000a' }}>Now In India</span>
            </span>
          </div>
        </h2>

        {/* Subtext — Original Sizes & Weights Preserved */}
        <div style={{ overflow: 'hidden', maxWidth: '500px', margin: '0 auto' }}>
          <p
            className="reveal-text"
            style={{
              fontFamily: "'Urbanist', sans-serif",
              color: '#6b6b6b',
              fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
              lineHeight: 1.3,
              fontWeight: 400,
            }}
          >
            Bringing globally recognised design standards, craftsmanship,
            and perspective to contemporary Indian homes.
          </p>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;

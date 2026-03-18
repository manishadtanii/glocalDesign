/**
 * ServicesSection Component
 * Premium list of services with an inset clear image over a blurred/darkened background.
 * Scroll animations powered by GSAP.
 */

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: "01",
    title: "Turnkey\n Design & Build",
    desc: "End-to-end execution, from concept development to the final handover.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200",
  },
  {
    id: "02",
    title: "Design\nConsultation",
    desc: "Thoughtful direction to help you shape spaces that feel personal and intentional.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200",
  },
  {
    id: "03",
    title: "Consultation\n + Execution",
    desc: "Creative vision supported by precise, detail-driven execution.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
  },
];

const ServicesSection = () => {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = gsap.utils.toArray('.service-card');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top top',
        end: `+=${cards.length * 40}%`, // Reduced for a "1 scroll" feel
        pin: true,
        scrub: 1.8, // More inertia for liquid feel
      }
    });

    cards.forEach((card, i) => {
      // Setup initial states
      if (i > 0) {
        gsap.set(card, { y: '110%', opacity: 0 });
      }

      // 1. Sliding logic for COMPLETE overlap
      if (i > 0) {
        tl.to(card, {
          y: '0%',
          opacity: 1,
          duration: 2,
          ease: 'power3.inOut',
        }, i * 2);

        // 2. Depth effect: Scale down the previous card
        const prevCard = cards[i - 1];
        tl.to(prevCard, {
          scale: 0.9,
          opacity: 0,
          filter: 'blur(15px)',
          duration: 2,
          ease: 'power3.inOut',
        }, i * 2);
      }

      // 3. Inner image subtle zoom/shift
      const innerImg = card.querySelector('.inner-clear-image');
      if (innerImg) {
        // For the first card (i=0), we start from a more 'rested' state 
        // because it's already on-screen. For others, we start zoomed.
        const startScale = (i === 0) ? 1.12 : 1.25;
        const startY = (i === 0) ? '2%' : '5%';

        tl.fromTo(innerImg,
          { scale: startScale, y: startY },
          { scale: 1, y: '-5%', ease: 'none', duration: 2 },
          i * 2
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section
      ref={triggerRef}
      style={{
        overflow: 'hidden',
        backgroundColor: '#FAF8F5',
        paddingBottom: '10rem' // Added space after section finishes
      }}
    >
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100vh',
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 2rem',
        }}
      >
        {/* ── Cards Stack Container ── */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1600px',
          height: '80vh', // Fixed height to prevent cutting off
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {SERVICES.map((service, idx) => (
            <div
              key={service.id}
              className="service-card group"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100%',
                height: '100%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#ffffff',
                borderRadius: '40px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                // boxShadow: '0 60px 140px rgba(0,0,0,0.2)',
                zIndex: idx,
                willChange: 'transform, opacity, filter',
              }}
            >
              {/* Blur BG Image - Preserving User's latest tweaks */}
              <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <img
                  src={service.image}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'blur(1px) brightness(0.80)',
                    transform: 'scale(1.4)',
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to right, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)',
                }} />
              </div>

              {/* Inner Clear Image */}
              <div style={{
                position: 'relative',
                marginLeft: '3.5rem',
                width: '42%',
                height: '95%', // Filling more of the larger card
                borderRadius: '30px',
                overflow: 'hidden',
                zIndex: 1,
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
              }}>
                <img
                  className="inner-clear-image"
                  src={service.image}
                  alt={service.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              {/* Content Panel */}
              <div style={{
                position: 'relative',
                zIndex: 2,
                flex: 1,
                padding: '0 4rem 0 3rem', // Reduced padding to give more width to text
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-end',
                textAlign: 'right',
                color: '#fff',
              }}>
                <span style={{
                  fontFamily: "'Lacroom', serif",
                  fontSize: '2rem',
                  color: 'rgba(255,255,255,0.25)',
                  marginBottom: '1rem',
                  letterSpacing: '0.05em',
                }}>
                  {service.id}
                </span>
                <h3 style={{
                  fontFamily: "'Lacroom', serif",
                  fontSize: 'clamp(2.5rem, 3.3vw, 2.7rem)',
                  // fontWeight: 200,
                  lineHeight: 1.0,
                  marginBottom: '1.25rem',
                  whiteSpace: 'pre-line',
                  maxWidth: '650px', // Added maxWidth for the title area to allow it to be wider
                }}>
                  {service.title}
                </h3>
                <p style={{
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: '1.05rem',
                  color: '#ffffff',
                  lineHeight: 1.6,
                  maxWidth: '300px', // Increased from 360px
                  fontWeight: 300,
                }}>
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

/**
 * DesignStyles Component
 * Horizontal accordion — panels expand on hover revealing interior design images
 * Thin vertical text collapses, wide image + label expands on hover
 */

import React, { useState, useEffect } from 'react';

const STYLES = [
  {
    name: 'Mid Century Modern',
    image: '/design/midcentury.webp',
    desc: 'Clean lines, organic curves',
  },
  {
    name: 'Industrial',
    image: '/design/Industrial.webp',
    desc: 'Raw materials, open spaces',
  },
  {
    name: 'Bohemian',
    image: '/design/bohimian.webp',
    desc: 'Eclectic, artistic, free-spirited',
  },
  {
    name: 'Rustic',
    image: '/design/Rustic.webp',
    desc: 'Natural wood, warm tones',
  },
  {
    name: 'Coastal',
    image: '/design/coastal.webp',
    desc: 'Breezy, light & ocean-inspired',
  },
  {
    name: 'Electic',
    image: '/design/electic.webp',
    desc: 'Bold mix of styles & eras',
  },
  {
    name: 'Transitional',
    image: '/design/transitional.webp',
    desc: 'Classic meets contemporary',
  },
  {
    name: 'Art Deco',
    image: '/design/artdeco.webp',
    desc: 'Glamour, geometry & gold',
  },
  {
    name: 'Hollywood Regency',
    image: '/design/HollywoodRegency.webp',
    desc: 'Opulent, dramatic luxury',
  },
  {
    name: 'Japandi',
    image: '/design/Japandi.webp',
    desc: 'Japanese-Scandi minimalism',
  },
  {
    name: 'Maximalist',
    image: '/design/Maximalist.webp',
    desc: 'More is more — bold & layered',
  },
  {
    name: 'Mediterranean',
    image: '/design/Meditarrarian.webp',
    desc: 'Warm terracotta & relaxed luxury',
  },
  {
    name: 'Traditional',
    image: '/design/Traditional.webp',
    desc: 'Timeless elegance & symmetry',
  },

];

const DesignStyles = () => {
  const [hovered, setHovered] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setHovered(mobile ? 3 : null); // open 4th style on mobile
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      className="design-styles-section"
      onMouseLeave={() => !isMobile && setHovered(null)} // Handle reset on container level to prevent flicker on desktop
      style={{
        width: '100%',
        height: isMobile ? '100dvh' : '100vh',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        overflow: 'hidden',
        backgroundColor: '#8B0012',
        position: 'relative',
        marginTop: '-1px', // Remove 1px gap from preceding section
      }}
    >
      {STYLES.map((style, i) => {
        const isHovered = hovered === i;
        const anyHovered = hovered !== null;

        return (
          <div
            key={style.name}
            onMouseEnter={() => !isMobile && setHovered(i)}
            onClick={() => isMobile && setHovered(hovered === i ? null : i)}
            style={{
              // Mobile: flexible height, Desktop: flexible width
              flex: isMobile
                ? (isHovered ? '0 0 50%' : anyHovered ? '0 0 4.16%' : '1 1 0')
                : (isHovered ? '0 0 38%' : anyHovered ? '0 0 4.8%' : '1 1 0'),
              height: isMobile ? 'auto' : '100%',
              width: isMobile ? '100%' : 'auto',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.65s cubic-bezier(0.77, 0, 0.18, 1)',
              borderRight: (!isMobile && i < STYLES.length - 1)
                ? '1px solid rgba(255,255,255,0.18)'
                : 'none',
              borderBottom: (isMobile && i < STYLES.length - 1)
                ? '1px solid rgba(255,255,255,0.18)'
                : 'none',
            }}
          >
            {/* Background image — always present, zooms slightly on hover */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${style.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: isHovered ? 1 : 0.15, // Keep a hint of image to prevent "popping" glitch
                filter: isHovered ? 'none' : 'grayscale(100%) brightness(0.4)', // Stylistic discovery feel
                transform: isHovered ? 'scale(1.03)' : 'scale(1.08)',
                transition: 'opacity 0.6s ease, transform 0.8s cubic-bezier(0.77, 0, 0.18, 1), filter 0.6s ease',
              }}
            />

            {/* Dark overlay on base, lift it on hover */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: isHovered
                  ? 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)'
                  : 'rgba(139,0,18,0.92)',
                transition: 'background 0.55s ease',
              }}
            />

            {/* Title Text — hidden when hovered */}
            <div
              style={{
                position: 'absolute',
                top: isMobile ? '50%' : 'auto',
                bottom: isMobile ? 'auto' : '3.5rem',
                left: '50%',
                transform: isMobile ? 'translate(-50%, -50%)' : 'rotate(-90deg)',
                transformOrigin: isMobile ? 'center' : 'left center', // Ensures start of text is always at the same 'bottom' line
                whiteSpace: 'nowrap',
                fontFamily: "'Urbanist', sans-serif",
                fontWeight: 600,
                fontSize: isMobile ? '0.85rem' : '0.75rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.9)',
                opacity: isHovered ? 0 : 1,
                transition: 'opacity 0.25s ease',
                pointerEvents: 'none',
                marginLeft: isMobile ? '0' : '-0.35rem', // Half of font-size to compensate for left origin centering
                width: isMobile ? '90%' : 'auto',
                textAlign: 'center',
              }}
            >
              {style.name}
            </div>

            {/* Expanded content — shown on hover */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: isMobile ? '1.5rem 1rem' : '2rem 2rem 2.5rem',
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'translateY(0)' : 'translateY(1.5rem)',
                transition: 'opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s',
                pointerEvents: isMobile && isHovered ? 'auto' : 'none',
              }}
            >
              {/* Style name horizontal */}
              <p
                style={{
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: isMobile ? '0.55rem' : '0.65rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.6)',
                  marginBottom: '0.4rem',
                  fontWeight: 400,
                }}
              >
                Design Style
              </p>
              <h3
                style={{
                  fontFamily: "'Lacroom', serif",
                  fontSize: isMobile ? 'clamp(1.4rem, 6vw, 1.8rem)' : 'clamp(1.6rem, 2.5vw, 2.4rem)',
                  fontWeight: 400,
                  color: '#fff',
                  lineHeight: 1.1,
                  marginBottom: isMobile ? '0.3rem' : '0.6rem',
                }}
              >
                {style.name}
              </h3>
              <p
                style={{
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: isMobile ? '0.75rem' : '0.82rem',
                  color: 'rgba(255,255,255,0.65)',
                  fontWeight: 300,
                  letterSpacing: '0.04em',
                }}
              >
                {style.desc}
              </p>

              {/* Arrow CTA */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginTop: isMobile ? '0.8rem' : '1.2rem',
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: isMobile ? '0.65rem' : '0.7rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.75)',
                  borderBottom: '1px solid rgba(255,255,255,0.3)',
                  paddingBottom: '2px',
                }}
              >
                Explore Style
                <span style={{ fontSize: '1rem', lineHeight: 1 }}>→</span>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default DesignStyles;

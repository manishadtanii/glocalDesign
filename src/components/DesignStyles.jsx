/**
 * DesignStyles Component
 * Horizontal accordion — panels expand on hover revealing interior design images
 * Thin vertical text collapses, wide image + label expands on hover
 */

import React, { useState } from 'react';

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

  return (
    <section
      className="design-styles-section"
      onMouseLeave={() => setHovered(null)} // Handle reset on container level to prevent flicker
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
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
            onMouseEnter={() => setHovered(i)}
            // Removed individual onMouseLeave to prevent boundary flicker during flex-shift
            style={{
              // flex-based width: hovered gets big, others shrink
              flex: isHovered ? '0 0 38%' : anyHovered ? '0 0 4.8%' : '1 1 0',
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'flex 0.65s cubic-bezier(0.77, 0, 0.18, 1)',
              borderRight: i < STYLES.length - 1
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

            {/* Vertical text — hidden when hovered */}
            <div
              style={{
                position: 'absolute',
                bottom: '3.5rem', // Lowered from 10rem to be closer to bottom
                left: '50%',
                transform: 'rotate(-90deg)',
                transformOrigin: 'left center', // Ensures start of text is always at the same 'bottom' line
                whiteSpace: 'nowrap',
                fontFamily: "'Urbanist', sans-serif",
                fontWeight: 600,
                fontSize: '0.75rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.9)',
                opacity: isHovered ? 0 : 1,
                transition: 'opacity 0.25s ease',
                pointerEvents: 'none',
                marginLeft: '-0.35rem', // Half of font-size to compensate for left origin centering
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
                padding: '2rem 2rem 2.5rem',
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'translateY(0)' : 'translateY(1.5rem)',
                transition: 'opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s',
                pointerEvents: 'none',
              }}
            >
              {/* Style name horizontal */}
              <p
                style={{
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: '0.65rem',
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
                  fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
                  fontWeight: 400,
                  color: '#fff',
                  lineHeight: 1.1,
                  marginBottom: '0.6rem',
                }}
              >
                {style.name}
              </h3>
              <p
                style={{
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: '0.82rem',
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
                  marginTop: '1.2rem',
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: '0.7rem',
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

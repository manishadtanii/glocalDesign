// /**
//  * Option 1: The "Magnetic 3D Full-Screen Portal"
//  * - Left: Logo
//  * - Right: Magnetic "MENU" button
//  * - Click: Opens a massive crimson full-screen overlay with giant Lacroom links
//  */

// import React, { useState, useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const menuRef = useRef(null);
//   const linksRef = useRef([]);

//   const navLinks = [
//     { name: 'PROJECTS', href: '#projects' },
//     { name: 'SERVICES', href: '#services' },
//     { name: 'STYLING', href: '#styling' },
//     { name: 'OUR STORY', href: '#story' },
//     { name: 'CONTACT', href: '#contact' }
//   ];

//   // GSAP Menu Animation
//   useEffect(() => {
//     if (isOpen) {
//       // Open Menu
//       gsap.to(menuRef.current, {
//         clipPath: 'circle(150% at 100% 0%)',
//         duration: 0.8,
//         ease: 'power3.inOut',
//       });
//       // Stagger links in
//       gsap.fromTo(
//         linksRef.current,
//         { y: 100, opacity: 0, rotate: 5 },
//         {
//           y: 0,
//           opacity: 1,
//           rotate: 0,
//           duration: 0.8,
//           stagger: 0.1,
//           ease: 'power3.out',
//           delay: 0.3
//         }
//       );
//     } else {
//       // Close Menu
//       gsap.to(menuRef.current, {
//         clipPath: 'circle(0% at 100% 0%)',
//         duration: 0.8,
//         ease: 'power3.inOut',
//       });
//     }
//   }, [isOpen]);

//   // Dynamic Logo Color Logic
//   const [isOverRed, setIsOverRed] = useState(false);
//   const triggerRef = useRef(null);

//   useEffect(() => {
//     // Detect Red Sections: DesignStyles and ContactForm
//     // We register triggers for these sections to toggle isOverRed
//     const redSections = ['.design-styles-section', '.contact-form-section'];

//     redSections.forEach((selector) => {
//       ScrollTrigger.create({
//         trigger: selector,
//         start: 'top 50px', // When the navbar (approx 50px down) enters the section
//         end: 'bottom 50px',
//         onEnter: () => setIsOverRed(true),
//         onEnterBack: () => setIsOverRed(true),
//         onLeave: () => setIsOverRed(false),
//         onLeaveBack: () => setIsOverRed(false),
//       });
//     });

//   }, []);

//   // Lock body scroll when menu is open
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'auto';
//     }
//     return () => { document.body.style.overflow = 'auto'; };
//   }, [isOpen]);

//   return (
//     <>
//       {/* ── Navbar Header ── */}
//       <nav
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           zIndex: 100,
//           padding: '1rem 2rem',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           pointerEvents: 'none', // Allow clicks behind the bar
//         }}
//       >
//         {/* Logo */}
//         <div style={{ pointerEvents: 'auto' }}>
//           <img
//             src="/images/logo.png"
//             alt="Glocal Design Logo"
//             style={{
//               height: '42px',
//               width: 'auto',
//               objectFit: 'contain',
//               // Logo becomes white if menu is open OR if we are over a red section
//               filter: (isOpen || isOverRed) ? 'brightness(0) invert(1)' : 'none',
//               transition: 'filter 0.5s ease'
//             }}
//           />
//         </div>

//         {/* Magnetic Menu/Close Button */}
//         <div style={{ pointerEvents: 'auto' }}>
//           <MagneticButton>
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               style={{
//                 width: '70px',
//                 height: '70px',
//                 borderRadius: '50%',
//                 backgroundColor: isOpen ? '#ffffff' : '#111111',
//                 color: isOpen ? '#111111' : '#ffffff',
//                 border: 'none',
//                 cursor: 'pointer',
//                 fontFamily: "'Afacad', sans-serif",
//                 fontSize: '0.85rem',
//                 fontWeight: 600,
//                 letterSpacing: '0.05em',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 transition: 'background-color 0.4s ease, color 0.4s ease',
//                 boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
//               }}
//             >
//               {isOpen ? 'CLOSE' : 'MENU'}
//             </button>
//           </MagneticButton>
//         </div>
//       </nav>

//       {/* ── Full Screen Overlay Menu ── */}
//       <div
//         ref={menuRef}
//         style={{
//           position: 'fixed',
//           inset: 0,
//           backgroundColor: '#8B0012', // Crimson Red
//           zIndex: 90, // just below the header
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           // Starts hidden as a tiny circle at the top-right
//           clipPath: 'circle(0% at 100% 0%)',
//           willChange: 'clip-path',
//           // Neutralize the overlay when closed to prevent rendering interference
//           visibility: isOpen ? 'visible' : 'hidden',
//           pointerEvents: isOpen ? 'auto' : 'none',
//           transition: isOpen ? 'none' : 'visibility 0s linear 0.8s', // Delay visibility hidden until animation finishes
//         }}
//       >
//         <div
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             gap: '1rem',
//           }}
//         >
//           {navLinks.map((link, idx) => (
//             <a
//               key={link.name}
//               href={link.href}
//               ref={el => (linksRef.current[idx] = el)}
//               onClick={() => setIsOpen(false)}
//               className="menu-link-hover"
//               style={{
//                 fontFamily: "'Lacroom', serif",
//                 fontSize: 'clamp(3rem, 7vw, 6rem)',
//                 color: '#ffffff',
//                 textDecoration: 'none',
//                 lineHeight: 1,
//                 textTransform: 'uppercase',
//                 position: 'relative',
//                 display: 'inline-block',
//                 willChange: 'transform, opacity',
//               }}
//             >
//               <span className="menu-link-text">{link.name}</span>
//             </a>
//           ))}
//         </div>

//         {/* Bottom Menu Info */}
//         <div
//           style={{
//             position: 'absolute',
//             bottom: '3rem',
//             left: 0,
//             right: 0,
//             display: 'flex',
//             justifyContent: 'space-between',
//             padding: '0 4rem',
//             boxSizing: 'border-box',
//             fontFamily: "'Urbanist', sans-serif",
//             color: 'rgba(255,255,255,0.6)',
//             fontSize: '0.85rem',
//             letterSpacing: '0.1em',
//             textTransform: 'uppercase',
//           }}
//         >
//           <span>Info@Glocaldesign.Com</span>
//           <span>+91 91661 97371</span>
//         </div>
//       </div>
//     </>
//   );
// };

// // ── Magnetic Button Wrapper Component ──
// const MagneticButton = ({ children }) => {
//   const magneticRef = useRef(null);

//   useEffect(() => {
//     const el = magneticRef.current;
//     if (!el) return;

//     const handleMouseMove = (e) => {
//       const rect = el.getBoundingClientRect();
//       const x = e.clientX - rect.left - rect.width / 2;
//       const y = e.clientY - rect.top - rect.height / 2;

//       // Pull strength
//       gsap.to(el, {
//         x: x * 0.4,
//         y: y * 0.4,
//         duration: 0.6,
//         ease: 'power3.out'
//       });
//     };

//     const handleMouseLeave = () => {
//       // Snap back to center
//       gsap.to(el, {
//         x: 0,
//         y: 0,
//         duration: 0.6,
//         ease: 'elastic.out(1, 0.3)'
//       });
//     };

//     el.addEventListener('mousemove', handleMouseMove);
//     el.addEventListener('mouseleave', handleMouseLeave);

//     return () => {
//       el.removeEventListener('mousemove', handleMouseMove);
//       el.removeEventListener('mouseleave', handleMouseLeave);
//     };
//   }, []);

//   return (
//     <div ref={magneticRef} style={{ display: 'inline-block' }}>
//       {children}
//     </div>
//   );
// };

// // ── Global Styles for Menu Link Hover (Italic/Outline effect) ──
// const styleSheet = `
//   .menu-link-hover {
//     transition: transform 0.4s ease;
//   }
//   .menu-link-hover .menu-link-text {
//     display: inline-block;
//     transition: color 0.4s ease, transform 0.4s ease;
//   }
//   .menu-link-hover:hover .menu-link-text {
//     color: transparent;
//     -webkit-text-stroke: 1px #ffffff;
//     font-style: italic;
//     transform: skewX(-10deg) scale(1.05);
//   }
// `;

// if (typeof document !== 'undefined') {
//   const styleEl = document.createElement('style');
//   styleEl.innerHTML = styleSheet;
//   document.head.appendChild(styleEl);
// }

// export default Navbar;



















/**
 * Navbar — Fix 1 + Fix 3 + Smart Hide/Show on Scroll
 *
 * Behaviour:
 *  - Scroll DOWN  → navbar slides up and hides (transform: translateY(-100%))
 *  - Scroll UP    → navbar slides back in  (transform: translateY(0))
 *  - At very top  → always visible, transparent bg
 *  - Scrolled     → frosted dark bg (Fix 1)
 *  - Per-section  → logo color switches automatically (Fix 3)
 *  - Menu open    → navbar always visible, white logo
 */

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const navRef = useRef(null);

  // ── Fix 1: Scroll state (for frosted bg) ──
  const [scrolled, setScrolled] = useState(false);

  // ── Hide/Show: direction tracking ──
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // ── Fix 3: Per-section logo theme ──
  const [logoTheme, setLogoTheme] = useState('dark');

  const navLinks = [
    { name: 'PROJECTS', href: '#projects' },
    { name: 'SERVICES', href: '#services' },
    { name: 'STYLING', href: '#styling' },
    { name: 'OUR STORY', href: '#story' },
    { name: 'CONTACT', href: '#contact' },
  ];

  // ── Scroll direction + frosted bg listener ──
  useEffect(() => {
    const HIDE_THRESHOLD = 80; // px from top before hide logic kicks in

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;

        // Frosted bg toggle (Fix 1)
        setScrolled(currentY > 20);

        // Hide/Show logic — only after scrolling past threshold
        if (currentY > HIDE_THRESHOLD) {
          if (currentY > lastScrollY.current) {
            // Scrolling DOWN → hide navbar
            setNavVisible(false);
          } else {
            // Scrolling UP → show navbar
            setNavVisible(true);
          }
        } else {
          // Near top → always show
          setNavVisible(true);
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Apply navbar translate via GSAP (smooth) ──
  useEffect(() => {
    if (!navRef.current) return;

    // Never hide when menu is open
    if (isOpen) {
      gsap.to(navRef.current, {
        y: 0,
        duration: 0.4,
        ease: 'power3.out',
      });
      return;
    }

    gsap.to(navRef.current, {
      y: navVisible ? 0 : '-110%',
      duration: navVisible ? 0.5 : 0.35,
      ease: navVisible ? 'power3.out' : 'power3.in',
    });
  }, [navVisible, isOpen]);

  // ── Fix 3: Section-aware logo color ──
  useEffect(() => {
    //
    // ✏️  Edit selectors to match your actual section classNames
    //
    // logoColor: 'light' → white logo  (red / dark bg sections)
    // logoColor: 'dark'  → original    (white / light bg sections)
    //
    const sections = [
      { selector: '.hero-section', logoColor: 'dark' },
      { selector: '.portfolio-section', logoColor: 'dark' },
      { selector: '.about-section', logoColor: 'dark' },
      { selector: '.design-styles-section', logoColor: 'light' }, // red bg
      { selector: '.contact-form-section', logoColor: 'light' }, // red bg
    ];

    const triggers = [];

    sections.forEach(({ selector, logoColor }) => {
      if (!document.querySelector(selector)) return;

      const trigger = ScrollTrigger.create({
        trigger: selector,
        start: 'top 60px',
        end: 'bottom 60px',
        onEnter: () => setLogoTheme(logoColor),
        onEnterBack: () => setLogoTheme(logoColor),
        onLeave: () => setLogoTheme('dark'),
        onLeaveBack: () => setLogoTheme('dark'),
      });

      triggers.push(trigger);
    });

    return () => triggers.forEach(t => t.kill());
  }, []);

  // ── GSAP Menu Animation ──
  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        clipPath: 'circle(150% at 100% 0%)',
        duration: 0.8,
        ease: 'power3.inOut',
      });
      gsap.fromTo(
        linksRef.current,
        { y: 100, opacity: 0, rotate: 5 },
        {
          y: 0, opacity: 1, rotate: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.3,
        }
      );
    } else {
      gsap.to(menuRef.current, {
        clipPath: 'circle(0% at 100% 0%)',
        duration: 0.8,
        ease: 'power3.inOut',
      });
    }
  }, [isOpen]);

  // ── Lock body scroll when menu open ──
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  // ── Logo filter (priority: menu open > section light > scrolled > default) ──
  const logoFilter = (() => {
    if (isOpen) return 'brightness(0) invert(1)'; // white on crimson
    if (logoTheme === 'light') return 'brightness(0) invert(1)'; // white on red section
    if (scrolled) return 'brightness(0) invert(1)'; // white on frosted dark bg
    return 'none';                                                // original dark logo
  })();

  return (
    <>
      {/* ── Navbar Header ── */}
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '1.2rem 8vw',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
          willChange: 'transform',

          // Fix 1: Frosted dark bg when scrolled, transparent at top
          background: scrolled && !isOpen
            ? 'rgba(10, 10, 10, 0.55)'
            : 'transparent',
          backdropFilter: scrolled && !isOpen ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: scrolled && !isOpen ? 'blur(14px)' : 'none',
          transition: 'background 0.5s ease, backdrop-filter 0.5s ease',
          // Note: translateY is handled by GSAP, not CSS transition
        }}
      >
        {/* Logo */}
        <div style={{ pointerEvents: 'auto' }}>
          <img
            src="/images/logo.png"
            alt="Glocal Design Logo"
            style={{
              height: '65px',
              width: 'auto',
              objectFit: 'contain',
              filter: logoFilter,
              transition: 'filter 0.4s ease',
            }}
          />
        </div>

        {/* Phone Button */}
        <div style={{ pointerEvents: 'auto' }}>
          <a
            href="tel:+918860870874"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#323232', // Matches dark design
              color: '#ffffff',
              padding: '0.65rem 1.4rem',
              borderRadius: '9999px',
              fontFamily: "'Urbanist', sans-serif",
              fontSize: '1rem',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            }}
            className="hover:scale-105 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <span>+91 8860870874</span>
          </a>
        </div>
      </nav>

      {/* ── Full Screen Overlay Menu ── */}
      <div
        ref={menuRef}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#8B0012',
          zIndex: 90,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          clipPath: 'circle(0% at 100% 0%)',
          willChange: 'clip-path',
          visibility: isOpen ? 'visible' : 'hidden',
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: isOpen ? 'none' : 'visibility 0s linear 0.8s',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              ref={el => (linksRef.current[idx] = el)}
              onClick={() => setIsOpen(false)}
              className="menu-link-hover"
              style={{
                fontFamily: "'Lacroom', serif",
                fontSize: 'clamp(3rem, 7vw, 6rem)',
                color: '#ffffff',
                textDecoration: 'none',
                lineHeight: 1,
                textTransform: 'uppercase',
                position: 'relative',
                display: 'inline-block',
                willChange: 'transform, opacity',
              }}
            >
              <span className="menu-link-text">{link.name}</span>
            </a>
          ))}
        </div>

        {/* Bottom Info */}
        <div
          style={{
            position: 'absolute',
            bottom: '3rem',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 4rem',
            boxSizing: 'border-box',
            fontFamily: "'Urbanist', sans-serif",
            color: 'rgba(255,255,255,0.6)',
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          <span>Info@Glocaldesign.Com</span>
          <span>+91 8860870874</span>
        </div>
      </div>
    </>
  );
};

// ── Magnetic Button Wrapper ──
const MagneticButton = ({ children }) => {
  const magneticRef = useRef(null);

  useEffect(() => {
    const el = magneticRef.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: x * 0.4, y: y * 0.4, duration: 0.6, ease: 'power3.out' });
    };

    const handleMouseLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={magneticRef} style={{ display: 'inline-block' }}>
      {children}
    </div>
  );
};

// ── Global Styles ──
const styleSheet = `
  .menu-link-hover {
    transition: transform 0.4s ease;
  }
  .menu-link-hover .menu-link-text {
    display: inline-block;
    transition: color 0.4s ease, transform 0.4s ease;
  }
  .menu-link-hover:hover .menu-link-text {
    color: transparent;
    -webkit-text-stroke: 1px #ffffff;
    font-style: italic;
    transform: skewX(-10deg) scale(1.05);
  }
`;

if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = styleSheet;
  document.head.appendChild(styleEl);
}

export default Navbar;








// /**
//  * Navbar — Fix 3 Only: Per-Section Logo Color Control
//  * - No navbar background change on scroll
//  * - Logo color switches smartly based on which section is behind it
//  * - Uses ScrollTrigger to detect section entry/exit
//  */

// import React, { useState, useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const menuRef = useRef(null);
//   const linksRef = useRef([]);

//   // ── Fix 3: Per-section logo theme ──
//   // 'dark' = original logo | 'light' = white logo (inverted)
//   const [logoTheme, setLogoTheme] = useState('dark');

//   const navLinks = [
//     { name: 'PROJECTS', href: '#projects' },
//     { name: 'SERVICES', href: '#services' },
//     { name: 'STYLING',  href: '#styling'  },
//     { name: 'OUR STORY',href: '#story'    },
//     { name: 'CONTACT',  href: '#contact'  },
//   ];

//   // ── Fix 3: Section-aware logo color ──
//   useEffect(() => {
//     //
//     // ✏️  EDIT THIS LIST to match your actual section classNames
//     //
//     // logoColor: 'light' → white logo  (use for red, dark, crimson bg sections)
//     // logoColor: 'dark'  → original    (use for white, light, cream bg sections)
//     //
//     const sections = [
//       { selector: '.hero-section',          logoColor: 'dark'  },
//       { selector: '.portfolio-section',     logoColor: 'dark'  },
//       { selector: '.about-section',         logoColor: 'dark'  },
//       { selector: '.design-styles-section', logoColor: 'light' }, // red bg
//       { selector: '.contact-form-section',  logoColor: 'light' }, // red bg
//     ];

//     const triggers = [];

//     sections.forEach(({ selector, logoColor }) => {
//       if (!document.querySelector(selector)) return; // skip if section not in DOM

//       const trigger = ScrollTrigger.create({
//         trigger: selector,
//         start: 'top 60px',    // section top hits navbar bottom edge
//         end:   'bottom 60px', // section bottom leaves navbar
//         onEnter:     () => setLogoTheme(logoColor),
//         onEnterBack: () => setLogoTheme(logoColor),
//         onLeave:     () => setLogoTheme('dark'),
//         onLeaveBack: () => setLogoTheme('dark'),
//       });

//       triggers.push(trigger);
//     });

//     // Cleanup on unmount
//     return () => triggers.forEach(t => t.kill());
//   }, []);

//   // ── GSAP Menu Animation ──
//   useEffect(() => {
//     if (isOpen) {
//       gsap.to(menuRef.current, {
//         clipPath: 'circle(150% at 100% 0%)',
//         duration: 0.8,
//         ease: 'power3.inOut',
//       });
//       gsap.fromTo(
//         linksRef.current,
//         { y: 100, opacity: 0, rotate: 5 },
//         {
//           y: 0, opacity: 1, rotate: 0,
//           duration: 0.8,
//           stagger: 0.1,
//           ease: 'power3.out',
//           delay: 0.3,
//         }
//       );
//     } else {
//       gsap.to(menuRef.current, {
//         clipPath: 'circle(0% at 100% 0%)',
//         duration: 0.8,
//         ease: 'power3.inOut',
//       });
//     }
//   }, [isOpen]);

//   // ── Lock body scroll when menu open ──
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? 'hidden' : 'auto';
//     return () => { document.body.style.overflow = 'auto'; };
//   }, [isOpen]);

//   // ── Logo filter ──
//   // Priority: menu open → section needs light → original
//   const logoFilter =
//     isOpen || logoTheme === 'light'
//       ? 'brightness(0) invert(1)' // white
//       : 'none';                    // original dark logo

//   return (
//     <>
//       {/* ── Navbar Header ── */}
//       <nav
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           zIndex: 100,
//           padding: '1rem 2rem',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           pointerEvents: 'none',
//           background: 'transparent', // always transparent — no change on scroll
//         }}
//       >
//         {/* Logo */}
//         <div style={{ pointerEvents: 'auto' }}>
//           <img
//             src="/images/logo.png"
//             alt="Glocal Design Logo"
//             style={{
//               height: '42px',
//               width: 'auto',
//               objectFit: 'contain',
//               filter: logoFilter,
//               transition: 'filter 0.4s ease',
//             }}
//           />
//         </div>

//         {/* Magnetic Menu / Close Button */}
//         <div style={{ pointerEvents: 'auto' }}>
//           <MagneticButton>
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               style={{
//                 width: '70px',
//                 height: '70px',
//                 borderRadius: '50%',
//                 backgroundColor: isOpen ? '#ffffff' : '#111111',
//                 color: isOpen ? '#111111' : '#ffffff',
//                 border: 'none',
//                 cursor: 'pointer',
//                 fontFamily: "'Afacad', sans-serif",
//                 fontSize: '0.85rem',
//                 fontWeight: 600,
//                 letterSpacing: '0.05em',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 transition: 'background-color 0.4s ease, color 0.4s ease',
//                 boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
//               }}
//             >
//               {isOpen ? 'CLOSE' : 'MENU'}
//             </button>
//           </MagneticButton>
//         </div>
//       </nav>

//       {/* ── Full Screen Overlay Menu ── */}
//       <div
//         ref={menuRef}
//         style={{
//           position: 'fixed',
//           inset: 0,
//           backgroundColor: '#8B0012',
//           zIndex: 90,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           clipPath: 'circle(0% at 100% 0%)',
//           willChange: 'clip-path',
//           visibility: isOpen ? 'visible' : 'hidden',
//           pointerEvents: isOpen ? 'auto' : 'none',
//           transition: isOpen ? 'none' : 'visibility 0s linear 0.8s',
//         }}
//       >
//         <div
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             gap: '1rem',
//           }}
//         >
//           {navLinks.map((link, idx) => (
//             <a
//               key={link.name}
//               href={link.href}
//               ref={el => (linksRef.current[idx] = el)}
//               onClick={() => setIsOpen(false)}
//               className="menu-link-hover"
//               style={{
//                 fontFamily: "'Lacroom', serif",
//                 fontSize: 'clamp(3rem, 7vw, 6rem)',
//                 color: '#ffffff',
//                 textDecoration: 'none',
//                 lineHeight: 1,
//                 textTransform: 'uppercase',
//                 position: 'relative',
//                 display: 'inline-block',
//                 willChange: 'transform, opacity',
//               }}
//             >
//               <span className="menu-link-text">{link.name}</span>
//             </a>
//           ))}
//         </div>

//         {/* Bottom Info */}
//         <div
//           style={{
//             position: 'absolute',
//             bottom: '3rem',
//             left: 0,
//             right: 0,
//             display: 'flex',
//             justifyContent: 'space-between',
//             padding: '0 4rem',
//             boxSizing: 'border-box',
//             fontFamily: "'Urbanist', sans-serif",
//             color: 'rgba(255,255,255,0.6)',
//             fontSize: '0.85rem',
//             letterSpacing: '0.1em',
//             textTransform: 'uppercase',
//           }}
//         >
//           <span>Info@Glocaldesign.Com</span>
//           <span>+91 91661 97371</span>
//         </div>
//       </div>
//     </>
//   );
// };

// // ── Magnetic Button Wrapper ──
// const MagneticButton = ({ children }) => {
//   const magneticRef = useRef(null);

//   useEffect(() => {
//     const el = magneticRef.current;
//     if (!el) return;

//     const handleMouseMove = (e) => {
//       const rect = el.getBoundingClientRect();
//       const x = e.clientX - rect.left - rect.width / 2;
//       const y = e.clientY - rect.top - rect.height / 2;
//       gsap.to(el, { x: x * 0.4, y: y * 0.4, duration: 0.6, ease: 'power3.out' });
//     };

//     const handleMouseLeave = () => {
//       gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
//     };

//     el.addEventListener('mousemove', handleMouseMove);
//     el.addEventListener('mouseleave', handleMouseLeave);
//     return () => {
//       el.removeEventListener('mousemove', handleMouseMove);
//       el.removeEventListener('mouseleave', handleMouseLeave);
//     };
//   }, []);

//   return (
//     <div ref={magneticRef} style={{ display: 'inline-block' }}>
//       {children}
//     </div>
//   );
// };

// // ── Global Styles ──
// const styleSheet = `
//   .menu-link-hover {
//     transition: transform 0.4s ease;
//   }
//   .menu-link-hover .menu-link-text {
//     display: inline-block;
//     transition: color 0.4s ease, transform 0.4s ease;
//   }
//   .menu-link-hover:hover .menu-link-text {
//     color: transparent;
//     -webkit-text-stroke: 1px #ffffff;
//     font-style: italic;
//     transform: skewX(-10deg) scale(1.05);
//   }
// `;

// if (typeof document !== 'undefined') {
//   const styleEl = document.createElement('style');
//   styleEl.innerHTML = styleSheet;
//   document.head.appendChild(styleEl);
// }

// export default Navbar;
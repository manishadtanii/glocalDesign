import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroHeading = () => {
  const componentRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Fade out the entire hero content as we scroll through the first 100vh
      gsap.to(componentRef.current, {
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "100vh top",
          scrub: true,
        },
        opacity: 0,
        y: -100,
        ease: "none"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={componentRef}
      className="fixed inset-0 w-full h-screen flex flex-col items-center justify-between z-10"
      style={{
        pointerEvents: 'none',
        marginTop: '4vh',
        paddingTop: '5vh', // Shifted up
        paddingBottom: '8vh',
        background: 'transparent'
      }}
    >
      {/* Bottom Right Button (Decorative) */}
      <div 
        className="absolute bottom-[9vh] right-[4vw] md:right-[5vw]"
        style={{ pointerEvents: 'auto', zIndex: 50 }}
      >
        <button 
          onClick={(e) => e.preventDefault()}
          className="group w-10 h-10 md:w-12 md:h-12 border border-[#c4c4c4] rounded-full flex items-center justify-center "
          aria-label="Decorative downward arrow"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#323232" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </button>
      </div>

      {/* Main Heading Group */}
      <div className="w-full flex flex-col items-center pointer-events-none mt-4">
        <h1
          style={{
            fontFamily: "'Lacroom', serif",
            fontWeight: 400,
            fontSize: 'clamp(4rem, 9.5vw, 9.5rem)',
            lineHeight: 1.05,
            color: '#323232',
            textTransform: 'uppercase',
            margin: 0,
            letterSpacing: '-0.02em'
          }}
        >
          CREATE
        </h1>
        <h1
          style={{
            fontFamily: "'Lacroom', serif",
            fontWeight: 400,
            fontSize: 'clamp(4rem, 9.5vw, 9.5rem)',
            lineHeight: 1.05,
            color: '#323232',
            textTransform: 'uppercase',
            margin: 0,
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap'
          }}
        >
          YOUR <span style={{ color: '#B2000A' }}>DREAM</span> SPACE
        </h1>
      </div>

      {/* Bottom Content Area */}
      <div className="flex flex-col items-center w-full pointer-events-none relative">
        <p
          className="text-center mx-auto"
          style={{
            fontFamily: "'Urbanist', sans-serif",
            fontSize: '1.25rem',
            lineHeight: 1.5,
            color: '#323232',
            maxWidth: '550px',
            marginBottom: '2.5rem',
            fontWeight: 400,
          }}
        >
          Crafted interiors that turn spaces into homes that feel yours unmistakably.
        </p>

        <button
          style={{
            pointerEvents: 'auto',
            backgroundColor: '#B2000A',
            color: '#fff',
            fontFamily: "'Urbanist', sans-serif",
            fontSize: '0.9rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            padding: '1.2rem 3rem',
            borderRadius: '9999px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          className="hover:scale-105 hover:brightness-110 active:scale-95 shadow-lg"
          onClick={(e) => {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              // 1. Jump instantly to the top of the contact section
              const startY = contactSection.getBoundingClientRect().top + window.scrollY;
              window.scrollTo({ top: startY, behavior: 'auto' });
              
              // 2. Automatically 'play' the animation by smooth-scrolling through the pin duration
              setTimeout(() => {
                window.scrollTo({ 
                  top: startY + (window.innerHeight * 0.8), // Matches +=80% end trigger in ContactForm
                  behavior: 'smooth' 
                });
              }, 50);
            }
          }}
        >
          BOOK A CONSULTATION TODAY
        </button>

        {/* Scroll indicator - at the bottom right of the screen */}
        {/* <div
          className="absolute right-[5vw]"
          style={{
            bottom: '2vh',
            color: '#323232',
            pointerEvents: 'auto',
            cursor: 'pointer',
          }}
        >
          <div className="w-12 h-12 flex items-center justify-center animate-bounce relative opacity-80 hover:opacity-100 transition-opacity">
            <svg className="absolute inset-0 w-full h-full text-black" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
               <path d="M50 5 C55 10, 65 5, 70 12 C75 19, 85 18, 88 25 C91 32, 98 35, 98 42 C98 49, 93 54, 93 61 C93 68, 98 73, 95 80 C92 87, 85 90, 80 95 C75 100, 65 95, 60 100 C53 105, 47 105, 40 100 C35 95, 25 100, 20 95 C15 90, 8 87, 5 80 C2 73, 7 68, 7 61 C7 54, 2 49, 2 42 C2 35, 9 32, 12 25 C15 18, 25 19, 30 12 C35 5, 45 10, 50 5 Z"/>
            </svg>
            <ArrowDown className="relative z-10" size={18} strokeWidth={2} />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default HeroHeading;

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ImageRevealStack = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const imgRefs = useRef([]);
  const leftLabelRef = useRef(null);
  const rightLabelRef = useRef(null);

  const images = [
    { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200', title: 'Farmhouse', number: '01' },
    { src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200', title: 'Modern', number: '02' },
    { src: 'https://images.unsplash.com/photo-1773332585788-9104ec6f38ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8', title: 'Scandi', number: '03' },
    { src: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=1200', title: 'Minimalist', number: '04' },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      });

      // 1. Initial State
      gsap.set(imgRefs.current, {
        clipPath: 'inset(0% 50%)',
        webkitClipPath: 'inset(0% 50%)'
      });
      gsap.set([leftLabelRef.current, rightLabelRef.current], { opacity: 0, y: 30 });
      
      if (titleRef.current && subtitleRef.current) {
        gsap.set([titleRef.current, subtitleRef.current], { opacity: 0, y: 40 });
        mainTl.to([titleRef.current, subtitleRef.current], {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.3,
          ease: 'power3.out'
        });
      }

      // 2. Overlapping Image Reveal Sequence
      images.forEach((img, index) => {
        // Overlap: start next image when previous is at 80% completion.
        // Duration is 2.0s, so 80% is 1.6s in. Overlap from end = 0.4s.
        const startTime = index === 0 ? ">" : `-=0.4`; 

        mainTl.to(imgRefs.current[index], {
          clipPath: 'inset(0% 0%)',
          webkitClipPath: 'inset(0% 0%)',
          duration: 2,
          ease: 'power2.inOut',
        }, startTime);

        // Label Update Animation
        mainTl.to([leftLabelRef.current, rightLabelRef.current], {
          opacity: 0,
          y: -10,
          duration: 0.4,
          onComplete: () => {
            if (leftLabelRef.current && rightLabelRef.current) {
              leftLabelRef.current.innerText = img.number;
              rightLabelRef.current.innerText = img.title;
            }
          }
        }, startTime);

        mainTl.to([leftLabelRef.current, rightLabelRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out'
        }, `${startTime}+=0.6`);

        mainTl.to({}, { duration: 0.8 });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#F9F4EB]"
      style={{ height: '400vh' }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center p-4 md:p-12">
        <div className="text-center mb-8 md:mb-16 z-20">
          {/* Header content (Hidden by user preference) */}
        </div>

        {/* The Stack Container */}
        <div className="relative w-full max-w-6xl aspect-[16/9] md:aspect-[21/9] flex items-center justify-center">

          {/* Side Labels Container */}
          <div className="absolute inset-0 pointer-events-none z-30">
            {/* Left Label */}
            <div className="absolute left-[2%] md:left-[5%] top-1/2 -translate-y-1/2">
              <span
                ref={leftLabelRef}
                className="text-3xl md:text-6xl font-serif text-[#323232] block"
              >
                01
              </span>
            </div>

            {/* Right Label */}
            <div className="absolute right-[2%] md:right-[5%] top-1/2 -translate-y-1/2">
              <span
                ref={rightLabelRef}
                className="text-xl md:text-3xl font-sans uppercase tracking-[0.2em] text-[#323232] block whitespace-nowrap"
                style={{ fontFamily: 'Urbanist, sans-serif' }}
              >
                Farmhouse
              </span>
            </div>
          </div>

          {/* Image Stack - Specific Nested Sizing (100, 90, 80, 70) */}
          <div className="relative w-full h-full flex items-center justify-center">
            {images.map((img, idx) => (
              <div
                key={idx}
                ref={(el) => (imgRefs.current[idx] = el)}
                className="absolute overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                style={{
                  zIndex: idx + 1,
                  // Sizing: 100, 90, 80, 70 (%)
                  width: `${100 - (idx * 10)}%`,
                  height: `${100 - (idx * 5)}%`, // Subtle height reduction for perspective
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageRevealStack;

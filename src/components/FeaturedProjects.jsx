import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 1, title: 'Mountain Retreat', category: 'Architecture', image: 'https://images.unsplash.com/photo-1549144480-f70ca19029bc?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Urban Loft', category: 'Interior Design', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Glass Villa', category: 'Modern Living', image: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'Rustic Cabin', category: 'Sustainable', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800' },
  { id: 5, title: 'Sky Apartment', category: 'Luxury', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800' },
  { id: 6, title: 'Garden House', category: 'Landscape', image: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&q=80&w=800' },
];

const ProjectCard = ({ project, index, onSelect, isSelected, anySelected }) => {
  const cardRef = useRef(null);
  const meshRef = useRef(null);
  const [hoverRatio, setHoverRatio] = useState(0);
  const shiftXY = useRef({ x: 0, y: 0 });
  const shiftXYTarget = useRef({ x: 0, y: 0 });

  useLayoutEffect(() => {
    const side = (index % 2) - 0.5; // -0.5 for odd, 0.5 for even
    
    // LEFT-RIGHT ENTRY ANIMATION
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top bottom',
        end: 'top center',
        scrub: 1.5,
      }
    });

    tl.fromTo(meshRef.current, 
      { 
        x: side * -300, 
        rotationZ: side * -5, 
        opacity: 0,
        scale: 0.8
      },
      { 
        x: 0, 
        rotationZ: 0, 
        opacity: 1,
        scale: 1,
        ease: 'expo.out' 
      }
    );

    return () => tl.kill();
  }, [index]);

  // HOVER EFFECT: Lift & Drift
  useEffect(() => {
    if (isSelected) return;

    let rafId;
    const animateHover = () => {
      // Linear interpolation (lerp) for shiftXY
      shiftXY.current.x += (shiftXYTarget.current.x - shiftXY.current.x) * 0.1;
      shiftXY.current.y += (shiftXYTarget.current.y - shiftXY.current.y) * 0.1;

      if (meshRef.current) {
        gsap.to(meshRef.current, {
          y: -hoverRatio * 30 + shiftXY.current.y * 10,
          x: shiftXY.current.x * 10,
          duration: 0.5,
          overwrite: 'auto'
        });
      }
      rafId = requestAnimationFrame(animateHover);
    };

    animateHover();
    return () => cancelAnimationFrame(rafId);
  }, [hoverRatio, isSelected]);

  const handleMouseEnter = () => {
    setHoverRatio(1);
    shiftXYTarget.current = { x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2 };
  };

  const handleMouseLeave = () => {
    setHoverRatio(0);
    shiftXYTarget.current = { x: 0, y: 0 };
  };

  return (
    <div 
      ref={cardRef}
      className={`relative w-full aspect-[4/5] p-4 cursor-pointer transition-opacity duration-500 ${anySelected && !isSelected ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}
      onClick={() => onSelect(project)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={meshRef}
        className="relative w-full h-full overflow-hidden rounded-2xl shadow-xl bg-white group"
      >
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-sm font-sans uppercase tracking-widest mb-2" style={{ fontFamily: 'Urbanist' }}>{project.category}</p>
          <h3 className="text-3xl font-serif" style={{ fontFamily: 'Lacroom' }}>{project.title}</h3>
        </div>
      </div>
    </div>
  );
};

const FeaturedProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const overlayRef = useRef(null);

  // SELECTION ZOOM EFFECT
  useEffect(() => {
    if (selectedProject) {
      // Find the card element to center it
      // In a real implementation we'd calculate the exact offset, 
      // but for "Antigravity" concept we'll use a simplified centering overlay
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.6,
        ease: 'power3.inOut'
      });
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.4
      });
    }
  }, [selectedProject]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-32 px-6 md:px-12 bg-[#FAF8F5] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-5xl md:text-8xl font-serif text-[#323232] mb-6" style={{ fontFamily: 'Lacroom' }}>
            Featured Work
          </h2>
          <p className="text-xl text-[#323232]/60 max-w-2xl mx-auto" style={{ fontFamily: 'Urbanist' }}>
            A curated selection of our most ambitious architectural and design projects.
          </p>
        </div>

        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24"
        >
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              onSelect={setSelectedProject}
              isSelected={selectedProject?.id === project.id}
              anySelected={!!selectedProject}
            />
          ))}
        </div>
      </div>

      {/* Selected Project Full-Screen Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-[100] bg-black/90 opacity-0 pointer-events-none flex items-center justify-center p-4 md:p-20"
        onClick={() => setSelectedProject(null)}
      >
        {selectedProject && (
          <div className="relative w-full h-full max-w-6xl flex flex-col md:flex-row items-center gap-12 text-white">
            <button 
              className="absolute top-0 right-0 p-4 text-white hover:rotate-90 transition-transform duration-300"
              onClick={() => setSelectedProject(null)}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M10 10L30 30M30 10L10 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <div className="w-full md:w-2/3 h-2/3 md:h-full overflow-hidden rounded-2xl shadow-2xl">
               <img 
                 src={selectedProject.image} 
                 alt={selectedProject.title} 
                 className="w-full h-full object-cover"
               />
            </div>
            <div className="w-full md:w-1/3 flex flex-col justify-center">
               <p className="text-sm uppercase tracking-[0.3em] text-white/60 mb-4" style={{ fontFamily: 'Urbanist' }}>{selectedProject.category}</p>
               <h3 className="text-5xl md:text-7xl font-serif mb-8" style={{ fontFamily: 'Lacroom' }}>{selectedProject.title}</h3>
               <p className="text-lg text-white/80 leading-relaxed mb-12">
                 This project represents our "Antigravity" approach to design—where form meets weightlessness. Every detail is meticulously crafted to defy expectations.
               </p>
               <div className="flex gap-6">
                 <button className="px-8 py-3 bg-white text-black font-sans uppercase tracking-widest text-sm hover:bg-transparent hover:text-white border border-white transition-all duration-300">
                   View Case Study
                 </button>
               </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProjects;

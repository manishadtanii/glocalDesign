/**
 * Footer Component
 * Redesigned to match premium UI with responsive behavior
 */
import React from 'react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF8F5] pt-40 pb-0 relative z-30 overflow-hidden w-full">
      <div className="w-full max-w-[1500px] mx-auto px-6 md:px-16 lg:px-[8%] relative">
        
        {/* Scroll To Top Button */}
        <div className="absolute top-0 right-6 md:right-16 lg:right-[8%] -mt-4 md:-mt-8 animate-bounce">
          <button 
            onClick={scrollToTop}
            className="w-10 h-10 md:w-12 md:h-12 border border-[#c4c4c4] rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-sm"
            aria-label="Scroll to top"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </button>
        </div>

        {/* Main Flex Container */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 mt-8 md:mt-16 gap-12 md:gap-8">
           
           {/* Left Column: Heading */}
           <div className="max-w-xl">
             <h2 className="font-['Lacroom'] text-[2.8rem] md:text-[3.5rem] lg:text-[4.2rem] text-[#111] mb-3 md:mb-5 leading-[1.05] tracking-tight">
               Turning Concepts<br/>Into Landmarks.
             </h2>
             <p className="font-['Urbanist'] text-[#999] font-light text-base md:text-[1.05rem] tracking-wide">
               Your <span className="text-[#b2000a] font-medium">dream space</span> is just a conversation away
             </p>
           </div>

           {/* Right Column: Contact & Socials */}
           <div className="flex flex-col md:flex-row items-start md:items-end gap-6 md:gap-12 lg:gap-16">
              
              {/* Contact Info */}
              <div>
                <h4 className="font-['Urbanist'] font-semibold text-[#111] mb-3 text-[0.95rem]">Contact</h4>
                <ul className="list-none p-0 m-0 flex flex-col gap-[0.35rem] font-['Urbanist'] text-[0.85rem] text-[#555] font-normal tracking-[0.02em]">
                   <li>Glocal Design</li>
                   <li className="leading-relaxed">B-73, Head Field Solutions,<br/>Sector-57, Noida</li>
                   <li>+91 8860870874</li>
                   <li className="pt-1">Info@Glocaldesign.Com</li>
                </ul>
              </div>

              {/* Social Icons */}
              <div className="flex gap-3 pb-[0.15rem] mt-2 md:mt-0">
                <SocialIcon type="instagram" link="https://www.instagram.com/glocal.design/" />
                <SocialIcon type="youtube" link="https://www.youtube.com/@Glocal.Design" />
              </div>
           </div>

        </div>

        {/* Divider Line */}
        <div className="w-full h-[1px] bg-[#e3e3e3] mb-6" />

        {/* Copyright */}
        <div className="text-center mb-10 md:mb-8">
          <p className="font-['Urbanist'] text-[0.7rem] md:text-[0.75rem] text-[#a0a0a0] font-light tracking-[0.05em]">
            Copyright © 2025 - All Rights Reserved By Glocal Studio.
          </p>
        </div>
      </div>

      {/* Massive GLOCAL DESIGN Bottom Text */}
      <div className="w-full flex justify-center overflow-hidden">
        <h1 className="font-['Lacroom'] font-normal text-[14.3vw] leading-none m-0 -mb-[3.5vw] whitespace-nowrap tracking-tight text-[#111]">
          GLOCAL DESIGN
        </h1>
      </div>
    </footer>
  );
};

// ── Social Icon SVG Component ──
const SocialIcon = ({ type, link }) => {
  const getIcon = () => {
    switch (type) {
      case 'instagram':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        );
      case 'youtube':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-7 h-7 bg-[#b2000a] text-white rounded cursor-pointer transition-transform duration-200 hover:-translate-y-1"
    >
      {getIcon()}
    </a>
  );
};

export default Footer;
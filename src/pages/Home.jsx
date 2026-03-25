/**
 * Home Page Component
 * LERP-based scroll animation with 200vh scroll area
 */

import React from 'react';
import Navbar from '../components/Navbar';
import HeroHeading from '../components/HeroHeading';
import HeroQuotes from '../components/HeroQuotes';
// import ImageRevealStack from '../components/ImageRevealStack';
import ScrollAnimationCanvas from '../components/ScrollAnimationCanvas';
import AboutUs from '../components/AboutUs';
import BeforeAfter from '../components/BeforeAfter';
import DesignStyles from '../components/DesignStyles';
// import FeaturedProjects from '../components/FeaturedProjects';
import ProjectsCarousel from '../components/ProjectsCarousel';
import ServicesSection from '../components/ServicesSection';
import SectionHeader from '../components/SectionHeader';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Navigation Bar */}
      <Navbar />

      {/* Canvas background (fixed, behind everything) */}
      <ScrollAnimationCanvas totalFrames={377} />

      {/* Hero Heading (positioned over canvas) */}
      <HeroHeading />
      <HeroQuotes />

      {/* Image Reveal Stack Section */}

      {/* 350vh scroll trigger area — provides enough space for the 400 frames to animate at a good pace */}
      <div className="h-[350vh]" />

      {/* AboutUs Section — appears after scroll animation completes */}
      <div id="about-us" className="relative z-20 bg-[#FAF8F5]">
        <AboutUs />
      </div>

      {/* <ImageRevealStack /> */}
      {/* Before / After scroll comparison */}
      <BeforeAfter />

      {/* Design Styles hover accordion */}
      <DesignStyles />
      <SectionHeader />
      <ServicesSection />
      {/* Antigravity Featured Projects Grid */}
      {/* <FeaturedProjects /> */}
      {/* Projects drag carousel */}
      <ProjectsCarousel />

      {/* Floating Envelope Contact Form */}
      <ContactForm />

      {/* Main Footer */}
      <Footer />
    </div>
  );
};

export default Home;

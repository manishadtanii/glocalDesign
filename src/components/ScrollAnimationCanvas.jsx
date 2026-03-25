/**
 * ScrollAnimationCanvas Component
 * Renders animation frames on canvas controlled by scroll
 * LERP-based smooth rendering with sticky canvas
 */

import React, { useEffect, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import FramePreloader from '../utils/framePreloader';

const ScrollAnimationCanvas = ({ totalFrames = 377 }) => {
  const canvasRef = useRef(null);
  const framePreloaderRef = useRef(null);

  // Initialize preloader
  if (!framePreloaderRef.current) {
    framePreloaderRef.current = new FramePreloader(totalFrames);
  }

  // Hook for LERP animation
  useScrollAnimation(canvasRef, framePreloaderRef.current, totalFrames);

  // Preload all frames
  useEffect(() => {
    framePreloaderRef.current.preloadFrames();
  }, [totalFrames]);

  // Setup canvas size
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setSize();
    window.addEventListener('resize', setSize);
    return () => window.removeEventListener('resize', setSize);
  }, []);

  return (
    <div className="relative w-full h-0">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-screen z-0"
        style={{ display: 'block', transform: 'translateZ(0)', willChange: 'transform' }}
      />
    </div>
  );
};

export default ScrollAnimationCanvas;

/**
 * useScrollAnimation Hook
 * Synchronizes canvas frames with GSAP ScrollTrigger
 * Eliminates manual scroll listeners for perfect page sync
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = (canvasRef, framePreloader, totalFrames = 361) => {
  const scrollTriggerRef = useRef(null);
  const lastFrameRef = useRef(-1);

  useEffect(() => {
    if (!canvasRef.current || !framePreloader) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });

    // Draw frame function with caching to avoid re-drawing same frame
    const drawFrame = (frameIndex) => {
      const floorIndex = Math.floor(frameIndex);
      
      // Skip if already drawn this frame
      if (lastFrameRef.current === floorIndex) return;
      lastFrameRef.current = floorIndex;

      const frame = framePreloader.getFrame(floorIndex);
      if (!frame) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const imgRatio = frame.width / frame.height;
      const canvasRatio = canvas.width / canvas.height;
      let dw, dh, dx, dy;

      if (imgRatio > canvasRatio) {
        dh = canvas.height;
        dw = dh * imgRatio;
        dx = (canvas.width - dw) / 2;
        dy = 0;
      } else {
        dw = canvas.width;
        dh = dw / imgRatio;
        dx = 0;
        dy = (canvas.height - dh) / 2;
      }

      ctx.drawImage(frame, dx, dy, dw, dh);
    };

    // Create ScrollTrigger with both scrub and useRAF for smooth performance
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      endTrigger: "#about-us", // Use About Us as the end reference
      end: "top bottom", // Finish animation exactly when About Us touches the bottom of the screen 
      scrub: 0.5, // Reduced scrub delay for better responsiveness
      fastScrollEnd: true, // Improve performance on fast scroll
      onUpdate: (self) => {
        const frameIndex = self.progress * (totalFrames - 1);
        drawFrame(frameIndex);
      },
      onRefresh: (self) => {
         // Fix canvas sizing on refresh
         canvas.width = window.innerWidth;
         canvas.height = window.innerHeight;
         lastFrameRef.current = -1; // Reset frame cache on resize
         // Draw the CORRECT frame for the current scroll position
         const frameIndex = self.progress * (totalFrames - 1);
         drawFrame(frameIndex);
      }
    });

    // Initial draw
    const init = async () => {
      // Ensure first frame is ready
      await framePreloader.loadFrame(0);
      drawFrame(0);
      // Refresh to sync with current scroll if already scrolled
      ScrollTrigger.refresh();
    };
    init();

    return () => {
      if (scrollTriggerRef.current) scrollTriggerRef.current.kill();
    };
  }, [canvasRef, framePreloader, totalFrames]);

  return { scrollTrigger: scrollTriggerRef.current };
};

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

/**
 * ScrollToTopButton Component
 *
 * A reusable component that displays a button to scroll to the top of the page
 * when the user scrolls down beyond a certain threshold.
 *
 * Features:
 * - Appears when user scrolls down (customizable threshold)
 * - Smooth animation for appearance/disappearance
 * - Hover and tap animations for better interactivity
 * - Accessible with keyboard navigation
 * - Responsive design
 */
const ScrollToTopButton = () => {
  // State to track whether button should be visible
  const [isVisible, setIsVisible] = useState(false);

  // Effect to handle scroll event and button visibility
  // Effect to calculate threshold and handle scroll event
  useEffect(() => {
    /**
     * Calculates the scroll threshold dynamically:
     * - Base threshold is 25% of viewport height
     * - Minimum threshold of 200px to prevent too early appearance
     * - Maximum threshold of 800px to ensure button appears on long pages
     */
    const calculateThreshold = () => {
      const viewportHeight = window.innerHeight;
      const baseThreshold = viewportHeight * 0.25; // 25% of viewport height

      // Clamp the threshold between 200px and 800px
      return Math.min(Math.max(baseThreshold, 200), 800);
    };

    /**
     * Handles scroll event and updates button visibility
     * Uses RAF (requestAnimationFrame) for performance optimization
     */
    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const threshold = calculateThreshold();
        const currentScroll = window.scrollY;

        // Update visibility based on scroll position and threshold
        setIsVisible(currentScroll > threshold);
      });
    };

    // Initial threshold calculation and scroll check
    handleScroll();

    // Add scroll and resize event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  /**
   * Scrolls to top of page with smooth animation
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className='fixed bottom-8 right-8 bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50'
          aria-label='Scroll to top'
        >
          <ArrowUp className='w-6 h-6 text-white' />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;

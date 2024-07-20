'use client';
import { useState, useEffect } from 'react';

/**
 * Hook for handling sticky scroll behavior
 */
const useStickyScroll = (duration: number) => {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      for (let i = 1; i <= 3; i++) {
        const section = document.getElementById(`section-${i}`) as HTMLElement;
        const rect = section.getBoundingClientRect();

        if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
          setActiveSection(i);
          return;
        }
      }
      setActiveSection(null);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (activeSection) {
      const timeout = setTimeout(() => {
        setActiveSection(null);
      }, duration * 1000);

      return () => clearTimeout(timeout);
    }
  }, [activeSection, duration]);

  return activeSection;
};

export default useStickyScroll;

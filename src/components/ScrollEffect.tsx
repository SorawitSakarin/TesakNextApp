'use client';
import { useEffect, useRef, useState } from 'react';

const ScrollEffect = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.5, // Adjust this value as needed
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      console.log('Component is visible');
      // Activate something here
    } else {
      console.log('Component is not visible');
    }
  }, [isVisible]);

  return (
    <div
      ref={ref}
      className={`w-64 h-64 bg-primary flex items-center justify-center text-white transition-transform duration-1000 ${isVisible ? 'rotate-180 scale-75' : 'rotate-0 scale-100'}`}
    >
      {isVisible ? 'Visible' : 'Not Visible'}
    </div>
  );
};

export default ScrollEffect;

'use client';
import { useEffect, useState } from 'react';

const ScrollA = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scale = Math.max(1 - scrollY / 1000, 0.3);
  const rotate = scrollY / 2;

  return (
    <div
      className='w-[640px] h-[640px] bg-primary flex items-center justify-center text-white'
      style={{
        transform: `rotate(${rotate}deg) scale(${scale})`,
      }}
    >
      Scroll to Transform
    </div>
  );
};

export default ScrollA;

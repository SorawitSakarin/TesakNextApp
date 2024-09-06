'use client';
import { Experience } from '@/app/product/[productId]/components/Experience';
import { Preload, ScrollControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';

interface airplaneCardProps {
  province: string;
  productImages: string;
}

export default function AirplaneCard() {
  const [enableCanvasScroll, setEnableCanvasScroll] = useState(false);
  const [enableDisplayButton, setEnableDisplayButton] = useState(true);
  const airplaneCardRef = useRef<HTMLDivElement | null>(null);


  const buttonOnClickHandeler = () => {
    setEnableCanvasScroll(true);
    setEnableDisplayButton(false);
    // Scroll to the airplaneCard div
    if (airplaneCardRef.current) {
      if (airplaneCardRef.current) {
        const bounding = airplaneCardRef.current.getBoundingClientRect();
        window.scrollTo({
          top: bounding.top + window.pageYOffset,
          behavior: 'smooth',
        });
      }
    };
  }
  return (
    <div
      id='airplaneCard'
      ref={airplaneCardRef} //
      className='relative flex h-screen  w-full  text-primary'
    // onWheel={handleWheel}
    >
      <button
        onClick={buttonOnClickHandeler}
        className={` ${enableDisplayButton ? 'btn' : 'btn-ghost'} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10000]`}
      >
        {enableDisplayButton ? 'Start to explore' : ""}
      </button>
      <Canvas className='absolute inset-0'>
        <Preload all />
        <color attach={'background'} args={['#ececec']} />
        <ScrollControls
          pages={enableCanvasScroll ? 30 : 0}
          damping={1}
          enabled={enableCanvasScroll}
        >
          <Experience setEnableCanvasScroll={setEnableCanvasScroll} />
        </ScrollControls>
      </Canvas>
    </div>
  );
};

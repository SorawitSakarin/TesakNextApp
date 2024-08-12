'use client';
import { Experience } from '@/app/product/[productId]/components/Experience';
import { ScrollControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

export default function AirplaneCard() {
  return (
    <div className='flex h-screen  w-full  text-primary '>
      <Canvas>
        <color attach={'background'} args={['#ececec']} />
        <ScrollControls pages={30} damping={1}>
          <Experience />
        </ScrollControls>
      </Canvas>
    </div>
  );
}

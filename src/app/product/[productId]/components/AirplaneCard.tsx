'use client';

import { Canvas } from '@react-three/fiber';
import Background from './Background';
import Airplane from '@/app/product/[productId]/components/Airplane';
import { ScrollControls } from '@react-three/drei';
import { Experience } from '@/app/product/[productId]/components/Experience';

export default function AirplaneCard() {
  return (
    <div className='flex h-screen  w-full p-4  gap-4 text-primary '>
      <Canvas>
        <color attach={'background'} args={['#ececec']} />
        <ScrollControls pages={30} damping={1}>
          <Experience />
        </ScrollControls>
      </Canvas>
    </div>
  );
}

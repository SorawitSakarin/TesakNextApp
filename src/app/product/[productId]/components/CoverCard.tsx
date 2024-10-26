'use client';
import TesakLogo from '@/app/product/[productId]/components/TesakLogo';
import CoverBg from '@/assets/cover-bg.png';
import WaveBG from '@/components/WaveBG';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface CoverCardProps {
  image: any;
  productName: string;
}
export default function CoverCard({ image, productName }: CoverCardProps) {
  const [animate, setAnimate] = useState<'in' | 'out'>('in');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimate('in');
    }, 0);

    const timer2 = setTimeout(() => {
      setAnimate('out');
    }, 1000); // Wait for 1s after the initial 1s animation

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className='bg-base-200 h-screen relative'>
      <div
        id='cover-start'
        className={`flex flex-col w-screen h-full bg-cover bg-center justify-center text-center items-center gap-2   ${animate === 'in' ? '' : 'animate-fadeOut'}`}
      >
        <div className='z-10'>
          <TesakLogo width='80px' />
        </div>
        <p className='text-2xl font-bold z-10'>TESAK KASET</p>
        <Image
          alt='Background'
          src={CoverBg}
          placeholder='blur'
          quality={100}
          fill
          sizes='100vh'
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
      <div
        className={`absolute z-10 top-0 left-0 w-[100vw] h-[100vh] bg-primary-200  ${animate === 'out' ? 'animate-moveInTop' : 'hidden'}`}
      ></div>
      <div
        className={`absolute top-0 right-0 w-screen h-screen  bg-primary z-0  ${animate === 'out' ? 'animate-fadeIn' : 'hidden'}`}
      ></div>

      <div
        id='appear'
        className={`absolute top-0 z-50 flex flex-col w-screen h-full justify-center text-center items-center gap-2  ${animate === 'out' ? 'animate-fadeIn' : 'hidden'}`}
      >
        <WaveBG image={image} name={productName} />
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import FreshPork from '@/app/assets/fresh-pork.png';
import Rice from '@/app/assets/rice.png';
import Leaf from '@/app/assets/leaf.png';
import Bush from '@/app/assets/bush.png';
import Chili from '@/app/assets/chili.png';
import Logo from '@/app/assets/tesak-logo.png';
import Pineapple from '@/app/assets/pineapple.png';
import Carrot from '@/app/assets/carrot.png';
import Plate from '@/app/assets/plate.png';
import ProductImage from '@/app/assets/bag-of-rice-1.webp';
import CoverBg from '@/app/assets/cover-bg.png';
import TesakLogo from '@/app/product/[productId]/components/TesakLogo';
import WaveBG from '@/app/components/WaveBG';

export default function CoverCard() {
  const [animate, setAnimate] = useState<'in' | 'out'>('in');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimate('in');
    }, 0);

    const timer2 = setTimeout(() => {
      setAnimate('out');
    }, 2000); // Wait for 1s after the initial 1s animation

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
        {/* <Image src={Logo} className='z-10' alt='tesak-pork' /> */}
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
      {/* <div
        className={`absolute bottom-0 right-0 w-[100vw] translate-x-1/2 aspect-half rounded-tl-full rounded-tr-full bg-primary z-20 ${animate === 'out' ? ' animate-fadeInCurve' : 'hidden'}`}
      ></div>
      <div
        className={`absolute bottom-0 right-0 w-[62vw] translate-x-[-50%] aspect-half rounded-tl-full rounded-tr-full bg-primary z-20 ${animate === 'out' ? ' animate-fadeInCurve' : 'hidden'}`}
      ></div>
      <div
        className={`absolute bottom-0 left-0 w-[38vw] translate-x-[-50%] aspect-half rounded-tl-full rounded-tr-full bg-primary z-20 ${animate === 'out' ? ' animate-fadeInCurve' : 'hidden'}`}
      ></div> */}
      <div
        className={`absolute top-0 right-0 w-screen h-screen  bg-primary z-0  ${animate === 'out' ? 'animate-fadeIn' : 'hidden'}`}
      ></div>

      <div
        id='appear'
        className={`absolute top-0 z-50 flex flex-col w-screen h-full justify-center text-center items-center gap-2  ${animate === 'out' ? 'animate-fadeIn' : 'hidden'}`}
      >
        <WaveBG image={ProductImage} name='Bag of rice' />
      </div>
    </div>
  );
}

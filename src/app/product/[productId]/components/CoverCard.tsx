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
import RedDip from '@/app/assets/red-dip.png';

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
        className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center gap-2 flex flex-col ${animate === 'in' ? 'animate-fadeIn' : 'animate-fadeOut'}`}
      >
        <Image src={Logo} className='' alt='tesak-pork' />
        <p className='text-2xl font-bold'>Tesak Kaset</p>
      </div>
      <Image
        src={FreshPork}
        className={`absolute top-0 right-0 h-[30%] translate-x-[60%] translate-y-[-30%]  ${animate === 'in' ? 'animate-fadeIn' : 'animate-moveOutRight'}`}
        alt='tesak-pork'
      />
      <Image
        src={Rice}
        className={`absolute bottom-0 left-0  h-[30%] translate-x-[-60%] translate-y-[30%] ${animate === 'in' ? 'animate-fadeIn' : 'animate-moveOutLeft'}`}
        alt='tesak-rice'
      />
      <Image
        src={Leaf}
        className={`absolute bottom-[50%] h-[30%] left-0 translate-x-[-70%] translate-y-[50%] ${animate === 'in' ? 'animate-fadeIn' : 'animate-moveOutLeft'}`}
        alt='tesak-leaf'
      />
      <Image
        src={Bush}
        className={`absolute bottom-0 right-0 h-[30%] translate-x-[60%] translate-y-[20%] ${animate === 'in' ? 'animate-fadeIn' : 'animate-moveOutRight'}`}
        alt='tesak-bush'
      />
      <Image
        src={Chili}
        className={`absolute bottom-0 left-[50%] translate-x-[-30%] translate-y-[30%] ${animate === 'in' ? 'animate-fadeIn' : 'animate-moveOutRight'}`}
        alt='tesak-chili'
        width={80}
      />
      <Image
        src={Pineapple}
        className={`absolute right-0 top-[50%] h-[30%] translate-x-[60%] translate-y-[-50%] ${animate === 'in' ? 'animate-fadeIn' : 'animate-moveOutRight'}`}
        alt='tesak-pineapple'
      />
      <Image
        src={Carrot}
        className={`absolute left-0 top-0 h-[30%] w-[30%] translate-x-[-20%] translate-y-[-20%] scale-x-[-1] ${animate === 'in' ? 'animate-fadeIn' : 'animate-moveOutLeft'}`}
        alt='tesak-carrot'
      />
      <Image
        src={Plate}
        className={`absolute left-[50%] top-0 w-[30%] aspect-square max-w-[200px] translate-x-[-50%] translate-y-[-20%] ${animate === 'in' ? 'animate-fadeIn' : 'animate-moveOutRight'}`}
        alt='tesak-plate'
      />
      <Image
        src={RedDip}
        className={`absolute left-[50%] top-[10%] aspect-square w-[10%]  max-w-[100px] translate-x-[30%] translate-y-[-50%] ${animate === 'in' ? 'animate-fadeIn' : 'animate-moveOutRight'}`}
        alt='tesak-red-dip'
      />

      <div
        className={`absolute top-0 left-0 w-[50vw] h-[30vh] bg-primary-200  ${animate === 'out' ? 'animate-moveInTop' : 'hidden'}`}
      ></div>
      <div
        className={`absolute top-0 right-0 w-[50vw] h-[70vh] bg-primary-200  ${animate === 'out' ? 'animate-moveInTop' : 'hidden'}`}
      ></div>
      <div
        className={`absolute bottom-0 left-0 w-[50vw] h-[70vh] bg-primary  ${animate === 'out' ? 'animate-moveOutTop' : 'hidden'}`}
      ></div>
      <div
        className={`absolute bottom-0 right-0 w-[50vw] h-[30vh] bg-primary  ${animate === 'out' ? 'animate-moveOutTop' : 'hidden'}`}
      ></div>
      <div
        id='appear'
        className={`flex flex-col w-screen h-full justify-center text-center items-center gap-2  ${animate === 'out' ? 'animate-fadeIn' : 'hidden'}`}
        // className={`flex flex-col w-screen h-full bg-cover bg-center justify-center text-center items-center gap-2  ${animate === 'out' ? 'animate-fadeIn' : 'hidden'}`}
        // style={{ backgroundImage: `url(${RedDip.src})` }}
      >
        <div className='bg-secondary text-secondary-content grid place-content-center text-5xl font-black p-4 rounded-lg'>
          <p>TESAK</p>
        </div>
      </div>
    </div>
  );
}

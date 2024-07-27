import BGFarmers from '@/app/assets/bg-farmers.webp';
import Farmer from '@/app/assets/farmer.png';
import { GoPeople } from 'react-icons/go';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { useState } from 'react';
import Image from 'next/image';

export default function FarmerInformationNew() {
  const name = 'Chatatorn Group';
  const experience = 30;
  const products: string[] = ['Rice', 'Pineapple', 'Tomato', 'Potato'];
  const farmerMessage =
    'Every grain of rice, every piece of fruit, and every vegetable we grow is nurtured with care and dedication. We adhere to organic and sustainable farming practices that not only ensure the highest quality produce but also protect our precious environment. Our fields in Chiang Mai have been cultivated by our family for generations, and we take immense pride in continuing this legacy of excellence.';

  const [showLeft, setShowLeft] = useState<boolean>(true);
  function LeftSide() {
    return (
      <div className='w-full flex flex-col items-center justify-center text-md leading-[24px]'>
        <div className='flex gap-2 items-center '>
          <p className='text-xl font-bold'>Farmers</p> <GoPeople />
        </div>
        <p>Name: {name}</p>
        <p>Experience: {experience} years</p>
        <p className='flex gap-1 flex-wrap'>
          Products:{' '}
          <span>
            {products.map((product: string, index: number) => {
              if (index < 2) return product + ', ';
              if (index === 2) return product + ', and more';
            })}
          </span>
        </p>
        <button
          onClick={() => setShowLeft(false)}
          className='btn mt-8 glass text-base-200 hover:text-base-content  whitespace-nowrap'
        >
          Lets see who we are <FaArrowCircleRight />
        </button>
      </div>
    );
  }
  function RightSide() {
    return (
      <div className='w-full flex flex-col items-center justify-center text-md leading-[24px] px-4 text-center gap-4'>
        <div className='flex gap-2 items-center '>
          <p className='text-xl font-bold'>Farmers</p> <GoPeople />
        </div>
        <div
          className='w-[200px] h-[200px] bg-cover bg-center'
          style={{ backgroundImage: `url(${Farmer.src})` }}
        ></div>
        <p>{farmerMessage}</p>
        <button
          onClick={() => setShowLeft(true)}
          className='btn animate-pulse mt-8 glass text-base-200 hover:text-base-content  whitespace-nowrap'
        >
          <FaArrowCircleLeft /> Back
        </button>
      </div>
    );
  }
  return (
    <div className='bg-[#000] relative   w-screen min-h-[80vh] overflow-hidden text-white'>
      <div
        className='flex justify-between w-full min-h-[80vh]  p-4  gap-4 text-primary-content bg-cover bg-center'
        style={{ backgroundImage: `url(${BGFarmers.src})`, opacity: 0.3 }}
      ></div>

      <div
        className={`absolute  top-1/2  translate-y-[-50%] w-full transition-transform duration-1000 ${showLeft ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <LeftSide />
      </div>
      <div
        className={`absolute  top-1/2  translate-y-[-50%] w-full transition-transform duration-1000 ${showLeft ? 'translate-x-full' : 'translate-x-0'}`}
      >
        <RightSide />
      </div>
    </div>
  );
}

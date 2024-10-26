'use client';
import BGFarmers from '@/assets/bg-farmers.png';
import { useState } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { GoPeople } from 'react-icons/go';

interface FarmerInformationProps {
  farmerName: string;
  farmerExperience: number;
  farmerProducts: string[];
  farmerMessage: string;
  farmerImage: any;
}

export default function FarmerInformationNew({
  farmerName,
  farmerExperience,
  farmerProducts,
  farmerMessage,
  farmerImage,
}: FarmerInformationProps) {
  const [showLeft, setShowLeft] = useState<boolean>(true);
  function LeftSide() {
    return (
      <div className='w-full flex flex-col items-center justify-center text-md leading-[24px]'>
        <div className='flex gap-2 items-center '>
          <p className='text-xl font-bold'>Farmers</p> <GoPeople />
        </div>
        <div className='w-[350px] flex flex-col items-center justify-center '>
          <p>Name: {farmerName}</p>
          <p>Experience: {farmerExperience} years</p>
          <p className='flex gap-1 flex-wrap'>
            Products:{' '}
            <span>
              {farmerProducts.map((product: string, index: number) => {
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
          className='w-[300px] bg-contain bg-no-repeat bg-center'
          style={{
            backgroundImage: `url(${farmerImage.src})`,
            height: `${(300 / farmerImage.width) * farmerImage.height}px`,
          }}
        ></div>
        <p className='text-xs w-[350px]'>{farmerMessage}</p>
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

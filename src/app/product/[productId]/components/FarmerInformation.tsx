import Image from 'next/image';
import Farmer from '@/app/assets/farmer.png';
import { GoPeople } from 'react-icons/go';

export default function FarmerInformation() {
  const name = 'Chatatorn Ku';
  const experience = 30;
  const products: string[] = ['Rice', 'Pineapple', 'Tomato', 'Potato'];
  return (
    <div className='flex justify-between w-full p-4  gap-4 text-primary-content rounded-xl'>
      <div className='w-1/2 flex-wrap'>
        <div className='flex gap-2 items-center '>
          <p className='text-lg font-semibold'>Farmer</p> <GoPeople />
        </div>
        <p className='text-xs'>Name: {name}</p>
        <p className='text-xs'>Experience: {experience} years</p>
        <p className='text-xs flex gap-1 flex-wrap'>
          Products:{' '}
          <span>
            {products.map((product: string, index: number) => {
              if (index < 2) return product + ', ';
              if (index === 2) return product + ', and more';
            })}
          </span>
        </p>
      </div>
      <div className='basis-1/2 overflow-x-auto luxury-card'>
        <Image src={Farmer} alt='location-map' className='rounded-xl' />
      </div>
    </div>
  );
}

import Image from 'next/image';
import Product1 from '@/app/assets/bag-of-rice-1.webp';
import Product2 from '@/app/assets/bag-of-rice-2.webp';
import Product3 from '@/app/assets/bag-of-rice-3.webp';
import { nutritionalInfo } from '@/app/type';
import { RiFireLine } from 'react-icons/ri';
import { LuBeef } from 'react-icons/lu';
import { MdOutlineWaterDrop } from 'react-icons/md';
import { PiBread } from 'react-icons/pi';
import { FiMapPin } from 'react-icons/fi';
import Field from '@/app/assets/field.png';
import Link from 'next/link';

export default function LocationInformation() {
  const mapBtnClick = () => {
    window.location.href =
      'https://www.google.co.th/maps/@18.3170581,99.3986862,17z?hl=th&entry=ttu';
  };
  return (
    <div className='flex justify-between w-full p-4  gap-4 text-primary-content rounded-xl'>
      <div className='w-1/2 overflow-x-auto luxury-card relative'>
        <Image src={Field} alt='location-map' className='rounded-xl' />
        <button
          onClick={mapBtnClick}
          className='btn glass text-base-200 hover:text-base-content absolute bottom-2 right-[50%] translate-x-[50%] whitespace-nowrap'
        >
          See on Map!
        </button>
      </div>
      <div className='w-1/2'>
        <div className='flex gap-2 items-center '>
          <p className='text-lg font-semibold'>Location</p> <FiMapPin />
        </div>
        <p className='text-xs'>Country: Thailand</p>
        <p className='text-xs'>Province: Bangkok</p>
        <p className='text-xs'>District: Jattujak</p>
      </div>
    </div>
  );
}

'use client';
import BGFarm from '@/app/assets/bg-farms.webp';
import { FiMapPin } from 'react-icons/fi';
import { LuMap } from 'react-icons/lu';

interface LocationInformationProps {
  country: string;
  province: string;
  district: string;
  farmName: string;
  size: string | number;
  sizeUnit: string;
  establish: string;
  type: string;
  climate: string;
}

export default function LocationInformationNew({
  country,
  province,
  district,
  farmName,
  size,
  sizeUnit,
  establish,
  type,
  climate,
}: LocationInformationProps) {
  const mapBtnClick = () => {
    window.location.href =
      'https://www.google.co.th/maps/@18.3170581,99.3986862,17z?hl=th&entry=ttu';
  };
  return (
    <div className='bg-[#000] relative'>
      <div
        className='flex justify-between w-full min-h-[80vh] p-4  gap-4 text-primary-content bg-cover bg-center'
        style={{ backgroundImage: `url(${BGFarm.src})`, opacity: 0.4 }}
      ></div>
      <div className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-white w-full'>
        <div className='w-full flex flex-col items-center justify-center text-md leading-[24px]'>
          <div className='flex gap-2 items-center mb-2'>
            <p className='text-xl font-bold'>Location</p> <FiMapPin />
          </div>
          <p>Country: {country}</p>
          <p>Province: {province}</p>
          <p>District: {district}</p>
          <p>Farm: {farmName}</p>
          <p>
            Size: {size} {sizeUnit}
          </p>
          <p>Established: {establish}</p>
          <p>Type of Farm: {type}</p>
          <p>Climate: {climate}</p>
          <button
            onClick={mapBtnClick}
            className='btn mt-8 glass text-base-200 hover:text-base-content  whitespace-nowrap'
          >
            <LuMap /> See on Map!
          </button>
        </div>
      </div>
    </div>
  );
}

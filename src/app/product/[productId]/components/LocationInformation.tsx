import Field from '@/assets/field.png';
import Image from 'next/image';
import { FiMapPin } from 'react-icons/fi';

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
      <div className='w-1/2 text-xs leading-[20px]'>
        <div className='flex gap-2 items-center '>
          <p className='text-lg font-semibold'>Location</p> <FiMapPin />
        </div>
        <p>Country: Thailand</p>
        <p>Province: Bangkok</p>
        <p>District: Jattujak</p>
        <p>Farm: Sod Sai Farm</p>
        <p>Size: 100 square meter</p>
        <p>Established: 1930</p>
        <p>Type of Farm: Organic</p>
        <p>Climate: Tropical</p>
      </div>
    </div>
  );
}

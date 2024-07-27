import BGFarmers from '@/app/assets/bg-farmers.webp';
import Image from 'next/image';
import { GoPeople } from 'react-icons/go';

export default function FarmerInformationNew() {
  const name = 'Chatatorn Ku';
  const experience = 30;
  const products: string[] = ['Rice', 'Pineapple', 'Tomato', 'Potato'];
  return (
    <div className='bg-[#000] relative'>
      <div
        className='flex justify-between w-full h-[80vh]  p-4  gap-4 text-primary-content bg-cover bg-center'
        style={{ backgroundImage: `url(${BGFarmers.src})`, opacity: 0.4 }}
      >
        {/* <div className='w-1/2 flex-wrap text-xs leading-[20px]'>
        <div className='flex gap-2 items-center '>
          <p className='text-lg font-semibold'>Farmer</p> <GoPeople />
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
      </div>
      <div className='basis-1/2 overflow-x-auto luxury-card '>
        <Image src={Farmer} alt='location-map' className='rounded-xl' />
      </div> */}
      </div>
      <div className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-white w-full'>
        <div className='w-full flex flex-col items-center justify-center text-md leading-[24px]'>
          <div className='flex gap-2 items-center '>
            <p className='text-xl font-bold'>Farmers</p> <GoPeople />
          </div>
          <p>Country: Thailand</p>
          <p>Province: Bangkok</p>
          <p>District: Jattujak</p>
          <p>Farm: Sod Sai Farm</p>
          <p>Size: 100 square meter</p>
          <p>Established: 1930</p>
          <p>Type of Farm: Organic</p>
          <p>Climate: Tropical</p>
          <button className='btn animate-pulse mt-8 glass text-base-200 hover:text-base-content  whitespace-nowrap'>
            See on Map!
          </button>
        </div>
      </div>
    </div>
  );
}

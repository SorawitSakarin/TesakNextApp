'use client';
import WaveBG from '@/app/components/WaveBG';
import AirplaneCard from '@/app/product/[productId]/components/AirplaneCard';
import CoverCard from '@/app/product/[productId]/components/CoverCard';
import FarmerInformation from '@/app/product/[productId]/components/FarmerInformation';
import FarmerInformationNew from '@/app/product/[productId]/components/FarmerInformationNew';
import LocationInformation from '@/app/product/[productId]/components/LocationInformation';
import LocationInformationNew from '@/app/product/[productId]/components/LocationInformationNew';
import ProductInformation from '@/app/product/[productId]/components/ProductInformation';
import SaleInformation from '@/app/product/[productId]/components/SaleInformation';
// import useStickyScroll from "@/app/utils/stickyScroll";
import Image from 'next/image';

export default function Home({ params }: { params: { productId: string } }) {
  const { productId } = params;
  console.log(productId);
  return (
    <div className='flex flex-col w-screen '>
      <CoverCard />
      <AirplaneCard />
      <div className='container-wallpaper py-8'>
        <div className='flex flex-col wi-full gap-[48px]'>
          {/* <LocationInformation />
          <FarmerInformation /> */}
          <ProductInformation />
        </div>
      </div>
      <LocationInformationNew />
      <FarmerInformationNew />
      <SaleInformation />
      <div className='container-bg'></div>
      {/* <div id='first-card' className='min-h-screen bg-base-300'>
        <div className='h-screen flex items-center justify-center'>
          <p className='hover:bg-secondary-focus text-primary-content'>
            Scroll down to see the effect
          </p>
          <div className='flex'>
            <div className='bg-primary w-16 h-16'>
              <p className='text-primary-content'>Hello</p>
            </div>
          </div>
          <div className='flex'>
            <div className='bg-secondary w-16 h-16'>
              <p className='text-secondary-content'>Hello</p>
            </div>
          </div>
          <div className='flex'>
            <div className='bg-accent w-16 h-16'>
              <p className='text-accent-content'>Hello</p>
            </div>
          </div>
          <div className='flex'>
            <div className=' w-16 h-16'>
              <p className=''>Hello</p>
            </div>
          </div>
          <div className='flex'>
            <div className=' w-16 h-16'>
              <p className=''>Hello</p>
            </div>
          </div>
          <div className='flex'>
            <div className=' w-16 h-16'>
              <p className=''>Hello</p>
            </div>
          </div>
          <div className='flex'>
            <div className='bg-secondary w-8 h-8'></div>
            <div className='bg-secondary-focus w-8 h-8'></div>
            <div className='bg-secondary-content w-8 h-8'></div>
          </div>
        </div>
        <div className='flex'>
          <div className='bg-accent w-8 h-8'></div>
          <div className='bg-accent-focus w-8 h-8'></div>
          <div className='bg-accent-content w-8 h-8'></div>
        </div>
        <div className='flex'>
          <div className='bg-base-100 w-8 h-8'></div>
          <div className='bg-base-200 w-8 h-8'></div>
          <div className='bg-base-300 w-8 h-8'></div>
          <div className='bg-base-content w-8 h-8'></div>
        </div>
        <div className='flex'>
          <div className='bg-primary-100 w-8 h-8'>afd</div>
          <div className='bg-primary-200 w-8 h-8'></div>
          <div className='bg-primary-300 w-8 h-8'></div>
          <div className='bg-primary-content w-8 h-8'></div>
          <div className='bg-primary-heavy w-8 h-8'></div>
          <div className='bg-primary-500 w-16 h-16 rounded-box'></div>
          <div className='bg-primary-500 w-16 h-16 rounded-lg'></div>
        </div>
        <div className='h-screen flex items-center justify-center bg-base-100'>
          <ScrollEffect />
        </div>
        <div className='h-screen flex items-center justify-center'>
          <p>Scroll down to see the effect</p>
        </div>
      </div> */}
      {/* <p className="text-5xl">hi</p>
      <p className="text-2xl">hi</p>
      <div className="h-[200vh] bg-primary w-full"></div>
      <div className="relative">
        <ScrollA />
      </div>
      <div className="h-[200vh]"></div> */}
      {/* <div id="section-1" className="section">
        <div className="sticky-wrapper"><div>Component 1</div></div>
      </div>
      <div id="section-2" className="section">
        <div className={`sticky-wrapper ${activeSection === 2 ? 'sticky' : ''}`}><div>Component 2</div></div>
      </div>
      <div id="section-3" className="section">
        <div className="sticky-wrapper"><div>Component 3</div></div>
      </div> */}
    </div>
  );
}

import Image from 'next/image';
import BGFarm from '@/app/assets/desk.webp';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { IoAirplaneOutline } from 'react-icons/io5';
import { BsShop } from 'react-icons/bs';
import { RiShoppingBasketLine } from 'react-icons/ri';
export default function SaleInformation() {
  // const mapBtnClick = () => {
  //   window.location.href =
  //     'https://www.google.co.th/maps/@18.3170581,99.3986862,17z?hl=th&entry=ttu';
  // };
  return (
    <div className='bg-[#000] relative'>
      <div
        className='flex justify-between w-full min-h-[80vh] p-4  gap-4 text-primary-content bg-cover bg-center'
        style={{ backgroundImage: `url(${BGFarm.src})`, opacity: 0.4 }}
      ></div>
      <div className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-white w-full'>
        <div className='w-full flex flex-col justify-center text-md leading-[24px] px-8 text-left'>
          <div className='flex gap-2 items-center mb-2'>
            <p className='text-xl font-bold'>Sales and Distribution:</p>{' '}
            <MdOutlineLocalShipping />
          </div>

          <div className='flex gap-2 items-center'>
            <BsShop />
            <h6>Local Markets</h6>
          </div>
          <p className='mt-2'>- Mae Rim Organic Market</p>
          <p className='mb-4'>- Chiang Mai Farmers Market</p>
          <div className='flex gap-2 items-center'>
            <IoAirplaneOutline />
            <h6>Export Markets</h6>
          </div>
          <p className='mt-2'>- Japan</p>
          <p>- USA</p>
          <p className='mb-4'>- Germany</p>
          <div className='flex gap-2 items-center'>
            <RiShoppingBasketLine />
            <h6>Online Sales</h6>
          </div>
          <p className='mt-2 mb-4'>
            - Available on farm website and major online marketplaces
          </p>

          {/* <button
            onClick={mapBtnClick}
            className='btn animate-pulse mt-8 glass text-base-200 hover:text-base-content  whitespace-nowrap'
          >
            See on Map!
          </button> */}
        </div>
      </div>
    </div>
  );
}

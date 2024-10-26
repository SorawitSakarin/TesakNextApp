import BGFarm from '@/assets/desk.png';
import { BsShop } from 'react-icons/bs';
import { IoAirplaneOutline } from 'react-icons/io5';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { RiShoppingBasketLine } from 'react-icons/ri';
export default function SaleInformation() {
  return (
    <div className='bg-[#000] relative'>
      <div
        className='flex justify-between w-full min-h-[80vh] p-4  gap-4 text-primary-content bg-cover bg-center'
        style={{ backgroundImage: `url(${BGFarm.src})`, opacity: 0.4 }}
      ></div>
      <div className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-white w-full'>
        <div className='w-full flex flex-col justify-center items-center text-md leading-[24px] text-left'>
          <div className='w-[300px]'>
            <div className='flex gap-2 items-center mb-4'>
              <p className='text-xl font-bold'>Sales and Distribution:</p>
              <MdOutlineLocalShipping />
            </div>
            <div className='mb-4'>
              <div className='flex gap-2 items-center mb-2'>
                <BsShop />
                <h6 className='font-semibold'>Local Markets</h6>
              </div>
              <ol className='pl-6 list-disc'>
                <li>Mae Rim Organic Market</li>
                <li>Chiang Mai Farmers Market</li>
              </ol>
            </div>
            <div className='mb-4'>
              <div className='flex gap-2 items-center mb-2'>
                <IoAirplaneOutline />
                <h6 className='font-semibold'>Export Markets</h6>
              </div>
              <ol className='pl-6 list-disc'>
                <li>Dubai</li>
                <li>China</li>
                <li>Vietnam</li>
              </ol>
            </div>
            <div>
              <div className='flex gap-2 items-center mb-2'>
                <RiShoppingBasketLine />
                <h6 className='font-semibold'>Online Sales</h6>
              </div>
              <ol className='pl-6 list-disc'>
                <li>Available on farm website and major online marketplaces</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

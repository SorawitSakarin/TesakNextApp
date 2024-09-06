import TesakLogo from '@/app/product/[productId]/components/TesakLogo';
import './wavebg.css';
import Image from 'next/image';

interface WaveBGProps {
  image: any;
  name: string;
}
export default function WaveBG({ image, name }: WaveBGProps) {
  return (
    <div className='wave-bg playing'>
      <div className='wave'></div>
      <div className='wave'></div>
      <div className='wave'></div>
      <div className='absolute w-full top-[15%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-2 items-center'>
        <div className='flex items-center gap-4'>
          <TesakLogo width='64px' />
          <div className='flex flex-col gap-8'>
            <p className=' text-3xl font-bold leading-[0px]'>TESAK</p>
            <p className=' text-3xl font-bold leading-[0px]'>KASET</p>
          </div>
        </div>
        <p className=' text-sm font-semibold'>Farmer-led Food Revolution.</p>
      </div>
      <div className='absolute top-[30%] left-[50%] wave-card '>
        <div className='flex flex-col text-accent-content rounded-box bg-gradient-to-r from-accent-700 to-base-content'>
          {typeof image === 'string' && image.startsWith('data:')
            ? <img src={image} alt='product image' className='rounded-t-box w-full max-w-[300px]' />
            : <Image
              src={image}
              alt='product image'
              className='rounded-t-box w-full max-w-[300px]'
            />}
          <div className='flex flex-col items-center gap-2 pt-2 px-8 pb-8 max-w-[300px]'>
            <p className='text-xl font-semibold whitespace-nowrap'>
              - {name} -
            </p>
            <p className='text-lg whitespace-nowrap'>Product of Thailand</p>
            <p className='text-xs'>
              Thai Agriculture at Its Best: Quality, Security, and Health
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

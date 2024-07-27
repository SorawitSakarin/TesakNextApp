import Image from 'next/image';
import Product1 from '@/app/assets/bag-of-rice-1.webp';
import Product2 from '@/app/assets/bag-of-rice-2.webp';
import Product3 from '@/app/assets/bag-of-rice-3.webp';
import { nutritionalInfo } from '@/app/type';
import { RiFireLine } from 'react-icons/ri';
import { LuBeef } from 'react-icons/lu';
import { MdOutlineWaterDrop } from 'react-icons/md';
import { PiBread } from 'react-icons/pi';

interface CarouselProps {
  image: any;
}
function Carousel({ image }: CarouselProps) {
  return (
    <div className='carousel-item'>
      <Image src={image} alt='Burger' width={300} height={300} />
    </div>
  );
}

export default function ProductInformation() {
  const productName = 'Bag of rice';
  const productDescription =
    'Here is the high-quality image of the luxury bag of rice with dark purple packaging. If you need any further adjustments or have other requests, feel free to let me know!';
  const nutritionalInfo: nutritionalInfo = {
    calories: 3423,
    protein: 12,
    fat: 9,
    carbohydrates: 20,
  };
  return (
    <div className='flex flex-col w-full p-4 items-center h-full gap-4 '>
      <div className='card text-primary-content luxury-shadow bg-gradient-to-r from-accent-700 from-20% via-base-content via-80% to-primary'>
        <div className='carousel rounded-t-box'>
          {[Product1, Product2, Product3].map((product, index: number) => {
            return <Carousel image={product} key={index} />;
          })}
        </div>
        <div className='card-body '>
          <h2 className='card-title'>- {productName} -</h2>
          <p>{productDescription}</p>
          <div className='card-actions justify-end'>
            <div className='badge'>
              <RiFireLine />
              <p className='pl-1'> {nutritionalInfo.calories}calories </p>
            </div>
            <div className='badge'>
              <MdOutlineWaterDrop />
              <p className='pl-1'>Fat: {nutritionalInfo.fat}g</p>
            </div>
            <div className='badge'>
              <LuBeef />{' '}
              <p className='pl-1'>Protein: {nutritionalInfo.protein}g</p>
            </div>
            <div className='badge'>
              <PiBread />
              <p className='pl-1'> Carb: {nutritionalInfo.carbohydrates}g</p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex'></div>
    </div>
  );
}

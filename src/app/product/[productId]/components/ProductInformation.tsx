import Image from 'next/image';
import Product1 from '@/app/assets/bag-of-rice-1.webp';
import Product2 from '@/app/assets/bag-of-rice-2.webp';
import Product3 from '@/app/assets/bag-of-rice-3.webp';
import Product4 from '@/app/assets/bg-farms.webp';
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
    <div className='carousel-item '>
      <Image src={image} alt='Burger' height={300} />
    </div>
  );
}

function RatingStar() {
  return (
    <div className='rating rating-sm'>
      <input name='rating-1' className='mask mask-star bg-orange-400' />
      <input name='rating-1' className='mask mask-star bg-orange-400' />
      <input name='rating-1' className='mask mask-star bg-orange-400' />
      <input name='rating-1' className='mask mask-star bg-orange-400' />
      <input
        name='rating-1'
        className='mask mask-star bg-orange-400'
        defaultChecked
      />
    </div>
  );
}

interface ProductInformationProps {
  productName: string;
  productDescription: string;
  nutritionalInfo: nutritionalInfo;
}
export default function ProductInformation({
  productName,
  productDescription,
  nutritionalInfo,
}: ProductInformationProps) {
  return (
    <div className='flex flex-col pt-16 pb-8 w-full items-center justify-center min-h-[80vh] gap-4 bg-gradient-to-r from-accent-700 from-30% via-base-content via-70% to-primary-500'>
      <div className='carousel'>
        {[Product1, Product2, Product3, Product4].map(
          (product, index: number) => {
            return <Carousel image={product} key={index} />;
          },
        )}
      </div>
      <div className='card text-primary-content '>
        <div className='card-body '>
          <div className='flex justify-between items-center'>
            <h2 className='card-title'>- {productName} -</h2> <RatingStar />
          </div>
          <p className='text-ms leading-[20px]'>{productDescription}</p>
          <div className='card-actions justify-end mt-2'>
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
    </div>
  );
}

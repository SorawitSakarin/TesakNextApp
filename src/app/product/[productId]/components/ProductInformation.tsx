import Image from 'next/image';
import Product1 from '@/app/assets/bag-of-rice-1.webp';
import Product2 from '@/app/assets/bag-of-rice-2.webp';
import Product3 from '@/app/assets/bag-of-rice-3.webp';
import { nutritionalInfo } from '@/app/type';

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
  const productName = 'Rice of bag';
  const productDescription =
    'Here is the high-quality image of the luxury bag of rice with dark purple packaging. If you need any further adjustments or have other requests, feel free to let me know!';
  const nutritionalInfo: nutritionalInfo = {
    calories: 3423,
    protein: 12,
    fat: 9,
    carbohydrates: 20,
  };
  return (
    <div className='container-wallpaper'>
      <div className='flex flex-col w-full p-4 justify-center items-center h-full gap-4'>
        <div className='card bg-primary text-primary-content luxury-shadow'>
          <div className='carousel rounded-t-box'>
            {[Product1, Product2, Product3].map((product, index: number) => {
              return <Carousel image={product} key={index} />;
            })}
          </div>
          <div className='card-body '>
            <h2 className='card-title'>{productName}</h2>
            <p>{productDescription}</p>
            <div className='card-actions justify-end'>
              <div className='badge badge-outline'>
                {nutritionalInfo.calories} calories{' '}
              </div>
              <div className='badge badge-outline'>{nutritionalInfo.fat} g</div>
              <div className='badge badge-outline'>
                {nutritionalInfo.protein} g
              </div>
              <div className='badge badge-outline'>
                {nutritionalInfo.carbohydrates} g
              </div>
            </div>
          </div>
        </div>
        <div className='flex'></div>
      </div>
    </div>
  );
}

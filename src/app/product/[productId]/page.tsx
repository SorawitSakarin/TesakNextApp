'use server';
import ProductImage from '@/app/assets/bag-of-rice-1.webp';
import FarmerImage from '@/app/assets/farmer.png';
import AirplaneCard from '@/app/product/[productId]/components/AirplaneCard';
import CoverCard from '@/app/product/[productId]/components/CoverCard';
import FarmerInformationNew from '@/app/product/[productId]/components/FarmerInformationNew';
import Footer from '@/app/product/[productId]/components/Footer';
import LocationInformationNew from '@/app/product/[productId]/components/LocationInformationNew';
import ProductInformation from '@/app/product/[productId]/components/ProductInformation';
import SaleInformation from '@/app/product/[productId]/components/SaleInformation';
import { nutritionalInfo } from '@/app/type';

// const clock = async () => {
//   const timer = setTimeout(() => {}, 2000);
//   return () => {
//     console.log('before');
//     clearTimeout(timer);
//     console.log('after');
//   };
// };
// export async function generateStaticParams() {
//   const products = Array.from({ length: 100 }, (_, i) => ({
//     productId: (i + 1).toString(),
//   }));
//   return products;
// }
async function getData() {
  const url =
    'http://127.0.0.1:5001/tesak-kaset/asia-southeast1/api/v1/messages/test';
  // const res = await fetch(url);
  // console.log('server print');
  // await clock();
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data');
  // }

  // const data = await res.json();
  // console.log(data);
  return [];
}
export default async function Home({
  params,
}: {
  params: { productId: string };
}) {
  // const data = await getData();
  const { productId } = params;
  const productName = 'Bag of rice';
  const productDescription =
    'Experience the authentic taste of Thailand with our Premium Organic Jasmine Rice. Grown in the lush, fertile fields of Chiang Mai, this rice is a testament to the rich agricultural heritage of the region. Our farmers, with decades of experience and a deep commitment to sustainable practices, bring you rice that is not only delicious but also environmentally friendly.';
  const nutritionalInfo: nutritionalInfo = {
    calories: 3423,
    protein: 12,
    fat: 9,
    carbohydrates: 20,
  };
  const country = 'Thailand';
  const province = 'Bangkok';
  const district = 'Jattujak';
  const farmName = 'Farm Sod Sai';
  const size = '2,200';
  const sizeUnit = 'Square meter';
  const establish = '1930';
  const type = 'Organic farm';
  const climate = 'Tropical';
  const farmerName = 'Chatatorn Group';
  const experience = 30;
  const farmerProducts = ['Rice', 'Pineapple', 'Tomato', 'Potato'];
  const farmerMessage =
    'Every grain of rice, every piece of fruit, and every vegetable we grow is nurtured with care and dedication. We adhere to organic and sustainable farming practices that not only ensure the highest quality produce but also protect our precious environment. Our fields in Chiang Mai have been cultivated by our family for generations, and we take immense pride in continuing this legacy of excellence.';

  return (
    <div className='flex flex-col w-screen '>
      <CoverCard image={ProductImage} productName={productName} />
      <AirplaneCard />
      <ProductInformation
        productName={productName}
        productDescription={productDescription}
        nutritionalInfo={nutritionalInfo}
      />
      <LocationInformationNew
        country={country}
        province={province}
        district={district}
        farmName={farmName}
        size={size}
        sizeUnit={sizeUnit}
        establish={establish}
        type={type}
        climate={climate}
      />
      <FarmerInformationNew
        farmerImage={FarmerImage}
        farmerName={farmerName}
        farmerExperience={experience}
        farmerProducts={farmerProducts}
        farmerMessage={farmerMessage}
      />
      <SaleInformation />
      <Footer />
    </div>
  );
}

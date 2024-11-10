'use server';
import AirplaneCard from '@/app/product/[productId]/components/AirplaneCard';
import CoverCard from '@/app/product/[productId]/components/CoverCard';
import FarmerInformationNew from '@/app/product/[productId]/components/FarmerInformationNew';
import Footer from '@/app/product/[productId]/components/Footer';
import LocationInformationNew from '@/app/product/[productId]/components/LocationInformationNew';
import ProductInformation from '@/app/product/[productId]/components/ProductInformation';
import SaleInformation from '@/app/product/[productId]/components/SaleInformation';
import TesakLogo from '@/app/product/[productId]/components/TesakLogo';
import { nutritionalInfo } from '@/app/type';
import FarmerImage from '@/assets/farmer.png';
import { capitalizeFirstLetter } from '@/utils/function';
import dayjs from 'dayjs';
import { env } from 'next-runtime-env';

const getData = async (productId: string) => {
  try {
    const api = env('NEXT_PUBLIC_API_URL');
    const response = await fetch(
      `${api}/v1/products/tracking/${productId}`,
      {
        method: 'GET',
      },
    );

    if (response.ok) {
      const fetchData = await response.json();
      return fetchData.data;
    } else {
      console.log('error', await response.json());
      return null; // Return null in case of an error
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null; // Return null in case of an exception
  }
};
export default async function Home({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = params;
  const data = await getData(productId);
  if (data === null) {
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <div className='flex flex-col items-center justify-center bg-primary-content p-[32px] rounded-box gap-4'>
          <TesakLogo width='80px' />
          <h2>- Product Not Found -</h2>
          <a href='https://tesakkaset.com/' className='link link-underline'>
            Back to Home
          </a>
        </div>
      </div>
    );
  }
  const productImages = data.images;
  const productName = capitalizeFirstLetter(data.name);
  const productDescription = capitalizeFirstLetter(data.description);
  const nutritionalInfo: nutritionalInfo = {
    calories: data.calories,
    protein: data.proteins,
    fat: data.fats,
    carbohydrates: data.carbohydrates,
  };
  const country = capitalizeFirstLetter(data.farmer.country);
  const province = capitalizeFirstLetter(data.farmer.province);
  const district = capitalizeFirstLetter(data.farmer.district);
  const farmName = capitalizeFirstLetter(data.farmer.farmName);
  const size = data.farmer.size;
  const sizeUnit = data.farmer.sizeUnit;
  const establish = data.farmer.establish;
  const type = capitalizeFirstLetter(data.farmer.type);
  const climate = capitalizeFirstLetter(data.farmer.climate);
  const farmerName = capitalizeFirstLetter(data.farmer.farmerName);
  const experience = dayjs().diff(dayjs(data.farmer.farmerExperience), 'year');
  const farmerProducts = data.farmer.farmerProducts.split(',');
  const farmerMessage = capitalizeFirstLetter(data.farmer.farmerMessage);
  const mapUrl = data.farmer.mapUrl;

  // const productName =  'Bag of rice';
  // const productDescription =
  //   'Experience the authentic taste of Thailand with our Premium Organic Jasmine Rice. Grown in the lush, fertile fields of Chiang Mai, this rice is a testament to the rich agricultural heritage of the region. Our farmers, with decades of experience and a deep commitment to sustainable practices, bring you rice that is not only delicious but also environmentally friendly.';
  // const nutritionalInfo: nutritionalInfo = {
  //   calories:  3423,
  //   protein:  12,
  //   fat:  9,
  //   carbohydrates: 20,
  // };
  // const country = 'Thailand';
  // const province =  'Bangkok';
  // const district =  'Jattujak';
  // const farmName = 'Farm Sod Sai';
  // const size = '2,200';
  // const sizeUnit = 'Square meter';
  // const establish =  '1930';
  // const type = 'Organic farm';
  // const climate =   'Tropical';
  // const farmerName =   'Chatatorn Group';
  // const experience =   30;
  // const farmerProducts = ['Rice', 'Pineapple', 'Tomato', 'Potato'];
  // const farmerMessage =
  //   'Every grain of rice, every piece of fruit, and every vegetable we grow is nurtured with care and dedication. We adhere to organic and sustainable farming practices that not only ensure the highest quality produce but also protect our precious environment. Our fields in Chiang Mai have been cultivated by our family for generations, and we take immense pride in continuing this legacy of excellence.';

  return (
    <div className='flex flex-col w-screen '>
      <CoverCard image={productImages[0]} productName={productName} />
      <AirplaneCard />
      <ProductInformation
        productName={productName}
        productDescription={productDescription}
        nutritionalInfo={nutritionalInfo}
        productImages={productImages}
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
        mapUrl={mapUrl}
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

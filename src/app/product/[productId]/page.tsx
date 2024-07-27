'use client';
import WaveBG from '@/app/components/WaveBG';
import AirplaneCard from '@/app/product/[productId]/components/AirplaneCard';
import CoverCard from '@/app/product/[productId]/components/CoverCard';
import FarmerInformation from '@/app/product/[productId]/components/FarmerInformation';
import FarmerInformationNew from '@/app/product/[productId]/components/FarmerInformationNew';
import Footer from '@/app/product/[productId]/components/Footer';
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
      <ProductInformation />
      {/* <div className='container-wallpaper py-8'>
        <div className='flex flex-col wi-full gap-[48px]'>
          <LocationInformation />
          <FarmerInformation />
        </div>
      </div> */}
      <LocationInformationNew />
      <FarmerInformationNew />
      <SaleInformation />
      <Footer />
    </div>
  );
}

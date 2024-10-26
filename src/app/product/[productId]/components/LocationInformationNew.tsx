'use client';
import BGFarm from '@/assets/bg-farms.png';
import { FiMapPin } from 'react-icons/fi';
import { LuMap } from 'react-icons/lu';

interface LocationInformationProps {
  country: string;
  province: string;
  district: string;
  farmName: string;
  size: string | number;
  sizeUnit: string;
  establish: string;
  type: string;
  climate: string;
  mapUrl: string;
}

export default function LocationInformationNew({
  country,
  province,
  district,
  farmName,
  size,
  sizeUnit,
  establish,
  type,
  climate,
  mapUrl,
}: LocationInformationProps) {
  const isUrl = (str: string) => {
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-.\/]+$/;
    return urlRegex.test(str);
  };
  const mapBtnClick = () => {
    window.location.href = isUrl(mapUrl)
      ? mapUrl
      : 'https://www.google.co.th/maps/@18.3170581,99.3986862,17z?hl=th&entry=ttu';
  };
  return (
    <div className='bg-[#000] relative'>
      <div
        className='flex justify-between w-full min-h-[80vh] p-4  gap-4 text-primary-content bg-cover bg-center'
        style={{ backgroundImage: `url(${BGFarm.src})`, opacity: 0.4 }}
      ></div>
      <div className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-white w-full'>
        <div className='w-full flex flex-col items-center justify-center text-md leading-[24px]'>
          <div className='w-[300px] flex flex-col items-center justify-center '>
            <div className='flex gap-2 items-center mb-2'>
              <p className='text-xl font-bold'>Location</p> <FiMapPin />
            </div>
            <table className='table-auto w-full text-center'>
              <tbody>
                <tr>
                  <th className='text-left'>Country</th>
                  <td>{country}</td>
                </tr>
                <tr>
                  <th className='text-left'>Province</th>
                  <td>{province}</td>
                </tr>
                <tr>
                  <th className='text-left'>District</th>
                  <td>{district}</td>
                </tr>
                <tr>
                  <th className='text-left'>Farm</th>
                  <td>{farmName}</td>
                </tr>
                <tr>
                  <th className='text-left'>Size</th>
                  <td>
                    {size} {sizeUnit}
                  </td>
                </tr>
                <tr>
                  <th className='text-left'>Established</th>
                  <td>{establish}</td>
                </tr>
                <tr>
                  <th className='text-left'>Type of Farm</th>
                  <td>{type}</td>
                </tr>
                <tr>
                  <th className='text-left'>Climate</th>
                  <td>{climate}</td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={mapBtnClick}
              className='btn mt-8 glass text-base-200 hover:text-base-content  whitespace-nowrap'
            >
              <LuMap /> See on Map!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

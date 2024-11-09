import AddProduct from '@/app/admin/components/productsManager/AddProduct'
import AllProduct from '@/app/admin/components/productsManager/AllProduct'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useHttpClient } from '@/utils/hooks/http-hook'
import liff from '@line/liff'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [lineAccessToken, setLineAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        if (process.env.NODE_ENV === "development") {
          const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
          if (token) {
            console.log(token)
            setLineAccessToken(token);
          }
        } else {
          const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
          if (liffId) {
            await liff.init({ liffId: liffId });
          }
          if (liff.isLoggedIn()) {
            setLineAccessToken(liff.getAccessToken());
          } else {
            liff.login();
            setLineAccessToken(liff.getAccessToken());
          }
        }
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };
    initializeLiff();
    console.log(lineAccessToken)
  }, []);

  useEffect(() => {
    console.log(lineAccessToken)
  }, [lineAccessToken]);

  return (
    <div className="container flex flex-col justify-center pt-8 pb-32 gap-16">
      {isLoading && <LoadingSpinner />}
      {lineAccessToken && <AddProduct lineAccessToken={lineAccessToken} />}
      <div className="divider divider-neutral"></div>
      <AllProduct lineAccessToken={lineAccessToken} />
    </div>
  )
}

export default Page
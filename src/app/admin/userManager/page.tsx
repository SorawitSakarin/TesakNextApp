'use client';
import UserManager from '@/app/admin/components/adminManager/UserManager';
import { UserDataType } from '@/app/admin/type';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useHttpClient } from '@/utils/hooks/http-hook';
import liff from '@line/liff';
import React, { useEffect, useState } from 'react'

const Page = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [users, setUsers] = useState<UserDataType[] | null>(null);
  const [lineAccessToken, setLineAccessToken] = useState<string | null>(null);
  const [lines, setLines] = useState([]);
  const fetchAllusersData = () => {
    const fetchUsersData = async () => {
      try {
        const responseData = await sendRequest(
          process.env.NEXT_PUBLIC_API_URL + "/lines",
          "GET",
          null,
          {
            "Content-Type": "application/json",
            Authorization: `Bearer ${lineAccessToken}`,
          }
        );
        setUsers(responseData.data);
        // setImage(responseData.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchLineMessagesData = async () => {
      try {
        const api = process.env.NEXT_PUBLIC_API_URL;
        const responseData = await sendRequest(
          process.env.NEXT_PUBLIC_API_URL + "/messages",
          "GET",
          null,
          {
            "Content-Type": "application/json",
            Authorization: `Bearer ${lineAccessToken}`,
          }
        );
        setLines(responseData.data);
        console.log(responseData);
        // setImage(responseData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsersData();
    fetchLineMessagesData();
  }

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        if (process.env.NODE_ENV === "development") {
          const api = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
          if (api) {
            console.log("token", api);
            setLineAccessToken(api);
            console.log(lineAccessToken)
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
  }, []);

  useEffect(() => {
    if (lineAccessToken !== null) {
      fetchAllusersData();
      localStorage.setItem("userLineToken", JSON.stringify(lineAccessToken));
    }
  }, [lineAccessToken]);

  return (
    <div className="container flex flex-col justify-center py-8 gap-16">
      {isLoading && <LoadingSpinner />}
      <UserManager users={users} lines={lines} refreshData={fetchAllusersData} />
    </div>
  )
}

export default Page
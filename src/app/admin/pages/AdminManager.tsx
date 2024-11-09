'use client';
import liff from "@line/liff";
import React, { useEffect, useState } from "react";
import "../index.css";
import CalculateId from "@/app/admin/components/adminManager/CalculateId";
import LineManager from "@/app/admin/components/adminManager/LineManager";
import UserManager from "@/app/admin/components/adminManager/UserManager";
import LoadingSpinner from "@/components/LoadingSpinner";
import LayoutAdminPage from "@/app/admin/components/layouts/LayoutAdminPage";
import { UserDataType } from "@/app/admin/type";
import { useHttpClient } from "@/utils/hooks/http-hook";

interface AdminManagerProps {
  // liff: any;
  // userProfile: UserProfile | null;
}

const AdminManager: React.FC<AdminManagerProps> = ({ }) => {
  const [users, setUsers] = useState<UserDataType[] | null>(null);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [lines, setLines] = useState([]);
  const [lineAccessToken, setLineAccessToken] = useState<string | null>(null);

  const fetchAllusersData = () => {
    const fetchUsersData = async () => {
      try {
        const api = process.env.NEXT_PUBLIC_API_URL
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
    <LayoutAdminPage>
      <>
        <div className="container flex flex-col justify-center py-8 gap-16">
          {isLoading && <LoadingSpinner />}
          <CalculateId />
          <div className="divider divider-neutral"></div>
          <LineManager lines={lines} />
          <div className="divider divider-neutral"></div>
          <UserManager users={users} lines={lines} refreshData={fetchAllusersData} />
        </div>
      </>
    </LayoutAdminPage>
  );
};

export default AdminManager;

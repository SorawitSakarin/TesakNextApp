import React, { useEffect, useState } from "react";
import "../../index.css";
import { UserDataType } from "@/app/admin/type";
import Modal from "@/app/admin/components/Modal";


interface VerifiedCardProps {
  users: UserDataType[];
  userTier: string;
  refreshData: () => void;
}

const VerifiedCard: React.FC<VerifiedCardProps> = ({
  users,
  userTier,
  refreshData,
}) => {
  const [curUser, setCurUser] = useState<UserDataType | null>(null);
  const [lineAccessToken, setLineAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("userLineToken");
    setLineAccessToken(token ? JSON.parse(token) : null);
  }, []);

  const handlerUpdateUserData = async (userData: any) => {
    try {
      const api = process.env.NEXT_PUBLIC_API_URL
      const response = await fetch(
        `${api}/lines/${userData.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${lineAccessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log("Response:", result);
      refreshData();
      //TODO: logic update expired time
    } catch (error) {
      console.error("Error loading userData:", error);
    }
  };

  const editHandler = async (id: string, user: UserDataType) => {
    const modal = document.getElementById(id) as HTMLDialogElement;
    if (modal) {
      try {
        //fetchUserbyLineID
        const api = process.env.NEXT_PUBLIC_API_URL
        const response = await fetch(
          `${api}/lines/getline/${user.lineId
          }`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${lineAccessToken}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setCurUser(data?.data);
          modal.showModal();
        } else {
          console.error("UserData load failed");
        }
      } catch (error) {
        console.error("Error load userData:", error);
      }
    }
  };

  return (
    <table className="table bg-secondary-content">
      <thead>
        <tr>
          <th>ชื่อ</th>
          <th>นามสกุล</th>
          <th>ไลน์</th>
          <th>เพศ</th>
          <th>วันเกิด(y-m-d)</th>
          <th>เบอร์โทร</th>
          <th>จังหวัด</th>
          <th>อำเภอ</th>
          <th>ตำบล</th>
          <th>ไปรษณีย์</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: UserDataType, index: number) => {
          if (user.userTier == userTier) {
            const modalId = `${userTier}-modal-${index}`; // Unique modal ID for each user
            return (
              <tr
                className="hover:bg-secondary hover:text-base-100"
                key={`${userTier}-${index}`}
              >
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.lineName ? user.lineName : "Test"}</td>
                <td>
                  {user.gender === "female"
                    ? "หญิง"
                    : user.gender === "male"
                      ? "ชาย"
                      : ""}
                </td>
                <td>{user.birthday}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.province}</td>
                <td>{user.district}</td>
                <td>{user.subDistrict}</td>
                <td>{user.zipcode}</td>
                <td>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => editHandler(modalId, user)}
                  >
                    edit
                  </button>
                  <Modal
                    id={modalId}
                    curUser={curUser}
                    setCurUser={setCurUser}
                    handlerUpdateUserData={handlerUpdateUserData}
                  />
                </td>
              </tr>
            );
          }
        })}
      </tbody>
    </table>
  );
};

export default VerifiedCard;

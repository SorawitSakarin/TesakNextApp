import React, { useEffect } from "react";
import bookBankDataJson from "@/app/admin/data/bookbank.json";
import userTypeDataJson from "@/app/admin/data/userType.json";
import userTierDataJson from "@/app/admin/data/userTier.json";
import { UserDataType } from "@/app/admin/type";
import ModalTableEditText from "@/app/admin/components/ModalTableEditText";
import ModalTableEditSelect from "@/app/admin/components/ModalTableEditSelect";
import ModalTableDatePicker from "@/app/admin/components/ModalTableDatePicker";
interface ModalProps {
  id: string;
  curUser: UserDataType | null;
  setCurUser: React.Dispatch<React.SetStateAction<UserDataType | null>>;
  handlerUpdateUserData: (userData: any) => void;
}

const Modal = ({
  id,
  curUser,
  setCurUser,
  handlerUpdateUserData,
}: ModalProps) => {
  useEffect(() => { }, [curUser]);
  return (
    <dialog id={id} className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <div className="flex justify-between flex-row px-2">
          <h3 className="font-bold text-lg text-black">แก้ไขข้อมูล</h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 mx-3 text-black">
              ✕
            </button>
          </form>
        </div>
        <div className="modal-action flex-col">
          <table className="table  bg-base-300 text-info-content">
            <thead className="text-lg text-info-content">
              <tr>
                <th>หัวข้อ</th>
                <th>ข้อมูล</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <ModalTableEditText
                topicName="ชื่อ"
                name="firstName"
                value={curUser?.firstName ?? ""}
                setCurUser={setCurUser}
              />
              <ModalTableEditText
                topicName="นามสกุล"
                name="lastName"
                value={curUser?.lastName ?? ""}
                setCurUser={setCurUser}
              />
              <ModalTableDatePicker
                topicName="วันเกิด"
                name="birthday"
                value={curUser?.birthday ?? ""}
                setCurUser={setCurUser}
              />
              <ModalTableEditText
                topicName="ที่อยู่"
                name="address"
                value={curUser?.address ?? ""}
                setCurUser={setCurUser}
              />
              <ModalTableEditText
                topicName="จังหวัด"
                name="province"
                value={curUser?.province ?? ""}
                setCurUser={setCurUser}
              />
              <ModalTableEditText
                topicName="ตำบล"
                name="subDistrict"
                value={curUser?.subDistrict ?? ""}
                setCurUser={setCurUser}
              />
              <ModalTableEditText
                topicName="อำเภอ"
                name="district"
                value={curUser?.district ?? ""}
                setCurUser={setCurUser}
              />
              <ModalTableEditText
                topicName="เลขไปรษณีย์"
                name="zipcode"
                value={curUser?.zipcode ?? ""}
                setCurUser={setCurUser}
              />
              <ModalTableEditText
                topicName="เบอร์โทรศัพท์"
                name="phoneNumber"
                value={curUser?.phoneNumber ?? ""}
                setCurUser={setCurUser}
              />
              <ModalTableEditText
                topicName="เลขบัตรประชาชน"
                name="idCardNumber"
                value={curUser?.idCardNumber ?? ""}
                setCurUser={setCurUser}
              />
              <ModalTableEditSelect
                topicName="ธนาคาร"
                name="bookBankName"
                value={curUser?.bookBankName ?? ""}
                options={bookBankDataJson.map((name) => ({
                  value: name,
                  text: name,
                }))}
                setCurUser={setCurUser}
              />
              <ModalTableEditText
                topicName="เลขธนาคาร"
                name="bookBankNumber"
                value={curUser?.bookBankNumber ?? ""}
                setCurUser={setCurUser}
              />
              <ModalTableEditSelect
                topicName="userType"
                name="userType"
                value={curUser?.userType ?? ""}
                options={userTypeDataJson.map((name) => ({
                  value: name,
                  text: name,
                }))}
                setCurUser={setCurUser}
              />
              <ModalTableEditSelect
                topicName="userTier"
                name="userTier"
                value={curUser?.userTier ?? ""}
                options={userTierDataJson.map((name) => ({
                  value: name,
                  text: name,
                }))}
                setCurUser={setCurUser}
              />
            </tbody>
          </table>
          <form method="dialog">
            {/* if there is a button, it will close the modal */}
            <div className="flex justify-end my-2">
              <button className="btn" onClick={() => handlerUpdateUserData(curUser!)}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;

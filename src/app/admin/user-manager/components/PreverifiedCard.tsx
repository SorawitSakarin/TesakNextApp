import React, { useEffect, useState } from "react";
import bookBankDataJson from "@/app/admin/data/bookbank.json"
import { UserDataType } from "@/app/admin/type";
import { useHttpClient } from "@/utils/hooks/http-hook";
import ImageRotate from "@/app/admin/user-manager/components/ImageRotate";
interface PreverifiedCardProps {
  user: UserDataType;
  index: number;
  lines: Record<"topic" | "message" | "description", string>[];
}

const PreverifiedCard: React.FC<PreverifiedCardProps> = ({
  user,
  index,
  lines,
}) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [images, setImages] = useState<string[]>([]);
  const [sendUser, setSendUser] = useState(user);
  const [complete, setComplete] = useState(false);
  const [lineAccessToken, setLineAccessToken] = useState<string | null>(null);

  const clickHandler = async () => {
    if (images.length === 0) {
      const formData = {
        images: [user.idCard, user.bookBank, ...(user.farmerLicense || [])],
      };
      try {
        const api = process.env.NEXT_PUBLIC_API_URL
        const responseData = await sendRequest(
          api + "/v1/lines/userimages",
          "POST",
          JSON.stringify(formData),
          {
            "Content-Type": "application/json",
            Authorization: `Bearer ${lineAccessToken}`,
          }
        );
        setImages(responseData.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      const api = process.env.NEXT_PUBLIC_API_URL
      const responseData = await sendRequest(
        api + "v1/lines/updatefarmerinformation",
        "POST",
        JSON.stringify(sendUser),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lineAccessToken}`,
        }
      );

      setComplete(true);
    } catch (err) {
      console.log(err);
      alert(err);
    }
    try {
      const messageText = lines.find(
        (line) => line.topic === "approved"
      )?.message;
      console.log(messageText);
      const api = process.env.NEXT_PUBLIC_API_URL
      const responseData = await sendRequest(
        api + "v1/messages/send",
        "POST",
        JSON.stringify({ userId: user.lineId, messageText }),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lineAccessToken}`,
        }
      );

      setComplete(true);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("userLineToken");
    setLineAccessToken(token ? JSON.parse(token) : null);
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setSendUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <div
      className={`collapse collapse-arrow bg-base-300 text-base-content my-1 ${complete ? "bg-success" : ""
        }`}
      onClick={clickHandler}
    >
      <input type="radio" name="my-accordion-2" />
      <div className="collapse-title  font-light">
        คุณ {user.firstName} {user.lastName} เบอร์โทร {user.phoneNumber} ที่อยู่{" "}
        {user.province} {user.district} {user.subDistrict} {user.zipcode}
      </div>
      <div className="collapse-content flex flex-col">
        <div className="flex gap-4">
          {isLoading && <div className="skeleton w-full h-[400px]"></div>}
          {images &&
            images.length > 0 &&
            images.map((img: string, index: number) => {
              return (
                <div
                  key={index}
                  style={{ maxHeight: "400px", aspectRatio: "1/1" }}
                >
                  <ImageRotate source={img} altText="personal image" />
                </div>
              );
            })}
        </div>

        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-2 p-4 m-4 bg-secondary-content w-[450px] rounded-lg "
        >
          <h1 className="text-2xl font-bold mb-1">
            กรุณากรอกข้อมูลเพิ่มให้ คุณ{user.firstName}
          </h1>
          <div className="flex ">
            <label className="basis-1/2">Tier</label>
            <select
              name="userTier"
              value={sendUser.userTier ? sendUser.userTier : ""}
              onChange={handleInputChange}
              required
              className="basis-1/2"
            >
              <option value="preVerified">เลือก tier</option>
              <option value="farmerOneYear">farmerOneYear</option>
              <option value="farmerThreeYear">farmerThreeYear</option>
              <option value="farmerTenYear">farmerTenYear</option>
              <option value="farmerHundredYear">farmerHundredYear</option>
            </select>
          </div>
          <div className="flex">
            <label className="basis-1/2">เลขบัตรประชาชน</label>
            <input
              type="text"
              name="idCardNumber"
              required
              className="basis-1/2"
              placeholder="1900100100100"
              value={sendUser.idCardNumber ? sendUser.idCardNumber : ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex ">
            <label className="basis-1/2">บัญชีธนาคารของ</label>
            <select
              name="bookBankName"
              className="basis-1/2"
              value={sendUser.bookBankName ? sendUser.bookBankName : ""}
              onChange={handleInputChange}
              required
            >
              <option value={undefined}>กรุณาเลือกธนาคาร</option>
              {bookBankDataJson.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
          </div>
          <div className="flex">
            <label className="basis-1/2">เลขบัญชีธนาคาร</label>
            <input
              type="text"
              className="basis-1/2"
              name="bookBankNumber"
              required
              placeholder="1900100100100"
              value={sendUser.bookBankNumber ? sendUser.bookBankNumber : ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex">
            <label className="basis-1/2">เลขทะเบียนเกษตร</label>
            <input
              type="text"
              name="farmerLicenseNumber"
              required
              className="basis-1/2"
              placeholder="1900100100100"
              value={
                sendUser.farmerLicenseNumber ? sendUser.farmerLicenseNumber : ""
              }
              onChange={handleInputChange}
            />
          </div>
          <button className="btn btn-secondary mt-4" type="submit">
            บันทึก
          </button>
        </form>
      </div>
    </div>
  );
};

export default PreverifiedCard;

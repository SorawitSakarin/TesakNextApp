import ModalTableEditSelect from "@/app/admin/user-manager/components/ModalTableEditSelect";
import ModalTableEditText from "@/app/admin/user-manager/components/ModalTableEditText";
import { useHttpClient } from "@/utils/hooks/http-hook";
import { useState } from "react";


interface ModalAddFarmerAndLocationProps {
  lineAccessToken: string;
  onUpdateNewTrackingFarmers: () => void;
}
const ModalAddFarmerAndLocation = ({
  lineAccessToken,
  onUpdateNewTrackingFarmers
}: ModalAddFarmerAndLocationProps) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [info, setInfo] = useState<any>({
    country: "Thailand",
    sizeUnit: "square meter",
    type: "organic farm",
    climate: "tropical",
  });
  const handleClose = () => {
    const modal = document.getElementById("add-farmer-modal") as HTMLDialogElement;
    modal?.close();
    setInfo({
      country: "Thailand",
      sizeUnit: "square meter",
      type: "organic farm",
      climate: "tropical",
    })
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      const api = process.env.NEXT_PUBLIC_API_URL
      const responseData = await sendRequest(
        api +
        "/v1/products/tracking-farmer/create",
        "POST",
        JSON.stringify(info),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lineAccessToken}`,
        }
      ).then
        (() => {
          onUpdateNewTrackingFarmers();
          handleClose();
        })
        ;
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };
  return (
    <dialog id={"add-farmer-modal"} className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <form
          onSubmit={submitHandler}
          className="relative flex flex-col gap-2 p-4 m-4 bg-primary-content  rounded-lg shadow-xl "
        >
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-bold mb-1">เพิ่มข้อมูลเกษตรกรและสถานที่</h1>
            <div
              onClick={handleClose}
              className=" btn top-0 right-0 translate-x-1/4 -translate-y-1/4 rounded-full px-[16px] bg-[#f4f4f4] hover:cursor-pointer shadow-2xl"
            >
              <p className="leading-[0px] text-[24px]">x</p>
            </div>
          </div>
          <p className="text-lg font-semibold mb-1">ข้อมูลสถานที่</p>
          {/* <div className="flex"> */}
          {/* <label className="basis-1/2">Country</label> */}
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
                topicName="Country"
                name="country"
                placeholder="Thailand"
                value={info.country}
                setCurUser={setInfo}
                required={true}
              />
              <ModalTableEditText
                topicName="Province"
                name="province"
                placeholder="Bangkok"
                value={info.province ? info.province : ""}
                setCurUser={setInfo}
                required={true}
              />
              <ModalTableEditText
                topicName="District"
                name="district"
                value={info.district ? info.district : ""}
                placeholder="Jattujak"
                setCurUser={setInfo}
                required={true}
              />
              <ModalTableEditText
                topicName="Google map link"
                name="mapUrl"
                placeholder="http://maps.google.com"
                value={info.mapUrl ? info.mapUrl : ""}
                setCurUser={setInfo}
                required={true}
              />
              <ModalTableEditText
                topicName="Farm Name"
                name="farmName"
                placeholder="Mung Mee See Sook"
                value={info.farmName ? info.farmName : ""}
                setCurUser={setInfo}
                required={true}
              />
              <ModalTableEditText
                topicName="Size"
                name="size"
                placeholder="1"
                value={info.size ? info.size : ""}
                setCurUser={setInfo}
                required={true}
              />
              <ModalTableEditSelect
                topicName="Size Unit"
                name="sizeUnit"
                value={info.sizeUnit ? info.sizeUnit : ""}
                setCurUser={setInfo}
                options={[
                  { value: "square meter", text: "Square meter" },
                ]}
              />
              <ModalTableEditText
                type="number"
                topicName="Establish"
                name="establish"
                placeholder="1980"
                value={info.climate ? info.establish : ""}
                setCurUser={setInfo}
                required={true}
              />
              <ModalTableEditSelect
                topicName="Type"
                name="type"
                value={info.type ? info.type : ""}
                setCurUser={setInfo}
                options={[
                  { value: "organic farm", text: "Organic farm" },
                ]}
                required={true}
              />
              <ModalTableEditSelect
                topicName="Climate"
                name="climate"
                value={info.climate ? info.climate : ""}
                setCurUser={setInfo}
                options={[
                  { value: "tropical", text: "Tropical" },
                ]}
                required={true}
              />
            </tbody>
          </table>
          <p className="text-lg font-semibold m-1">ข้อมูลเกษตรกร</p>
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
                topicName="Name"
                name="farmerName"
                placeholder="Chayatorn Ku"
                value={info.farmerName ? info.farmerName : ""}
                setCurUser={setInfo}
                required={true}
              />
              <ModalTableEditText
                topicName="Experience"
                name="farmerExperience"
                placeholder="1975"
                type="number"
                value={info.farmerExperience ? info.farmerExperience : ""}
                setCurUser={setInfo}
                required={true}
              />
              <ModalTableEditText
                topicName="Aggricutural Products"
                name="farmerProducts"
                placeholder="Rice, Orange, Pineapple"
                value={info.farmerProducts ? info.farmerProducts : ""}
                setCurUser={setInfo}
                required={true}
              />
              <ModalTableEditText
                topicName="Message from farmer"
                name="farmerMessage"
                placeholder="Every grain of rice, every piece of fruit, and every vegetable we grow is nurtured with care and dedication. We adhere to organic and sustainable farming practices that not only ensure the highest quality produce but also protect our precious environment. Our fields in Chiang Mai have been cultivated by our family for generations and we take pride in our work."
                value={info.farmerMessage ? info.farmerMessage : ""}
                setCurUser={setInfo}
                required={true}
              />
            </tbody>
          </table>
          <button className="btn btn-primary mt-4" type="submit">
            <p>บันทึก</p>
          </button>

        </form>
      </div >
    </dialog >
  );
};

export default ModalAddFarmerAndLocation;

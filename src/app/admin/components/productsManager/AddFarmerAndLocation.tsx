import { useHttpClient } from "@/utils/hooks/http-hook";
import { useState } from "react";


interface AddFarmerAndLocationProps {
  handleClose: any;
  lineAccessToken: string;
}
const AddFarmerAndLocation = ({
  handleClose,
  lineAccessToken,
}: AddFarmerAndLocationProps) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [info, setInfo] = useState<any>({
    country: "Thailand",
    sizeUnit: "square meter",
    type: "organic farm",
    climate: "tropical",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setInfo((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      const api = process.env.NEXT_PUBLIC_API_URL
      const responseData = await sendRequest(
        api +
        "/products/tracking-farmer/create",
        "POST",
        JSON.stringify(info),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lineAccessToken}`,
        }
      );
      console.log(responseData);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };
  return (
    <form
      onSubmit={submitHandler}
      className="relative flex flex-col gap-2 p-4 m-4 bg-primary-content w-[450px] rounded-lg shadow-xl "
    >
      <h1 className="text-2xl font-bold mb-1">เพิ่มข้อมูลเกษตรกรและสถานที่</h1>
      <p className="text-lg font-semibold mb-1">ข้อมูลสถานที่</p>
      <div className="flex">
        <label className="basis-1/2">Country</label>
        <input
          type="text"
          name="country"
          required
          className="basis-1/2"
          placeholder="Thailand"
          value={info.country}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex">
        <label className="basis-1/2">Province</label>
        <input
          type="text"
          name="province"
          required
          className="basis-1/2"
          placeholder="Bangkok"
          value={info.province ? info.province : ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex">
        <label className="basis-1/2">District</label>
        <input
          type="text"
          name="district"
          required
          className="basis-1/2"
          placeholder="Jattujak"
          value={info.district ? info.district : ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex">
        <label className="basis-1/2">Google map link</label>
        <input
          type="text"
          name="mapUrl"
          required
          className="basis-1/2"
          placeholder="http://maps.google.com"
          value={info.mapUrl ? info.mapUrl : ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex">
        <label className="basis-1/2">Farm Name</label>
        <input
          type="text"
          name="farmName"
          required
          className="basis-1/2"
          placeholder="Mung Mee See Sook"
          value={info.farmName ? info.farmName : ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex">
        <label className="basis-1/2">Size</label>
        <input
          type="number"
          name="size"
          required
          className="basis-1/2"
          value={info.size ? info.size : null}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex">
        <label className="basis-1/2">Size Unit</label>
        <select
          name="sizeUnit"
          value={info.sizeUnit ? info.sizeUnit : ""}
          onChange={handleInputChange}
          required
          className="basis-1/2"
        >
          <option value="square meter">Square meter</option>
        </select>
      </div>
      <div className="flex">
        <label className="basis-1/2">Establish</label>
        <input
          type="number"
          name="establish"
          required
          className="basis-1/2"
          placeholder="1980"
          value={info.establish ? info.establish : null}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex">
        <label className="basis-1/2">Type</label>
        <select
          name="type"
          value={info.type ? info.type : ""}
          onChange={handleInputChange}
          required
          className="basis-1/2"
        >
          <option value="organic farm">Organic farm</option>
        </select>
      </div>
      <div className="flex">
        <label className="basis-1/2">Climate</label>
        <select
          name="climate"
          value={info.climate ? info.climate : ""}
          onChange={handleInputChange}
          required
          className="basis-1/2"
        >
          <option value="tropical">Tropical</option>
        </select>
      </div>

      <div className="divider "></div>
      <p className="text-lg font-semibold mb-1">ข้อมูลเกษตรกร</p>
      <div className="flex">
        <label className="basis-1/2">Name</label>
        <input
          type="text"
          name="farmerName"
          required
          className="basis-1/2"
          placeholder="Chayatorn Ku"
          value={info.farmerName ? info.farmerName : ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex">
        <label className="basis-1/2">Experience</label>
        <input
          type="number"
          name="farmerExperience"
          required
          className="basis-1/2"
          placeholder="1975"
          value={info.farmerExperience ? info.farmerExperience : ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex">
        <label className="basis-1/2">Aggricutural Products</label>
        <input
          type="text"
          name="farmerProducts"
          required
          className="basis-1/2"
          placeholder="Rice, Orange, Pineapple"
          value={info.farmerProducts ? info.farmerProducts : ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex">
        <label className="basis-1/2">Message from farmer</label>
        <input
          type="text"
          name="farmerMessage"
          required
          className="basis-1/2"
          placeholder="Every grain of rice, every piece of fruit, and every vegetable we grow is nurtured with care and dedication. We adhere to organic and sustainable farming practices that not only ensure the highest quality produce but also protect our precious environment. Our fields in Chiang Mai have been cultivated by our family for generations, and we take immense pride in continuing this legacy of excellence."
          value={info.farmerMessage ? info.farmerMessage : ""}
          onChange={handleInputChange}
        />
      </div>

      <button className="btn btn-primary mt-4" type="submit">
        <p>บันทึก</p>
      </button>
      <div
        onClick={handleClose}
        className="absolute btn top-0 right-0 translate-x-1/4 -translate-y-1/4 rounded-full px-[16px] bg-[#f4f4f4] hover:cursor-pointer shadow-2xl"
      >
        <p className="leading-[0px] text-[24px]">-</p>
      </div>
    </form>
  );
};

export default AddFarmerAndLocation;

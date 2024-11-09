import { fileToBase64 } from "@/utils/functions";
import { useHttpClient } from "@/utils/hooks/http-hook";
import { useEffect, useState } from "react";


import ModalAddFarmerAndLocation from "./ModalAddFarmerAndLocation";

interface AddProductProps {
  lineAccessToken: string;
}
const AddProduct = ({ lineAccessToken }: AddProductProps) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [productInfo, setProductInfo] = useState<any>({});
  const [trackingFarmers, setTrackingFarmers] = useState<any>();

  useEffect(() => {
    const fetchFarmers = async () => {
      const api = process.env.NEXT_PUBLIC_API_URL
      const response = await fetch(
        api + "/products/tracking-farmers",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${lineAccessToken}`,
          },
        }
      );
      if (response.ok) {
        const fetchData = await response.json();
        setTrackingFarmers(fetchData.data);
      } else {
      }
    };
    fetchFarmers();
  }, []);

  const onUpdateNewTrackingFarmers = () => {
    const fetchFarmers = async () => {
      const api = process.env.NEXT_PUBLIC_API_URL
      const response = await fetch(
        api + "/products/tracking-farmers",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${lineAccessToken}`,
          },
        }
      );
      if (response.ok) {
        const fetchData = await response.json();
        setTrackingFarmers(fetchData.data);
      } else {
      }
    };
    fetchFarmers();
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();

    try {
      const api = process.env.NEXT_PUBLIC_API_URL
      const responseData = await sendRequest(
        api +
        "/products/tracking-product/create",
        "POST",
        JSON.stringify(productInfo),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lineAccessToken}`,
        }
      );
      const modal = document.getElementById(
        "success-modal"
      ) as HTMLDialogElement;
      modal?.showModal();
    } catch (err) {
      alert(err);
    }
  };

  const editHandler = async (id: string) => {
    const modal = document.getElementById(id) as HTMLDialogElement;
    console.log(modal)
    if (modal) {
      modal.showModal();
    };
  }

  const handleInputChange = async (event: any) => {
    const { name, value, files } = event.target;

    if (event.target.type === "file" && files) {
      const fileArray = Array.from(files);
      const base64Files = await Promise.all(
        fileArray.map((file: any) => fileToBase64(file))
      );
      setProductInfo((prev: any) => ({
        ...prev,
        [name]: base64Files,
      }));
    } else {
      setProductInfo((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div id="Add-product" className="flex flex-col gap-4 w-full">
      <h1 id="addProduct" className="text-3xl">Add Product</h1>
      <div className="w-full flex flex-row items-center gap-24">
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-2 p-4 m-4 bg-secondary-content w-[450px] rounded-lg shadow-xl "
        >
          <h1 className="text-2xl font-bold mb-1">
            เพิ่มข้อมูลสินค้าสำหรับระบบติดตามสินค้า
          </h1>
          <p className="text-lg font-semibold mb-1">ข้อมูลสินค้า</p>
          <div className="flex">
            <label className="basis-1/2">Product Name</label>
            <input
              type="text"
              name="name"
              required
              className="basis-1/2"
              placeholder="Rice"
              value={productInfo.name || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex">
            <label className="basis-1/2">Product Description</label>
            <input
              type="text"
              name="description"
              required
              className="basis-1/2"
              placeholder="Bag of jusmine rice"
              value={productInfo.description || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex">
            <label className="basis-1/2">Calories</label>
            <input
              type="number"
              name="calories"
              required
              className="basis-1/2"
              value={productInfo.calories || undefined}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex">
            <label className="basis-1/2">Proteins(g)</label>
            <input
              type="number"
              name="proteins"
              required
              className="basis-1/2"
              value={productInfo.proteins || undefined}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex">
            <label className="basis-1/2">Carbohydrates(g)</label>
            <input
              type="number"
              name="carbohydrates"
              required
              className="basis-1/2"
              value={productInfo.carbohydrates || undefined}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex">
            <label className="basis-1/2">Fat(g)</label>
            <input
              type="number"
              name="fats"
              required
              className="basis-1/2"
              value={productInfo.fats || undefined}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex">
            <label className="basis-1/2">Images</label>
            <input
              type="file"
              name="images"
              required
              className="basis-1/2"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              onChange={handleInputChange}
            />
          </div>

          <div className="divider mb-0"></div>
          <div className="flex flex-row justify-between items-center">
            <p className="text-lg font-semibold">ข้อมูลเกษตรกร</p>

            <div
              onClick={() => editHandler("add-farmer-modal")}

              className="flex flex-row gap-4 items-center"
            >
              <p>เพิ่มข้อมูลเกษตกรและสถานที่</p>
              <div className="p-4 border-dashed border-2 border-[#345] text-[#345] hover:cursor-pointer rounded-[8px]">
                <p className="text-[24px] leading-[12px]">+</p>
              </div>
            </div>
          </div>
          {trackingFarmers && (
            <div className="flex ">
              <label className="basis-1/2">Name</label>
              <select
                name="trackingFarmerId"
                value={productInfo.trackingFarmerId || ""}
                onChange={handleInputChange}
                required
                className="basis-1/2"
              >
                {trackingFarmers.map((farmer: any) => {
                  return (
                    <option key={farmer.id} value={farmer.id}>
                      {farmer.farmerName}
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          <button className="btn btn-secondary mt-4" type="submit">
            <p>บันทึก</p>
          </button>
        </form>
        <ModalAddFarmerAndLocation
          lineAccessToken={lineAccessToken}
          onUpdateNewTrackingFarmers={onUpdateNewTrackingFarmers}
        />
      </div>
      <dialog id="success-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Product create success!</h3>
          {Object.keys(productInfo).map((item: any) => {
            return (
              <p className="py-1" key={item}>
                {item}: {productInfo[item]}
              </p>
            );
          })}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default AddProduct;


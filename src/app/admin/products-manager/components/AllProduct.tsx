'use client';
import dayjs from "dayjs";
import { useState } from "react";
import AllProductItem from "@/app/admin/products-manager/components/AllProductItem";
interface AllProductProps {
  lineAccessToken: any;
}
const AllProduct = ({ lineAccessToken }: AllProductProps) => {
  const [isSeeAll, setIsSeeAll] = useState<boolean>(false);
  const [trackingProducts, setTrackingProducts] = useState([]);
  const seeAllClickHandler = async () => {
    await fetchTrackingProducts();
    setIsSeeAll(true);
  };
  const fetchTrackingProduct = async (productId: string) => {
    const api = process.env.NEXT_PUBLIC_API_URL
    const response = await fetch(
      api + `/v1/products/tracking/${productId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${lineAccessToken}`,
        },
      }
    );
    if (response.ok) {
      const fetchData = await response.json();
      return fetchData.data;
    } else {
    }
  };
  const fetchTrackingProducts = async () => {
    const api = process.env.NEXT_PUBLIC_API_URL
    const response = await fetch(
      api + "/v1/products/tracking-products",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${lineAccessToken}`,
        },
      }
    );
    if (response.ok) {
      const fetchData = await response.json();
      setTrackingProducts(fetchData.data);
    } else {
    }
  };
  return (
    <div id="calculate" className="flex flex-col gap-4 w-full">
      <h1 className="text-3xl">See all products </h1>
      <div className="w-full flex flex-col items-center gap-2">
        {isSeeAll ? (
          <table className="table  bg-secondary text-info-content">
            <thead className="text-lg text-secondary-content">
              <tr>
                <th className="w-[15%] text-center">Created at</th>
                <th className="w-[15%] text-center">Name</th>
                <th className="w-[50%] text-center">Description</th>
                <th className="w-[10%] text-center">
                  QR Code
                </th>
                <th className="w-[10%] text-center">
                  <div className="flex justify-end">
                    <a className="btn text-l" href="#addProduct">
                      Create New Product
                    </a>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-secondary-content">
              {trackingProducts &&
                trackingProducts.map((product: any) => {
                  const date = dayjs(product.createdAt).format(
                    "YYYY-MM-DD  HH:mm:ss"
                  );
                  return (
                    <AllProductItem
                      key={product.id}
                      product={product}
                      fetchTrackingProduct={fetchTrackingProduct}
                      date={date}
                    />
                  );
                })}
            </tbody>
          </table>
        ) : (
          <button
            onClick={seeAllClickHandler}
            className={`btn text-lg  ${isSeeAll ? "hidden" : ""}`}
          >
            Click to see all
          </button>
        )}
      </div>
    </div>
  );
};

export default AllProduct;

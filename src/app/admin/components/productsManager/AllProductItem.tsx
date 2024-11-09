import Image from "@/app/admin/components/Image";
import { useState } from "react";

interface AllProductItemProps {
  product: any;
  fetchTrackingProduct: any;
  date: any;
}
export default function AllProductItem({
  product,
  fetchTrackingProduct,
  date,
}: AllProductItemProps) {
  const [productInfo, setProductInfo] = useState<any>({});
  const viewClickHandler = async () => {
    const track = await fetchTrackingProduct(product.id);
    setProductInfo(track);
    const modal = document.getElementById(
      `view-modal-${product.id}`
    ) as HTMLDialogElement;
    modal?.showModal();
  };

  return (
    <tr key={product.id}>
      <td className="w-[15%] text-center">{date}</td>
      <td className="w-[15%] text-center">{product.name}</td>
      <td className="w-[60%] text-center">{product.description}</td>
      <td className="w-[10%]">
        <div className="flex flex-col justify-between">
          <button onClick={viewClickHandler} className="btn btn-secondary m-2">
            View
          </button>
          <button
            onClick={() => {
              const api = process.env.NEXT_PUBLIC_APP_TRACKING_PRODUCT_URL;
              window.open(
                api +
                `/product/${product.id}`
              );
            }}
            className="btn btn-secondary btn-outline  m-2"
          >
            Link
          </button>
        </div>
        {productInfo && (
          <dialog id={`view-modal-${product.id}`} className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">
                <span className="text-[#345] text-3xl">#{product.name}</span>{" "}
                Tracking product information
              </h3>
              {Object.keys(productInfo).map((item: any, index: number) => {
                if (item === "farmer") {
                  return Object.keys(productInfo.farmer).map((farmer: any, index) => {
                    return (
                      <p className="py-1" key={`${farmer}-${index}`}>
                        {farmer}: {productInfo.farmer[farmer]}
                      </p>
                    );
                  });
                } else if (item === "images") {
                  return (
                    <div className="flex  h-[200px]" key={index}>
                      {productInfo.images.map((image: any, index: number) => {
                        return (
                          <Image source={image} altText={image} key={`${index}`} />
                        );
                      })}
                    </div>
                  );
                }
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
        )}
      </td>
    </tr>
  );
}

import Image from "@/app/admin/components/Image";
import { useState } from "react";
import Link from "next/link";
import QRCode from "react-qr-code";
import { useRef } from "react";
import html2canvas from 'html2canvas-pro';

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
  const qrCodeRef = useRef<any>()

  const viewClickHandler = async () => {
    const track = await fetchTrackingProduct(product.id);
    setProductInfo(track);
    const modal = document.getElementById(
      `view-modal-${product.id}`
    ) as HTMLDialogElement;
    modal?.showModal();
  };
  const downloadQRCodeClickHandler = async () => {
    if (qrCodeRef.current) {
      const canvas = await html2canvas(qrCodeRef.current);
      const image = canvas.toDataURL("image/png");

      // Trigger download of the image
      const link = document.createElement("a");
      link.href = image;
      link.download = `${product.name}_QRCode.png`;
      link.click();
    }

  }

  return (
    <tr key={product.id}>
      <td className="w-[15%] text-center">{date}</td>
      <td className="w-[15%] text-center">{product.name}</td>
      <td className="w-[50%] text-center">{product.description}</td>
      <td className="w-[10%] max-w-[120px] max-h-[120px] aspect-square text-center overflow-hidden">
        <div id="qrcode" className="w-[px] h-[100px] " style={{ color: "rgb(52, 152, 219)" }}>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={`${window.location.origin}/product/${product.id}`}
            viewBox={`0 0 256 256`}
          />
        </div>
        {/* this was to create the hidden qr code for download with high resolution */}
        <div className="w-0 h-0 overflow-hidden">
          <div ref={qrCodeRef} id="qrcode" className="w-[1000px] h-[1000px]" style={{ color: "rgb(52, 152, 219)" }}>
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={`${window.location.origin}/product/${product.id}`}
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>
      </td>
      <td className="w-[10%]">
        <div className="flex flex-col justify-between">
          <button onClick={viewClickHandler} className="btn btn-secondary m-2 w-[120px]">
            View
          </button>
          <Link href={`/product/${product.id}`} target="_blank">
            <button
              className="btn btn-secondary btn-outline m-2 w-[120px]"
            >
              Link
            </button>
          </Link>
          <button onClick={downloadQRCodeClickHandler} className="btn btn-secondary m-2 w-[120px]">
            Download QR Code
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

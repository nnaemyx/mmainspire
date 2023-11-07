import { MinusIcon, PlusIcon } from "@/icon";
import useProductStore from "@/store/product/productStore";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Navigation, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import { useCustomContext } from "@/context/Customcontext";

const Shopdropdown = () => {
  const [isExtended, setIsExtended] = useState(false);

  const toggleContent = () => {
    setIsExtended(!isExtended);
  };

  const productStore = useProductStore();
  useEffect(() => {
    productStore.getProducts();
    // Fetch exchange rates when the component mounts
  }, []);
  const newArrivalProducts = productStore.products;
  const productLinks = ["/account", "/shop", "/contact"];

  const { closeLeft } = useCustomContext();

  return (
    <div className="w-full ">
      <div className="flex flex-col w-full items-start gap-6">
        <div className="w-full">
          <div
            className="flex items-center w-full pl-2 justify-between"
            onClick={toggleContent}
          >
            <p className="font-opensans capitalize font-normal text-[14px]">
              Clothing
            </p>
            <div
              className={`w-4 h-4 ml-2 transition-transform transform ${
                isExtended ? "rotate-180" : "rotate-0"
              }`}
            >
              {isExtended ? <MinusIcon /> : <PlusIcon />}
            </div>
          </div>
          {isExtended && (
            <div className="text-[14px] flex capitalize font-opensans font-normal">
              <div className="divide-y-2 border ml-2.5 mt-1 border-solid"></div>
              <ul className="leading-[2rem] pl-4">
                <li>Dresses</li>
                <li>Kaftans</li>
                <li>Kimonos</li>
                <li>Co-ords</li>
                <li>Tops</li>
                <li>Skirts</li>
                <li>Trousers</li>
              </ul>
            </div>
          )}
        </div>
        <Swiper
          modules={[Navigation, Mousewheel]}
          spaceBetween={10}
          slidesPerView={2}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          navigation={{ clickable: true }}
          className=" h-[300px] w-[350px] productSlider overflow-y-hidden"
        >
          <div className="grid grid-cols-3 grid-rows-3 gap-4 grid-flow-row">
            {newArrivalProducts.slice(1, 4).map((product, index) => (
              <SwiperSlide key={index} className="">
                <Link onClick={closeLeft} href={productLinks[index]}>
                  <Image
                    src={product.images[0]}
                    alt="images"
                    width={300}
                    height={250}
                  />
                  <p className=" font-opensans uppercase text-center font-semibold text-[11px] ">
                    {product.category}
                  </p>
                </Link>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Shopdropdown;

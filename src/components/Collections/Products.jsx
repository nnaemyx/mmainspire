import { useCustomContext } from "@/context/Customcontext";
import useProductStore from "@/store/product/productStore";
import React, { useEffect } from "react";
import Image from "next/image";

const Products = () => {
  const productStore = useProductStore();
  useEffect(() => {
    productStore.getProducts();
    // Fetch exchange rates when the component mounts
  }, []);
  const { selectedCurrency, isRightOpen, openRight, closeRight } =
    useCustomContext();
  const Products = productStore.products;

  return (
    <div>
      <div>
        <p className="text-center text-[14px] lg:text-left">83 products</p>
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {Products.map((product, index) => (
              <div key={index} className="relative group hover:lg:hovered">
                <div className="relative overflow-hidden">
                  <Image
                    src={product.images[0]}
                    width={347.5}
                    height={496.25}
                    alt="image"
                    className="block lg:group-hover:hidden"
                  />
                  <Image
                    src={product.images[1]}
                    width={347.5}
                    height={496.25}
                    alt="image2"
                    className="hidden lg:group-hover:inline-block"
                  />
                  <div className="absolute inset-0 xl:top-[13rem] 2xl:top-[17rem] left-0 right-0 mx-auto text-center items-center opacity-0 hidden lg:block group-hover:opacity-100">
                    <button
                      onClick={openRight}
                      className=" text-[15px] 2xl:h-[64px] xl:h-[54px] xl:px-[4rem] 2xl:px-[6rem] mt-4 font-opensans font-semibold bg-primary text-secondary relative overflow-hidden group"
                    >
                      <span className="absolute inset-x-0  bottom-0 h-full bg-gray-200/60 transition-transform transform translate-y-full group-hover:translate-y-0"></span>
                      Quick View
                    </button>
                  </div>
                  <span className="absolute lg:hidden block bg-secondary right-4 bottom-4 p-1">
                    <svg
                      focusable="false"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M14 4H5L4 20H20C19.7517 16.0273 19.375 10 19.375 10"
                        stroke="currentColor"
                        strokeWidth="1.3"
                      ></path>
                      <path
                        d="M9 7V7C9 8.65685 10.3431 10 12 10V10C13.6569 10 15 8.65685 15 7V7"
                        stroke="currentColor"
                        strokeWidth="1.3"
                      ></path>
                      <path
                        d="M20 0V8M16 4H24"
                        stroke="currentColor"
                        strokeWidth="1.3"
                      ></path>
                    </svg>
                  </span>
                </div>
                <div className="mt-4 text-center">
                  <h4 className="font-opensans text-[12px] md:text-[15px]">
                    {product.title}
                  </h4>
                  <p className="font-opensans text-[12px] md:text-[15px]">
                    {selectedCurrency === "NGN"
                      ? `₦${product.price}`
                      : `$${product.usdPrice.toFixed(2)}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {isRightOpen && (
            <div className="overlay" onClick={closeRight}></div>
          )}
          {isRightOpen && (
            <div
              className={`${
                isRightOpen ? "right-0 transition-all  " : "-right-full "
              } fixed z-10 bottom-0 w-[70%] bg-opacity-30 bg-dark/30 max-w-[32rem] h-screen transition-all`}
            >
              <div className="flex flex-col justify-between   items-start leading-[3rem] bg-white opacity-1 h-full   w-[130%] ">
              <div className="overflow-y-auto w-full overflow-x-hidden ">
                <button
                  onClick={closeRight}
                  className="px-6 py-2 mt-[4rem] text-dark"
                >
                  <svg viewBox="0 0 24 24" width="30" height="30">
                    <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
                  </svg>
                </button>
             <h1>hheje</h1>
              </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;

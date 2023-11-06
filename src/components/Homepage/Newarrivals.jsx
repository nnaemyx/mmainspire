import { useCustomContext } from "@/context/Customcontext";
import useProductStore from "@/store/product/productStore";
import Image from "next/image";
import React, { useEffect } from "react";

const Newarrivals = () => {
  const productStore = useProductStore();
  useEffect(() => {
    productStore.getProducts();
    // Fetch exchange rates when the component mounts
  }, []);
  const { selectedCurrency } = useCustomContext();

  // Filter products with the "new arrival" tag
  const newArrivalProducts = productStore.products.filter((product) =>
    product.tags.includes("new arrival")
  );

  return (
    <div className="lg:mt-36 mt-12 px-8">
      <div className="text-center">
        <h2 className="font-opensans font-semibold text-[12px] md:text-[15px]">
          SHOP
        </h2>
        <h3 className="font-futura text-[30px] md:text-[64px] mt-2 font-semibold">
          NEW ARRIVALS
        </h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {newArrivalProducts.map((product, index) => (
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
              <div className="absolute inset-0 top-[21rem] left-0 right-4 mx-auto text-center items-center opacity-0 group-hover:opacity-100">
                <button className="tracking-[.2rem] text-[15px] h-[64px] px-[6rem] mt-4 font-opensans font-semibold bg-primary text-secondary relative overflow-hidden group">
                  <span className="absolute inset-x-0  bottom-0 h-full bg-gray-200/60 transition-transform transform translate-y-full group-hover:translate-y-0"></span>
                  QUICK VIEW
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
      <div className="text-center mt-12">
        <button className="tracking-[.2rem] z-10 md:text-[15px] text-[12px] h-[50px] md:h-[64px] px-[2rem] md:px-[3rem] mt-4 font-opensans font-semibold bg-dark text-secondary">
          VIEW ALL
        </button>
      </div>
    </div>
  );
};

export default Newarrivals;

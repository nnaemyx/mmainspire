import useProductStore from "@/store/product/productStore";
import Image from "next/image";
import React, { useEffect } from "react";

const Newarrivals = () => {
  const productStore = useProductStore(); // Get the product store

  useEffect(() => {
    productStore.getProducts();
  }, []);

  // Filter products with the "new arrival" tag
  const newArrivalProducts = productStore.products.filter((product) =>
    product.tags.includes("popular")
  );

  return (
    <div className="mt-36 px-8">
      <div className="text-center">
        <h2 className="font-opensans font-semibold text-[15px]">SHOP</h2>
        <h3 className="font-futura text-[64px] mt-2 font-semibold">
          NEW ARRIVALS
        </h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {newArrivalProducts.map((product) => (
          <div key={product.id} className="relative group">
            <div className="relative overflow-hidden">
              <Image
                src={product.images[0]}
                width={347.5}
                height={496.25}
                alt={product.name}
                className="block group-hover:hidden"
              />
              <Image
                src={product.images[1]}
                width={347.5}
                height={496.25}
                alt={product.name}
                className="hidden group-hover:inline-block"
              />
              <div className="absolute inset-0 top-[21rem] left-0 right-4 mx-auto text-center items-center opacity-0 group-hover:opacity-100">
                <button className="tracking-[.2rem] text-[15px]  h-[64px] px-[6rem] mt-4 font-opensans font-semibold bg-primary text-secondary relative overflow-hidden group">
                  <span className="absolute inset-x-0  bottom-0 h-full bg-gray-200/60 transition-transform transform translate-y-full group-hover:translate-y-0"></span>
                  QUICK VIEW
                </button>
              </div>
            </div>
            <div className="mt-4 text-center">
              <h4 className="font-opensans text-[18px]">{product.title}</h4>
              <p className="font-opensans text-[18px]">&#8358;{product.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <button className="tracking-[.2rem] z-10 text-[15px]  h-[64px] px-[3rem] mt-4 font-opensans font-semibold bg-dark  text-secondary">VIEW ALL</button>
      </div>

    </div>
  );
};

export default Newarrivals;

import ProductUploadForm from "@/components/ProductForm";
import Head from "next/head";
import React from "react";

const Addproduct = () => {
  return (
    <div>
      <Head>
        <title>Mma-Inspire Admin</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1 className="text-center text-[18px] font-futura mt-12 font-semibold">Product Upload - Step 1</h1>
        <ProductUploadForm />
      </div>
    </div>
  );
};

export default Addproduct;

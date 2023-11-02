import Head from "next/head";
import React from "react";
import Navbar from "./Homepage/Navbar";

const Homelayout = ({children}) => {
  return (
    <div>
      <Head>
        <title>Mma-Inspire</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 className="text-center mx-auto text-dark font-opensans bg-secondary py-5">
          WORLDWIDE SHIPPING AVAILABLE
        </h1>
      </div>
      <Navbar/>
      <main className="mt-[10rem]">{children}</main>
    </div>
  );
};

export default Homelayout;

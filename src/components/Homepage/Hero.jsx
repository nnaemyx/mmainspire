import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="w-full relative ">
      <div className="flex bg-cover ">
        <div>
          <Image
            src="https://res.cloudinary.com/mmainspire/image/upload/v1698521215/mmainspire/kc3pudrbh3aij5i57ryk.jpg"
            width={820}
            height={1126}
            alt="hero-image1"
            className="hidden lg:flex"
          />
           <Image
            src="https://res.cloudinary.com/mmainspire/image/upload/v1698521215/mmainspire/kc3pudrbh3aij5i57ryk.jpg"
            width={960}
            height={1126}
            alt="hero-image1"
            className="lg:hidden block"
          />
        </div>
        <div className="hidden lg:flex">
          <Image
            src="https://res.cloudinary.com/mmainspire/image/upload/v1698521145/mmainspire/lv4fukk9hhvvj2zkqslg.jpg"
            width={821}
            height={1126}
            alt="hero-image2"
          />
        </div>
      </div>
      <div className="container mx-auto space-y-[2rem]  text-center absolute top-[10rem] lg:top-[29rem] left-0 right-0 text-secondary ">
        <h2 className="md:text-[13px] text-[12px] font-opensans text-primary font-semibold md:tracking-[.4rem] tracking-[.1rem]">
          WELCOME TO
        </h2>
        <h3 className="md:text-[64px] text-[36px] font-futura font-semibold tracking-[.1rem] md:tracking-[.4rem]">
          MMA INSPIRE
        </h3>
        <button className="tracking-[.2rem] text-[12px] md:text-[15px] px-2 md:h-[64px] md:w-[204px] w-[145px] h-[44px] mt-4 font-opensans font-semibold bg-white text-dark relative overflow-hidden group">
          <span className="absolute inset-x-0 bottom-0 left-0 h-full bg-gray-200/60 transition-transform transform translate-y-full group-hover:translate-y-0"></span>
          SHOP NOW
        </button>
      </div>
    </div>
  );
};

export default Hero;

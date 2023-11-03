import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const ProgressBar = () => {
  const progressBarVariants = {
    initial: { width: 0 },
    animate: { width: "100%", transition: { duration: 8 } },
  };

  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const [showImage1, setShowImage1] = useState(true);

  const toggleProgress = async () => {
    while (true) {
      await controls1.start("animate");
      await controls1.start("initial");
      setShowImage1(true);
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for 3 seconds
      await controls2.start("animate");
      await controls2.start("initial");
      setShowImage1(false);
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for 3 seconds
    }
  };

  useEffect(() => {
    toggleProgress();
  }, []);

  return (
    <div className="flex items-center lg:flex-row flex-col lg:px-[6rem] justify-center lg:justify-between lg:gap-[100px] gap-4 lg:mt-36 mt-24 w-full">
      <div className="lg:w-[45%] w-[85%]">
        {showImage1 ? (
          <Image
            width={729.49}
            height={894.39}
            src="https://res.cloudinary.com/mmainspire/image/upload/v1698366562/mmainspire/li27hh3fja61jrwqoop4.jpg"
            alt="Image 1"
            
          />
        ) : null}
        {!showImage1 ? (
          <Image
            width={729.49}
            height={894.39}
            src="https://res.cloudinary.com/mmainspire/image/upload/v1698366418/mmainspire/jjll77wycm8dw7w3furg.jpg"
            alt="Image 2"
            
          />
        ) : null}
      </div>
      <div className="mx-auto text-center">
        <div>
          <div className="md:leading-[3.5rem] leading-[2.5rem]">
            <h2 className="font-opensans font-semibold text-[12px] md:text-[13px]">SHOP</h2>
            <h3 className="font-futura md:text-[46px] text-[26px] mt-2 font-semibold">
              ZINI SILK MAXI
            </h3>
            <h3 className="font-futura tracking-[.1rem] font-semibold text-[14px] md:text-[15px]">
              POLYSILK TIERED MAXI DRESS WITH STRAPS
            </h3>
          </div>
          <button className="tracking-[.2rem] z-10 text-[12px] md:text-[15px] h-[44px] px-[2rem]  md:h-[64px] md:px-[3rem] mt-4 font-opensans font-semibold bg-dark  text-secondary">
            SHOP NOW
          </button>
        </div>
        <div className="flex gap-8 lg:mt-24 mt-12 items-center">
          <div>
            <div className="w-[10rem] relative h-1 bg-gray-300 rounded-full">
              <motion.div
                className="absolute h-1 bg-green-500 rounded-full"
                initial="initial"
                animate={controls1}
                variants={progressBarVariants}
              ></motion.div>
            </div>
            <h2 className="font-futura mt-4 font-semibold text-[15px]">
              ZINI SLIKI MAXI
            </h2>
          </div>
          <div>
            <div className="w-[10rem] relative h-1 bg-gray-300 rounded-full">
              <motion.div
                className="absolute h-1 bg-green-500 rounded-full"
                initial="initial"
                animate={controls2}
                variants={progressBarVariants}
              ></motion.div>
            </div>
            <h2 className="font-futura mt-4 font-semibold text-[15px]">
              ZINI SLIKI MAXI
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

import Image from "next/image";
import React, { useState } from "react";

const Newsletter = () => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [email, setEmail] = useState("");
  const handleInputClick = (inputName) => {
    setFocusedInput(inputName);
  };
  return (
    <div className="lg:mt-36  mt-12">
      <div className="relative">
        <div className="w-full">
          <Image
            src="https://res.cloudinary.com/mmainspire/image/upload/v1698587233/mmainspire/kapivzspfxataxylinwz.jpg"
            alt="newsletter"
            width={1440}
            height={100}
            className="w-full h-auto md:max-h-[30rem] max-h-[20rem] newsletter object-cover"
          />
        </div>
    
        <div className="bg-white md:w-[580px] w-[310px] 425:w-[360px] font-opensans md:px-8 px-6 h-[260px] md:h-[372px] absolute md:left-24 md:top-16 top-8 left-5 425:left-8 text-center">
          <h2 className="md:mt-20 mt-6 md:text-[18px] uppercase font-semibold text-[12px]">Join us</h2>
          <h3 className="md:text-[20px] text-[12px] mt-[24px] mb-[15px]">Promotions, new products and sales. Directly to your inbox.</h3>
          <form>
            <div className="flex md:flex-row flex-col items-center gap-3 mt-6 md:mt-12 w-full justify-center">
              <div className="relative w-full">
                <input
                  type="email"
                  value={email}
                  placeholder=" "
                  className={`focus:outline-none w-full border border-solid px-4 md:px-[18px] md:py-[18px] py-[10px] ${
                    focusedInput === "email"
                      ? "border-dark border-[1.5px]"
                      : "border-gray-300 "
                  }`}
                  onClick={() => handleInputClick("email")}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label
                  htmlFor="email"
                  className={`absolute left-4 text-[14px] text-[#9b9191] top-4 transition-all duration-300 ${
                    focusedInput === "email" || email
                      ? "translate-y-[-125%] text-[12px] bg-white"
                      : ""
                  }`}
                >
                  Your e-mail
                </label>
              </div>
              <div className="w-full">
                <button
                  type="submit"
                  className=" uppercase  text-[12px] md:text-[14px] font-semibold bg-dark text-white md:px-[50px] w-full px-0 tracking-[1.5px] py-[16px] md:py-[20px]"
                >Subscribe</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;

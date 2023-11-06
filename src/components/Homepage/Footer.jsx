import React, { useState } from "react";

const Footer = () => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [email, setEmail] = useState("");
  const handleInputClick = (inputName) => {
    setFocusedInput(inputName);
  };
  return (
    <div className="lg:mt-36  mt-12">
      <div className="flex lg:flex-row flex-col lg:gap-[150px] font-opensans items-start border-t border-solid bg-dark text-white lg:h-[382.69px] px-8 py-16">
        <div className="flex w-full items-start justify-between">
          <div className="">
            <h2 className="font-opensans text-primary font-semibold text-[12px] md:text-[13px]">
              MMA INSPIRE
            </h2>
            <h3 className="text-[12px] md:w-auto w-[60%] md:w- md:text-[15px] mt-4">
              Premium multi-brand stores in Onitsha, Anambra State
            </h3>
          </div>
          <div className="">
            <h2 className="font-opensans font-semibold text-primary text-[12px] md:text-[13px]">FOLLOW US</h2>
            <div className="flex items-center mt-4">
              <span className="border overflow-hidden relative group lg:z-10 border-solid hover:border-primary border-secondary md:px-6 px-4 py-3 md:py-5">
                <svg
                  focusable="false"
                  width="9"
                  height="17"
                  viewBox="0 0 9 17"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.486 16.2084L2.486 8.81845H0L0 5.93845L2.486 5.93845L2.486 3.81845C2.38483 2.79982 2.73793 1.78841 3.45107 1.05407C4.16421 0.319722 5.16485 -0.0628415 6.186 0.00844868C6.9284 0.00408689 7.67039 0.0441585 8.408 0.128449V2.69845L6.883 2.69845C6.4898 2.61523 6.08104 2.73438 5.79414 3.01585C5.50724 3.29732 5.3803 3.70373 5.456 4.09845L5.456 5.93845H8.308L7.936 8.81845H5.46L5.46 16.2084H2.486Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <span className="absolute inset-x-0 bottom-0 left-0 h-full bg-primary -z-10 transition-transform transform translate-y-full group-hover:translate-y-0"></span>
              </span>
              <span className="border overflow-hidden relative group lg:z-10 border-solid hover:border-primary border-secondary md:px-6 px-4 py-3 md:py-5">
                <svg
                  focusable="false"
                  width="16"
                  height="16"
                
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 0C5.827 0 5.555.01 4.702.048 3.85.087 3.269.222 2.76.42a3.921 3.921 0 00-1.417.923c-.445.444-.719.89-.923 1.417-.198.509-.333 1.09-.372 1.942C.01 5.555 0 5.827 0 8s.01 2.445.048 3.298c.039.852.174 1.433.372 1.942.204.526.478.973.923 1.417.444.445.89.719 1.417.923.509.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.445-.01 3.298-.048c.852-.039 1.433-.174 1.942-.372a3.922 3.922 0 001.417-.923c.445-.444.719-.89.923-1.417.198-.509.333-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.298c-.039-.852-.174-1.433-.372-1.942a3.922 3.922 0 00-.923-1.417A3.921 3.921 0 0013.24.42c-.509-.198-1.09-.333-1.942-.372C10.445.01 10.173 0 8 0zm0 1.441c2.136 0 2.39.009 3.233.047.78.036 1.203.166 1.485.276.374.145.64.318.92.598.28.28.453.546.598.92.11.282.24.705.276 1.485.038.844.047 1.097.047 3.233s-.009 2.39-.047 3.233c-.036.78-.166 1.203-.276 1.485-.145.374-.318.64-.598.92-.28.28-.546.453-.92.598-.282.11-.705.24-1.485.276-.844.038-1.097.047-3.233.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.479 2.479 0 01-.92-.598 2.478 2.478 0 01-.598-.92c-.11-.282-.24-.705-.276-1.485-.038-.844-.047-1.097-.047-3.233s.009-2.39.047-3.233c.036-.78.166-1.203.276-1.485.145-.374.318-.64.598-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.844-.038 1.097-.047 3.233-.047zm0 9.226a2.667 2.667 0 110-5.334 2.667 2.667 0 010 5.334zm0-6.775a4.108 4.108 0 100 8.216 4.108 4.108 0 000-8.216zm5.23-.162a.96.96 0 11-1.92 0 .96.96 0 011.92 0z"
                    fill="currentColor"
                  ></path>
                </svg>
                <span className="absolute inset-x-0 bottom-0 left-0 h-full bg-primary -z-10 transition-transform transform translate-y-full group-hover:translate-y-0"></span>
              </span>
            </div>
          </div>

        </div>
        <div className=" flex md:flex-row flex-col w-full items-start justify-between">
          <div className="mt-6 lg:mt-0">
            <h2 className="font-opensans font-semibold text-primary text-[12px] md:text-[13px]">Links</h2>
            <ul className="leading-[2.5rem] text-[12px] md:text-[15px] mt-4">
              <li className="hover:text-secondary/50">Search</li>
              <li className="hover:text-secondary/50">Size Chart</li>
              <li className="hover:text-secondary/50">Refund Policy</li>
              <li className="hover:text-secondary/50">Privacy Policy</li>
              <li className="hover:text-secondary/50">Terms Of Service</li>
            </ul>
          </div>
          <div className="mt-6 lg:mt-0">
            <h2 className="font-opensans font-semibold text-primary text-[12px] md:text-[13px]">JOIN US</h2>
            <h3 className="mt-4 text-[12px] md:text-[15px] w-[80%]">
              Promotions, new products and sales. Directly to your inbox.
            </h3>
            <div className="relative w-full mt-4">
              <input
                type="email"
                value={email}
                placeholder=" "
                className={`focus:outline-none w-full border bg-dark border-white border-solid px-4 md:px-[18px] md:py-[18px] py-[12px] ${
                  focusedInput === "email"
                    ? "border-dark border-[1.5px]"
                    : "border-secondary "
                }`}
                onClick={() => handleInputClick("email")}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="email"
                className={`absolute left-4 text-[12px] md:text-[15px] text-secondary top-4 transition-all duration-300 ${
                  focusedInput === "email" || email
                    ? "translate-y-[-125%] text-[12px] bg-dark"
                    : ""
                }`}
              >
                Your e-mail
              </label>
              <button type="submit" className="absolute right-4 top-6">
                <svg
                  focusable="false"
                  width="17"
                  height="14"
                 
                  viewBox="0 0 17 14"
                >
                  <path
                    d="M0 7h15M9 1l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    fill="none"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Footer;

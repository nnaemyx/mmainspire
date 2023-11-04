import { useCustomContext } from "@/context/Customcontext";
import {
  AccountIcon2,
  CartIcon,
  DropUpIcon,
  DropdownIcon,
  MessageIcon,
  SearchIcon,
} from "@/icon";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/utils/auth";
import { getUserFromLocalStorage } from "@/utils/Localstorage";

const Navbar = () => {
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("NGN"); // Default to Naira
  const [bg, setBg] = useState(false);
  const { isLeftOpen, openLeft, closeLeft } = useCustomContext();

  const userData = getUserFromLocalStorage();
  const { user } = useAuth();

  const menuVariants = {
    initial: { left: "-100%" },
    animate: { left: 0, transition: { duration: 0.5 } },
  };

  // Define a transition for the menu items
  const menuItemVariants = {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };
  const closeVariants = {
    open: { opacity: 1, x: 0 },
    animate: { transition: { duration: 0.5 } },
    closed: { opacity: 1, transition: { duration: 0.5 } },
  };

  const exchangeRates = {
    NGN: 1, // 1 NGN is equal to 1 NGN (base currency)
    USD: 0.0027, // Replace with the actual exchange rate (NGN to USD)
    // Add more exchange rates for other currencies
  };

  const handleCurrencyChange = (newCurrency) => {
    setSelectedCurrency(newCurrency);
    setIsCurrencyDropdownOpen(false);
  };
  const toggleCurrencyDropdown = () => {
    setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen);
  };

  // Sample product prices in NGN
  const productPrices = {
    product1: 1500,
    product2: 2000,
    // Add more product prices
  };

  const convertPriceToCurrency = (price) => {
    return (price * exchangeRates[selectedCurrency]).toFixed(2);
  };

  useEffect(() => {
    // add event listener
    window.addEventListener("scroll", () => {
      // when scrollY is bigger than 50px setBg to true, else false
      return window.scrollY > 50 ? setBg(true) : setBg(false);
    });
  });

  return (
    <nav
      className={`${
        // if bg is true
        bg
          ? "bg-black top-0 py-4  z-10 lg:py-6"
          : // if bg is false
            "bg-none z-10"
      }
  fixed left-0 lg:py-6 py-5 z-10 bg-dark text-secondary w-full transition-all  duration-200`}
    >
      <div className="md:px-8 px-4  mx-auto items-center flex justify-between">
        {/* Mobile Menu */}
        <div className="lg:hidden flex justify-between w-full  items-center">
          <div className="flex gap-4 items-center">
            <button onClick={openLeft} className="text-[20px] text-secondary">
              &#9776;
            </button>
            <SearchIcon className="fill-white w-[20px] h-[20px]" />
          </div>
          <div>
            <Link href="/" className="flex flex-col mx-auto pl-8 items-center">
              <h1 className="text-[10px] font-futura font-semibold tracking-[.4rem]">
                MMA <span className="text-primary">INSPIRE</span>
              </h1>
              <Image
                src="https://res.cloudinary.com/mmainspire/image/upload/v1698277749/mmainspire/eralwmthytkztkwamzfs.png"
                width={40}
                height={36}
                alt="logo"
              />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative  font-opensans inline-block text-left">
              <button
                onClick={toggleCurrencyDropdown}
                className="flex md:text-[18px] text-[12px] items-center text-secondary "
              >
                {selectedCurrency}
                <span className="ml-2">
                  {isCurrencyDropdownOpen ? (
                    <DropUpIcon className="fill-white w-[20px] h-[20px]" />
                  ) : (
                    <DropdownIcon className="fill-white w-[20px] h-[20px]" />
                  )}
                </span>
              </button>
              {isCurrencyDropdownOpen && (
                <div className="origin-top-right md:text-[18px] text-[12px] absolute right-0 mt-2 w-14 text-center rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="currency-menu"
                  >
                    <button
                      onClick={() => handleCurrencyChange("NGN")}
                      className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      NGN
                    </button>
                    <hr className="full" />
                    <button
                      onClick={() => handleCurrencyChange("USD")}
                      className="block w-full px-4 py-2  text-gray-700 hover-bg-gray-100"
                      role="menuitem"
                    >
                      USD
                    </button>
                    {/* Add more currency options as needed */}
                  </div>
                </div>
              )}
            </div>

            <Link href="/about">
              <CartIcon className="fill-white w-[20px] h-[20px]" />
            </Link>
          </div>
        </div>

        <div className="lg:flex hidden text-[18px] font-opensans gap-[30px] ">
          <Link href="/">
            <p className="mx-2">Home</p>
          </Link>
          <Link href="/shop">
            <p className="mx-2">Shop</p>
          </Link>
          <Link href="/contact">
            <p className="mx-2">Contact</p>
          </Link>
        </div>
        <div className="lg:flex hidden flex-col mx-auto pl-12 items-center">
          <h1 className="text-[25px] font-futura font-semibold tracking-[1rem]">
            MMA <span className="text-primary">INSPIRE</span>
          </h1>
          <Image
            src="https://res.cloudinary.com/mmainspire/image/upload/v1698277749/mmainspire/eralwmthytkztkwamzfs.png"
            width={100}
            height={50}
            alt="logo"
          />
        </div>
        <div className="hidden lg:flex items-center justify-end gap-[28px]">
          <div className="relative  font-opensans text-[18px] inline-block text-left">
            <button
              onClick={toggleCurrencyDropdown}
              className="flex text-[18px] items-center text-secondary "
            >
              {selectedCurrency}
              <span className="ml-2">
                {isCurrencyDropdownOpen ? (
                  <DropUpIcon className="fill-white" />
                ) : (
                  <DropdownIcon className="fill-white" />
                )}
              </span>
            </button>
            {isCurrencyDropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="currency-menu"
                >
                  <button
                    onClick={() => handleCurrencyChange("NGN")}
                    className="block w-full px-4 py-2  text-[18px] text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    NGN
                  </button>
                  <hr className="full" />
                  <button
                    onClick={() => handleCurrencyChange("USD")}
                    className="block w-full px-4 py-2  text-gray-700 hover-bg-gray-100"
                    role="menuitem"
                  >
                    USD
                  </button>
                  {/* Add more currency options as needed */}
                </div>
              </div>
            )}
          </div>
          <Link href="/contact">
            <MessageIcon className="fill-white w-[32px] h-[28px]" />
          </Link>
          <Link href="/contact">
            <SearchIcon className="fill-white w-[30px] h-[30px]" />
          </Link>
          {user ? (
            <Link href="/account">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div className="hidden relative md:flex items-center gap-2">
                  <span className="w-2.5 h-2.5 absolute left-5 top-0 bg-primary border-2 border-solid border-secondary rounded-full animate-ping"></span>
                  <AccountIcon2 className="fill-white w-[30px] h-[29px]" />
                </div>
              </motion.div>
            </Link>
          ) : (
            <>
              {/* AccountIcon2 for logged-out state */}
              <Link href="/authentication/Register">
                <AccountIcon2 className="fill-white w-[30px] h-[29px]" />
              </Link>
            </>
          )}
          <Link href="/about">
            <CartIcon className="fill-white w-[32px] h-[30px]" />
          </Link>
        </div>
        {/* Mobile Menu (Hamburger Menu) */}
        {isLeftOpen && (
          <motion.div
            className={`${
              isLeftOpen ? "left-0 transition-all" : "-left-full"
            } lg:hidden fixed bottom-0 w-[80%] max-w-xs h-screen transition-all`}
            initial="initial"
            animate="animate"
            variants={menuVariants}
          >
            <div className="flex flex-col justify-between items-start py-[2rem] leading-[3rem] bg-white h-full w-[120%] ">
              <div className="w-full">
                <button onClick={closeLeft} className="px-6 py-2 text-dark">
                  <motion.svg
                    variants={closeVariants}
                    initial="initial"
                    whileHover="hover"
                    animate="closed"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="30"
                    height="30"
                  >
                    <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
                  </motion.svg>
                </button>
                <motion.div
                  initial="initial"
                  animate="animate"
                  variants={menuItemVariants}
                  className="font-futura flex flex-col divide-y w-full uppercase font-semibold text-dark px-6"
                >
                  <Link href="/">
                    <p className="py-2">Home</p>
                  </Link>
                  <Link href="/shop">
                    <p className="py-2">Shop</p>
                  </Link>
                  <Link href="/contact">
                    <p className="py-2">Contact</p>
                  </Link>
                </motion.div>
              </div>
              <div className="text-dark px-6 w-full divide-y">
                <div className="flex gap-2 items-center">
                  {user ? (
                    <Link href="/account">
                      <div className="flex items-center gap-2">
                        <p className="text-[14px] font-opensans">
                          Hello, {user.name}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <>
                      {/* AccountIcon2 for logged-out state */}
                      <Link href="/authentication/Register">
                        <div className="flex gap-2 items-center">
                          <AccountIcon2 className="fill-dark w-[20px] h-[20px]" />
                          <h2 className="text-[14px] font-opensans">Account</h2>
                        </div>
                      </Link>
                    </>
                  )}
                </div>
                <div className="flex gap-2 items-center">
                  <MessageIcon className="fill-dark w-[20px] h-[20px]" />
                  <h2 className="text-[14px] font-opensans">Inbox</h2>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

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
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("NGN"); // Default to Naira
  const [bg, setBg] = useState(false);

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
          ? "bg-black top-0 py-4 lg:py-6"
          : // if bg is false
            "bg-none"
      }
  fixed left-0 py-8 z-10 bg-dark text-secondary w-full transition-all  duration-200`}
    >
      <div className="px-8  mx-auto items-center flex justify-between">
        <div className="flex text-[18px] font-opensans gap-[30px] ">
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
        <div className="flex flex-col mx-auto pl-12 items-center">
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
        <div className="flex items-center justify-end gap-[28px]">
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
          <Link href="/contact">
            <AccountIcon2 className="fill-white w-[30px] h-[29px]" />
          </Link>
          <Link href="/about">
            <CartIcon className="fill-white w-[32px] h-[30px]" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

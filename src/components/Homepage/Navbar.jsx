import { useCustomContext } from "@/context/Customcontext";
import {
  AccountIcon2,
  CartIcon,
  DropUpIcon,
  DropdownIcon,
  MessageIcon,
  MinusIcon,
  PlusIcon,
  SearchIcon,
} from "@/icon";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useUserStore from "@/store/user/userStore";
import { getUserFromLocalStorage } from "@/utils/Localstorage";
import useProductStore from "@/store/product/productStore";
import Shopdropdown from "./Shopdropdown";

const Navbar = () => {
  const [bg, setBg] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseNavEnter = () => {
    setIsDropdownOpen(false);
  };
  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const {
    isLeftOpen,
    openLeft,
    closeLeft,
    selectedCurrency,
    handleCurrencyChange,
    setIsCurrencyDropdownOpen,
    isCurrencyDropdownOpen,
  } = useCustomContext();

  const user = useUserStore((state) => state.user);
  const productStore = useProductStore();
  useEffect(() => {
    productStore.getProducts();
    // Fetch exchange rates when the component mounts
  }, []);
  const newArrivalProducts = productStore.products;

  const toggleCurrencyDropdown = () => {
    setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen);
  };

  useEffect(() => {
    // add event listener
    window.addEventListener("scroll", () => {
      // when scrollY is bigger than 50px setBg to true, else false
      return window.scrollY > 50 ? setBg(true) : setBg(false);
    });
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userFromLocalStorage = getUserFromLocalStorage();
      if (userFromLocalStorage) {
        useUserStore.setState({ user: userFromLocalStorage });
      }
    }
  }, []);

  const productLinks = ["/account", "/collections/shop", "/contact"];

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
      onMouseLeave={handleMouseLeave}
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
                  <div className="py-1">
                    <button
                      onClick={() => handleCurrencyChange("NGN")}
                      className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      NGN
                    </button>
                    <hr className="full" />
                    <button
                      onClick={() => handleCurrencyChange("USD")}
                      className="block w-full px-4 py-2  text-gray-700 hover-bg-gray-100"
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

        <div className="lg:flex hidden font-opensans gap-[30px] ">
          <Link
            onMouseEnter={handleMouseNavEnter}
            href="/"
            className="relative group"
          >
            <p className="text-[15px]">Home</p>
            <span className="absolute inset-x-0  bottom-0  bg-primary transition-transform transform translate-y-full group-hover:border boder-solid border-primary group-hover:translate-x-0 ease-in-out "></span>
          </Link>
          <div className="relative group w-full">
            <Link
              href="/collections/shop"
              className="relative group w-full"
              onMouseEnter={handleMouseEnter}
            >
              <p className="text-[15px]">Shop</p>
              <span
                className={`absolute inset-x-0 bottom-0 bg-primary transition-transform transform group-hover:translate-y-full ease-in-out ${
                  isDropdownOpen ? "border border-solid border-primary" : ""
                }`}
              ></span>
            </Link>

            {/* Add your dropdown content here */}
            {isDropdownOpen && (
              <div
                onMouseLeave={handleMouseLeave}
                className="absolute top-14 -left-[7rem] 2xl:w-[1700px] xl:w-[1400px]  bg-dark shadow-md mt-2"
              >
                <div className="flex gap-16 py-8 items-start font-opensans text-[15px] mx-auto justify-center ">
                  <div className="mt-8">
                    <h2 className="font-semibold">CLOTHING</h2>
                    <ul className="leading-[2rem] mt-2">
                      <li>Dresses</li>
                      <li>Kaftans</li>
                      <li>Kimonos</li>
                      <li>Co-ords</li>
                      <li>Tops</li>
                      <li>Skirts</li>
                      <li>Trousers</li>
                    </ul>
                  </div>
                  <div className="grid grid-cols-2 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-8">
                    {newArrivalProducts.slice(1, 4).map((product, index) => (
                      <div key={index}>
                        <Link href={productLinks[index]}>
                          <Image
                            src={product.images[0]}
                            alt="images"
                            width={300}
                            height={250}
                            className="xl:hidden 2xl:flex"
                          />
                            <Image
                            src={product.images[0]}
                            alt="images"
                            width={200}
                            height={150}
                            className="2xl:hidden flex"
                          />
                          <p className="mt-4 font-semibold">
                            {product.category}
                          </p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <Link
            href="/contact"
            onMouseEnter={handleMouseNavEnter}
            className="relative group"
          >
            <p className="text-[15px]">Contact</p>
            <span className="absolute inset-x-0  bottom-0  bg-primary transition-transform transform translate-y-full group-hover:border boder-solid border-primary group-hover:translate-x-0 ease-in-out "></span>
          </Link>
          {/* <Link href="/admin" className="relative group">
            <p className=" text-[15px]">Admin</p>
            <span className="absolute inset-x-0  bottom-0  bg-primary transition-transform transform translate-y-full group-hover:border boder-solid border-primary group-hover:translate-x-0 ease-in-out "></span>
          </Link> */}
        </div>
        <div className="lg:flex hidden flex-col mx-auto pl-12 items-center">
          <h1 className="text-[18px] font-futura font-semibold tracking-[.5rem]">
            MMA <span className="text-primary">INSPIRE</span>
          </h1>
          <Image
            src="https://res.cloudinary.com/mmainspire/image/upload/v1698277749/mmainspire/eralwmthytkztkwamzfs.png"
            width={70}
            height={40}
            alt="logo"
          />
        </div>
        <div className="hidden lg:flex items-center justify-end gap-[28px]">
          <div className="relative  font-opensans text-[15px] inline-block text-left">
            <button
              onClick={toggleCurrencyDropdown}
              className="flex text-[15px] items-center text-secondary "
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
                <div className="py-1">
                  <button
                    onClick={() => handleCurrencyChange("NGN")}
                    className="block w-full px-4 py-2  text-[15px] text-gray-700 hover:bg-gray-100"
                  >
                    NGN
                  </button>
                  <hr className="full" />
                  <button
                    onClick={() => handleCurrencyChange("USD")}
                    className="block w-full px-4 py-2  text-gray-700 hover-bg-gray-100"
                  >
                    USD
                  </button>
                  {/* Add more currency options as needed */}
                </div>
              </div>
            )}
          </div>
          <Link href="/contact">
            <MessageIcon className="fill-white " />
          </Link>
          <Link href="/contact">
            <SearchIcon className="fill-white" />
          </Link>

          {/* AccountIcon2 for logged-out state */}
          {user ? ( // Conditionally render content based on user state
            // User is logged in
            <Link href="/account">
              <AccountIcon2 className="fill-primary " />{" "}
              {/* Display the user's name */}
              {/* You can also add a Logout button here */}
            </Link>
          ) : (
            // User is not logged in
            <Link href="/authentication/Register">
              <AccountIcon2 className="fill-white" />
            </Link>
          )}
          <Link href="/about">
            <CartIcon className="fill-white " />
          </Link>
        </div>
        {/* Mobile Menu (Hamburger Menu) */}
        {isLeftOpen && (
          <div
            className={`${
              isLeftOpen ? "left-0 transition-all" : "-left-full"
            } lg:hidden fixed bottom-0 w-[80%] max-w-xs h-screen transition-all`}
          >
            <div className="flex flex-col justify-between  items-start leading-[3rem] bg-white h-full w-[120%] ">
              <div className="overflow-y-auto w-full overflow-x-hidden ">
                <button
                  onClick={closeLeft}
                  className="px-6 py-2 mt-[4rem] text-dark"
                >
                  <svg viewBox="0 0 24 24" width="30" height="30">
                    <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
                  </svg>
                </button>
                <div className="font-futura flex flex-col divide-y w-full uppercase font-semibold text-dark px-6">
                  <Link href="/"  onClick={closeLeft}>
                    <p className="py-2">Home</p>
                  </Link>
                  <div className="w-full">
                    <div
                      className="flex items-center  justify-between"
                      onClick={toggleContent}
                    >
                      <p className="py-2">Shop</p>
                      <div
                        className={`w-4 h-4 ml-2 transition-transform transform ${
                          isExpanded ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        {isExpanded ? <MinusIcon /> : <PlusIcon />}
                      </div>
                    </div>
                    {isExpanded && (
                      <Shopdropdown/>
                    )}
                  </div>
                  <Link href="/contact"  onClick={closeLeft}>
                    <p className="py-2">Contact</p>
                  </Link>
                </div>
              </div>
              <div className="text-dark px-6 w-full divide-y">
                {user ? (
                  <>
                    <Link  onClick={closeLeft} href="/account" className="flex gap-2 items-center">
                      <AccountIcon2 className="fill-dark w-[20px] h-[20px]" />
                      <h2 className="text-[14px] font-opensans">
                        Hello, {user.name}
                      </h2>
                    </Link>
                  </>
                ) : (
                  <div className="flex gap-2 items-center">
                    <Link
                     onClick={closeLeft}
                      href="/authentication/Register"
                      className="flex gap-2 items-center"
                    >
                      <AccountIcon2 className="fill-dark w-[20px] h-[20px]" />
                      <h2 className="text-[14px] font-opensans">Account</h2>
                    </Link>
                  </div>
                )}
                <div className="flex gap-2 items-center">
                  <MessageIcon className="fill-dark w-[20px] h-[20px]" />
                  <h2 className="text-[14px] font-opensans">Inbox</h2>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

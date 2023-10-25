import React, { useEffect, useRef, useState } from "react";
import { AccountIcon, HomeIcon } from "../icon";
import Link from "next/link";
import { useRouter } from "next/router";
import { menuItems } from "./SidebarLinks";
import { removeUserFromLocalStorage } from "@/utils/Localstorage";
import Image from "next/image";
import Logo from '/public/logo1.png'

const Header = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await signOut({ callbackUrl: '/' })
  //   handleLogout()
  // }
  const menuRef = useRef(null); // Ref for the menu container
  const [userActivity, setUserActivity] = useState(true);

  // Set up a timer when the component mounts
  useEffect(() => {
    const inactivityTimeout = setTimeout(() => {
      setUserActivity(false); // Update user activity state
      logout(); // Call logout function
    }, 30 * 60 * 1000); // 30 minutes in milliseconds

    // Add event listeners to track user activity
    const resetTimer = () => {
      setUserActivity(true); // Update user activity state
      clearTimeout(inactivityTimeout); // Reset the timeout
    };
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    // Clean up event listeners when the component unmounts
    return () => {
      clearTimeout(inactivityTimeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, []);

  // Add a click event listener to the document
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    removeUserFromLocalStorage();
    setUserActivity(false);
    router.push("/");
  };

  const [isButtonOpen, setIsButtonOpen] = useState(false);

  const toggleDropdownButton = () => {
    setIsButtonOpen(!isButtonOpen);
  };

  return (
    <div ref={menuRef} className="py-3 px-6 bg-dark flex justify-between items-center">
        <div>
            <Image src={Logo} alt="logo" className="w-[100px] h-[70px]"/>
        </div>
     
        <div className="flex items-center  md:gap-4">
          <div className="relative inline-block  mt-1">
            <button
              onClick={toggleDropdownButton}
              className=" gap-2 border border-solid hidden text-white   py-2 px-4 rounded md:flex items-center"
            >
              <span className="rounded-full">
                <AccountIcon className="fill-white" />
              </span>
              Hello Admin
            </button>

            <button
              onClick={toggleDropdownButton}
              className=" md:hidden px-2 rounded flex items-center"
            >
              <span className="rounded-full ">
                <AccountIcon className="w-[23px]" />
              </span>
            </button>

            {isButtonOpen && (
              <div className="absolute bg-dark h-[136px] py-4 px-4 w-auto right-0 mt-2  text-white  rounded-md shadow-lg">

                <button
                  className="bg-primary rounded-[8px] text-secondary h-[54px] w-[150px]  shadow-2xl"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            )}
          </div>

          {showMenu ? (
            <button onClick={toggleMenu} className="lg:hidden flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
              </svg>
            </button>
          ) : (
            <button onClick={toggleMenu} className="lg:hidden flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path d="M3 4H21V6H3V4ZM3 11H15V13H3V11ZM3 18H21V20H3V18Z"></path>
              </svg>
            </button>
          )}

          {showMenu && (
            <div>
              <div className="absolute z-10  bg-dark h-full py-4 space-y-6 left-0  top-[4rem] w-[206px] text-white text-center  shadow-lg">
                <div className="flex flex-col  md:flex-row flex-1">
                  <nav className="text-center">
                    <ul className=" leading-[5rem]">
                      {menuItems.map(({ href, title, icon }) => (
                        <li
                          className="md:text-[14px] text-[12px] font-gilmerregular"
                          key={title}
                        >
                          <Link href={href}>
                            <p
                              className={`flex items-center gap-2 px-6 w-full cursor-pointer ${
                                router.asPath === href &&
                                "bg-primary  w-full text-white"
                              }`}
                            >
                              <span>{icon}</span>
                              {title}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          )}

       
        </div>
     
    </div>
  );
};

export default Header;

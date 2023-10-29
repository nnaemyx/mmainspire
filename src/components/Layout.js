import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { menuItems } from "./SidebarLinks";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import { useAuth } from "../utils/auth";
import { toast } from "react-toastify";
import { DropUpIcon, DropdownIcon } from "@/icon";

export default function Layout({ children }) {
  const router = useRouter();
  const { isAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const [activeDropdowns, setActiveDropdowns] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Set the timeout to 1 minute (60000 milliseconds)

    return () => clearTimeout(timer);
  }, []);

  const toggleDropdown = (dropdownId) => {
    setActiveDropdowns((prev) => ({
      ...prev,
      [dropdownId]: !prev[dropdownId],
    }));
  };

  const isSubItemActive = (subItem, dropdownId) => {
    // Determine if the subItem is active based on the current route
    return subItem.href === router.asPath && activeDropdowns[dropdownId];
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAdmin) {
    toast.error("You must be logged in as admin");
    router.replace("/authentication/Login"); // or redirect to the login page
  }

  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      <Header session={[isAdmin]} />

      <div className="flex flex-col gap-12 md:flex-row flex-1">
        <aside className="w-[232px] hidden lg:block  text-center mx-auto text-secondary bg-dark 2xl:w-[263px]">
          <nav className="text-center">
            <ul className=" leading-[4rem]">
              {menuItems.map(({ href, title, icon, subItems }) => (
                <li className="text-[14px] font-gilmerregular" key={title}>
                  {subItems ? (
                    <div className="relative">
                      <div
                        className={` px-6 w-full cursor-pointer`}
                        onClick={() => toggleDropdown(title)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span>{icon}</span>
                            <span>{title}</span>
                          </div>
                          <span className="ml-2">
                            {activeDropdowns[title] ? (
                              <DropUpIcon className="fill-white" />
                            ) : (
                              <DropdownIcon className="fill-white" />
                            )}
                          </span>
                        </div>
                      </div>
                      {activeDropdowns[title] && (
                        <ul className="bg-black">
                          {subItems.map(
                            ({
                              href: subHref,
                              title: subTitle,
                              icon: subIcon,
                            }) => (
                              <li key={subTitle}>
                                <Link href={subHref}>
                                  <div
                                    className={`flex items-center justify-start gap-2 px-16 w-full cursor-pointer ${
                                      isSubItemActive({ href: subHref }, title)
                                        ? "bg-primary"
                                        : ""
                                    }`}
                                  >
                                    {subIcon}
                                    {subTitle}
                                  </div>
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </div>
                  ) : (
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
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="flex-1 px-6">{children}</main>
      </div>
    </div>
  );
}

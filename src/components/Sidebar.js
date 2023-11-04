import React, { useState } from "react";
import Link from "next/link";

import { DASHBOARD_SIDEBAR_LINKS } from "./SidebarLinks";

export default function Sidebar() {
  return (
    <>
      <div className="bg-white w-[300px] p-3 flex flex-col">
        <div className="flex-1">
        {DASHBOARD_SIDEBAR_LINKS.map((link) => (
          <Link
            key={link.key}
            href={link.path}
            className={`flex items-center space-x-2 text-gray-600 hover:text-gray-900 ${
              activeMenuItem === link.key ? 'font-bold' : ''
            }`}
            onClick={() => onMenuItemClick(link.key)}
          >
            {link.icon}
            <span className="text-sm">{link.label}</span>
          </Link>
        ))}
        </div>
      </div>
    </>
  );
}

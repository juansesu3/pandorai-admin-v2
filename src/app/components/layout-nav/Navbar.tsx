"use clent";
import React from "react";
import { FiBell, FiUser } from "react-icons/fi";


const Navbar = () => {

 
  return (
    <header className="flex items-center justify-end bg-white dark:bg-[#191D23] px-4 h-16 sticky top-0 z-10 ">
      {/* Toggle sidebar button */}
   

      {/* Right side */}
      <div className="flex items-center">
        <button className="mx-2 dark:text-gray-200 text-gray-800 focus:outline-none">
          <FiBell size={24} />
        </button>
        <div className="relative">
          <button className="mx-2 dark:text-gray-200 text-gray-800 focus:outline-none">
            {/* User Avatar */}
            <FiUser size={24} />
          </button>
          {/* Dropdown menu */}
          {/* Implement dropdown menu here */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

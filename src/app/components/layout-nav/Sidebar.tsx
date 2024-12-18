"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  FiHome,
  FiUser,
  FiSettings,

  FiChevronDown,
} from "react-icons/fi";
import { GrDashboard } from "react-icons/gr";

import { GiSwordBrandish } from "react-icons/gi";

import { IoDocumentTextOutline } from "react-icons/io5";
import { GiProcessor } from "react-icons/gi";

import { TbWorldStar } from "react-icons/tb";
import { HiUserGroup } from "react-icons/hi2";
import { GoHubot } from "react-icons/go";
import { useTheme } from "next-themes";
import {
  MdDarkMode,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdLightMode,
} from "react-icons/md";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
  isSidebarOpen,
}) => {
  const router = useRouter();

  const pathname = usePathname();

  const { theme, setTheme } = useTheme();
  const localeFromPath = pathname.split("/")[1] || "en";
  const [locale, setLocale] = useState(localeFromPath);

  // Estado para controlar qué submenús están abiertos
  const [openSubMenus, setOpenSubMenus] = useState<string[]>([]);

  useEffect(() => {
    setLocale(localeFromPath);
  }, [localeFromPath]);

  const handleChangeLocale = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value;
    const newPathname = `/${selectedLanguage}${pathname.replace(
      /^\/[a-z]{2}/,
      ""
    )}`;
    router.push(newPathname);
  };

  // Función para alternar submenús
  const toggleSubMenu = (name: string) => {
    if (openSubMenus.includes(name)) {
      setOpenSubMenus(openSubMenus.filter((menu) => menu !== name));
    } else {
      setOpenSubMenus([...openSubMenus, name]);
    }
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: FiHome,
      href: "/",
      subItems: [
        { name: "Overview", href: "/dashboard", icon: FiHome },
        { name: "Reports", href: "/dashboard/reports", icon: FiHome },
      ],
    },
    {
      name: "Agents",
      icon: GoHubot,
      href: "/agents",
      subItems: [
        { name: "List", href: "/agents/list", icon: FiUser },
        { name: "Add Agent", href: "/agents/add", icon: FiUser },
      ],
    },
    {
      name: "Clients",
      icon: HiUserGroup,
      href: "/clients",
      subItems: [
        { name: "Client List", href: "/clients/list", icon: FiUser },
        { name: "Add Client", href: "/clients/add", icon: FiUser },
      ],
    },
    {
      name: "Landing Page",
      icon: TbWorldStar,
      href: "/landing-page",
      subItems: [
        {
          name: "Analytics",
          href: "/landing-page/analytics",
          icon: FiSettings,
        },
        {
          name: "Content Gestion",
          href: "/landing-page/analytics",
          icon: FiSettings,
        },
        {
          name: "Blog",
          href: "/landing-page/blog",
          icon: FiSettings,
        },
        {
          name: "Contact",
          href: "/landing-page/contact",
          icon: FiSettings,
        },
        {
          name: "ChatBot",
          href: "/landing-page/chatbot",
          icon: FiSettings,
        },
        { name: "Settings", href: "/landing-page/settings", icon: FiSettings },
      ],
    },
    {
      name: "Documentacion",
      icon: IoDocumentTextOutline,
      href: "/clients",
      subItems: [
        { name: "Client List", href: "/clients/list", icon: FiUser },
        { name: "Add Client", href: "/clients/add", icon: FiUser },
      ],
    },
    {
      name: "Automation",
      icon: GiProcessor,
      href: "/automation",
      subItems: [
        { name: "Makerting", href: "/automation/marketing", icon: GiSwordBrandish },
        { name: "Stats", href: "/automation/dashboard", icon: GrDashboard },
      ],
    },
  ];

  return (
    <div
      className={`${isOpen ? "w-64" : "w-16"
        } bg-white dark:bg-[#191D23] text-white transition-all duration-300 `}
    >
      <div className="h-full flex flex-col">
        {/* Logo or icon */}
        <div className="relative flex items-center justify-center h-16 text-purple-600">
          <span className="text-xl font-bold">{isOpen ? "PandorAI" : "P"}</span>
          <button
            onClick={toggleSidebar}
            className="focus:outline-none absolute -right-2 z-50 rounded-full w-5 h-5 bg-purple-600 flex items-center justify-center"
          >
            {isSidebarOpen ? (
              <MdKeyboardDoubleArrowLeft color="#fff" size={20} />
            ) : (
              <MdKeyboardDoubleArrowRight color="#fff" size={20} />
            )}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1">
          <ul>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const isSubMenuOpen = openSubMenus.includes(item.name);

              return (
                <li key={item.name} className="relative">
                  <button
                    onClick={() => {
                      if (hasSubItems) {
                        toggleSubMenu(item.name);
                      } else {
                        router.push(item.href);
                      }
                    }}
                    className={`${isOpen ? "w-60 mx-2" : "w-full"
                      } p-2 dark:hover:bg-[#262C36]  hover:bg-gray-100 dark:text-[#B8C0CC] text-gray-700 rounded-md flex items-center justify-center transition-all duration-300 ${isActive ? "bg-gray-100" : ""
                      }`}
                  >
                    <div className="flex items-center">
                      <Icon className={`${isOpen ? "mr-3" : "mr-0"}`} />
                      {isOpen && <span>{item.name}</span>}
                    </div>
                    {isOpen && hasSubItems && (
                      <FiChevronDown
                        size={18}
                        className={`ml-auto text-purple-600 font-bold transition-transform ${isSubMenuOpen ? "transform rotate-180" : ""
                          }`}
                      />
                    )}
                  </button>

                  {/* Renderizar subItems si existen y el submenú está abierto */}
                  {isOpen && hasSubItems && isSubMenuOpen && (
                    <ul className="ml-8">
                      {item.subItems.map((subItem) => {
                        const SubIcon = subItem.icon;
                        const isSubItemActive = pathname === subItem.href;
                        return (
                          <li key={subItem.name}>
                            <Link
                              href={subItem.href}
                              className={`flex items-center mr-2 p-2 text-gray-500 hover:text-gray-700 dark:text-[#B8C0CC] hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md ${isSubItemActive ? "bg-gray-200" : ""
                                }`}
                            >
                              <SubIcon className="mr-2" />
                              {subItem.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Locale and Theme Toggle */}
        <div
          className={`flex items-center gap-2 justify-center pb-4 ${isOpen ? "flex-row" : " flex-col"
            } `}
        >
          <div className="relative">
            <select
              onChange={handleChangeLocale}
              value={locale}
              className="p-1 dark:text-white text-xs  text-gray-500 rounded-md bg-white border border-neutral-100 dark:border-slate-600  dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="fr">FR</option>
              <option value="de">DE</option>
            </select>
          </div>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`${theme === "dark" ? "bg-gray-600" : "bg-gray-200"
              } relative inline-flex items-center h-7 rounded-full w-12 border border-neutral-100 dark:border-slate-600  transition-colors focus:outline-none`}
          >
            <span className="sr-only">Toggle Dark Mode</span>
            <span
              className={`${theme === "dark"
                  ? "translate-x-6 bg-blue-500"
                  : "translate-x-1 bg-gray-400"
                } w-5 h-5 transform  rounded-full transition-transform flex items-center justify-center`}
            >
              {theme === "dark" ? (
                <MdDarkMode className="w-3 h-3 text-yellow-300" />
              ) : (
                <MdLightMode className="w-3 h-3 text-yellow-500" />
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

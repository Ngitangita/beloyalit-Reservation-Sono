// Sidebar.tsx
import { useState, type JSX } from "react";
import {
  MdOutlineCalendarMonth,
  MdOutlineHome,
  MdOutlineLogin,
  MdMenu,
} from "react-icons/md";
import { RiCloseLine } from "react-icons/ri";
import { FaAngleRight } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "~/stores/useAuthStore.js";
import type { MenuItem } from "~/types/types.js";

const menuItems: MenuItem[] = [
  { title: "Accueil", icon: <MdOutlineHome />, path: "/admin", subItems: [] },
  {
    title: "Calendrier",
    icon: <MdOutlineCalendarMonth />,
    path: "/admin/catalogue",
    subItems: [],
  },
];

export default function Sidebar(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const logoutFn = useAuthStore((s) => s.logout);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState<Record<number, boolean>>({});

  const toggleSidebar = () => setOpenSidebar((o) => !o);
  const toggleSubmenu = (i: number) =>
    setSubmenuOpen((s) => ({ ...s, [i]: !s[i] }));

  const closeSidebar = () => window.innerWidth < 1024 && setOpenSidebar(false);
  const handleLogout = () => {
    logoutFn();
    closeSidebar();
    navigate("/authentification");
  };

  return (
    <div>
      <button
        onClick={toggleSidebar}
        className="fixed top-1 left-48 z-50 p-3 rounded-full bg-slate-100
         hover:bg-slate-200 text-2xl lg:hidden"
      >
        {openSidebar ? (
          <RiCloseLine className="text-gray-500" />
        ) : (
          <MdMenu className="text-gray-500" />
        )}
      </button>

      <div className="bg-gray-800 h-screen w-64 flex justify-between flex-col p-4">
        <div
        className={`
          fixed inset-y-0 left-0 text-white flex flex-col p-4
          transform transition-transform duration-300 ease-in-out
          ${openSidebar ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:relative lg:block
        `}
      >
        <h2 className="mb-4 text-3xl italic font-serif font-semibold ">beloya<span className="text-orange-300">lit.com</span></h2>
        <ul className="space-y-2 flex-1 overflow-y-auto">
          {menuItems.map((item, i) => (
            <li key={i}>
              {item.subItems.length > 0 ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(i)}
                    className="w-full flex items-center p-2 rounded-lg hover:bg-gray-700"
                  >
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                    <FaAngleRight
                      className={`ml-auto transition-transform ${
                        submenuOpen[i] ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`pl-6 overflow-hidden transition-all duration-300 ${
                      submenuOpen[i] ? "h-auto opacity-100" : "h-0 opacity-0"
                    }`}
                  >
                    {item.subItems.map((sub, si) => (
                      <Link
                        key={si}
                        to={sub.path}
                        onClick={closeSidebar}
                        className={`block p-2 rounded-lg hover:bg-gray-700 ${
                          location.pathname === sub.path && "bg-gray-700"
                        }`}
                      >
                        {sub.icon}
                        <span className="ml-2">{sub.title}</span>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  to={item.path}
                  onClick={closeSidebar}
                  className={`flex items-center p-2 rounded-lg hover:bg-gray-700 ${
                    location.pathname === item.path && "bg-gray-700"
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
        
      </div>
       <button
          onClick={handleLogout}
          className="mt-4 flex items-center text-amber-50 p-2 rounded-lg bg-gray-700
           hover:bg-gray-600 cursor-pointer"
        >
          <MdOutlineLogin className="mr-2" />
          Se déconnecter
        </button>
      </div>
    </div>
  );
}

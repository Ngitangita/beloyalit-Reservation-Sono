import { useState, type JSX } from "react";
import {
  MdOutlineHome,
  MdOutlineLogin,
  MdMenu,
  MdLibraryBooks,
  MdCategory,
  MdAdminPanelSettings
} from "react-icons/md";
import { RiCloseLine } from "react-icons/ri";
import { FaAngleRight } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "~/stores/useAuthStore.js";
import type { MenuItem } from "~/types/types.js";

const menuItems: MenuItem[] = [
  {
    title: "Accueil",
    icon: <MdOutlineHome />,
    path: "/admin",
    subItems: [],
  },
  {
    title: "Admin Catalogues",
    icon: <MdLibraryBooks />,
    path: "/admin/admin-catalogues",
    subItems: [],
  },
  {
    title: "Admin Category",
    icon: <MdCategory />,
    path: "/admin/admin-category",
    subItems: [],
  },
  {
    title: "Admin Reservations",
    icon: <MdAdminPanelSettings size={24} />, 
    path: "/admin/admin-reservations",
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
      <div
        className={`
          fixed inset-y-0 left-0 text-white flex flex-col p-4 pt-7
          transform transition-transform duration-300 ease-in-out
          bg-gray-800 h-screen w-64 
          ${openSidebar ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:relative lg:block
        `}
      >
          <div className="flex flex-col items-center gap-2">
            <img
              src="/logo-blit.png"
              alt="Logo BlitSono"
              className="w-24 h-24 object-cover rounded-full"
            />
            <div className="text-center font-bold text-3xl leading-none flex flex-col italic font-serif">
              <span className="inline-block animate-revealText">
                beloya<span className="text-[#18769C]">lit </span>
              </span>
              <span className="text-xl inline-flex items-center justify-end gap-1 text-[#18769C]">
                <span className="block w-5 h-1 bg-white"></span>.com
              </span>
            </div>
          </div>

          <ul className="space-y-2 flex-1 overflow-y-auto mt-10">
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
        <button
          onClick={handleLogout}
          className=" flex items-center text-amber-50 p-2 rounded-lg bg-gray-700
           hover:bg-gray-600 cursor-pointer mt-10"
        >
          <MdOutlineLogin className="mr-2" />
          Se déconnecter
        </button>
      </div>
    </div>
  );
}

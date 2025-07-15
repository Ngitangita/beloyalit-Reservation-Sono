import { useState } from "react";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { MdLogin, MdMenu, MdClose } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "~/stores/useAuthStore";
import { useCartStore } from "~/stores/useCartStore";
import Search from "./Search";

type MenuItem = {
  title: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { title: "Accueil", path: "/" },
  { title: "Catalogue", path: "/catalogues" },
  { title: "Réservation de packs", path: "/reservation-pack" },
  { title: "Espace client", path: "/client" },
];

export default function Header(): JSX.Element {
  const isAuth = useAuthStore.use.isAuthenticated();
  const totalItems = useCartStore((s) => s.totalCount());
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const logout = () => {
    useAuthStore.getState().logout();
    navigate("/");
    setOpen(false);
  };
  const isActive = (p: string) => location.pathname === p;

  return (
    <header className="fixed top-0 w-full bg-[#1E2939] text-white z-50">
      <div className="flex justify-between items-center p-4 pr-10">
        <div className="flex flex-row items-center gap-2 cursor-pointer">
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

        <button className="sm:hidden text-2xl" onClick={() => setOpen(!open)}>
          {open ? <MdClose /> : <MdMenu />}
        </button>
        <div className="hidden sm:flex items-center gap-20">
          <nav className="flex">
            {menuItems.map(
              (item) =>
                (item.title !== "Espace client" || isAuth) && (
                  <Link key={item.path} to={item.path}>
                    <span
                      className={`relative inline-block group rounded-full transition duration-300 ease-in-out p-4 ${
                        isActive(item.path)
                          ? "font-semibold underline underline-offset-[5px] text-[#18769C]"
                          : "bg-base-200 text-white hover:text-[#18769C]"
                      }`}
                    >
                      {item.title}
                      {!isActive(item.path) && (
                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[2px] bg-[#18769C] mt-[5px]"></span>
                      )}
                    </span>
                  </Link>
                )
            )}
          </nav>
          <Search />
          <div className="flex gap-4">
            <Link to="/basket" className="relative">
              <FaShoppingCart className="text-2xl hover:text-[#18769C] transition duration-300 hover:scale-105" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to="/sign-in">
              <FaUser className="text-2xl hover:text-[#18769C] transition duration-300 hover:scale-105" />
            </Link>
            {isAuth && (
              <button onClick={logout} className="cursor-pointer">
                <MdLogin className="text-2xl hover:text-[#18769C] transition duration-300 hover:scale-105" />
              </button>
            )}
          </div>
        </div>
      </div>
      {open && (
        <div className="sm:hidden bg-[#1E2939] px-4 pb-4">
          <Search />
          <nav className="flex flex-col gap-2 mt-2">
            {menuItems.map(
              (item) =>
                (item.title !== "Espace client" || isAuth) && (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                  >
                    <span
                      className={`block px-4 py-2 rounded-full ${
                        isActive(item.path)
                          ? "font-semibold bg-gray-700"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      {item.title}
                    </span>
                  </Link>
                )
            )}
          </nav>
          <div className="flex gap-4 mt-4">
            <Link to="/basket" onClick={() => setOpen(false)}
            className="transition duration-300 hover:scale-105">
              <FaShoppingCart className="text-2xl" />
            </Link>
            <Link to="/sign-in" onClick={() => setOpen(false)} 
            className="transition duration-300 hover:scale-105">
              <FaUser className="text-2xl" />
            </Link>
            {isAuth && (
              <button onClick={logout} className="transition duration-300 hover:scale-105">
                <MdLogin className="text-2xl" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

import MenuCategorie from "./MenuCategorie";
import Search from "./Search";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "~/stores/useAuthStore";
import { MdLogin } from "react-icons/md";

const menuItems = [
  {
    title: "Accueil",
    path: "/",
  },
  {
    title: "Catalogue",
    path: "/catalogue",
  },
  {
    title: "Espace client",
    path: "/client",
  },
];

export default function Header() {
  const user = useAuthStore.use.user();
  const isAuthenticated = useAuthStore.use.isAuthenticated();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    useAuthStore.getState().logout();
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="w-full fixed top-0 z-50 bg-[#1E2939] text-white">
        <div className="flex flex-col gap-3 items-center p-4">
          <div className="text-center font-bold text-3xl leading-none flex flex-col items-end">
            <span>
              beloya
              <span className="text-orange-300 ">
                lit{" "}
              </span>
            </span>
            <span className="text-xl inline-flex items-center gap-1 text-orange-300">
              <span className="block w-5 h-1 bg-white"></span>
              .com
            </span>
          </div>

          <div className="w-full flex justify-between items-center text-slate-300">
            <Search />

            <div className="w-[900px] flex flex-row justify-around items-center">
              <nav className="flex gap-6 items-center">
                {menuItems.map(
                  (item, index) =>
                    (item.title !== "Espace client" || isAuthenticated) && (
                      <Link to={item.path} key={index}>
                        <span
                          className={`relative inline-block group px-4 py-2 rounded-full transition duration-300 ease-in-out
                          ${
                            isActive(item.path)
                              ? "font-semibold underline text-white underline-offset-[5px]"
                              : "bg-base-200 text-gray-400 hover:text-white"
                          }`}
                        >
                          {item.title}
                          {!isActive(item.path) && (
                            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[2px] bg-white mt-[5px]"></span>
                          )}
                        </span>
                      </Link>
                    )
                )}
              </nav>

              <ul className="flex gap-4 items-center">
                <li className="cursor-pointer hover:text-gray-400">
                  <Link
                    to="/cart"
                    className="flex items-center"
                    aria-label="Panier"
                  >
                    <FaShoppingCart className="text-3xl" />
                  </Link>
                </li>
                <li className="cursor-pointer hover:text-gray-400">
                  <Link
                    to="/sign-in"
                    className="flex items-center"
                    aria-label="Connexion"
                  >
                    <FaUser className="text-3xl" />
                  </Link>
                </li>
                {isAuthenticated && (
                  <li className="hover:text-gray-400">
                    <button
                      onClick={handleLogout}
                      className="text-3xl cursor-pointer mt-2"
                    >
                      <MdLogin />
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </header>
      <div className="pt-[120px]">
        <MenuCategorie />
      </div>
    </>
  );
}

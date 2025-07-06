import { Link } from "react-router-dom";
import type { MenuCategorie as CategoryType } from "~/types/types";
import { useRef, useState, useEffect } from "react";

interface Props {
  menuCategorie: CategoryType[];
  location: { pathname: string };
}

export default function MenuSlider({ menuCategorie, location }: Props) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const cont = carouselRef.current;
    if (!cont) return;

    const update = () => {
      setAtStart(cont.scrollLeft === 0);
      setAtEnd(cont.scrollLeft + cont.clientWidth >= cont.scrollWidth);
    };

    cont.addEventListener("scroll", update);
    update();
    return () => cont.removeEventListener("scroll", update);
  }, []);

  const scroll = (dir: "prev" | "next") => {
    const cont = carouselRef.current;
    if (!cont) return;
    const amount = cont.clientWidth * 0.8;
    cont.scrollBy({
      left: dir === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative flex items-center border-b border-gray-300 pl-7 pr-6">
      <div
        id="carousel"
        ref={carouselRef}
        className="overflow-x-auto whitespace-nowrap scroll-smooth pt-4 flex gap-5 pr-6 pl-4"
      >
        {menuCategorie.map((c, i) => {
          const active = location.pathname === c.path;
          return (
            <Link
              key={i}
              to={c.path}
              className="inline-block carousel-item"
            >
              <span
                className={`
                        relative inline-block group rounded-full transition duration-300 ease-in-out
                        ${
                        active
                            ? "font-semibold underline text-gray-700 underline-offset-[5px]"
                            : "bg-base-200 text-gray-600  hover:text-gray-900"
                        }          
                    `} >
                {c.title}

                {!active && (
                  <span
                    className="
                    block max-w-0 group-hover:max-w-full transition-all duration-500
                    h-[2px] bg-gray-800 mt-[5px]"
                  ></span>
                )}
              </span>
            </Link>
          );
        })}
      </div>

      <button
        onClick={() => scroll("prev")}
        disabled={atStart}
        className={`absolute left-[1px] top-7 text-3xl transform -translate-y-1/2 btn btn-circle btn-sm text-gray-500 
          hover:bg-gray-300 p-2  cursor-pointer${
            atStart ? "opacity-50 cursor-not-allowed" : ""
          }`}
      >
        ‹
      </button>

      <button
        onClick={() => scroll("next")}
        disabled={atEnd}
        className={`absolute right-[1px] top-7 transform -translate-y-1/2 btn btn-circle btn-sm text-gray-500 
          hover:bg-gray-300 cursor-pointer text-3xl p-2 ${
            atEnd ? "opacity-50 cursor-not-allowed" : ""
          }`}
      >
        ›
      </button>
    </div>
  );
}

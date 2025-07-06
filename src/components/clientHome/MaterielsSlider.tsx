import { Link } from "react-router-dom";
import type { MaterielType } from "~/types/types";
import { useRef, useState, useEffect } from "react";

interface Props {
  materiels: (MaterielType & { path: string })[];
}

export default function MaterielsSlider({ materiels }: Props) {
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
        className="overflow-x-auto whitespace-nowrap scroll-smooth pt-4 pb-4"
      >
        {materiels.map((materiel, i) => (
          <Link
            key={i}
            to={materiel.path}
            className="inline-block carousel-item w-64 mx-2"
          >
            <div
              className="rounded-lg p-4 shadow-md hover:scale-110 transition duration-300 
              ease-in-out bg-white hover:shadow-lg"
            >
              <img
                src={materiel.image_url}
                alt={materiel.nom}
                className="w-full h-32 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold text-lg text-gray-800">
                {materiel.nom}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 truncate">
                {materiel.description}
              </p>
              <p className="text-sm text-gray-700 mt-1">
                Prix : <strong>{materiel.prix_location}€</strong>
              </p>
            </div>
          </Link>
        ))}
      </div>

      <button
        onClick={() => scroll("prev")}
        disabled={atStart}
        className={`absolute left-[1px] text-7xl text-center cursor-pointer px-2 transform -translate-y-1/2 btn btn-circle btn-sm text-gray-300 
          hover:bg-gray-300 bg-gray-200 hover:text-gray-500 ${atStart ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        ‹
      </button>

      <button
        onClick={() => scroll("next")}
        disabled={atEnd}
        className={`absolute right-[2px] transform -translate-y-1/2 btn btn-circle btn-sm text-gray-300 
          hover:bg-gray-300 bg-gray-200 hover:text-gray-500 ${atEnd ? "opacity-50 cursor-not-allowed" : ""}
          text-7xl text-center cursor-pointer px-2`}
      >
        ›
      </button>
    </div>
  );
}

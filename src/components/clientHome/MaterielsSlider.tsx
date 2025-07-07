import { Link } from "react-router-dom";
import type { MaterielType } from "~/types/types";
import { useRef, useState, useEffect, useCallback } from "react";

interface Props {
  materiels: (MaterielType & { path: string })[];
  autoScrollIntervalMs?: number; 
}

export default function MaterielsSlider({
  materiels,
  autoScrollIntervalMs = 5000,
}: Props) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const cont = carouselRef.current;
    if (!cont) return;
    setAtStart(cont.scrollLeft === 0);
    setAtEnd(cont.scrollLeft + cont.clientWidth >= cont.scrollWidth - 1);
  }, []);
  
  useEffect(() => {
    const cont = carouselRef.current;
    if (!cont) return;
    cont.addEventListener("scroll", update);
    update();
    return () => cont.removeEventListener("scroll", update);
  }, [update]);

  const scrollByAmount = useCallback(
    (amount: number) => {
      const cont = carouselRef.current;
      if (!cont) return;
      cont.scrollBy({ left: amount, behavior: "smooth" });
    },
    []
  );

  const scroll = useCallback(
    (dir: "prev" | "next") => {
      const cont = carouselRef.current;
      if (!cont) return;
      const amount = cont.clientWidth * 0.8;
      scrollByAmount(dir === "next" ? amount : -amount);
    },
    [scrollByAmount]
  );

  useEffect(() => {
    const id = setInterval(() => {
      const cont = carouselRef.current;
      if (!cont) return;
      if (cont.scrollLeft + cont.clientWidth >= cont.scrollWidth) {
        scrollByAmount(-cont.scrollLeft);
      } else {
        scroll("next");
      }
    }, autoScrollIntervalMs);

    return () => clearInterval(id);
  }, [autoScrollIntervalMs, scroll, scrollByAmount]);

  return (
    <div className="relative flex items-center border-b border-gray-300 pl-7 pr-6">
      <div
       id="carousel"
        ref={carouselRef}
        className="overflow-x-auto whitespace-nowrap scroll-smooth pt-4 pb-4"
      >
        {materiels.map((m) => (
          <Link key={m.id} to={m.path} className="inline-block w-64 mx-2">
            <div className="rounded-lg p-4 shadow-md hover:scale-110 transition duration-300 ease-in-out bg-white hover:shadow-lg">
              <img
                src={m.image_url}
                alt={m.nom}
                className="w-full h-32 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold text-lg text-gray-800">
                {m.nom}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {m.description}
              </p>
              <p className="text-sm text-gray-700 mt-1">
                Prix : <strong>{m.prix_location}€</strong>
              </p>
            </div>
          </Link>
        ))}
      </div>

      <button
        onClick={() => scroll("prev")}
        disabled={atStart}
        className={`absolute cursor-pointer left-1 text-7xl text-center px-2 transform -translate-y-1/2 btn
           btn-circle btn-sm text-[#18769C]/50 hover:bg-[#1E2939] bg-[#F3F4F6] hover:text-[#18769C] ${
          atStart ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        ‹
      </button>

      <button
        onClick={() => scroll("next")}
        disabled={atEnd}
        className={`absolute cursor-pointer right-2 text-7xl text-center px-2 transform -translate-y-1/2 btn btn-circle btn-sm
           text-[#18769C]/50 hover:bg-[#1E2939] bg-[#F3F4F6] hover:text-[#18769C] ${
          atEnd ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        ›
      </button>
    </div>
  );
}

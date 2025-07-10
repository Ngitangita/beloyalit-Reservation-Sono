import { Link } from "react-router-dom";
import type { MaterielType } from "~/types/types";
import { useRef, useState, useEffect, useCallback } from "react";

type Props = {
  materiels: (MaterielType & { path: string })[];
  autoScrollIntervalMs?: number;
}

export default function MaterielsCategories({
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
    const c = carouselRef.current;
    if (!c) return;
    c.addEventListener("scroll", update);
    update();
    return () => c.removeEventListener("scroll", update);
  }, [update]);

  const scrollBy = useCallback((amt: number) => {
    carouselRef.current?.scrollBy({ left: amt, behavior: "smooth" });
  }, []);

  const scroll = useCallback(
    (dir: "prev" | "next") => {
      const cont = carouselRef.current;
      if (!cont) return;
      scrollBy(
        dir === "next" ? cont.clientWidth * 0.8 : -cont.clientWidth * 0.8
      );
    },
    [scrollBy]
  );

  useEffect(() => {
    const id = setInterval(() => {
      const cont = carouselRef.current;
      if (!cont) return;
      if (cont.scrollLeft + cont.clientWidth >= cont.scrollWidth - 1) {
        scrollBy(-cont.scrollLeft);
      } else {
        scroll("next");
      }
    }, autoScrollIntervalMs);
    return () => clearInterval(id);
  }, [autoScrollIntervalMs, scroll, scrollBy]);

  return (
    <div className="relative flex items-center border-b border-gray-300 pl-7 pr-6 pt-5">
      <div
        id="carousel"
        ref={carouselRef}
        className="overflow-x-auto whitespace-nowrap scroll-smooth pt-4 pb-4"
      >
        {materiels.map((m) => (
          <Link
            key={m.id}
            to={`/catalogues?cat=${m.id}`}
            className="inline-block w-64 mx-2"
          >
            <div className="rounded-lg p-4 shadow-md hover:scale-110 transition duration-300 ease-in-out bg-white hover:shadow-lg group">
              <img
                src={m.image_url}
                alt={m.nom}
                className="w-full h-32 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold text-lg text-gray-800 group-hover:text-[#18769C]">
                {m.nom}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 group-hover:text-[#18769C]">
                {m.description}
              </p>
              <p className="text-sm text-gray-700 mt-1 group-hover:text-[#18769C]">
                Prix : <strong>{m.prix_location}€</strong>
              </p>
            </div>
          </Link>
        ))}
      </div>
      <button
        onClick={() => scroll("prev")}
        disabled={atStart}
        className={`absolute cursor-pointer left-1 top-1/2 transform -translate-y-1/2 text-7xl px-2 btn btn-circle btn-sm text-[#18769C]/50 bg-[#F3F4F6] hover:bg-[#1E2939] hover:text-[#18769C] ${
          atStart ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        ‹
      </button>
      <button
        onClick={() => scroll("next")}
        disabled={atEnd}
        className={`absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 text-7xl px-2 btn btn-circle btn-sm text-[#18769C]/50 bg-[#F3F4F6] hover:bg-[#1E2939] hover:text-[#18769C] ${
          atEnd ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        ›
      </button>
    </div>
  );
}

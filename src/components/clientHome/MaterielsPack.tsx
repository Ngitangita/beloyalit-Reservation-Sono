import { Link } from "react-router-dom";
import type { MaterielType } from "~/types/types";
import { useRef, useState, useEffect, useCallback } from "react";
import { FaThumbsUp, FaHandPointRight } from "react-icons/fa";

type Props = {
  materiels: (MaterielType & { path: string })[];
  autoScrollIntervalMs?: number;
};

export default function MaterielsPack({
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
    <div className="flex flex-col">
      <div className="text-[#18769C] w-full flex flex-col gap-4 pl-30 pt-10 pr-30">
        <h1 className="text-3xl font-extrabold mb-4 flex items-center gap-3">
          <FaThumbsUp size={24} /> Nos packs sur mesure
        </h1>
        <p className=" text-lg text-start text-[#575756] flex items-center border-l-4 border-[#18769C] pl-4">
          Explorez nos différents packs thématiques :
          sonorisation, éclairage, DJ, studio, etc. Chaque pack est
          soigneusement pensé pour répondre à des besoins précis. Que vous soyez
          organisateur d'événement, artiste ou amateur passionné, vous trouverez
          ici des solutions prêtes à l'emploi.
        </p>
        <p className=' italic'>
           <FaHandPointRight size={24} className="inline mr-2 text-[#1E2939]" /> Visitez les fiches de chaque
          pack pour découvrir les détails, les équipements inclus, et choisir
          celui qui correspond le mieux à votre projet.
        </p>
      </div>
      <div className="relative flex items-center border-b border-gray-300 pl-7 pr-6 pt-5">
        <div
          id="carousel"
          ref={carouselRef}
          className="overflow-x-auto whitespace-nowrap scroll-smooth pt-4 pb-4"
        >
          {materiels.map((m) => (
            <Link
              key={m.id}
                to={`/pack-detail/${m.id}`}
              className="inline-block w-64 mx-2"
            >
              <div className="rounded-lg p-4 shadow-md hover:scale-110 transition duration-300 ease-in-out bg-white hover:shadow-lg group">
                <p className="text-sm text-gray-600 line-clamp-2 group-hover:text-[#18769C] truncate">
                  {m.description}
                </p>
                <h3 className="mt-2 font-semibold text-lg text-gray-800 group-hover:text-[#18769C]">
                  {m.nom}
                </h3>
                <p className="text-sm text-gray-700 mt-1 group-hover:text-[#18769C]">
                  Prix : <strong>{m.prix_location}</strong>
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
    </div>
  );
}

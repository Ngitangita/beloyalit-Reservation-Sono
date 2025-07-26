import { Link } from "react-router-dom";
import type { MaterielType } from "~/types/types";
import { FaThumbsUp, FaHandPointRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Props = {
  materiels: (MaterielType & { path: string })[];
  autoScrollIntervalMs?: number;
};

export default function Packs({
  materiels,
  autoScrollIntervalMs = 5000,
}: Props) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: autoScrollIntervalMs,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    nextArrow: (
      <div className="text-4xl sm:text-5xl p-1 sm:p-2 text-[#18769C]/50 bg-[#F3F4F6] hover:bg-[#1E2939] hover:text-[#18769C] rounded-full cursor-pointer z-10">
        ›
      </div>
    ),
    prevArrow: (
      <div className="text-4xl sm:text-5xl p-1 sm:p-2 text-[#18769C]/50 bg-[#F3F4F6] hover:bg-[#1E2939] hover:text-[#18769C] rounded-full cursor-pointer z-10">
        ‹
      </div>
    ),
  };

  return (
    <div className="px-8">
      <div className="text-[#18769C] w-full flex flex-col gap-4 pt-10">
        <h1 className="text-3xl font-extrabold mb-4 flex items-center gap-3">
          <FaThumbsUp size={24} /> Nos packs sur mesure
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-[#575756] flex items-center border-l-4 border-[#18769C] pl-4">
          Explorez nos différents packs thématiques : sonorisation, éclairage,
          DJ, studio, etc. Chaque pack est soigneusement pensé pour répondre à
          des besoins précis. Que vous soyez organisateur d'événement, artiste
          ou amateur passionné, vous trouverez ici des solutions prêtes à
          l'emploi.
        </p>
        <p className="italic text-sm sm:text-base">
          <FaHandPointRight size={20} className="inline mr-2 text-[#1E2939]" />
          Visitez les fiches de chaque pack pour découvrir les détails, les
          équipements inclus, et choisir celui qui correspond le mieux à votre
          projet.
        </p>
      </div>

      <div className="relative pt-5 pb-5">
        <Slider {...settings}>
          {materiels.map((m) => (
            <div key={m.id} className="px-2">
              <Link
                to={`/pack-detail/${m.id}`}
                className="block w-full h-full"
              >
                <div className="rounded-lg p-4 shadow-md hover:scale-105 transition duration-300 ease-in-out bg-white hover:shadow-lg group">
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
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import type { MaterielsType } from "~/types/types";
import { FaThumbsUp, FaHandPointRight } from "react-icons/fa";

const materiels: (MaterielsType & { path: string })[] = [
  {
    id: 1,
    nom: "Sonorisation",
    image_url: "/sonorisation.jpg",
  },
  {
    id: 2,
    nom: "Deejay",
    image_url: "/deejay.jpg",
  },
  {
    id: 3,
    nom: "Home studio",
    image_url: "/home-studio.jpeg",
  },
  {
    id: 4,
    nom: "Instruments de musique",
    image_url: "/instruments-des-musiques.jpeg",
  },
  {
    id: 5,
    nom: "HiFi & vidéo",
    image_url: "/hifi-video.jpeg",
  },
  {
    id: 6,
    nom: "Structure",
    image_url: "/structure.jpeg",
  },
  {
    id: 7,
    nom: "Flight case",
    image_url: "/flight-case.jpeg",
  },
  {
    id: 8,
    nom: "Microphones",
    image_url: "/microphones.jpeg",
  },
  {
    id: 9,
    nom: "Enceintes",
    image_url: "/enceinte.jpeg",
  },
  {
    id: 10,
    nom: "Consoles de mixage",
    image_url: "/console-de-mixage.jpeg",
  },
  {
    id: 11,
    nom: "Accessoires divers",
    image_url: "/accessoire-divers.jpeg",
  },
  {
    id: 12,
    nom: "Packs événementiels",
    image_url: "/pack-evenementiel.jpeg",
  },
];

export default function Materiels() {
  return (
    <div>
      <div className="text-[#18769C] w-full flex flex-col gap-4 pl-30 pt-10 pr-30">
        <h1 className="text-3xl font-extrabold mb-4 flex items-center gap-3">
          <FaThumbsUp size={24} /> Nos matériels adaptés à vos besoins
        </h1>
        <p className=" text-lg text-start text-[#575756] flex items-center border-l-4 border-[#18769C] pl-4">
          Découvrez notre large gamme de matériels spécialisés : sonorisation,
          éclairage, DJ, studio, et bien plus. Chaque équipement a été
          sélectionné avec soin pour répondre précisément à vos attentes. Que
          vous soyez organisateur, artiste ou passionné, vous trouverez ici des
          solutions fiables et performantes.
        </p>
        <p className=" italic">
          <FaHandPointRight size={24} className="inline mr-2 text-[#1E2939]" />
          Accédez aux détails de chaque matériel pour en connaître les
          spécificités et choisir ce qui vous correspond
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2 p-4">
        {materiels.slice(0, 9).map((m, i) => (
          <Link key={i} to={`/materiel/${m.id}`}>
            <div className="p-4 flex flex-col items-center gap-3 transform transition duration-300 hover:scale-110 group">
              <img
                src={m.image_url}
                alt={m.nom}
                className="w-40 h-24 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold text-lg text-gray-800 transition-colors duration-300 group-hover:text-[#18769C]">
                {m.nom}
              </h3>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-start mt-4 pl-20">
          <Link
            to="/catalogues"
            className="inline-block px-6 py-2 bg-[#18769C] text-white rounded hover:bg-[#145b76] transition"
          >
            Voir tous les matériels
          </Link>
        </div>
      <div className="text-[#1E2939] py-10 w-full flex flex-col pr-30 items-end">
        <p className="w-[700px] text-lg italic text-start flex items-start border-l-4 border-[#18769C] pl-4 gap-2">
          <FaThumbsUp size={90} className="relative bottom-10 text-[#18769C]" /> Blit Sono vous
          accompagne pour vos événements avec un service fiable et attentionné,
          en proposant des équipements son et lumière professionnels, un système
          de réservation simple et une équipe à l'écoute. Faites confiance à
          notre savoir-faire et réservez dès maintenant : transformez votre
          projet en une expérience sonore inoubliable !
        </p>
      </div>
    </div>
  );
}

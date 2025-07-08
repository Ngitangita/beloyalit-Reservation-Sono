import { Link } from "react-router-dom";
import type { MaterielsType } from "~/types/types";

const materiels: (MaterielsType & { path: string })[] = [
  {
    id: 1,
    nom: "Sonorisation",
    image_url: "/sonorisation.jpg",
    path: "/catalogues",
  },
  {
    id: 2,
    nom: "Deejay",
    image_url: "/deejay.jpg",
    path: "/catalogues",
  },
  {
    id: 3,
    nom: "Home studio",
    image_url: "/home-studio.jpeg",
    path: "/catalogue",
  },
  {
    id: 4,
    nom: "Instruments de musique",
    image_url: "/instruments-des-musiques.jpeg",
    path: "/catalogues",
  },
  {
    id: 5,
    nom: "HiFi & vidéo",
    image_url: "/hifi-video.jpeg",
    path: "/catalogues",
  },
  {
    id: 6,
    nom: "Structure",
    image_url: "/structure.jpeg",
    path: "/catalogues",
  },
  {
    id: 7,
    nom: "Flight case",
    image_url: "/flight-case.jpeg",
    path: "/catalogues",
  },
  {
    id: 8,
    nom: "Microphones",
    image_url: "/microphones.jpeg",
    path: "/catalogues",
  },
  {
    id: 9,
    nom: "Enceintes",
    image_url: "/enceinte.jpeg",
    path: "/catalogues",
  },
  {
    id: 10,
    nom: "Consoles de mixage",
    image_url: "/console-de-mixage.jpeg",
    path: "/catalogues",
  },
  {
    id: 11,
    nom: "Accessoires divers",
    image_url: "/accessoire-divers.jpeg",
    path: "/catalogues",
  },
  {
    id: 12,
    nom: "Packs événementiels",
    image_url: "/pack-evenementiel.jpeg",
    path: "/catalogues",
  },
];

export default function Materiels() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2 p-4">
      {materiels.map((m, i) => (
        <Link key={i} to={m.path}>
          <div className="p-4 flex flex-col items-center gap-3 transform transition duration-300 hover:scale-110 group">
            <img src={m.image_url} alt={m.nom} className="w-40 h-24 object-cover rounded" />
            <h3 className="mt-2 font-semibold text-lg text-gray-800 transition-colors duration-300 group-hover:text-[#18769C]">
              {m.nom}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

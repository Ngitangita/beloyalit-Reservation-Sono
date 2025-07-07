import { Link } from "react-router-dom";
import type { MaterielsType } from "~/types/types";

const materiels: (MaterielsType & { path: string })[] = [
  {
    id: 1,
    nom: "Sonorisation",
    image_url: "/sonorisation.jpg",
    path: "/catalogue",
  },
  {
    id: 2,
    nom: "Deejay",
    image_url: "/deejay.jpg",
    path: "/catalogue",
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
    path: "/catalogue",
  },
  {
    id: 5,
    nom: "HiFi & vidéo",
    image_url: "/hifi-video.jpeg",
    path: "/catalogue",
  },
  {
    id: 6,
    nom: "Structure",
    image_url: "/structure.jpeg",
    path: "/catalogue",
  },
  {
    id: 7,
    nom: "Flight case",
    image_url: "/flight-case.jpeg",
    path: "/catalogue",
  },
  {
    id: 8,
    nom: "Microphones",
    image_url: "/microphones.jpeg",
    path: "/catalogue",
  },
  {
    id: 9,
    nom: "Enceintes",
    image_url: "/enceinte.jpeg",
    path: "/catalogue",
  },
  {
    id: 10,
    nom: "Consoles de mixage",
    image_url: "/console-de-mixage.jpeg",
    path: "/catalogue",
  },
  {
    id: 11,
    nom: "Accessoires divers",
    image_url: "/accessoire-divers.jpeg",
    path: "/catalogue",
  },
  {
    id: 12,
    nom: "Packs événementiels",
    image_url: "/pack-evenementiel.jpeg",
    path: "/catalogue",
  },
];

function Materiels() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2 p-4">
      {materiels.map((materiel, i) => (
        <Link key={i} to={materiel.path}>
          <div className="p-4 flex flex-col items-center gap-3 transform transition duration-300 hover:scale-110 group">
            <img
              src={materiel.image_url}
              alt={materiel.nom}
              className="w-40 h-24 object-cover rounded"
            />
            <h3 className="mt-2 font-semibold text-lg text-gray-800 transition-colors duration-300 group-hover:text-[#18769C]">
              {materiel.nom}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Materiels;

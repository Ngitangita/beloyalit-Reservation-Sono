import { useLocation } from "react-router-dom";
import type { JSX } from "react";
import MaterielsCategories from "~/components/clientHome/MaterielsCategories";
import Materiels from "~/components/clientHome/Materiels";
import WelcomeBlitSono from "~/components/clientHome/WelcomeBlitSono";

const materiels: (MaterielType & { path: string })[] = [
  {
    id: 1,
    nom: "Sonorisation",
    description: "...",
    catégorie_id: 1,
    prix_location: 150.00,
    image_url: "/sonorisation.jpg",
    path: "/catalogues"
  },
  {
    id: 2,
    nom: "Deejay",
    description: "Matériel professionnel pour DJ : platines, contrôleurs, casques audio",
    catégorie_id: 2,
    prix_location: 120.00,
    image_url: "/deejay.jpg",
    path: "/catalogues"
  },
  {
    id: 3,
    nom: "Home studio",
    description: "Pack complet pour l'enregistrement à domicile (interface audio, micro, casque)",
    catégorie_id: 3,
    prix_location: 100.00,
    image_url: "/home-studio.jpeg",
    path: "/catalogues"
  },
  {
    id: 4,
    nom: "Instruments de musique",
    description: "Guitares, claviers, batteries et autres instruments acoustiques ou électroniques",
    catégorie_id: 4,
    prix_location: 80.00,
    image_url: "/instruments-des-musiques.jpeg",
    path: "/catalogues"
  },
  {
    id: 5,
    nom: "HiFi & vidéo",
    description: "Systèmes HiFi, lecteurs Blu-ray, vidéoprojecteurs, écrans",
    catégorie_id: 5,
    prix_location: 90.00,
     image_url: "/hifi-video.jpeg",
    path: "/catalogues"
  },
  {
    id: 6,
    nom: "Structure",
    description: "Structures métalliques pour montage de scènes, supports de lumière, tours",
    catégorie_id: 6,
    prix_location: 200.00,
    image_url: "/structure.jpeg",
    path: "/catalogues"
  },
  {
    id: 7,
    nom: "Flight case",
    description: "Caisses de transport renforcées pour protéger le matériel lors des déplacements",
    catégorie_id: 7,
    prix_location: 40.00,
    image_url: "/flight-case.jpeg",
    path: "/catalogues"
  },
  {
    id: 8,
    nom: "Microphones",
    description: "Microphones dynamiques, à condensateur, sans fil",
    catégorie_id: 8,
    prix_location: 30.00,
    image_url: "/microphones.jpeg",
    path: "/catalogues"
  },
  {
     id: 9,
    nom: "Enceintes",
    description: "Enceintes actives/passives pour sonorisation d'événements",
    catégorie_id: 9,
    prix_location: 75.00,
    image_url: "/enceinte.jpeg",
    path: "/catalogues",
  },
  {
    id: 10,
    nom: "Consoles de mixage",
    description: "Consoles de mixage audio pour DJ ou studio",
    catégorie_id: 10,
    prix_location: 95.00,
    image_url: "/console-de-mixage.jpeg",
    path: "/catalogues"
  },
  {
    id: 11,
    nom: "Accessoires divers",
    description: "Câbles, pieds de micro, supports d'enceintes et autres accessoires",
    catégorie_id: 11,
    prix_location: 20.00,
    image_url: "/accessoire-divers.jpeg",
    path: "/catalogues"
  },
  {
    id: 12,
    nom: "Packs événementiels",
    description: "Packs tout-en-un pour l'organisation d'événements (son, lumière, scène)",
    catégorie_id: 12,
    prix_location: 300.00,
    image_url: "/pack-evenementiel.jpeg",
    path: "/catalogues"
  },
];


 function HomePage(): JSX.Element {
  const location = useLocation();

  return (
    <div>
      <WelcomeBlitSono/>
      <MaterielsCategories materiels={materiels} location={location} />
      <Materiels />
    </div>
  );
}

export default HomePage;
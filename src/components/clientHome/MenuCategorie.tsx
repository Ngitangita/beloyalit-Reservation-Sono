import { useLocation } from "react-router-dom";
import type { JSX } from "react";
import type { MenuCategorie as CategoryType } from "~/types/types";
import MenuSlider from "./MenuSlider";

const menuCategorie: CategoryType[] = [
  { title: "Sonorisation", path: "/sonorisation" },
  { title: "Deejay", path: "/deejay" },
  { title: "Home studio", path: "/home-studio" },
  { title: "Instruments de musique", path: "/instruments_de_musique" },
  { title: "HiFi & vidéo", path: "/hiFi_&_vidéo" },
  { title: "Structure", path: "/structure" },
  { title: "Flight case", path: "/flight_case" },
  { title: "Microphones", path: "/microphones" },
  { title: "Enceintes", path: "/enceintes" },
  { title: "Consoles de mixage", path: "/consoles_de_mixage" },
  { title: "Accessoires divers", path: "/accessoires_divers" },
  { title: "Packs événementiels", path: "/packs_evenementiels" },
];

function MenuCategorie(): JSX.Element {
  const location = useLocation();

  return <MenuSlider menuCategorie={menuCategorie} location={location}/>;
}

export default MenuCategorie;

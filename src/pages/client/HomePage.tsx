import { useLocation } from "react-router-dom";
import type { JSX } from "react";
import Packs from "~/components/clientHome/Packs";
import Materiels from "~/components/clientHome/Materiels";
import WelcomeBlitSono from "~/components/clientHome/WelcomeBlitSono";

const materiels: (MaterielType & { path: string })[] = [
  {
    id: 1,
    nom: "Pack Mariage Classique",
    description: "Contient tout le nécessaire pour une sonorisation de mariage",
    prix_location: "250.000 Ar",
  },
  {
    id: 2,
    nom: "Pack DJ Débutant",
    description: "Le pack parfait pour commencer dans le mix",
    prix_location: "180.000 Ar",
  },
  {
    id: 3,
    nom: "Pack Lumière Événement",
    description: "Jeux de lumière pour animer vos soirées",
    prix_location: "120.000 Ar",
  },
  {
    id: 4,
    nom: "Pack Conférence Pro",
    description: "Matériel idéal pour conférences et présentations",
    prix_location: "150.000 Ar",
  },
  {
    id: 5,
    nom: "Pack Mariage Premium",
    description: "Pack complet haut de gamme avec éclairages et sono professionnels",
    prix_location: "500.000 Ar",
  },
  {
    id: 6,
    nom: "Pack Église",
    description: "Pour la sonorisation de cérémonies religieuses",
    prix_location: "180.000 Ar",
  },
  {
    id: 7,
    nom: "Pack Projection Vidéo",
    description: "Vidéoprojecteur, écran et sono légère pour projections",
    prix_location: "220.000 Ar",
  },
  {
    id: 8,
    nom: "Pack Lumière Scénique",
    description: "Éclairage de scène avec effets LED et contrôleur DMX",
    prix_location: "300.000 Ar",
  },
  {
    id: 9,
    nom: "Pack Soirée Privée",
    description: "Enceintes, lumières disco et micro pour petites fêtes",
    prix_location: "180.000 Ar",
  },
  {
    id: 10,
    nom: "Pack Formation",
    description: "Matériel de sonorisation pour formations en salle",
    prix_location: "170.000 Ar",
  },
  {
    id: 11,
    nom: "Pack Studio Débutant",
    description: "Interface audio, micro studio, casque et pieds micro",
    prix_location: "280.000 Ar",
  },
  {
    id: 12,
    nom: "Pack Extérieur",
    description: "Sono résistante pour événements en plein air",
    prix_location: "400.000 Ar",
  }
];



 function HomePage(): JSX.Element {
  const location = useLocation();

  return (
    <div>
        <title>Accueil | Blit Sono - Événements en musique</title>
      <WelcomeBlitSono/>
      <Packs materiels={materiels} location={location} />
      <Materiels />
    </div>
  );
}

export default HomePage;
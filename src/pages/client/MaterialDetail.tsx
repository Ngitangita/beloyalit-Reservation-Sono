
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCartStore } from "~/stores/useCartStore";
import type { MaterielsType } from "~/types/types";

const allMateriels: (MaterielsType & { prix: number; description: string })[] = [
 {
    id: 1,
    nom: "Sonorisation",
    image_url: "/sonorisation.jpg",
    prix: 100,
    description:
      "Système électroacoustique complet pour diffuser et amplifier le son (micros, table de mixage, amplis, enceintes), utilisé pour concerts, DJ ou PA :contentReference[oaicite:1]{index=1}",
  },
  {
    id: 2,
    nom: "Deejay",
    image_url: "/deejay.jpg",
    prix: 120,
    description:
      "Pack DJ professionnel : table de mixage, platines/contrôleur, casque, système audio pour mixer et animer événements :contentReference[oaicite:2]{index=2}",
  },
  {
    id: 3,
    nom: "Home studio",
    image_url: "/home-studio.jpeg",
    prix: 80,
    description:
      "Configuration d’enregistrement personnel : interface audio, micros, casque, moniteurs près du champ, adaptée aux projets domestiques.",
  },
  {
    id: 4,
    nom: "Instruments de musique",
    image_url: "/instruments-des-musiques.jpeg",
    prix: 150,
    description:
      "Instruments acoustiques ou électroniques (guitares, claviers, batteries…) pour pratique, répétition ou performance.",
  },
  {
    id: 5,
    nom: "HiFi & vidéo",
    image_url: "/hifi-video.jpeg",
    prix: 90,
    description:
      "Système audio-vidéo domestique : amplis, enceintes, platines ou lecteurs pour une expérience multimédia de qualité.",
  },
  {
    id: 6,
    nom: "Structure",
    image_url: "/structure.jpeg",
    prix: 200,
    description:
      "Structures modulaires (truss, portiques, stands) pour supports d’enceintes, éclairages, écrans en événementiel.",
  },
  {
    id: 7,
    nom: "Flight case",
    image_url: "/flight-case.jpeg",
    prix: 110,
    description:
      "Valises robustes en bois/aluminium renforcé, protégées par mousse, pour transporter en sécurité matériel musical ou audio.",
  },
  {
    id: 8,
    nom: "Microphones",
    image_url: "/microphones.jpeg",
    prix: 70,
    description:
      "Micros dynamiques ou à condensateur, souvent avec connecteur XLR, pour voix, instruments ou captation en live/studio :contentReference[oaicite:3]{index=3}",
  },
  {
    id: 9,
    nom: "Enceintes",
    image_url: "/enceinte.jpeg",
    prix: 130,
    description:
      "Haut‑parleurs amplifiés ou passifs conçus pour restituer le son avec clarté — essentiels en sono et HiFi :contentReference[oaicite:4]{index=4}",
  },
  {
    id: 10,
    nom: "Consoles de mixage",
    image_url: "/console-de-mixage.jpeg",
    prix: 180,
    description:
      "Tables de mixage audio permettant d’équilibrer plusieurs sources, appliquer effets, réguler niveaux et sorties audio.",
  },
  {
    id: 11,
    nom: "Accessoires divers",
    image_url: "/accessoire-divers.jpeg",
    prix: 50,
    description:
      "Câbles XLR/jack, adaptateurs, pupitres, pieds, câblage divers nécessaires en sono et scène :contentReference[oaicite:5]{index=5}",
  },
  {
    id: 12,
    nom: "Packs événementiels",
    image_url: "/pack-evenementiel.jpeg",
    prix: 160,
    description:
      "Kits tout‑en‑un : sono, table, micros, éclairages de base pour couvrir les besoins d’un événement clé-en-main.",
  },
];

export default function MaterialDetail() {
  const { id } = useParams<{ id: string }>();
  const mat = allMateriels.find(m => m.id === Number(id));
  const addToCart = useCartStore(s => s.addToCart);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setAdded(false);
  }, [id]);

  if (!mat) {
    return <div className="p-4">Matériel non trouvé.</div>;
  }

  const handleAdd = () => {
    addToCart({ id: mat.id, name: mat.nom, image_url: mat.image_url, price: mat.prix });
    setAdded(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={mat.image_url} alt={mat.nom} className="w-full md:w-1/2 rounded object-cover" />
        <div className="flex-1">
          <h1 className="text-3xl font-semibold mb-2">{mat.nom}</h1>
          <p className="text-xl text-[#18769C] font-bold mb-4">{mat.prix} €</p>
          <p className="mb-6">{mat.description}</p>
          <button
            onClick={handleAdd}
            className={`px-6 py-3 rounded cursor-pointer ${
              added ? "bg-green-500 hover:bg-green-600" : "bg-[#18769C] hover:bg-[#0f5a70]"
            } text-white transition duration-200`}
          >
            {added ? "Ajouté ✓" : "Ajouter au panier"}
          </button>
        </div>
      </div>
    </div>
  );
}

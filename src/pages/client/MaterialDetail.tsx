import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCartStore } from "~/stores/useCartStore";
import type { MaterielsType } from "~/types/types";
import { FaHeadphones, FaPhone, FaThumbsUp } from "react-icons/fa";

const allMateriels: MaterielsType [] = [
  {
    id: 1,
    productId: {
      id: 1,
      nom: "Enceinte JBL EON610",
      categoryId: { name: "Sonorisation" },
      image_url: "/sonorisation.jpg",
      prix: 100,
      stock_total: 50,
      stock_available: 30,
      description:
        "Système électroacoustique complet pour diffuser et amplifier le son (micros, table de mixage, amplis, enceintes), utilisé pour concerts, DJ ou PA.",
    },
  },
  {
    id: 2,
    productId: {
      id: 2,
      nom: "Deejay",
      categoryId: { name: "Animation" },
      image_url: "/deejay.jpg",
      prix: 120,
      stock_total: 20,
      stock_available: 12,
      description:
        "Pack DJ professionnel : table de mixage, platines/contrôleur, casque, système audio pour mixer et animer événements.",
    },
  },
  {
    id: 3,
    productId: {
      id: 3,
      nom: "Home studio",
      categoryId: { name: "Studio" },
      image_url: "/home-studio.jpeg",
      prix: 80,
      stock_total: 10,
      stock_available: 5,
      description:
        "Configuration d’enregistrement personnel : interface audio, micros, casque, moniteurs près du champ, adaptée aux projets domestiques.",
    },
  },
  {
    id: 4,
    productId: {
      id: 4,
      nom: "Instruments de musique",
      categoryId: { name: "Instrument" },
      image_url: "/instruments-des-musiques.jpeg",
      prix: 150,
      stock_total: 15,
      stock_available: 10,
      description:
        "Instruments acoustiques ou électroniques (guitares, claviers, batteries…) pour pratique, répétition ou performance.",
    },
  },
  {
    id: 5,
    productId: {
      id: 5,
      nom: "HiFi & vidéo",
      categoryId: { name: "Multimédia" },
      image_url: "/hifi-video.jpeg",
      prix: 90,
      stock_total: 18,
      stock_available: 12,
      description:
        "Système audio-vidéo domestique : amplis, enceintes, platines ou lecteurs pour une expérience multimédia de qualité.",
    },
  },
  {
    id: 6,
    productId: {
      id: 6,
      nom: "Structure",
      categoryId: { name: "Structure scène" },
      image_url: "/structure.jpeg",
      prix: 200,
      stock_total: 10,
      stock_available: 6,
      description:
        "Structures modulaires (truss, portiques, stands) pour supports d’enceintes, éclairages, écrans en événementiel.",
    },
  },
  {
    id: 7,
    productId: {
      id: 7,
      nom: "Flight case",
      categoryId: { name: "Transport" },
      image_url: "/flight-case.jpeg",
      prix: 110,
      stock_total: 30,
      stock_available: 25,
      description:
        "Valises robustes en bois/aluminium renforcé, protégées par mousse, pour transporter en sécurité matériel musical ou audio.",
    },
  },
  {
    id: 8,
    productId: {
      id: 8,
      nom: "Microphones",
      categoryId: { name: "Audio" },
      image_url: "/microphones.jpeg",
      prix: 70,
      stock_total: 40,
      stock_available: 30,
      description:
        "Micros dynamiques ou à condensateur, souvent avec connecteur XLR, pour voix, instruments ou captation en live/studio.",
    },
  },
  {
    id: 9,
    productId: {
      id: 9,
      nom: "Enceintes",
      categoryId: { name: "Sonorisation" },
      image_url: "/enceinte.jpeg",
      prix: 130,
      stock_total: 20,
      stock_available: 18,
      description:
        "Haut-parleurs amplifiés ou passifs conçus pour restituer le son avec clarté — essentiels en sono et HiFi.",
    },
  },
  {
    id: 10,
    productId: {
      id: 10,
      nom: "Consoles de mixage",
      categoryId: { name: "Mixage" },
      image_url: "/console-de-mixage.jpeg",
      prix: 180,
      stock_total: 12,
      stock_available: 8,
      description:
        "Tables de mixage audio permettant d'équilibrer plusieurs sources, appliquer effets, réguler niveaux et sorties audio.",
    },
  },
  {
    id: 11,
    productId: {
      id: 11,
      nom: "Accessoires divers",
      categoryId: { name: "Accessoires" },
      image_url: "/accessoire-divers.jpeg",
      prix: 50,
      stock_total: 100,
      stock_available: 80,
      description:
        "Câbles XLR/jack, adaptateurs, pupitres, pieds, câblage divers nécessaires en sono et scène.",
    },
  },
  {
    id: 12,
    productId: {
      id: 12,
      nom: "Packs événementiels",
      categoryId: { name: "Pack" },
      image_url: "/pack-evenementiel.jpeg",
      prix: 160,
      stock_total: 8,
      stock_available: 5,
      description:
        "Kits tout-en-un : sono, table, micros, éclairages de base pour couvrir les besoins d’un événement clé-en-main.",
    },
  },
];

export default function MaterialDetail() {
  const { id } = useParams<{ id: string }>();
  const mat = allMateriels.find((m) => m.id === Number(id));
  const addToCart = useCartStore((s) => s.addToCart);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setAdded(false);
  }, [id]);

  if (!mat) {
    return <div className="p-4">Matériel non trouvé.</div>;
  }

  const handleAdd = () => {
    addToCart({
      id: mat.productId.id,
      name: mat.productId.nom,
      image_url: mat.productId.image_url,
      price: mat.productId.prix,
    });
    setAdded(true);
  };

  return (
    <div>
      <title>Détail du matériel | Blit Sono</title>
      <section
        className="
    bg-cover bg-center bg-no-repeat
  "
        style={{ backgroundImage: `url(${mat.productId.image_url})` }}
      >
        <div
          className="bg-gradient-to-r from-[#1E2939]/85 via-[#1E2939]/65 to-[#1E2939]
         text-white py-10 w-full flex flex-col pl-30"
        >
          <p className="text-3xl font-extrabold mb-4 flex gap-1 items-center">
            <FaHeadphones className="text-4xl text-[#18769C]" />
            Détail du matériel : <strong>{mat.productId.nom}</strong>
            (catégorie : <em>{mat.productId.categoryId.name}</em>)
          </p>
          <p className="w-[800px] text-lg italic mb-6 text-start border-l-4 border-[#18769C] pl-4">
            Admirez cette pièce d'exception : design soigné et fonctionnalités
            premium, le tout à seulement
            <strong> {mat.productId.prix} Ar</strong>.
            Stock :  <strong> {mat.productId.stock_available} article </strong> disponible sur{" "}
             <strong>{mat.productId.stock_total} article </strong> au total. Un vrai atout pour vos
            événements !
          </p>
          <div className="space-x-4">
            <Link
              to="/catalogues"
              className="inline-flex items-center gap-2 bg-white text-[#18769C] font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              <FaHeadphones /> Explorer notre catalogue
            </Link>
            <Link
              to="https://www.facebook.com/blit.sono"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#145e7a] text-white px-6 py-3 rounded-lg hover:bg-[#0f4a63] transition"
            >
              <FaPhone /> Contactez-nous sur MP
            </Link>
          </div>
        </div>
      </section>
      <div className="w-full mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={mat.productId.image_url}
            alt={mat.productId.nom}
            className="w-full md:w-1/2 rounded object-cover"
          />
          <div className="flex-1">
            <div className="flex flex-row gap-7 items-center">
              <h1 className="text-3xl font-semibold mb-2">
                {mat.productId.nom}
              </h1>
              <Link
                to="/catalogues"
                className="text-[#18769C] hover:underline text-2xl"
              >
                ← Retour au catalogue
              </Link>
            </div>
            <p className="mb-6">{mat.productId.description}</p>
            <button
              onClick={handleAdd}
              className={`px-6 py-3 rounded cursor-pointer ${
                added
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-[#18769C] hover:bg-[#0f5a70]"
              } text-white transition duration-200`}
            >
              {added ? "Ajouté ✓" : "Ajouter au panier"}
            </button>
          </div>
        </div>
      </div>
      <div className="py-10 w-full flex flex-col pr-30 items-end">
        <p className="w-[500px] text-lg italic mb-6 text-start flex border-l-4 border-[#18769C] pl-4
        text-[#1E2939]">
          <FaThumbsUp className="mr-2 text-6xl text-[#18769C]" /> Merci de considérer{" "}
          {mat.productId.nom} avec BlitSono ! Nous sommes convaincus que ce
          matériel apportera professionnalisme et qualité à votre événement.
          Réservez en toute confiance !
        </p>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCartStore } from "~/stores/useCartStore";
import { FaHeadphones, FaPhone, FaThumbsUp } from "react-icons/fa";

// Types

type PackType = {
  id: number;
  name: string;
  description: string;
  price_override: number;
  image_url?: string;
};

type ProductType = {
  id: number;
  nom: string;
  categoryId?: { name: string };
  image_url: string;
  prix: number;
  stock_total: number;
  stock_available: number;
  description: string;
};

type PackItemsType = {
  pack: PackType;
  product: ProductType;
  quantite: number;
};

const allPackItems: PackItemsType[] = [
  {
    id: 1,
    packId: {
      id: 1,
      name: "Pack Mariage Classique",
      description:
        "Contient tout le nécessaire pour une sonorisation de mariage",
      price_override: 250000,
    },
    productId: {
      id: 1,
      nom: "Enceinte JBL EON610",
      categoryId: { name: "Sonorisation" },
      image_url: "/enceinte-JBL.jpeg",
      prix: 100,
      stock_total: 50,
      stock_available: 30,
      description:
        "Système électroacoustique complet pour diffuser et amplifier le son...",
    },
    quantite: 50,
  },
  {
    id: 2,
    packId: {
      id: 2,
      name: "Pack DJ Débutant",
      description: "Le pack parfait pour commencer dans le mix",
      price_override: 180000,
    },
    productId: {
      id: 2,
      nom: "Casque Audio Technica",
      categoryId: { name: "Accessoires" },
      image_url: "/casque-audio-technica.jpg",
      prix: 75,
      stock_total: 20,
      stock_available: 15,
      description: "Casque de monitoring fermé pour DJs...",
    },
    quantite: 10,
  },
  {
    id: 3,
    packId: {
      id: 3,
      name: "Pack Lumière Événement",
      description: "Jeux de lumière pour animer vos soirées",
      price_override: 120000,
    },
    productId: {
      id: 3,
      nom: "Lyre LED 60W",
      categoryId: { name: "Éclairage" },
      image_url: "/lyre-led.jpg",
      prix: 60,
      stock_total: 40,
      stock_available: 35,
      description: "Projecteur lyre motorisé RGBW 60W...",
    },
    quantite: 12,
  },
  {
    id: 4,
    packId: {
      id: 4,
      name: "Pack Conférence Pro",
      description: "Matériel idéal pour conférences et présentations",
      price_override: 150000,
    },
    productId: {
      id: 4,
      nom: "Micro Shure SM58",
      categoryId: { name: "Microphonie" },
      image_url: "/micro.jpg",
      prix: 90,
      stock_total: 60,
      stock_available: 40,
      description: "Micro cardioïde dynamique pour la voix...",
    },
    quantite: 8,
  },
  {
    id: 5,
    packId: {
      id: 5,
      name: "Pack Mariage Premium",
      description:
        "Pack complet haut de gamme avec éclairages et sono professionnels",
      price_override: 500000,
    },
    productId: {
      id: 5,
      nom: "Système Line Array",
      categoryId: { name: "Sonorisation" },
      image_url: "/line-array.jpg",
      prix: 300,
      stock_total: 10,
      stock_available: 6,
      description: "Système audio professionnel pour grands événements.",
    },
    quantite: 4,
  },
  {
    id: 6,
    packId: {
      id: 6,
      name: "Pack Église",
      description: "Pour la sonorisation de cérémonies religieuses",
      price_override: 180000,
    },
    productId: {
      id: 6,
      nom: "Micro col de cygne",
      categoryId: { name: "Microphonie" },
      image_url: "/col-cygne.jpg",
      prix: 65,
      stock_total: 25,
      stock_available: 18,
      description: "Micro discret pour pupitre ou autel.",
    },
    quantite: 6,
  },
  {
    id: 7,
    packId: {
      id: 7,
      name: "Pack Projection Vidéo",
      description: "Vidéoprojecteur, écran et sono légère pour projections",
      price_override: 220000,
    },
    productId: {
      id: 7,
      nom: "Vidéoprojecteur Epson HD",
      categoryId: { name: "Vidéo" },
      image_url: "/videoprojecteur.jpg",
      prix: 200,
      stock_total: 8,
      stock_available: 5,
      description:
        "Projecteur haute définition pour présentations et projections.",
    },
    quantite: 2,
  },
  {
    id: 8,
    packId: {
      id: 8,
      name: "Pack Lumière Scénique",
      description: "Éclairage de scène avec effets LED et contrôleur DMX",
      price_override: 300000,
    },
    productId: {
      id: 8,
      nom: "Barre LED DMX",
      categoryId: { name: "Éclairage" },
      image_url: "/barre-led.jpg",
      prix: 120,
      stock_total: 30,
      stock_available: 20,
      description: "Éclairage LED programmable pour scènes et spectacles.",
    },
    quantite: 5,
  },
  {
    id: 9,
    packId: {
      id: 9,
      name: "Pack Soirée Privée",
      description: "Enceintes, lumières disco et micro pour petites fêtes",
      price_override: 180000,
    },
    productId: {
      id: 9,
      nom: "Mini Pack Sono Bluetooth",
      categoryId: { name: "Sonorisation" },
      image_url: "/mini-sono.jpg",
      prix: 150,
      stock_total: 15,
      stock_available: 10,
      description: "Ensemble compact pour petites soirées entre amis.",
    },
    quantite: 3,
  },
  {
    id: 10,
    packId: {
      id: 10,
      name: "Pack Formation",
      description: "Matériel de sonorisation pour formations en salle",
      price_override: 170000,
    },
    productId: {
      id: 10,
      nom: "Système de conférence portable",
      categoryId: { name: "Conférence" },
      image_url: "/conference-pack.jpg",
      prix: 110,
      stock_total: 12,
      stock_available: 7,
      description: "Kit audio pour animateur/formateur + enceinte + micro.",
    },
    quantite: 2,
  },
  {
    id: 11,
    packId: {
      id: 11,
      name: "Pack Studio Débutant",
      description: "Interface audio, micro studio, casque et pieds micro",
      price_override: 280000,
    },
    productId: {
      id: 11,
      nom: "Kit d'enregistrement Focusrite",
      categoryId: { name: "Studio" },
      image_url: "/kit-studio.jpg",
      prix: 250,
      stock_total: 10,
      stock_available: 4,
      description: "Pack tout-en-un pour démarrer un home studio.",
    },
    quantite: 1,
  },
  {
    id: 12,
    packId: {
      id: 12,
      name: "Pack Extérieur",
      description: "Sono résistante pour événements en plein air",
      price_override: 400000,
    },
    productId: {
      id: 12,
      nom: "Enceinte étanche Outdoor",
      categoryId: { name: "Sonorisation" },
      image_url: "/outdoor-speaker.jpg",
      prix: 300,
      stock_total: 6,
      stock_available: 4,
      description: "Matériel robuste pour conditions extérieures.",
    },
    quantite: 2,
  },
];

export default function PackDetail() {
  const { id } = useParams<{ id: string }>();
  const packItem = allPackItems.find((p) => p.packId.id === Number(id));
  const addToCart = useCartStore((s) => s.addToCart);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setAdded(false);
  }, [id]);

  if (!packItem) {
    return <div className="p-4">Pack non trouvé.</div>;
  }

  const handleAdd = () => {
    addToCart({
      id: packItem.packId.id,
      name: packItem.packId.name,
      price: packItem.pack.price_override,
    });
    setAdded(true);
  };

  return (
    <div>
      <title>Détail du pack | Blit Sono</title>
      <section
        className="bg-cover bg-center bg-no-repeat bgImagePack"
      >
        <div
          className="bg-gradient-to-r from-[#1E2939]/85 via-[#1E2939]/65 to-[#1E2939]
         text-white py-10 px-6 pl-16"
        >
          <h1 className="text-3xl font-extrabold mb-4 flex gap-2 items-center">
            <FaHeadphones className="text-4xl text-[#18769C]" />
            Détail du {packItem.packId.name}
          </h1>
          <p className="text-lg italic border-l-4 border-[#18769C] pl-4">
            {packItem.packId.description} -{" "}
            <strong>{packItem.packId.price_override} Ar</strong> pour{" "}
            <strong> {packItem.quantite} article{packItem.quantite > 1 ? "s" : ""}</strong>
          </p>

          <div className="mt-6 flex gap-4">
            <Link
               to="/reservation-pack"
              className="bg-white text-[#18769C] font-semibold flex flex-row items-center gap-3
               p-3 rounded-lg hover:bg-gray-100"
            >
              <FaHeadphones /> Voir tous les packs
            </Link>
            <Link
              to="https://www.facebook.com/blit.sono"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#145e7a] text-white p-3 rounded-lg hover:bg-[#0f4a63]
              flex flex-row items-center gap-3"
            >
              <FaPhone /> Contactez-nous sur MP
            </Link>
          </div>
        </div>
      </section>

      <section className="p-6">
        <div className="flex justify-end gap-4 mb-4">
          <Link
            to="/reservation-pack"
            className="text-[#18769C] hover:underline text-lg"
          >
            ← Retour aux packs
          </Link>
          <button
            onClick={handleAdd}
            className={`px-6 py-3 rounded text-white transition duration-200 ${
              added
                ? "bg-green-500 hover:bg-green-600"
                : "bg-[#18769C] hover:bg-[#0f5a70]"
            }`}
          >
            {added ? "Ajouté \u2713" : "Ajouter au panier"}
          </button>
        </div>

        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Matériel",
                "Prix",
                "Stock total",
                "Stock dispo",
                "category",
                "Description",
              ].map((header) => (
                <th key={header} className="p-3 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allPackItems
              .filter((item) => item.packId.id === Number(id))
              .map((item, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={item.productId.image_url}
                      alt={item.productId.nom}
                      className="w-12 h-12 object-cover rounded"
                    />
                    {item.productId.nom}
                  </td>
                  <td className="p-3">{item.productId.prix} Ar</td>
                  <td className="p-3">{item.productId.stock_total}</td>
                  <td className="p-3">{item.productId.stock_available}</td>
                  <td className="p-3">{item.productId.categoryId.name}</td>
                  <td className="p-3">{item.productId.description}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
      <div className=" text-[#1E2939] py-10 px-6 text-right">
        <p className="w-full md:w-[600px] text-left ml-auto text-lg italic border-l-4 border-[#18769C] pl-4">
          <FaThumbsUp className="inline-block mr-2 text-2xl align-middl text-[#18769C]" />
          Merci de considérer le <strong className="text-[#18769C]">{packItem.packId.name}</strong> avec
          BlitSono ! Ce pack est conçu pour offrir une solution complète et de
          qualité. Réservez-le maintenant !
        </p>
      </div>
    </div>
  );
}

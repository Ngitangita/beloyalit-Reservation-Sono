import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCartStore } from "~/stores/useCartStore";
import { FaHeadphones, FaPhone, FaThumbsUp } from "react-icons/fa";

type PackType = { id: number; name: string; description: string; price_override: number; };
type ProductType = {
  id: number; nom: string; categoryId?: { name: string }; image_url: string;
  prix: number; stock_total: number; stock_available: number; description: string;
};
type PackItemsType = { id: number; packId: PackType; productId: ProductType; quantite: number; };

const allPackItems: PackItemsType[] = [
 // Pack 1 : Mariage Classique avec 3 matériels
  {
    id: 1,
    packId: {
      id: 1,
      name: "Pack Mariage Classique",
      description: "Contient tout le nécessaire pour une sonorisation de mariage",
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
      description: "Système électroacoustique complet pour diffuser et amplifier le son...",
    },
    quantite: 2,
  },
  {
    id: 2,
    packId: {
      id: 1,
      name: "Pack Mariage Classique",
      description: "Le pack parfait pour commencer dans le mix",
      price_override: 250000,
    },
    productId: {
      id: 13,
      nom: "Micro Shure SM58",
      categoryId: { name: "Microphonie" },
      image_url: "/micro.jpg",
      prix: 90,
      stock_total: 60,
      stock_available: 40,
      description: "Casque de monitoring fermé pour DJs...",
    },
    quantite: 4,
  },
  {
    id: 3,
    packId: {
      id: 1,
      name: "Pack Mariage Classique",
      description: "Jeux de lumière pour animer vos soirées",
      price_override: 250000,
    },
    productId: {
      id: 14,
      nom: "Lyre LED 60W",
      categoryId: { name: "Éclairage" },
      image_url: "/lyre-led.jpg",
      prix: 60,
      stock_total: 40,
      stock_available: 35,
      description: "Projecteur lyre motorisé RGBW 60W...",
    },
    quantite: 3,
  },

  // Pack 2 : DJ Débutant avec 3 matériels
  {
    id: 4,
    packId: {
      id: 2,
      name: "Pack DJ Débutant",
      description: "Matériel idéal pour conférences et présentations",
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
      description: "Micro cardioïde dynamique pour la voix...",
    },
    quantite: 1,
  },
  {
    id: 5,
    packId: {
      id: 2,
      name: "Pack DJ Débutant",
      description: "Pack complet haut de gamme avec éclairages et sono professionnels",
      price_override: 180000,
    },
    productId: {
      id: 15,
      nom: "Contrôleur Pioneer DDJ-200",
      categoryId: { name: "DJ" },
      image_url: "/ddj-200.jpg",
      prix: 150,
      stock_total: 10,
      stock_available: 8,
      description: "Système audio professionnel pour grands événements.",
    },
    quantite: 1,
  },
  {
    id: 6,
    packId: {
      id: 2,
      name: "Pack DJ Débutant",
      description: "Pour la sonorisation de cérémonies religieuses",
      price_override: 180000,
    },
    productId: {
      id: 16,
      nom: "Micro Behringer XM8500",
      categoryId: { name: "Microphonie" },
      image_url: "/behringer-xm8500.jpg",
      prix: 40,
      stock_total: 25,
      stock_available: 20,
      description: "Micro discret pour pupitre ou autel.",
    },
    quantite: 1,
  },


  // Pack 3 : Lumière Événement avec 3 matériels
  {
    id: 7,
    packId: {
      id: 3,
      name: "Pack Lumière Événement",
      description: "...",
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
      description: "...",
    },
    quantite: 2,
  },
  {
    id: 8,
    packId: {
      id: 3,
      name: "Pack Lumière Événement",
      description: "...",
      price_override: 120000,
    },
    productId: {
      id: 17,
      nom: "Barre LED DMX",
      categoryId: { name: "Éclairage" },
      image_url: "/barre-led.jpg",
      prix: 120,
      stock_total: 30,
      stock_available: 20,
      description: "...",
    },
    quantite: 1,
  },
  {
    id: 9,
    packId: {
      id: 3,
      name: "Pack Lumière Événement",
      description: "...",
      price_override: 120000,
    },
    productId: {
      id: 18,
      nom: "Effet stroboscope LED",
      categoryId: { name: "Éclairage" },
      image_url: "/strobe-led.jpg",
      prix: 80,
      stock_total: 15,
      stock_available: 10,
      description: "...",
    },
    quantite: 1,
  },

  // Pack 4 : Conférence Pro
  {
    id: 10,
    packId: {
      id: 4,
      name: "Pack Conférence Pro",
      description: "...",
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
      description: "...",
    },
    quantite: 3,
  },
  {
    id: 11,
    packId: {
      id: 4,
      name: "Pack Conférence Pro",
      description: "...",
      price_override: 150000,
    },
    productId: {
      id: 19,
      nom: "Projecteur Epson HD",
      categoryId: { name: "Vidéo" },
      image_url: "/videoprojecteur.jpg",
      prix: 200,
      stock_total: 8,
      stock_available: 5,
      description: "...",
    },
    quantite: 1,
  },
  {
    id: 12,
    packId: {
      id: 4,
      name: "Pack Conférence Pro",
      description: "...",
      price_override: 150000,
    },
    productId: {
      id: 20,
      nom: "Barre LED DMX",
      categoryId: { name: "Éclairage" },
      image_url: "/barre-led.jpg",
      prix: 120,
      stock_total: 30,
      stock_available: 20,
      description: "...",
    },
    quantite: 2,
  },

  // Pack 5 : Mariage Premium
  {
    id: 13,
    packId: {
      id: 5,
      name: "Pack Mariage Premium",
      description: "...",
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
      description: "...",
    },
    quantite: 2,
  },
  {
    id: 14,
    packId: {
      id: 5,
      name: "Pack Mariage Premium",
      description: "...",
      price_override: 500000,
    },
    productId: {
      id: 3,
      nom: "Lyre LED 60W",
      categoryId: { name: "Éclairage" },
      image_url: "/lyre-led.jpg",
      prix: 60,
      stock_total: 40,
      stock_available: 35,
      description: "...",
    },
    quantite: 4,
  },
  {
    id: 15,
    packId: {
      id: 5,
      name: "Pack Mariage Premium",
      description: "...",
      price_override: 500000,
    },
    productId: {
      id: 21,
      nom: "Micro col de cygne",
      categoryId: { name: "Microphonie" },
      image_url: "/col-cygne.jpg",
      prix: 65,
      stock_total: 25,
      stock_available: 18,
      description: "...",
    },
    quantite: 3,
  },

  // Pack 6 : Église
  {
    id: 16,
    packId: {
      id: 6,
      name: "Pack Église",
      description: "...",
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
      description: "...",
    },
    quantite: 2,
  },
  {
    id: 17,
    packId: {
      id: 6,
      name: "Pack Église",
      description: "...",
      price_override: 180000,
    },
    productId: {
      id: 22,
      nom: "Enceinte JBL EON610",
      categoryId: { name: "Sonorisation" },
      image_url: "/enceinte-JBL.jpeg",
      prix: 100,
      stock_total: 50,
      stock_available: 30,
      description: "...",
    },
    quantite: 1,
  },
  {
    id: 18,
    packId: {
      id: 6,
      name: "Pack Église",
      description: "...",
      price_override: 180000,
    },
    productId: {
      id: 23,
      nom: "Barre LED DMX",
      categoryId: { name: "Éclairage" },
      image_url: "/barre-led.jpg",
      prix: 120,
      stock_total: 30,
      stock_available: 20,
      description: "...",
    },
    quantite: 1,
  },
];

export default function PackDetail() {
  const { id } = useParams<{ id: string }>();
  const packIdNum = Number(id);
  const packItems = allPackItems.filter((i) => i.packId.id === packIdNum);
  const packInfo = packItems[0]?.packId;
  const addToCart = useCartStore((s) => s.addToCart);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setAdded(false);
  }, [packIdNum]);

  if (!packInfo) return <div className="p-4">Pack non trouvé.</div>;

  const handleAdd = () => {
    packItems.forEach((item) =>
      addToCart({
        id: item.productId.id,
        name: item.productId.nom,
        image_url: item.productId.image_url,
        price: item.productId.prix,
      })
    );
    setAdded(true);
  };

  return (
    <div>
      <section className="bgCover bg-center bg-no-repeat bgImagePack">
        <div className="bg-gradient-to-r from-[#1E2939]/85 via-[#1E2939]/65 to-[#1E2939] text-white py-10 px-6 pl-16">
          <h1 className="text-3xl font-extrabold flex items-center gap-2">
            <FaHeadphones className="text-4xl text-[#18769C]" />
            Détail du {packInfo.name}
          </h1>
          <p className="text-lg italic border-l-4 border-[#18769C] pl-4">
            {packInfo.description}<br />
            <strong>{packInfo.price_override} Ar</strong>
          </p>
          <div className="mt-6 flex gap-4">
            <Link to="/reservation-pack" className="bg-white text-[#18769C] font-semibold flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
              <FaHeadphones /> Voir tous les packs
            </Link>
            <Link to="https://www.facebook.com/blit.sono" target="_blank" rel="noopener noreferrer"
              className="bg-[#145e7a] text-white p-3 rounded-lg hover:bg-[#0f4a63] flex items-center gap-3">
              <FaPhone /> Contactez-nous sur MP
            </Link>
          </div>
        </div>
      </section>

      <section className="p-6">
        <div className="flex justify-end gap-4 mb-4">
          <Link to="/reservation-pack" className="text-[#18769C] hover:underline text-lg">← Retour aux packs</Link>
          <button
            onClick={handleAdd}
            className={`px-6 py-3 rounded text-white transition duration-200 ${
              added ? "bg-green-500 hover:bg-green-600" : "bg-[#18769C] hover:bg-[#0f5a70]"
            }`}
          >
            {added ? "Ajouté ✓" : "Ajouter au panier"}
          </button>
        </div>

        {/* Ici, plus de slider, uniquement le tableau */}
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              {["Matériel", "Prix", "Stock total", "Stock dispo", "Catégorie", "Description", "Quantité"].map(h => (
                <th key={h} className="p-3 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {packItems.map(item => (
              <tr key={item.id} className="even:bg-gray-50">
                <td className="p-3 flex items-center gap-3">
                  <img src={item.productId.image_url} alt={item.productId.nom} className="w-12 h-12 object-cover rounded" />
                  {item.productId.nom}
                </td>
                <td className="p-3">{item.productId.prix} Ar</td>
                <td className="p-3">{item.productId.stock_total}</td>
                <td className="p-3">{item.productId.stock_available}</td>
                <td className="p-3">{item.productId.categoryId?.name}</td>
                <td className="p-3">{item.productId.description}</td>
                <td className="p-3">{item.quantite}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="text-[#1E2939] py-10 px-6">
        <p className="w-full md:w-[600px] ml-auto text-lg italic border-l-4 border-[#18769C] pl-4">
          <FaThumbsUp className="inline-block mr-2 text-2xl text-[#18769C]" />
          Merci de considérer le <strong className="text-[#18769C]">{packInfo.name}</strong> avec BlitSono !
        </p>
      </div>
    </div>
  );
}

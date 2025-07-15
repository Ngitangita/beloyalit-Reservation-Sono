import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import FiltersPacks from "~/components/clientHome/FiltersPacks";
import ScrollDownButton from "~/components/clientHome/ScrollDownButton";
import { useCartStore } from "~/stores/useCartStore";
import { FaShoppingCart, FaHeadphones, FaPhone, FaThumbsUp } from "react-icons/fa";

type PackType = {
  id: number;
  name: string;
  description: string;
  price_override: number;
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
  packId: PackType;
  productId: ProductType;
  quantite: number;
};

const allPackItems: PackItemsType[] = [
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
    quantite: 50
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
    quantite: 10
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
    quantite: 12
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
    quantite: 8
  },
  {
    id: 5,
    packId: {
      id: 5,
      name: "Pack Mariage Premium",
      description: "Pack complet haut de gamme avec éclairages et sono professionnels",
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
    quantite: 4
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
    quantite: 6
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
      description: "Projecteur haute définition pour présentations et projections.",
    },
    quantite: 2
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
    quantite: 5
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
    quantite: 3
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
    quantite: 2
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
    quantite: 1
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
    quantite: 2
  }]

export default function ReservationPacks() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q")?.toLowerCase() || "";
  const cat = searchParams.get("cat") || "";
  const [isGrid, setIsGrid] = useState(true);
  const [selectedPrices, setSelectedPrices] = useState<typeof priceRanges>([]);
  const [selectedPacks, setSelectedPacks] = useState<string[]>([]);
  const [initializedPack, setInitializedPack] = useState(false);
  const [filtered, setFiltered] = useState<PackItemsType[]>(allPackItems);

  const addToCart = useCartStore((s) => s.addToCart);
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());

  const packNames = Array.from(new Set(allPackItems.map((m) => m.packId.name)));

  useEffect(() => {
    if (!initializedPack && cat) {
      const found = allPackItems.find((m) => m.packId.name === cat);
      if (found) setSelectedPacks([found.packId.name]);
      setInitializedPack(true);
    }
  }, [cat, initializedPack]);

  useEffect(() => {
    let res = allPackItems;

    if (q) {
      res = res.filter((item) => item.packId.name.toLowerCase().includes(q));
    }

    if (selectedPacks.length > 0) {
      res = res.filter((item) => selectedPacks.includes(item.packId.name));
    }

    if (selectedPrices.length > 0) {
      res = res.filter((item) =>
        selectedPrices.some((pr) => item.productId.prix >= pr.min && item.productId.prix < pr.max)
      );
    }

    setFiltered(res);
  }, [q, selectedPacks, selectedPrices]);

  const toggleAdded = (id: number, item: PackItemsType) => {
    addToCart({
      id: item.packId.id,
      name: item.packId.name,
      image_url: item.productId.image_url,
      price: item.productId.prix,
    });
    setAddedIds((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setAddedIds((prev) => {
        const clone = new Set(prev);
        clone.delete(id);
        return clone;
      });
    }, 2000);
  };

  return (
    <div>
      <title>Réservation Pack | Blit Sono - Son & Lumière</title>

      <section className="bgImagePack">
        <div className="bg-gradient-to-r from-[#1E2939]/85 via-[#1E2939]/65 to-[#1E2939] text-white py-16 w-full flex flex-col pl-30">
          <h1 className="text-3xl font-extrabold mb-4 flex gap-1 w-[800px]">
            <FaHeadphones className="text-7xl text-[#18769C]" />
            Réservez votre pack Blit Sono - la solution idéale pour un événement réussi.
          </h1>
          <p className="w-[500px] text-lg italic mb-6 text-start flex items-center border-l-4 border-[#18769C] pl-4">
            Notre équipe vous conseille avec attention pour vous aider à choisir le pack parfait.
          </p>
          <div className="space-x-4">
            <ScrollDownButton />
            <a
              href="https://www.facebook.com/blit.sono"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#145e7a] text-white px-6 py-3 rounded-lg hover:bg-[#0f4a63] transition"
            >
              <FaPhone /> Contactez-nous en MP
            </a>
          </div>
        </div>
      </section>

      <div className="flex md:flex-row gap-6 p-4">
        <FiltersPacks
  packNames={packNames}
  selectedPacks={selectedPacks}
  onPacksChange={setSelectedPacks}
  selectedPrices={selectedPrices}
  onPricesChange={setSelectedPrices}
  resetAll={() => {
    setSelectedPacks([]);
    setSelectedPrices([]);
  }}
/>


        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <div className="text-[#575756]">
              <button
                onClick={() => setIsGrid(true)}
                className={`px-3 py-1 rounded cursor-pointer ${
                  isGrid ? "bg-[#18769C] text-white" : "bg-gray-200"
                }`}
              >
                🟦 Carte
              </button>
              <button
                onClick={() => setIsGrid(false)}
                className={`px-3 py-1 ml-2 rounded cursor-pointer ${
                  !isGrid ? "bg-[#18769C] text-white" : "bg-gray-200"
                }`}
              >
                📋 Liste
              </button>
            </div>
            {q && (
              <div className="text-sm italic text-gray-600">
                Résultats pour : <strong>"{q}"</strong>
              </div>
            )}
          </div>

          <div
            className={`text-[#575756] ${
              isGrid
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
                : "grid xl:grid-cols-2 gap-6"
            }`}
          >
            {filtered.length === 0 ? (
              <p>Aucun pack correspondant trouvé.</p>
            ) : (
              filtered.map((m, index) => (
                <div
                  key={index}
                  className={`group transition duration-300 rounded p-3 relative ${
                    isGrid ? "flex flex-col items-center hover:scale-105" : "flex items-center gap-4 hover:bg-gray-100"
                  }`}
                >
                  <img
                    src={m.productId.image_url}
                    alt={m.productId.nom}
                    className={`rounded object-cover ${isGrid ? "w-40 h-24" : "w-20 h-14"}`}
                  />
                  <h3 className={`font-semibold text-[#1E2939] ${isGrid ? "mt-3 text-left" : ""} group-hover:text-[#18769C]`}>
                    {m.packId.name}
                  </h3>
                  <p>
                    Prix: <strong>{m.packId.price_override}</strong> Ar
                  </p>
                  <p>
                    Qtt: <strong>{m.quantite}</strong> article{m.quantite > 1 ? "s" : ""}
                  </p>
                  <p className={`text-sm text-gray-500 ${isGrid ? "text-left" : "hidden md:block"}`}>
                    {m.packId.description}
                  </p>
                  <div className={`mt-2 flex items-center gap-1 ${
                    isGrid
                      ? "absolute left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                      : "ml-auto"
                  }`}>
                    <Link
                      to={`/pack-detail/${m.packId.id}`}
                      className="w-[90px] border border-[#18769C] text-[#18769C] bg-white p-1.5 rounded-l-full hover:bg-[#18769C] hover:text-white text-sm flex justify-center"
                    >
                      Détail
                    </Link>
                    <button
                      onClick={() => toggleAdded(m.packId.id, m)}
                      className={`p-2 pr-3 rounded-r-full cursor-pointer ${
                        addedIds.has(m.packId.id) ? "bg-green-500 hover:bg-green-600" : "bg-[#18769C] hover:bg-[#0f5a70]"
                      } text-white transition duration-200`}
                    >
                      {addedIds.has(m.packId.id) ? "✓" : <FaShoppingCart className="text-lg" />}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="text-[#18769C] py-10 w-full flex flex-col pr-30 items-end">
        <h1 className="text-3xl font-extrabold mb-4 flex items-center gap-1 w-[700px]">
          <FaThumbsUp size={24} /> Merci d'avoir consulté nos packs à réserver !
        </h1>
        <p className="w-[700px] text-lg italic text-start flex items-center border-l-4 border-[#18769C] pl-4">
          Chaque pack est conçu pour répondre à vos besoins événementiels. Faites confiance à 
          notre équipe pour vous orienter dans votre réservation et garantir la réussite de 
          votre projet.
        </p>
      </div>
    </div>
  );
}

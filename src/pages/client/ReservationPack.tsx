import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import FiltersPacks, {
  priceRanges,
} from "~/components/clientHome/FiltersPacks";
import ScrollDownButton from "~/components/clientHome/ScrollDownButton";
import { useCartStore } from "~/stores/useCartStore";
import Slider from "react-slick";
import {
  FaShoppingCart,
  FaHeadphones,
  FaPhone,
  FaThumbsUp,
} from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  id: number;
  packId: PackType;
  productId: ProductType;
  quantite: number;
};

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
      description: "Vidéoprojecteur, écran et sono légère pour projections",
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
      image_url: "/micro.jpeg",
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
      description: "Éclairage de scène avec effets LED et contrôleur DMX",
      price_override: 150000,
    },
    productId: {
      id: 20,
      nom: "Barre LED DMX",
      categoryId: { name: "Éclairage" },
      image_url: "/barre-led.jpeg",
      prix: 120,
      stock_total: 30,
      stock_available: 20,
      description: "Éclairage de scène avec effets LED et contrôleur DMX",
    },
    quantite: 2,
  },

  // Pack 5 : Mariage Premium
  {
    id: 13,
    packId: {
      id: 5,
      name: "Pack Mariage Premium",
      description: "Projecteur haute définition pour présentations et projections.",
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
      description: "Éclairage de scène avec effets LED et contrôleur DMX",
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
      image_url: "/col-cygne.jpeg",
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
      image_url: "/barre-led-dmx.jpg",
      prix: 120,
      stock_total: 30,
      stock_available: 20,
      description: "...",
    },
    quantite: 1,
  },
];

export default function ReservationPacks() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q")?.toLowerCase() || "";
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<typeof priceRanges>([]);
  const [filtered, setFiltered] = useState<PackItemsType[]>(allPackItems);
  const addToCart = useCartStore((s) => s.addToCart);
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());
  const [isGrid, setIsGrid] = useState(true);

  const packs = Array.from(
    new Map(allPackItems.map((i) => [i.packId.id, i.packId])).values()
  );

  useEffect(() => {
    let res = allPackItems;
    if (q) res = res.filter((i) => i.packId.name.toLowerCase().includes(q));
    if (selectedCats.length)
      res = res.filter((i) => selectedCats.includes(i.packId.name));
    if (selectedPrices.length) {
      res = res.filter((i) =>
        selectedPrices.some(
          (pr) => i.productId.prix >= pr.min && i.productId.prix < pr.max
        )
      );
    }
    setFiltered(res);
  }, [q, selectedCats, selectedPrices]);

  const handleAddPack = (packId: number) => {
    allPackItems
      .filter((i) => i.packId.id === packId)
      .forEach((item) => {
        addToCart({
          id: item.productId.id,
          name: item.productId.nom,
          image_url: item.productId.image_url,
          price: item.productId.prix,
        });
      });
    setAddedIds((prev) => new Set(prev).add(packId));
    setTimeout(() => {
      setAddedIds((prev) => {
        const copy = new Set(prev);
        copy.delete(packId);
        return copy;
      });
    }, 2000);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <div>
      <title>Réservation Pack | Blit Sono</title>

      <section className="bgImagePack">
        <div className="bg-gradient-to-r from-[#1E2939]/85 via-[#1E2939]/65 to-[#1E2939] text-white py-16 pl-30">
          <h1 className="text-3xl font-extrabold mb-4 flex gap-1 w-[800px]">
            <FaHeadphones size={48} /> Réservez votre pack Blit Sono
          </h1>
          <p className="italic mb-6 pl-4 border-l-4 border-[#18769C]">
            Choisissez parmi nos packs pour garantir la réussite de votre
            événement.
          </p>
          <div className="space-x-4">
            <ScrollDownButton />
            <a
              href="https://www.facebook.com/blit.sono"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#145e7a] text-white px-6 py-3 rounded-lg hover:bg-[#0f4a63]"
            >
              <FaPhone /> Contactez-nous
            </a>
          </div>
        </div>
      </section>

      <div className="flex md:flex-row gap-6 p-4">
        <FiltersPacks
          packNames={packs.map((p) => p.name)}
          selectedPacks={selectedCats}
          onPacksChange={setSelectedCats}
          selectedPrices={selectedPrices}
          onPricesChange={setSelectedPrices}
          resetAll={() => {
            setSelectedCats([]);
            setSelectedPrices([]);
          }}
        />

        <div className="w-full flex flex-col items-end  justify-end pr-10">
          <div className="flex justify-between items-center mb-4">
            <div>
              <button
                onClick={() => setIsGrid(true)}
                className={`px-3 py-1 rounded cursor-pointer ${
                  isGrid ? "bg-[#18769C] text-white" : "bg-gray-200"
                }`}
              >
                Carte
              </button>
              <button
                onClick={() => setIsGrid(false)}
                className={`px-3 py-1 ml-2 rounded cursor-pointer ${
                  !isGrid ? "bg-[#18769C] text-white" : "bg-gray-200"
                }`}
              >
                Liste
              </button>
            </div>
            {q && (
              <div className="italic text-gray-600">
                Résultats pour : "<strong>{q}</strong>"
              </div>
            )}
          </div>

          {isGrid ? (
            <div className="grid grid-cols-1 gap-4">
              {packs.map((pack) => {
                const produits = filtered.filter(
                  (i) => i.packId.id === pack.id
                );
                if (!produits.length) return null;
                return (
                  <div
                    key={pack.id}
                    className="group p-3 rounded w-[900px] "
                  >
                    <h3 className="text-start text-2xl font-semibold">{pack.name}: {pack.price_override} Ar</h3>

                    <Slider {...settings}>
                      {produits.map((item) => (
                        <div key={item.productId.id} 
                        className="p-2 w-full transition duration-300 hover:scale-105 cursor-pointer">
                          <img
                            src={item.productId.image_url}
                            alt={item.productId.nom}
                            className="w-full h-[200px] object-cover rounded"
                            style={{ maxWidth: "100%" }}
                          />
                          <p className="text-center mt-2 group-hover:text-[#18769C]">
                            {item.productId.nom}
                          </p>
                        </div>
                      ))}
                    </Slider>

                    <div className="mt-4 flex justify-end gap-2">
                      <Link
                        to={`/pack-detail/${pack.id}`}
                        className="w-[90px] border border-[#18769C] text-[#18769C] bg-white p-1.5 rounded-l-full
                         hover:bg-[#18769C] hover:text-white text-sm flex justify-center"
                      >
                        Voir détail
                      </Link>
                      <button
                        onClick={() => handleAddPack(pack.id)}
                        className={`px-3 py-1 rounded-r-full cursor-pointer transition duration-300 hover:scale-105 ${
                          addedIds.has(pack.id)
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "bg-[#18769C] hover:bg-[#0f5a70] text-white"
                        }`}
                      >
                        {addedIds.has(pack.id) ? (
                          "✓ Ajouté"
                        ) : (
                          <FaShoppingCart />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {packs.map((pack) => {
                const produits = filtered.filter(
                  (i) => i.packId.id === pack.id
                );
                if (!produits.length) return null;
                return (
                  <div
                    key={pack.id}
                    className="flex items-center justify-between p-3 rounded border-b border-gray-500 w-[900px]"
                  >
                    <div>
                      <h3 className="font-semibold">{pack.name}</h3>
                      <p>{pack.description}</p>
                      <strong> {pack.price_override} Ar</strong>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/pack-detail/${pack.id}`}
                        className="w-[90px] border border-[#18769C] text-[#18769C] bg-white p-1.5 rounded-l-full 
                        hover:bg-[#18769C] hover:text-white text-sm flex justify-center"
                      >
                        Voir détail
                      </Link>
                      <button
                        onClick={() => handleAddPack(pack.id)}
                        className={`px-3 py-1 rounded-r-full ${
                          addedIds.has(pack.id)
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "bg-[#18769C] hover:bg-[#0f5a70] text-white"
                        }`}
                      >
                        {addedIds.has(pack.id) ? "✓" :  <FaShoppingCart />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

    <div className="text-[#18769C] py-10 w-full flex flex-col pr-30 items-end">
        <h1 className="text-3xl font-extrabold mb-4 flex items-center gap-1 w-[700px]">
          <FaThumbsUp size={24} /> Merci d'avoir consulté nos packs !
        </h1>
        <p className="italic text-lg border-l-4 border-[#18769C] pl-4 w-[700px]">
          Chaque pack est conçu pour répondre à vos besoins événementiels.
          Faites confiance à notre équipe !
        </p>
      </div>
    </div>
  );
}

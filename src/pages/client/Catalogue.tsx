// Catalogue.tsx
import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import FiltersSidebar, {
  priceRanges,
} from "~/components/clientHome/FiltersSidebar";
import ScrollDownButton from "~/components/clientHome/ScrollDownButton";
import { useCartStore } from "~/stores/useCartStore";
import type { MaterielsType } from "~/types/types";
import {
  FaShoppingCart,
  FaHeadphones,
  FaPhone,
  FaThumbsUp,
} from "react-icons/fa";

type Materiel = MaterielsType & { prix: number };

const allMateriels: Materiel[] = [
  { id: 1, nom: "Sonorisation", 
    image_url: "/sonorisation.jpg", 
    prix: 100, 
    categorieId: { id: 1, nom: "Sonorisation" } },
  { id: 2, 
    nom: "Deejay", 
    image_url: "/deejay.jpg", 
    prix: 120, 
    categorieId: { id: 2, nom: "Deejay" } },
  { id: 3, 
    nom: "Home studio", 
    image_url: "/home-studio.jpeg", 
    prix: 80, 
    categorieId: { id: 3, nom: "Home studio" } },
  
  {
    id: 4,
    nom: "Instruments de musique",
    image_url: "/instruments-des-musiques.jpeg",
    prix: 150,
     categorieId: { id: 3, nom: "Home studio" }
  },
  { id: 5, nom: "HiFi & vidéo", image_url: "/hifi-video.jpeg", prix: 90 ,
     categorieId: { id: 3, nom: "Home studio" }
  },
  { id: 6, nom: "Structure", image_url: "/structure.jpeg", prix: 200,
     categorieId: { id: 3, nom: "Structure" }
   },
  { id: 7, nom: "Flight case", image_url: "/flight-case.jpeg", prix: 110 },
  { id: 8, nom: "Microphones", image_url: "/microphones.jpeg", prix: 70 },
  { id: 9, nom: "Enceintes", image_url: "/enceinte.jpeg", prix: 130 },
  {
    id: 10,
    nom: "Consoles de mixage",
    image_url: "/console-de-mixage.jpeg",
    prix: 180,
  },
  {
    id: 11,
    nom: "Accessoires divers",
    image_url: "/accessoire-divers.jpeg",
    prix: 50,
  },
  {
    id: 12,
    nom: "Packs événementiels",
    image_url: "/pack-evenementiel.jpeg",
    prix: 160,
  },
];

export default function Catalogue() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q")?.toLowerCase() || "";
  const cat = searchParams.get("cat") || "";
  const [isGrid, setIsGrid] = useState(true);
  const [selectedPrices, setSelectedPrices] = useState<typeof priceRanges>([]);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [initializedCat, setInitializedCat] = useState(false);
  const [filtered, setFiltered] = useState<Materiel[]>(allMateriels);

  const addToCart = useCartStore((s) => s.addToCart);
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());
  
  const categories = Array.from(
    new Set(allMateriels.map((m) => m.categorieId?.nom).filter(Boolean as any))
  );

  useEffect(() => {
    if (!initializedCat && cat) {
      const found = allMateriels.find((m) => m.categorieId?.nom === cat);
      if (found && found.categorieId) {
        setSelectedCats([found.categorieId.nom]);
      }
      setInitializedCat(true);
    }
  }, [cat, initializedCat]);

  useEffect(() => {
    let res = allMateriels;

    if (q) {
      res = res.filter((item) => item.nom.toLowerCase().includes(q));
    }

    if (selectedCats.length > 0) {
      res = res.filter(
        (item) =>
          item.categorieId && selectedCats.includes(item.categorieId.nom)
      );
    }

    if (selectedPrices.length > 0) {
      res = res.filter((item) =>
        selectedPrices.some((pr) => item.prix >= pr.min && item.prix < pr.max)
      );
    }

    setFiltered(res);
  }, [q, selectedCats, selectedPrices]);

  const toggleAdded = (id: number, item: Materiel) => {
    addToCart({
      id: item.id,
      name: item.nom,
      image_url: item.image_url,
      price: item.prix,
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
      <title>Catalogue | Blit Sono - Matériel Son & Lumière</title>
      <section className="bgImageCatalogue">
        <div className="bg-gradient-to-r from-[#1E2939]/85 via-[#1E2939]/65 to-[#1E2939] text-white py-16 w-full flex flex-col pl-30">
          <h1 className="text-3xl font-extrabold mb-4 flex gap-1 w-[800px]">
            <FaHeadphones className="text-7xl text-[#18769C]" />
            Découvrez le catalogue Blit Sono - chaque matériel compte pour la
            réussite de votre événement.
          </h1>
          <p className="w-[500px] text-lg italic mb-6 text-start flex items-center border-l-4 border-[#18769C] pl-4">
            Notre équipe vous accompagne avec bienveillance pour vous aider à
            choisir le meilleur matériel.
          </p>
          <div className="space-x-4">
            <ScrollDownButton />
            <a
              href="https://www.facebook.com/blit.sono"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#145e7a] text-white px-6 py-3 rounded-lg hover:bg-[#0f4a63] transition"
            >
              <FaPhone /> Contactez-nous sur MP
            </a>
          </div>
        </div>
      </section>

      <div className="flex md:flex-row gap-6 p-4">
        <FiltersSidebar
          categories={categories}
          packNames={[]} 
          selectedCats={selectedCats}
          onCatsChange={setSelectedCats}
          selectedPrices={selectedPrices}
          onPricesChange={setSelectedPrices}
          selectedPacks={[]}
          onPacksChange={() => {}}
          resetAll={() => {
            setSelectedCats([]);
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
              <p>Aucun résultat trouvé.</p>
            ) : (
              filtered.map((m) => (
                <div
                  key={m.id}
                  className={`group transition duration-300 rounded p-3 relative ${
                    isGrid
                      ? "flex flex-col items-center hover:scale-105"
                      : "flex items-center gap-4 hover:bg-gray-100"
                  }`}
                >
                  <img
                    src={m.image_url}
                    alt={m.nom}
                    className={`rounded object-cover ${
                      isGrid ? "w-40 h-24" : "w-20 h-14"
                    }`}
                  />
                  <div className="flex flex-row gap-2 items-center justify-center flex-wrap leading-[1.5em]">
                    <h3
                      className={`font-semibold text-[#1E2939] ${
                        isGrid ? "mt-3 text-center" : ""
                      } group-hover:text-[#18769C]`}
                    >
                      {m.nom}
                    </h3>
                    <p
                      className={`font-semibold text-[#1E2939] ${
                        isGrid ? "mt-3 text-center" : ""
                      } group-hover:text-[#18769C]`}
                    >
                      - {m.prix} Ar
                    </p>
                  </div>
                  <div
                    className={`mt-2 flex items-center gap-1 ${
                      isGrid
                        ? "absolute left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                        : "ml-auto"
                    }`}
                  >
                    <Link
                      to={`/materiel/${m.id}`}
                      className="w-[90px] border border-[#18769C] text-[#18769C] bg-white p-1.5 rounded-l-full hover:bg-[#18769C] hover:text-white text-sm flex justify-center"
                    >
                      Voir détail
                    </Link>
                    <button
                      onClick={() => toggleAdded(m.id, m)}
                      className={`p-2 pr-3 rounded-r-full cursor-pointer ${
                        addedIds.has(m.id)
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-[#18769C] hover:bg-[#0f5a70]"
                      } text-white transition duration-200`}
                    >
                      {addedIds.has(m.id) ? (
                        "✓"
                      ) : (
                        <FaShoppingCart className="text-lg" />
                      )}
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
          <FaThumbsUp size={24} /> Merci d'avoir exploré le catalogue Blit Sono
          !
        </h1>
        <p className="w-[700px] text-lg italic text-start flex items-center border-l-4 border-[#18769C] pl-4 text-[#1E2939]">
          Chaque équipement a été pensé pour sublimer vos événements. Notre
          équipe dévouée reste à vos côtés pour vous guider, vous conseiller et
          vous assurer une expérience 100 % sereine. Réservez en toute confiance
          – chaque matériel compte pour faire de votre projet un succès !
        </p>
      </div>
    </div>
  );
}

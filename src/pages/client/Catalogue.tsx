import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import FiltersSidebar, {
  priceRanges,
} from "~/components/clientHome/FiltersSidebar";
import { useCartStore } from "~/stores/useCartStore";
import type { MaterielsType } from "~/types/types";
import { FaShoppingCart } from "react-icons/fa";

type Materiel = MaterielsType & { prix: number };

const allMateriels: Materiel[] = [
  { id: 1, nom: "Sonorisation", image_url: "/sonorisation.jpg", prix: 100 },
  { id: 2, nom: "Deejay", image_url: "/deejay.jpg", prix: 120 },
  { id: 3, nom: "Home studio", image_url: "/home-studio.jpeg", prix: 80 },
  {
    id: 4,
    nom: "Instruments de musique",
    image_url: "/instruments-des-musiques.jpeg",
    prix: 150,
  },
  { id: 5, nom: "HiFi & vidéo", image_url: "/hifi-video.jpeg", prix: 90 },
  { id: 6, nom: "Structure", image_url: "/structure.jpeg", prix: 200 },
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

  useEffect(() => {
    if (!initializedCat && cat) {
      const found = allMateriels.find((m) => m.nom === cat);
      if (found) setSelectedCats([found.nom]);
      setInitializedCat(true);
    }
  }, [cat, initializedCat]);

  useEffect(() => {
    let res = allMateriels;
    if (q) res = res.filter((item) => item.nom.toLowerCase().includes(q));
    if (selectedCats.length > 0)
      res = res.filter((item) => selectedCats.includes(item.nom));
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
    <div className="flex md:flex-row gap-6 p-4">
      <FiltersSidebar
        selectedCats={selectedCats}
        onCatsChange={setSelectedCats}
        selectedPrices={selectedPrices}
        onPricesChange={setSelectedPrices}
        resetAll={() => {
          setSelectedCats([]);
          setSelectedPrices([]);
        }}
      />
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <div>
            <button
              onClick={() => setIsGrid(true)}
              className={`px-3 py-1 rounded ${
                isGrid ? "bg-[#18769C] text-white" : "bg-gray-200"
              }`}
            >
              🟦 Carte
            </button>
            <button
              onClick={() => setIsGrid(false)}
              className={`px-3 py-1 ml-2 rounded ${
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
          className={`${
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
                <h3
                  className={`text-gray-800 font-semibold ${
                    isGrid ? "mt-3 text-center" : ""
                  } group-hover:text-[#18769C]`}
                >
                  {m.nom}
                </h3>
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
  );
}

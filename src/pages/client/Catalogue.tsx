import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import FiltersCategory, {
  priceRanges,
} from "~/components/clientHome/FiltersCategory";
import ScrollDownButton from "~/components/clientHome/ScrollDownButton";
import { useCartStore } from "~/stores/useCartStore";
import type { MaterielsType } from "~/types/types";
import {
  FaShoppingCart,
  FaPhone,
  FaThumbsUp,
} from "react-icons/fa";
import { MdFilterList, MdClose } from "react-icons/md";

type Materiel = MaterielsType & { prix: number };

const allMateriels: Materiel[] = [
  {
    id: 1,
    nom: "Sonorisation",
    image_url: "/sonorisation.jpg",
    prix: 100,
    categorieId: { id: 1, nom: "Sonorisation" },
  },
  {
    id: 2,
    nom: "Deejay",
    image_url: "/deejay.jpg",
    prix: 120,
    categorieId: { id: 2, nom: "Deejay" },
  },
  {
    id: 3,
    nom: "Home studio",
    image_url: "/home-studio.jpeg",
    prix: 80,
    categorieId: { id: 3, nom: "Home studio" },
  },

  {
    id: 4,
    nom: "Instruments de musique",
    image_url: "/instruments-des-musiques.jpeg",
    prix: 150,
    categorieId: { id: 3, nom: "Home studio" },
  },
  {
    id: 5,
    nom: "HiFi & vidéo",
    image_url: "/hifi-video.jpeg",
    prix: 90,
    categorieId: { id: 3, nom: "Home studio" },
  },
  {
    id: 6,
    nom: "Structure",
    image_url: "/structure.jpeg",
    prix: 200,
    categorieId: { id: 3, nom: "Structure" },
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
  const [open, setOpen] = useState(false);
  const addToCart = useCartStore((s) => s.addToCart);
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());

  const categories = Array.from(
    new Set(allMateriels.map((m) => m.categorieId?.nom).filter(Boolean as any))
  );

  useEffect(() => {
    if (!initializedCat && cat) {
      const found = allMateriels.find((m) => m.categorieId?.nom === cat);
      if (found && found.categorieId) setSelectedCats([found.categorieId.nom]);
      setInitializedCat(true);
    }
  }, [cat, initializedCat]);

  useEffect(() => {
    let res = allMateriels;
    if (q) res = res.filter((item) => item.nom.toLowerCase().includes(q));
    if (selectedCats.length)
      res = res.filter(
        (item) =>
          item.categorieId && selectedCats.includes(item.categorieId.nom)
      );
    if (selectedPrices.length) {
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
    setTimeout(
      () =>
        setAddedIds((prev) => {
          const c = new Set(prev);
          c.delete(id);
          return c;
        }),
      2000
    );
  };

  return (
    <div>
      <section className="bgImageCatalogue">
        <div
        className="
          bg-gradient-to-r from-[#1E2939]/85 via-[#1E2939]/65 to-[#1E2939]
          text-white w-full flex flex-col px-4 py-8 pl-20 pt-20
        "
      >
        <h1 className="
          text-3xl max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl 
          font-extrabold mb-4 flex gap-2
        ">
            Découvrez le catalogue Blit Sono - chaque matériel compte pour la
            réussite de votre événement.
          </h1>
          <p className="w-full sm:w-[500px] text-base sm:text-lg italic mb-6 text-center sm:text-start border-l-4 border-[#18769C] pl-4">
            Notre équipe vous accompagne avec bienveillance pour vous aider à
            choisir le meilleur matériel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
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

      <div className="flex flex-col md:flex-row gap-6 mt-4 p-10">
        <button
          className="sm:hidden text-2xl mb-4 focus:outline-none cursor-pointer"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <MdClose /> : <button className="flex cursor-pointer items-center gap-2 p-2 bg-[#18769C] hover:bg-[#0f5a70] rounded-md text-white focus:outline-none">
      <MdFilterList className="w-6 h-6 cursor-pointer" />
      Filtrer
    </button>}
        </button>

        <div
          className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-md
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0 top-16" : "-translate-x-full"}
          sm:relative sm:translate-x-0 sm:w-1/4 sm:bg-transparent sm:shadow-none
        `}
        >
          <FiltersCategory
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
        </div>

        {open && (
          <div
            className="fixed inset-0 bg-black/30 z-20 sm:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div>
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
              <div className="text-sm italic text-gray-600 mt-2 sm:mt-0">
                Résultats pour : <strong>"{q}"</strong>
              </div>
            )}
          </div>

          <div
            className={
              isGrid
                ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                : "flex flex-col gap-4"
            }
          >
            {filtered.length === 0 ? (
              <p>Aucun résultat trouvé.</p>
            ) : (
              filtered.map((m) => (
                <div
                  key={m.id}
                  className={`
                  group transition duration-300 rounded p-3 relative
                  ${
                    isGrid
                      ? "flex flex-col items-center hover:scale-105"
                      : "flex items-center gap-4 hover:bg-gray-100"
                  }
                `}
                >
                  <img
                    src={m.image_url}
                    alt={m.nom}
                    className={`rounded object-cover flex-shrink-0 ${
                      isGrid ? "w-40 h-24" : "w-20 h-14"
                    }`}
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1">
                    <h3 className="font-semibold text-[#1E2939] group-hover:text-[#18769C]">
                      {m.nom}
                    </h3>
                    <p className="font-semibold text-[#1E2939] group-hover:text-[#18769C]">
                      - {m.prix} Ar
                    </p>
                  </div>
                  <div
                    className={`
                    mt-2 flex items-center gap-1
                    ${
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

      <div className="text-[#18769C] py-10 flex justify-center sm:justify-end">
        <div className="max-w-full sm:max-w-2xl lg:max-w-3xl">
          <h1 className="text-3xl font-extrabold mb-4 text-center sm:text-left flex flex-row gap-2">
            <FaThumbsUp size={24} /> Merci d'avoir exploré le catalogue Blit
            Sono !
          </h1>
          <p className="text-base sm:text-lg lg:text-xl italic text-[#1E2939] border-l-4 border-[#18769C] pl-4">
            Chaque équipement a été pensé pour sublimer vos événements. Notre
            équipe dévouée reste à vos côtés pour vous guider, vous conseiller
            et vous assurer une expérience 100 % sereine. Réservez en toute
            confiance - chaque matériel compte pour faire de votre projet un
            succès !
          </p>
        </div>
      </div>
    </div>
  );
}

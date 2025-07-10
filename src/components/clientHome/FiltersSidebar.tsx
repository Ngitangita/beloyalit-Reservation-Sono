import React, { useState } from "react";

export const priceRanges = [
  { label: "< 5000 Ar", min: 0, max: 50 },
  { label: "5000 Ar - 15 000 Ar", min: 50, max: 150 },
  { label: "15 000 Ar - 45 000 Ar", min: 150, max: 450 },
  { label: "45 000 Ar - 135 000 Ar", min: 450, max: 1350 },
  { label: "135 000 Ar - 405 000 Ar", min: 1350, max: 4050 },
];

const categories = [
  "Sonorisation",
  "Home studio",
  "Deejay",
  "Piano et clavier",
  "Eclairage",
  "Instruments",
  "HiFi",
  "Structure",
  "Flight case",
  "Microphones",
  "Accessoires divers",
  "Packs événementiels",
];

type Props = {
  selectedCats: string[];
  onCatsChange: (cats: string[]) => void;
  selectedPrices: typeof priceRanges;
  onPricesChange: (prs: typeof priceRanges) => void;
  resetAll: () => void;
};

export default function FiltersSidebar({ selectedCats, onCatsChange, selectedPrices, onPricesChange, resetAll }: Props) {
  const [showAllCats, setShowAllCats] = useState(false);
  const [showAllPrices, setShowAllPrices] = useState(false);

  const toggle = <T,>(array: T[], item: T, setter: (a: T[]) => void) => {
    setter(array.includes(item) ? array.filter(i => i !== item) : [...array, item]);
  };

  const catsToShow = showAllCats ? categories : categories.slice(0, 7);
  const pricesToShow = showAllPrices ? priceRanges : priceRanges.slice(0, 3);

  return (
    <aside className="w-64 p-4 bg-white text-[#575756] rounded-lg">
      <h2 className="font-bold text-lg mb-4">Filtres</h2>
      <button onClick={resetAll} className="w-full py-2 mb-4 bg-gray-100 rounded hover:bg-gray-200">
        Effacer les filtres
      </button>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Catégorie</h3>
        {catsToShow.map(name => (
          <label key={name} className="flex items-center mb-1">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedCats.includes(name)}
              onChange={() => toggle(selectedCats, name, onCatsChange)}
            />
            {name}
          </label>
        ))}
        {categories.length > 7 && (
          <button
            className="text-[#00B5BD] text-sm mt-1 cursor-pointer"
            onClick={() => setShowAllCats(v => !v)}
          >
            {showAllCats ? "Voir moins ▲" : "Voir plus ▼"}
          </button>
        )}
      </div>
      <div>
        <h3 className="font-semibold mb-2">Prix</h3>
        {pricesToShow.map(pr => (
          <label key={pr.label} className="flex items-center mb-1">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedPrices.includes(pr)}
              onChange={() => toggle(selectedPrices, pr, onPricesChange)}
            />
            {pr.label}
          </label>
        ))}
        {priceRanges.length > 3 && (
          <button
            className="text-[#00B5BD] text-sm mt-1 cursor-pointer"
            onClick={() => setShowAllPrices(v => !v)}
          >
            {showAllPrices ? "Voir moins ▲" : "Voir plus ▼"}
          </button>
        )}
      </div>
    </aside>
  );
}

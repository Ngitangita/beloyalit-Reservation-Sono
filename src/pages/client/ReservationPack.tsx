import React, { useState, useEffect } from "react";
import axios from "axios";

interface Materiel {
  id: number;
  nom: string;
  quantite: number;
}

interface Pack {
  id: number;
  nom: string;
  description: string;
  prix_total: number;
  materiels: Materiel[];
}

interface ReservationForm {
  nom: string;
  email: string;
  date: string;
  lieu: string;
  personnes: string;
}

export default function ReservationPack() {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [selection, setSelection] = useState<number | null>(null);
  const [infos, setInfos] = useState<ReservationForm>({
    nom: "",
    email: "",
    date: "",
    lieu: "",
    personnes: "",
  });

 useEffect(() => {
  axios.get("/api/packs")
    .then(res => {
      console.log(res.data);
      const pk: Pack[] = Array.isArray(res.data)
        ? res.data
        : ("packs" in res.data && Array.isArray((res.data as any).packs))
          ? (res.data as any).packs
          : [];
      setPacks(pk);
      setSelection(pk[0]?.id ?? null);
    })
    .catch(console.error);
}, []);


  const packSelection = packs.find(p => p.id === selection) || null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!packSelection) return;
    await axios.post("/api/reservations", {
      pack_id: packSelection.id,
      ...infos,
    });
    alert("Réservation envoyée !");
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Réservation par pack</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Choisissez votre pack :</label>
          <select
            value={selection ?? undefined}
            onChange={e => setSelection(+e.target.value)}
            className="border p-2 w-full"
          >
            {packs.map(p => (
              <option key={p.id} value={p.id}>
                {p.nom} – {p.prix_total} €
              </option>
            ))}
          </select>
        </div>
        {packSelection && (
          <div>
            <h3 className="font-medium">Contenu du pack :</h3>
            <ul className="list-disc pl-5">
              {packSelection.materiels.map(m => (
                <li key={m.id}>
                  {m.nom} × {m.quantite}
                </li>
              ))}
            </ul>
          </div>
        )}
        {(["nom","email","date","lieu","personnes"] as const).map(field => (
          <div key={field}>
            <label className="block capitalize">
              {field === "personnes" ? "nombre de personnes" : field} :
            </label>
            <input
              required
              name={field}
              type={field === "email" ? "email" : field === "date" ? "date" : "text"}
              value={(infos as any)[field]}
              onChange={e =>
                setInfos({ ...infos, [field]: e.target.value })
              }
              className="border p-2 w-full"
            />
          </div>
        ))}
        <button type="submit" className="bg-[#18769C] text-white px-4 py-2 rounded">
          Réserver
        </button>
      </form>
    </div>
  );
}

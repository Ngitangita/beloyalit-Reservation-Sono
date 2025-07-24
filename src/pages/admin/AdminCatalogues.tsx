import { useEffect, useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete, MdInfoOutline } from "react-icons/md";
import MaterielForm from "~/components/adminDashboard/catalogues/MaterielForm";
import DeleteConfirm from "~/components/adminDashboard/catalogues/DeleteConfirm";
import type { Materiel } from "~/types/types";

function AdminCatalogues() {
  const [materiels, setMateriels] = useState<Materiel[]>([]);
  const [current, setCurrent] = useState<Materiel | null>(null);
  const [deleting, setDeleting] = useState<Materiel | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [searchName, setSearchName] = useState("");
  const [searchPrix, setSearchPrix] = useState("");
  const [searchStock, setSearchStock] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/materiels");
      const d = res.data;
      let arr: Materiel[] = [];
      if (Array.isArray(d)) arr = d;
      else if (Array.isArray(d.data)) arr = d.data;
      else if (Array.isArray(d.materiels)) arr = d.materiels;
      else console.error("API Materiels inattendue:", d);
      setMateriels(arr);
    } catch (err) {
      console.error("Erreur fetch:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openForm = (m?: Materiel) => {
    setCurrent(m ?? null);
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);
    setCurrent(null);
  };

  const handleSave = async (data: Materiel) => {
    if (data.id) await axios.put(`/api/materiels/${data.id}`, data);
    else await axios.post("/api/materiels", data);
    closeForm();
    fetchData();
  };

  const confirmDelete = (m: Materiel) => setDeleting(m);
  const cancelDelete = () => setDeleting(null);
  const handleDelete = async () => {
    if (deleting) {
      await axios.delete(`/api/materiels/${deleting.id}`);
      setDeleting(null);
      fetchData();
    }
  };

  const filtered = Array.isArray(materiels)
    ? materiels.filter((m) => {
        const matchName = m.nom.toLowerCase().includes(searchName.toLowerCase());
        const matchPrix =
          searchPrix === "" || m.prix_location.toFixed(2).includes(searchPrix);
        const matchStock =
          searchStock === "" || m.stock.toString().includes(searchStock);
        return matchName && matchPrix && matchStock;
      })
    : [];

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4 bg-white p-6 rounded">
        <button
          onClick={() => openForm()}
          className="inline-block px-4 py-2 bg-[#18769C] hover:bg-[#0f5a70] text-white font-medium rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#18769C]/50 cursor-pointer"
        >
          + Ajouter un matériel
        </button>
        <TextField
          label="Nom"
          type="search"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            width: "250px",
            height: "40px",
            ".MuiInputBase-root": { height: "40px" },
            "& .MuiInputLabel-outlined": { color: "#18769C" },
            "& .MuiInputLabel-outlined.Mui-focused": { color: "#0f5a70" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#18769C" },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#18769C" },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#0f5a70",
            },
          }}
        />
        <TextField
          label="Prix"
          type="search"
          value={searchPrix}
          onChange={(e) => setSearchPrix(e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            width: "150px",
            height: "40px",
            ".MuiInputBase-root": { height: "40px" },
            "& .MuiInputLabel-outlined": { color: "#18769C" },
            "& .MuiInputLabel-outlined.Mui-focused": { color: "#0f5a70" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#18769C" },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#18769C" },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#0f5a70",
            },
          }}
        />
        <TextField
          label="Stock"
          type="search"
          value={searchStock}
          onChange={(e) => setSearchStock(e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            width: "150px",
            height: "40px",
            ".MuiInputBase-root": { height: "40px" },
            "& .MuiInputLabel-outlined": { color: "#18769C" },
            "& .MuiInputLabel-outlined.Mui-focused": { color: "#0f5a70" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#18769C" },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#18769C" },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#0f5a70",
            },
          }}
        />
      </div>

      <table className="min-w-full bg-white shadow-lg rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Prix loc.</th>
            <th className="px-4 py-2">Stock</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((m) => (
              <tr key={m.id} className="border-t">
                <td className="px-4 py-2">{m.nom}</td>
                <td className="px-4 py-2">{m.prix_location.toFixed(2)}</td>
                <td className="px-4 py-2">{m.stock}</td>
                <td className="px-4 py-2 flex gap-2 justify-center">
                  <button
                    onClick={() => openForm(m)}
                    className="inline-block px-4 py-2 bg-[#18769C] hover:bg-[#0f5a70] text-white font-medium rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#18769C]/50 cursor-pointer"
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => confirmDelete(m)}
                    className="inline-block px-4 py-2 bg-[#e3342f] hover:bg-[#cc1f1a] text-white font-medium rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-4 text-center">
                <div className="flex flex-col items-center">
                  <MdInfoOutline className="text-4xl text-gray-400" />
                  <span>Aucun matériel trouvé</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showForm && (
        <MaterielForm materiel={current} onSave={handleSave} onCancel={closeForm} />
      )}
      {deleting && (
        <DeleteConfirm item={deleting.nom} onCancel={cancelDelete} onConfirm={handleDelete} />
      )}
    </div>
  );
}

export default AdminCatalogues;

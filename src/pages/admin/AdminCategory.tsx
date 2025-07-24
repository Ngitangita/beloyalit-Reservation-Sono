import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete, MdInfoOutline } from "react-icons/md";
import PostCategory from "~/components/adminDashboard/categorys/PostCategory";
import UpdateCategory from "~/components/adminDashboard/categorys/UpdateCategory";
import type { Category } from "~/types/types";

function AdminCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const createRef = useRef<HTMLDivElement>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const deleteRef = useRef<HTMLDivElement>(null);
  const [toDelete, setToDelete] = useState<Category | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const editRef = useRef<HTMLDivElement>(null);
  const [toEdit, setToEdit] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get<{
        categories?: Category[];
        data?: Category[];
      }>("/api/categories");
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data.categories)
        ? data.categories
        : Array.isArray(data.data)
        ? data.data
        : [];
      setCategories(list);
    } catch {
      setError("Erreur lors du chargement des catégories");
    }
  };

  const handleOverlayClick = (
    e: React.MouseEvent,
    ref: React.RefObject<HTMLDivElement>,
    close: () => void
  ) => {
    if (e.target === ref.current) close();
  };

  const openDelete = (cat: Category) => {
    setToDelete(cat);
    setIsDeleteOpen(true);
  };
  const openEdit = (cat: Category) => {
    setToEdit(cat);
    setIsEditOpen(true);
  };

  const handleDelete = async () => {
    if (!toDelete) return;
    await axios.delete(`/api/categories/${toDelete.id}`);
    setIsDeleteOpen(false);
    fetchCategories();
  };

  const handleEditSave = async () => {
    if (!toEdit) return;
    await axios.put(`/api/categories/${toEdit.id}`, { name: toEdit.name });
    setIsEditOpen(false);
    fetchCategories();
  };

  return (
    <>
      <title>BlitSono • Catégories Sono Pro</title>

      <div className="container border border-gray-50">
        <div className="flex items-center gap-4 p-4 w-[1015px] fixed bg-white z-50">
          {error && <p className="text-red-500">{error}</p>}
          <button
            onClick={() => setIsCreateOpen(true)}
            className="inline-block px-4 py-2 bg-[#18769C] hover:bg-[#0f5a70] text-white font-medium rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#18769C]/50 cursor-pointer"
          >
            + Ajouter catégorie
          </button>
          <TextField
            label="Rechercher une catégorie"
            type="search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: "250px",
              height: "40px",
              ".MuiInputBase-root": {
                height: "40px",
              },
              "& .MuiInputLabel-outlined": {
                color: "#18769C",
              },
              "& .MuiInputLabel-outlined.Mui-focused": {
                color: "#0f5a70",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#18769C",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#18769C",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#0f5a70",
                },
            }}
          />
        </div>

        <table className="min-w-full bg-white shadow-md rounded-lg mt-[100px]">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">Nom</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length ? (
              categories
                .filter((c) =>
                  c.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .sort((a, b) => b.id - a.id)
                .map((c) => (
                  <tr
                    key={c.id}
                    className="text-center border-y hover:bg-gray-100"
                  >
                    <td className="py-3 px-4">{c.name}</td>
                    <td className="py-3 px-4 flex justify-center gap-2">
                      <button
                        onClick={() => openEdit(c)}
                        className="inline-block p-2 bg-[#18769C] hover:bg-[#0f5a70] text-white font-medium rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#18769C]/50 cursor-pointer"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={() => openDelete(c)}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 cursor-pointer"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={2} className="py-4 text-center">
                  <div className="flex flex-col items-center">
                    <MdInfoOutline className="text-4xl text-gray-400" />
                    <span>Aucune catégorie trouvée</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isCreateOpen && (
        <div
          ref={createRef}
          onClick={(e) =>
            handleOverlayClick(e, createRef, () => setIsCreateOpen(false))
          }
          className="fixed inset-0 bg-[#1E2939]/80 bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[400px]">
            <div className="flex justify-between items-center p-4">
              <h2 className="text-xl">Créer une nouvelle catégorie</h2>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-3xl relative bottom-4 left-4 cursor-pointer"
              >
                x
              </button>
            </div>
            <PostCategory
              onClose={() => setIsCreateOpen(false)}
              onCategoryCreated={fetchCategories}
            />
          </div>
        </div>
      )}

      {isDeleteOpen && toDelete && (
        <div
          ref={deleteRef}
          onClick={(e) =>
            handleOverlayClick(e, deleteRef, () => setIsDeleteOpen(false))
          }
          className="fixed inset-0 bg-[#1E2939]/80 bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[400px] p-6">
            <p className="mb-6">
              Supprimer la catégorie <strong>{toDelete.name}</strong> ?
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Non
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Oui
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditOpen && toEdit && (
        <div
          ref={editRef}
          onClick={(e) =>
            handleOverlayClick(e, editRef, () => setIsEditOpen(false))
          }
          className="fixed inset-0 bg-[#1E2939]/80 bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[400px]">
            <div className="flex justify-between items-center p-4">
              <h2 className="text-xl">Modifier la catégorie</h2>
              <button
                onClick={() => setIsEditOpen(false)}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-3xl relative bottom-4 left-4 cursor-pointer"
              >
                x
              </button>
            </div>
            <UpdateCategory
              categoryToEdit={toEdit!}
              setCategoryToEdit={setToEdit}
              onSave={handleEditSave}
              onCancel={() => setIsEditOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default AdminCategory;

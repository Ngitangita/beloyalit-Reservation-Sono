import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { TextField } from "@mui/material";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete, MdInfoOutline } from "react-icons/md";
import PostCategory from "~/components/adminDashboard/PostCategory";
import UpdateCategory from "~/components/adminDashboard/UpdateCategory";
import { Category } from "~/types/types";

function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      setError(err.error, "Erreur lors du chargement des catégories");
    }
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleCategoryCreated = () => fetchCategories();

  const confirmDelete = (id: number) => {
    const category = categories.find((cat) => cat.id === id);
    setCategoryToDelete(category || null);
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setCategoryToDelete(null);
  };

  const handleDelete = async () => {
    if (!categoryToDelete) return;
    try {
      await fetch(`/api/categories/${categoryToDelete.id}`, { method: "DELETE" });
      fetchCategories();
    } catch (err) {
      setError(err.error, "Erreur lors de la suppression.");
    } finally {
      cancelDelete();
    }
  };

  const handleEditCategory = (category: Category) => {
    setCategoryToEdit(category);
    setShowEditCategoryModal(true);
  };

  const handleSaveEdit = async () => {
    if (!categoryToEdit) return;
    try {
      await fetch(`/api/categories/${categoryToEdit.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryToEdit.name }),
      });
      fetchCategories();
      setShowEditCategoryModal(false);
    } catch (err) {
      setError(err.error, "Erreur lors de la modification.");
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-14 bg-white darkBody">
      <div className="flex flex-row gap-4 pt-4 w-full fixed bg-white z-50 darkBody sm:px-6 lg:px-12">
        <h1 className="text-2xl font-bold mb-4">Liste des catégories</h1>
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={toggleModal}
          className="mb-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Créer une catégorie
        </button>
        <TextField
          label="Rechercher une catégorie"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            width: "250px",
            height: "50px",
            ".MuiInputBase-root": { height: "40px" },
          }}
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-md shadow-md z-[9999] w-full sm:w-[400px]">
            <div className="flex justify-between items-center p-4">
              <h2 className="text-xl">Créer une nouvelle catégorie</h2>
              <button className="text-xl" onClick={toggleModal}>×</button>
            </div>
            <PostCategory onClose={toggleModal} onCategoryCreated={handleCategoryCreated} />
          </div>
        </div>
      )}

      <table className="min-w-full bg-white shadow-md rounded-lg mt-[100px]">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4">Nom</th>
            <th className="py-2 px-4">Créé le</th>
            <th className="py-2 px-4">Modifié le</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories
              .filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .sort((a, b) => b.id - a.id)
              .map((c) => (
                <tr key={c.id} className="text-center border-y hover:bg-gray-100">
                  <td className="py-3 px-4">{c.name}</td>
                  <td className="py-3 px-4">{dayjs(c.createdAt).format("YYYY-MM-DD HH:mm")}</td>
                  <td className="py-3 px-4">{dayjs(c.updatedAt).format("YYYY-MM-DD HH:mm")}</td>
                  <td className="py-3 px-4 flex justify-center gap-2">
                    <button onClick={() => handleEditCategory(c)} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                      <FaRegEdit />
                    </button>
                    <button onClick={() => confirmDelete(c.id)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
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
                  <span>Aucune catégorie trouvée</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showDeleteModal && categoryToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center">
            <p className="mb-6">
              Supprimer la catégorie <strong>{categoryToDelete.name}</strong> ?
            </p>
            <div className="flex justify-between">
              <button onClick={cancelDelete} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                Non
              </button>
              <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Oui
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditCategoryModal && categoryToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[400px]">
            <div className="flex justify-between items-center p-4">
              <h2 className="text-xl">Modifier la catégorie</h2>
              <button onClick={() => setShowEditCategoryModal(false)} className="text-xl">×</button>
            </div>
            <UpdateCategory
              categoryToEdit={categoryToEdit}
              setCategoryToEdit={setCategoryToEdit}
              onSave={handleSaveEdit}
              onCancel={() => setShowEditCategoryModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;

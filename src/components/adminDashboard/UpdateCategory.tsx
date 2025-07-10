interface Category {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Props {
  categoryToEdit: Category;
  setCategoryToEdit: (cat: Category) => void;
  onSave: () => void;
  onCancel: () => void;
}

function UpdateCategory ({ categoryToEdit, setCategoryToEdit, onSave, onCancel }: Props) {
  return (
    <div className="p-6">
      <input
        type="text"
        value={categoryToEdit.name}
        onChange={(e) => setCategoryToEdit({ ...categoryToEdit, name: e.target.value })}
        className="p-2 border border-gray-300 rounded w-full mb-4 focus:outline-none focus:border-blue-500"
      />
      <div className="flex justify-between">
        <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
          Annuler
        </button>
        <button onClick={onSave} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Sauvegarder
        </button>
      </div>
    </div>
  );
};

export default UpdateCategory;

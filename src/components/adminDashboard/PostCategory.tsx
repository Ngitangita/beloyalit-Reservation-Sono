import { useForm } from "react-hook-form";

interface Props {
  onClose: () => void;
  onCategoryCreated: () => void;
}

function PostCategory ({ onClose, onCategoryCreated }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: { name: string }) => {
    try {
      await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      onCategoryCreated();
      onClose();
    } catch (error) {
      console.error("Erreur création catégorie:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="block mb-1">Nom de la catégorie</label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "Le nom est requis" })}
          className={`p-2 w-full border rounded ${errors.name ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div className="flex justify-between gap-4">
        <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
          Annuler
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Créer
        </button>
      </div>
    </form>
  );
};

export default PostCategory;

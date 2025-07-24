import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { TextField, Autocomplete } from "@mui/material";
import type { Materiel, Categorie } from "~/types/types";
import { useEffect, useState, useRef } from "react";

type Props = {
  materiel: Materiel | null;
  onSave: (m: Materiel) => void;
  onCancel: () => void;
};

export default function MaterielForm({ materiel, onSave, onCancel }: Props) {
  const [categories, setCategories] = useState<Categorie[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, control } = useForm<Materiel & { file?: FileList }>({
    defaultValues: materiel ?? {
      nom: "",
      description: "",
      catégorie_id: 0,
      prix_location: 0,
      stock: 0,
      image_url: "",
    },
  });

  useEffect(() => {
    axios.get<Categorie[]>("/api/categories")
      .then(res => Array.isArray(res.data) ? setCategories(res.data) : setCategories([]))
      .catch(() => setCategories([]));
  }, []);

  const onSubmit = async (data: Materiel & { file?: FileList }) => {
    const form = new FormData();
    ["nom", "description", "catégorie_id", "prix_location", "stock"].forEach(key =>
      form.append(key, (data as any)[key]?.toString() ?? "")
    );
    if (data.file?.[0]) form.append("image", data.file[0]);

    await axios({
      method: materiel?.id ? "put" : "post",
      url: materiel?.id ? `/api/materiels/${materiel.id}` : "/api/materiels",
      data: form,
      headers: { "Content-Type": "multipart/form-data" },
    });

    onSave({ ...data, id: materiel?.id ?? data.id });
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onCancel();
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-[#1E2939]/80 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg shadow-lg sm:w-[800px] w-full">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl">{materiel ? "Éditer Matériel" : "Ajouter Matériel"}</h2>
          <button
            onClick={onCancel}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-3xl relative bottom-4 left-4 cursor-pointer"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 rounded flex flex-row flex-wrap items-center justify-between">
          {["nom", "description", "prix_location", "stock", "image_url"].map(key => (
            <div key={key} className="mb-3">
              <label className="block mb-1">{key}</label>
              <input
                {...register(key as any, key === "prix_location" || key === "stock" ? { valueAsNumber: true } : undefined)}
                type={key === "prix_location" || key === "stock" ? "number" : "text"}
                step={key === "prix_location" ? "0.01" : undefined}
                className="w-[400px] sm:w-[350px] p-2 pr-10 border rounded outline-[#18769C] border-[#18769C]/50"
              />
            </div>
          ))}

          <div className="mb-3 w-full sm:w-[350px]">
            <label className="block mb-1">Catégorie</label>
            <Controller
              name="catégorie_id"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  options={categories}
                  getOptionLabel={o => o.name}
                  value={categories.find(c => c.id === field.value) ?? null}
                  onChange={(_, v) => field.onChange(v?.id ?? 0)}
                  renderInput={params => <TextField {...params} />}
                />
              )}
            />
          </div>

          <div className="mb-3 w-full">
            <label className="block mb-1">Image</label>
            <input {...register("file")} type="file" accept="image/*" className="w-full border rounded p-2" />
          </div>

          <div className="flex justify-end gap-2 w-full mt-4">
            <button type="button" onClick={onCancel} 
            className="inline-block px-4 py-2 bg-gray-300 hover:bg-gray-400
             text-white rounded cursor-pointer">
              Annuler
            </button>
            <button type="submit" className="inline-block px-4 py-2 bg-[#18769C] hover:bg-[#0f5a70] text-white rounded">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

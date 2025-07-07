import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useState, useTransition } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useApiAuth } from "~/hooks/useApiAuth";
import type { FormValues } from "~/types/types";
import { execute } from "~/utils/execute";

const schema = yup.object({
  firstName: yup.string().required("Le prénom est obligatoire"),
  lastName: yup.string().required("Le nom est obligatoire"),
  phone: yup
    .string()
    .matches(
      /^[0-9\- ]*$/,
      "Le téléphone ne doit contenir que des chiffres, espaces ou tirets"
    )
    .required("Le téléphone est obligatoire"),
  createdAt: yup
    .string()
    .required("La date de création est obligatoire")
    .test(
      "not-future",
      "La date ne peut pas être dans le futur",
      (v) => !!v && new Date(v) <= new Date()
    ),
  email: yup
    .string()
    .email("Adresse email invalide")
    .required("L’email est obligatoire"),
  password: yup
    .string()
    .min(8, "Le mdp doit contenir au moins 8 caractères")
    .required("Le mot de passe est obligatoire"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password")], "Les mots de passe doivent correspondre")
    .required("La confirmation est obligatoire"),
});

export const SignUp = () => {
  const { signup } = useApiAuth();
  const navigate = useNavigate();
  const [pending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    startTransition(async () => {
      execute(
        () => {
          return signup(data.email, data.password);
        },
        {
          onSuccess: (user) => {
            navigate(user?.role === "ADMIN" ? "/admin" : "/client", {
              replace: true,
            });
          },
          onError: (err) => {
            console.error("Erreur d'inscription :", err);
          },
        }
      );
    });
  };

  const fields: (keyof FormValues)[] = [
    "firstName",
    "lastName",
    "phone",
    "createdAt",
    "email",
    "password",
    "confirm",
  ];

  return (
    <div className="flex flex-col gap-4 items-center justify-center bg-[#FFFFFF] p-5 text-[#575756]">
      <title>S'inscrir </title>
      <div className="text-center">
        <h1 className="font-semibold font-open-sans text-[32px]">
          Je crée mon compte
        </h1>
      </div>
        <div className="overflow-hidden w-[1250px] flex flex-col justify-start items-start z-50 pl-10 pr-10">
          <h1 className="font-semibold text-[20px]">Identification</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className=" h-auto p-6 flex flex-row flex-wrap gap-4 justify-between items-center"
          >
            {fields
              .filter((f) => f !== "role")
              .map((field) => {
                const error = errors[field];
                const isPassword = field === "password";
                const isConfirm = field === "confirm";

                const type = isPassword
                  ? showPassword
                    ? "text"
                    : "password"
                  : isConfirm
                  ? showConfirm
                    ? "text"
                    : "password"
                  : field === "email"
                  ? "email"
                  : field === "createdAt"
                  ? "date"
                  : "text";

                const label =
                  field === "firstName"
                    ? "Prénom"
                    : field === "lastName"
                    ? "Nom"
                    : field === "phone"
                    ? "Téléphone"
                    : field === "createdAt"
                    ? "Date de création"
                    : field === "email"
                    ? "Email"
                    : field === "password"
                    ? "Mot de passe"
                    : "Confirmer";

                return (
                  <div key={field} className="flex flex-col gap-1">
                    <label htmlFor={field} className="text-sm font-medium ">
                      {label}
                    </label>
                    <div className="relative">
                      <input
                        id={field}
                        {...register(field)}
                        type={type}
                        placeholder={label}
                        disabled={pending}
                        className={`w-[400px] sm:w-[550px] p-2 pr-10 border rounded outline-[#18769C] ${
                          error ? "border-red-500" : "border-[#18769C]/50"
                        }`}
                      />
                      {(isPassword || isConfirm) && (
                        <button
                          type="button"
                          onClick={() =>
                            isPassword
                              ? setShowPassword((p) => !p)
                              : setShowConfirm((p) => !p)
                          }
                          className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                          tabIndex={-1}
                        >
                          {(isPassword && showPassword) ||
                          (isConfirm && showConfirm) ? (
                            <FaEyeSlash />
                          ) : (
                            <FaEye />
                          )}
                        </button>
                      )}
                    </div>
                    {error && (
                      <p className="text-red-500 text-sm">{error.message}</p>
                    )}
                  </div>
                );
              })}
              <div className="flex flex-col items-center w-[1100px]">
                <button
              type="submit"
              disabled={isSubmitting || pending}
              className="w-[400px] sm:w-[400px] p-2 rounded
             hover:bg-gradient-to-l hover:from-[#18769C] hover:to-#18769C]/20 mt-4 cursor-pointer
              bg-gradient-to-r from-[#18769C] to-[#18769C]/20 text-xl text-white"
            >
              {pending ? (
                <span className="animate-pulse">Chargement...</span>
              ) : (
                "S’inscrire"
              )}
            </button>
            <p>
              Déjà inscrit ?
              <Link to="/sign-in" className="text-[#50a9f2] underline ml-1">
                Se connecter
              </Link>
            </p>
              </div>
          </form>
        </div>
    </div>
  );
};

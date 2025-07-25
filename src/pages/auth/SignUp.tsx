import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useState, useTransition } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useApiAuth } from "~/hooks/useApiAuth";
import type { FormValues } from "~/types/user";
import { execute } from "~/utils/execute";
import { useAuthStore } from "~/stores/useAuthStore";
import { Loading } from "~/components/Loading";

const schema = yup.object({
  prenom: yup.string().required("Le prénom est obligatoire"),
  nom: yup.string().required("Le nom est obligatoire"),
  telephone: yup.string()
    .matches(/^[0-9\- ]*$/, "Le téléphone ne doit contenir que des chiffres, espaces ou tirets")
    .required("Le téléphone est obligatoire"),
  email: yup.string().email("Adresse email invalide").required("L'email est obligatoire"),
  mot_de_passe: yup.string().min(8, "Le mdp doit contenir au moins 8 caractères").required("Le mot de passe est obligatoire"),
  confirm: yup.string().oneOf([yup.ref("mot_de_passe")], "Les mots de passe doivent correspondre").required("La confirmation est obligatoire"),
});

export const SignUp = () => {
  const { signup } = useApiAuth();
  const navigate = useNavigate();
  const [pending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const setIsAuthenticated = useAuthStore.use.setIsAuthenticated();
  const setToken = useAuthStore.use.setToken();
  const setUser = useAuthStore.use.setUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormValues> = data => {
    startTransition(() => {
      execute(
        () =>
          signup({
            nom: data.nom,
            prenom: data.prenom,
            email: data.email,
            mot_de_passe: data.mot_de_passe,
            mot_de_passe_confirmation: data.confirm,
            telephone: data.telephone,
          }),
        {
          onSuccess: res => {
            setToken(res.token);
            setUser(res.user);
            setIsAuthenticated(true);
            const role = res.user.role;
            navigate(role === "user" ? "/" : "/admin", { replace: true });
          },
          onError: err => console.error("Erreur d'inscription :", err),
        }
      );
    });
  };

  const fields: (keyof FormValues)[] = ["nom", "prenom", "telephone", "email", "mot_de_passe", "confirm"];

  return (
    <>
      {pending && <Loading />}
      <div className="flex flex-col gap-4 items-center justify-center bg-[#FFFFFF] p-5 text-[#575756]">
        <title>S'inscrire</title>
        <div className="text-center">
          <h1 className="font-semibold font-open-sans text-[32px]">Je crée mon compte</h1>
        </div>
        <div className="overflow-hidden w-[1250px] flex flex-col justify-start items-start z-50 pl-10 pr-10">
          <h1 className="font-semibold text-[20px]">Identification</h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="h-auto p-6 flex flex-row flex-wrap gap-4 justify-between items-center">
            {fields.map(field => {
              const error = errors[field];
              const isPwd = field === "mot_de_passe";
              const isConf = field === "confirm";
              const type = isPwd
                ? showPassword ? "text" : "password"
                : isConf
                ? showConfirm ? "text" : "password"
                : field === "email"
                ? "email"
                : "text";
              const label = {
                nom: "Nom",
                prenom: "Prénom",
                telephone: "Téléphone",
                email: "Email",
                mot_de_passe: "Mot de passe",
                confirm: "Confirmer",
              }[field];
              return (
                <div key={field} className="flex flex-col gap-1">
                  <label htmlFor={field} className="text-sm font-medium">{label}</label>
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
                    {(isPwd || isConf) && (
                      <button
                        type="button"
                        onClick={() => (isPwd ? setShowPassword(p => !p) : setShowConfirm(p => !p))}
                        className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                        tabIndex={-1}
                      >
                        {(isPwd && showPassword) || (isConf && showConfirm) ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    )}
                  </div>
                  {error && <p className="text-red-500 text-sm">{error.message}</p>}
                </div>
              );
            })}
            <div className="flex flex-col items-center w-[1100px]">
              <button
                type="submit"
                disabled={isSubmitting || pending}
                className="w-[400px] sm:w-[400px] p-2 rounded hover:bg-gradient-to-l hover:from-[#18769C] hover:to-#18769C]/20 mt-4 cursor-pointer bg-gradient-to-r from-[#18769C] to-[#18769C]/20 text-xl text-white"
              >
                {pending ? <span className="animate-pulse">Chargement...</span> : "S'inscrire"}
              </button>
              <p>
                Déjà inscrit ?
                <Link to="/sign-in" className="text-[#50a9f2] underline ml-1">Se connecter</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

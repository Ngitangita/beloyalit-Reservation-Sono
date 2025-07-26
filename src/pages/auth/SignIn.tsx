import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useTransition } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { LoginValues } from "~/types/user";
import { useApiAuth } from "~/hooks/useApiAuth";
import { execute } from "~/utils/execute";
import { useAuthStore } from "~/stores/useAuthStore";
import { Loading } from "~/components/Loading";
import { toast } from "react-toastify";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Adresse email invalide")
      .required("L'email est obligatoire"),
    mot_de_passe: yup.string().required("Le mot de passe est obligatoire"),
  })
  .required();

export const SignIn = () => {
  const setIsAuthenticated = useAuthStore.use.setIsAuthenticated();
  const setToken = useAuthStore.use.setToken();
  const setUser = useAuthStore.use.setUser();
  const navigate = useNavigate();

  const [pending, startTransition] = useTransition();
  const { signin } = useApiAuth<{
    token: string;
    user: import("~/types/user").UserType;
  }>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: yupResolver(schema) });

  const onSubmit = (data: LoginValues) => {
    startTransition(() => {
      execute(() => signin(data.email, data.mot_de_passe), {
        onSuccess: (res) => {
          setToken(res.token);
          setUser(res.user);
          setIsAuthenticated(true);
          if (res.user.role === "admin") {
            navigate("/admin", { replace: true });
          } else {
            navigate("/", { replace: true });
          }
          toast.success("Connexion réussie !");
        },
        onError: (err) => {
          setIsAuthenticated(false);
          setToken(null);
          setUser(null);
          console.error("Erreur de connexion", err);
          toast.error("Identifiants incorrects.");
        },
      });
    });
  };

  return (
    <>
      {pending && <Loading />}
      <div className="flex flex-col items-center justify-center bg-white px-4 py-8 text-[#575756] w-full">
        <title>Se connecter</title>

        <h1 className="text-center font-semibold font-open-sans text-2xl sm:text-3xl md:text-4xl">
          Mon Compte
        </h1>

        <div className="flex flex-col md:flex-row gap-10 justify-center items-start w-full max-w-7xl mt-10">
      
          <div className="flex flex-col gap-6 md:w-1/2 w-full px-4">
            <h2 className="text-xl font-semibold text-center md:text-left">
              Nouveau client ?
            </h2>
            <p className="text-[#18769C] text-sm text-justify">
              En créant votre compte sur beloyalit.com, vous gagnerez du temps
              lors de vos prochaines réservations de sonorisation, accéderez à
              l'ensemble des services de votre espace personnel et profiterez de
              nos diverses offres promotionnelles
            </p>
            <Link
              to="/sign-up"
              className="flex justify-center md:justify-start"
            >
              <button
                type="button"
                disabled={isSubmitting || pending}
                className="w-full sm:w-[300px] p-2 rounded bg-gradient-to-r 
                from-[#18769C]/20 to-[#18769C] hover:from-[#18769C] hover:to-[#18769C]/20 
                text-white text-lg cursor-pointer"
              >
                {pending ? (
                  <span className="animate-pulse">Chargement...</span>
                ) : (
                  "Je crée mon compte"
                )}
              </button>
            </Link>
          </div>

          <div className="flex flex-col gap-6 md:w-1/2 w-full px-4">
            <h2 className="text-xl font-semibold text-center md:text-left">
              J'ai déjà un compte
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="flex flex-col gap-4 w-full"
            >
              {["email", "mot_de_passe"].map((name) => (
                <div className="w-full" key={name}>
                  <label htmlFor={name} className="block mb-1 font-medium">
                    {name === "email" ? "Adresse e-mail" : "Mot de passe"}
                  </label>
                  <input
                    id={name}
                    {...register(name as keyof LoginValues)}
                    type={name === "mot_de_passe" ? "password" : "email"}
                    placeholder={name === "email" ? "Email" : "Mot de passe"}
                    className={`p-2 w-full border rounded outline-[#18769C] ${
                      errors[name as keyof LoginValues]
                        ? "border-red-500"
                        : "border-[#18769C]/50"
                    }`}
                  />
                  {errors[name as keyof LoginValues] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[name as keyof LoginValues]?.message}
                    </p>
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={isSubmitting || pending}
                className="w-full sm:w-[300px] p-2 rounded bg-gradient-to-r from-[#18769C] 
                to-[#18769C]/20 hover:from-[#18769C]/80 text-white text-lg self-center cursor-pointer"
              >
                {pending ? (
                  <span className="animate-pulse">Chargement...</span>
                ) : (
                  "Se connecter"
                )}
              </button>

              <p className="text-center mt-2 text-sm">
                <Link to="#" className="text-[#50a9f2] underline">
                  Mot de passe oublié ?
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

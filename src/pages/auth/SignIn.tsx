import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useTransition } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { LoginValues } from "~/types/types";
import { useApiAuth } from "~/hooks/useApiAuth";
import { execute } from "~/utils/execute";
import { useAuthStore } from "~/stores/useAuthStore";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Adresse email invalide")
      .required("L’email est obligatoire"),
    password: yup.string().required("Le mot de passe est obligatoire"),
  })
  .required();

export const SignIn = () => {
  const setIsAuthenticated = useAuthStore.use.setIsAuthenticated();
  // const  setToken = useAuthStore.use.setToken()
  // const setType = useAuthStore.use.setType();
  // const setUser = useAuthStore.use.setUser()

  const [pending, startTransition] = useTransition();
  const { signin } = useApiAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginValues) => {
    startTransition(async () => {
      execute(
        async () => {
          return await signin(data.email, data.password);
        },
        {
          onSuccess: (data) => {
            console.log("Connexion réussie", data);
            // setToken(data.token);
            // setType(data.type);
            // setUser({
            //   email: data.email,
            //   firstName: data.firstName,
            //   role: data.role,
            // });
            setIsAuthenticated(true);
          },
          onError: (error) => {
            // setIsAuthenticated(false);
            // setToken(null);
            // setType(null);
            // setUser(null);
            setIsAuthenticated(false);
            console.error("Erreur de connexion", error);
            alert("Erreur de connexion, veuillez vérifier vos identifiants.");
          },
        }
      );
    });
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center bg-[#FFFFFF] p-5 text-[#575756]">
      <title>Se connecter </title>
      <h1 className="font-semibold font-open-sans text-[32px]">Mon Compte</h1>
      <div className="w-full  flex justify-center items-center">
        <div className="flex flex-col items-center gap-12 relative bottom-5">
          <h2 className="text-center font-semibold font-open-sans text-[20px]">
            Nouveau client ?</h2>
          <p className="text-start max-w-[500px]">
            En créant votre compte sur beloyalit.com, vous gagnerez du temps
            lors de vos prochaines réservations de sonorisation, accéderez à
            l’ensemble des services de votre espace personnel et profiterez de
            nos diverses offres promotionnelles
          </p>
           <Link to="/sign-up">
          <button
              type="submit"
              disabled={isSubmitting || pending}
              className="w-[400px] sm:w-[500px] p-2 rounded
             hover:bg-gradient-to-l hover:from-[#41C203]/20 hover:to-[#41C203] mt-4 cursor-pointer
              bg-gradient-to-r from-[#41C203]/20 to-[#41C203] text-xl text-white"
            >
              {pending ? (
                <span className="animate-pulse">Chargement...</span>
              ) : (
                "Je créer mon compte"
              )}
            </button>
                </Link>
        </div>
        <div className="max-w-[600px] flex flex-col justify-center items-center">
          <div className="text-center">
            <h2 className="font-semibold font-open-sans text-[20px]">
              J'ai déjà un compte
            </h2>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="max-w-[600px] p-6 flex flex-col justify-around items-center "
          >
            {["email", "password"].map((name) => (
              <div className="mb-4" key={name}>
                <label htmlFor={name} className="block mb-1 font-medium ">
                  {name === "email" ? "Adresse e-mail" : "Mot de passe"}
                </label>
                <input
                  id={name}
                  {...register(name as keyof LoginValues)}
                  type={name === "password" ? "password" : "email"}
                  placeholder={name === "email" ? "Email" : "Mot de passe"}
                  className={`p-2 pr-10 w-[400px] sm:w-[500px] border rounded outline-[#1E2939] ${
                    errors[name as keyof LoginValues]
                      ? "border-red-500"
                      : "border-[#575756]/50"
                  }`}
                />
                {errors[name as keyof LoginValues] && (
                  <p className="text-red-500 text-sm">
                    {errors[name as keyof LoginValues]?.message}
                  </p>
                )}
              </div>
            ))}
            <button
              type="submit"
              disabled={isSubmitting || pending}
              className="w-[400px] sm:w-[500px] p-2 rounded
             hover:bg-gradient-to-l hover:from-[#41C203] hover:to-[#41C203]/20 mt-4 cursor-pointer
              bg-gradient-to-r from-[#41C203] to-[#41C203]/20 text-xl text-white"
            >
              {pending ? (
                <span className="animate-pulse">Chargement...</span>
              ) : (
                "Se connecter"
              )}
            </button>

            <p className="w-full flex flex-row justify-between">
              <span className="text-[#50a9f2] underline">
                <Link to="#">Mot de passe oublié ?</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

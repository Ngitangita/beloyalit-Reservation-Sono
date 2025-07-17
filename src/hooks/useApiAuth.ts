import axiosClient from "~/conf/axiosClient";

export type UserType = {
  nom: string;
  prenom: string;
  email: string;
  mot_de_passe: string;
  telephone?: string;         
  role_id: number;
  date_inscription: string;   
};

export type SigninResponse = {
  token: string;
  user: UserType;
};


export function useApiAuth() {

  const signup = async (email: string, password: string) => {
    await axiosClient.post("/signup", { email, mot_de_passe: password });
  };

  const signin = async (email: string, password: string) => {
    const { data } = await axiosClient.post<SigninResponse>("/login", {
      email,
      mot_de_passe: password,
    });

    return data;
  };

  return {
    signin,
    signup,
  };
}

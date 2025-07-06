import axios from "axios";

export type SigninResponse = {
  email: string;
  role: "admin" | "client";
  token: string;
  firstName: string;
};

export function useApiAuth() {

  const signup = async (email: string, password: string) => {
    await axios.post("/api/auth/signup", { email, password });
  };

  const signin = async (email: string, password: string) => {
    const { data } = await axios.post<SigninResponse>("/api/auth/signin", {
      email,
      password,
    });

    return data;
  };

  return {
    signin,
    signup,
  };
}

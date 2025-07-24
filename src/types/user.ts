// export type UserRole = "ADMIN" | "CLIENT";

// type BaseUser = {
//   id: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   role : UserRole;
//   registrationDate?: string;
// };

// export type Client = BaseUser & {
//   phone?: string | null;
// };

// export type Admin = BaseUser;

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

export type FormValues = {
  prenom: string;
  nom: string;
  telephone: string;
  date_inscription: string;
  email: string;
  mot_de_passe: string;
  confirm: string;
};

export type LoginValues = {
  email: string;
  mot_de_passe: string;
};

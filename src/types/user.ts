export type UserRole = "ADMIN" | "CLIENT";

type BaseUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role : UserRole;
  registrationDate?: string;
};

export type Client = BaseUser & {
  phone?: string | null;
};

export type Admin = BaseUser;

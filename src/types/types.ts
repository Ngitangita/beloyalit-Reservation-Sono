import type { JSX } from "react";

export type FormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: string;
  email: string;
  password: string;
  confirm: string;
};

export type LoginValues = Pick<FormValues, "email" | "password">;

export type MenuItem = {
  title: string;
  icon: JSX.Element;
  path: string;
  subItems: SubItem[];
}

export type SubItem = Omit<MenuItem, "subItems">;

export type MenuCategorie = {
  title: string;
  path: string;
  
}

export type MaterielType = {
  id: number;
  nom: string;
  description?: string;
  catégorie_id: number;
  prix_location: number;
  image_url?: string;
}

export type MaterielsType =  Pick<MaterielType, "id" | "nom" | "image_url">;

export type Category = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}



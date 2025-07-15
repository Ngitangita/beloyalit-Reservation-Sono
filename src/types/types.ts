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
  prix: number;
  description: string;
  productId: {
    id: number;
    nom: string;
    categoryId: {
      name: string;
    };
    image_url: string;
    prix: number;
    stock_total: number;
    stock_available: number;
    description: string;
  };
}

export type MaterielsType =  Pick<MaterielType, "id" | "nom" | "image_url">;

export type Category = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}



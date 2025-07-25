import type { JSX } from "react";

// Types pour le Menu
export type MenuItem = {
  title: string;
  icon: JSX.Element;
  path: string;
  subItems: SubItem[];
};

export type SubItem = Omit<MenuItem, "subItems">;

export type MenuCategorie = {
  title: string;
  path: string;
};

// Types pour le Matériel
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
};

// Pour un affichage simplifié des matériels
export type MaterielsType = {
  id: number;
  nom: string;
  image_url: string;
};

// Type pour Catégorie
export type Category = {
  id: number;
  name: string;
};

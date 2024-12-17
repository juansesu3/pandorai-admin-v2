// src/app/components/types/ArticleTypes.ts

// Define el tipo para cada traducción del artículo
type Translation = {
  name: string;
  content: string;
};

export type TranslationsType = {
  [key: string]: Translation; // Permite claves dinámicas
};

export interface CategoryType {
  id: string;
  translations: {
    en: string;
    es: string;
    fr: string;
    de: string;
    it: string;
  };
}
export interface TagType {
  id: string;
  translations: {
    en: string;
    es: string;
    fr: string;
    de: string;
    it: string;
  };
}

// Define el tipo para el objeto principal de artículo, incluyendo propiedades opcionales para evitar errores de tipo
export interface Article {
  _id: string;
  id: string;
  translations: {
    [locale: string]: Translation;
  };
  articleAuthor: string;
  imgAuthor: string;
  articleImage: string;
  articleCat: string;
  tags: string[];
  shareCount: number;
  likes: number;
  slug: string;
}

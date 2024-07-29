import { Article, Category } from "./page";
import { getLocale } from "next-intl/server";

export async function loadRecommendedArticles() {
  try {
    let res = await fetch(`${process.env.BASE_URL}/articles/recommended`);
    
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch(error) {
    console.log(error);
  }
  return [];
}

export async function loadArticles(catId: string) {
  let res;
  try {
    if (catId) {
      res = await loadArticlesByCatId(catId);
    } else {
      res = await loadAllArticles();
    }
    
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch(error) {
    console.log(error);
  }
  return [];
}

export async function loadArticlesByCatId(catId: string) {
  return await fetch(`${process.env.BASE_URL}/categories/articles?category_id=${catId}`) ;
}

export async function loadAllArticles() {
  return await fetch(`${process.env.BASE_URL}/articles`);
}

export async function loadCategories(): Promise<Category[]> {
  try {
    const locale = await getLocale() || "ru";
    const res = await fetch(
      `${process.env.BASE_URL}/articles/categories?lang=${locale}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch(error) {
    console.log(error);
  }
  return [];
}
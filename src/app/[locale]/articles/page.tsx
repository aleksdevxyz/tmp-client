import styles from "./index.module.scss";

import { Metadata } from "next";
import Pagination from "@/components/Pagination/Pagination";
import { getTotalPages } from "@/helpers/getTotalPages";
import ArticleSwiper from "@/components/ArticlesComponents/ArticleSwiper/ArticleSwiper";
import ArticleCategorySwiper from "@/components/ArticlesComponents/ArticleCategorySwiper/ArticleCategorySwiper";
import RecList from "@/components/ArticlesComponents/ArticleList/ArticleList";
import { getTranslations } from "next-intl/server";
import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("IndexArticles");
  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    robots: {
      index: true,
      follow: true
    }
  };
}

export interface Article {
  name: string;
  translit_name: string;
  description: string;
  image: string;
}

export interface Articles {
  articles: Article[];
}

export interface Category {
  id: number;
  name: string;
  translit_name: string;
  categories: Category[];
}


async function getRecArticles() {
  const res = await fetch(
    `${process.env.BASE_URL}/articles/recommended`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getArticlesCategories() {
  const res = await fetch(
    `${process.env.BASE_URL}/articles/categories`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function HomePage({
  searchParams,
}: {
  searchParams?: {
    page?: number;
    category?: string;
  }
}) {
  const currentPage = Number(searchParams?.page) || 0;
  const accuracyCategory = searchParams?.category || '';
  
  const RecArticles: Article[] = await getRecArticles();
  const categoriesArticle = await getArticlesCategories();
  

  return (
    <>
      <div className={styles.section}>
        <BreadCrumbs/>
        <ArticleSwiper articles={RecArticles} />
        <ArticleCategorySwiper categories={categoriesArticle}/>
        <RecList articles={RecArticles}/>
        <Pagination data={RecArticles}/>
      </div>
    </>
  );
}

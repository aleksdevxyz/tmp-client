import styles from "./index.module.scss";

import { Metadata } from "next";
import Pagination from "@/components/Pagination/Pagination";
import { getTotalPages } from "@/helpers/getTotalPages";
import ArticleSwiper from "@/components/ArticlesComponents/ArticleSwiper/ArticleSwiper";
import ArticleCategorySwiper from "@/components/ArticlesComponents/ArticleCategorySwiper/ArticleCategorySwiper";
import RecList from "@/components/ArticlesComponents/ArticleList/ArticleList";

export const metadata: Metadata = {
  title: "Teleshtorm – поиск по Telegram чатам. Каталог телеграмм чатов.",
};

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
  
  const totalPages = getTotalPages(currentPage, RecArticles);

  return (
    <>
      <div className={styles.section}>
        <ArticleSwiper articles={RecArticles} />
        <ArticleCategorySwiper categories={categoriesArticle}/>
        <RecList articles={RecArticles}/>
        <Pagination data={RecArticles}/>
      </div>
    </>
  );
}

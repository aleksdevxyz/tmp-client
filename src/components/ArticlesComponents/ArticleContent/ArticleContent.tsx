'use client'

import { Article } from "@/app/[locale]/article/[translit_name]/page";
import styles from "./index.module.scss";
import ArticleInnerContent from "../ArticleInnerContent/ArticleInnerContent";
import { useLocale } from "next-intl";
import { formatDate } from "@/helpers/formatDate";
export default function ArticleContent({
  created_at,
  category,
  name,
  description,
  content,
}: Article) {

  const locale = useLocale()

  return (
    <div className={styles.content}>
        <div className={styles.category}>
          <p className={styles.creadet_at}>{formatDate(created_at, locale)}</p>
          <p className={styles.category_name}>{category != null ? category.name : '' }</p>
        </div>
      <div className={styles.content_container}>
        <h2 className={styles.title}>{name}</h2>
        <p className={styles.description}>{description}</p>
      </div>
      <ArticleInnerContent content={content}/>
    </div>
  );
}

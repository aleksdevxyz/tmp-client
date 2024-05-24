import Image from "next/image";
import React from "react";
import styles from "./index.module.scss";
import Link from "next/link";
import { getLocale } from "next-intl/server";

export interface recArticle {
  name: string;
  translit_name: string;
  description: string;
  image: string;
}


async function getRec(): Promise<recArticle[]> {
  const res = await fetch(
    "https://test-api-teleshtorm.teleshtorm.org/articles/recommended"
  );
  if (res.ok) {
    return res.json();
  }
  throw new Error(res.statusText);
}

export default async function ArticleRecSidebar() {
  const locale = await getLocale();
  const articles = await getRec();
  
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Рекомендуем статьи</h2>
      {articles.map(({ translit_name, image, name }, index) => {
        return (
          <Link className={styles.article} key={index} href={`/${locale}/articles/${translit_name}`}>
            <Image
              className={styles.image}
              src={image}
              width={297}
              height={170}
              alt="image"
            />
            <p className={styles.text}>{name}</p>
          </Link>
        );
      })}
    </div>
  );
}

import Image from "next/image";
import styles from "./index.module.scss";
import { Articles } from "@/app/[locale]/articles/page";
import Link from "next/link";
import { getLocale } from "next-intl/server";

export default async function ArticleList({ articles }: Articles) {
  const locale = await getLocale()
  
  return (
    <section className={styles.section}>
      {articles.map((article, index) => {
        return (
          <Link href={`/${locale}/articles/${article.translit_name}`} key={index} className={styles.card}>
            <Image className={styles.image} src={article.image} alt="Article" width={356} height={204} loading="eager" priority={true}/>
            <div className={styles.container}>
              <h3 className={styles.title}>{article.name}</h3>
              <p className={styles.text}>{article.description}</p>
            </div>
          </Link>
        );
      })}
    </section>
  );
}

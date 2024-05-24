import { Article } from "@/app/[locale]/articles/[translit_name]/page";
import { formatDate } from "@/helpers/formatDate";
import { useLocale } from "next-intl";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import ArticleInnerContent from "../ArticleInnerContent/ArticleInnerContent";
import ArticleRecSidebar from "../ArticleRecSidebar/ArticleRecSidebar";
import styles from "./index.module.scss";
export default async function ArticleContent({
  created_at,
  category,
  name,
  description,
  content,
  image,
}: Article) {
  const locale = await getLocale();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image
          className={styles.image}
          src={image}
          alt="Article"
          width={756}
          height={413}
        />
        <div className={styles.category}>
          <p className={styles.creadet_at}>{formatDate(created_at, locale)}</p>
          <p className={styles.category_name}>
            {category != null ? category.name : ""}
          </p>
        </div>
        <div className={styles.content_container}>
          <h2 className={styles.title}>{name}</h2>
          <p className={styles.description}>{description}</p>
        </div>
        <ArticleInnerContent content={content} />
      </div>
      <ArticleRecSidebar />
    </div>
  );
}

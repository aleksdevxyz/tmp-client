import { Article } from "@/app/[locale]/articles/[translit_name]/page";
import { formatDate } from "@/helpers/formatDate";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import ArticleInnerContent from "../ArticleInnerContent/ArticleInnerContent";
import ArticleRecSidebar from "../ArticleRecSidebar/ArticleRecSidebar";
import styles from "./ArticleContent.module.scss";
import ArticleShareButton from "../ArticleShareButton/ArticleShareButton";
import Head from 'next/head';

export default async function ArticleContent({
  created_at,
  category,
  name,
  description,
  content,
  image,
  translit_name
}: Article) {
  const locale = await getLocale();
  const url = `https://front-05-test-teleshtorm.teleshtorm.org/${locale}/articles/${translit_name}`;

  return (
    <>
      <Head>
        <title>{name}</title>
        <meta property="og:title" content={name} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content={locale} />
      </Head>
      <div className={styles.container}>
        <div className={styles.content}>
          <Image
            className={styles.image}
            src={image}
            alt="Article"
            width={756}
            height={413}
            loading="eager"
            priority={true}
          />
          <div className={styles.category}>
            <p className={styles.created_at}>{formatDate(created_at, locale)}</p>
            <p className={styles.category_name}>
              {category != null ? category.name : ""}
            </p>
          </div>
          <div className={styles.content_container}>
            <h2 className={styles.title}>{name}</h2>
            <p className={styles.description}>{description}</p>
          </div>
          <ArticleInnerContent content={content} />
          <ArticleShareButton/>
        </div>
        <ArticleRecSidebar translit_name={translit_name} />
      </div>
    </>
  );
}

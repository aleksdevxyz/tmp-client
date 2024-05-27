"use client";
import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import cn from "classnames";
import Markdown from "markdown-to-jsx";
import { useTranslations } from "next-intl";
import ArticleShareButton from "../ArticleShareButton/ArticleShareButton";

export default function ArticleInnerContent({ content }: { content: string }) {
  const [showContent, setShowContent] = React.useState(false);
  const t = useTranslations("Article");

  return (
    <>
      <button
        type="button"
        onClick={() => setShowContent(!showContent)}
        className={styles.button}
      >
        <h3 className={styles.title}>{t('Содержание')}</h3>
        <Image
          src={"/chevron-bar-expand.svg"}
          alt="show"
          width={16}
          height={16}
        />
      </button>
      <div
        className={cn(styles.content, {
          [styles.visible]: showContent,
          [styles.hidden]: !showContent,
        })}
      >
        <Markdown className={styles.markdown}>{content}</Markdown>
      </div>
    </>
  );
}

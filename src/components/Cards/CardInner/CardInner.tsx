"use client";

import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
import hiddenImg from "../../../../public/+18.png";
import { useLocale } from "next-intl";
export interface Props {
  name: string;
  description: string;
  image: string;
  subscribers: number;
  link_tg: string;
  hidden: boolean;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
  translit_name: string;
}

export default function CardInner({
  image,
  name,
  link_tg,
  description,
  subscribers,
  category,
  hidden,
}: Props) {
  const locale = useLocale();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image
          alt="Avatar"
          className={styles.image}
          width={208}
          height={208}
          src={hidden ? hiddenImg : image}
        />
        <div className={styles.info}>
          {hidden ? (
            <>
              <p className={styles.channel_description_ban}>
                Содержимое скрыто по причине наличия контента, нарушающего
                законодательство
              </p>
              <hr className={styles.line} />
            </>
          ) : (
            <>
              <h3 className={styles.title}>{name}</h3>
              <div className={styles.description_container}>
                <Link className={styles.link} href={`${link_tg}`}>
                  {link_tg}
                </Link>
                <p className={styles.people}>{subscribers} подписчиков</p>
                <Link
                  className={styles.category_link}
                  href={`/${locale}/category/${category.translit_name}`}
                >
                  {category.translit_name}
                </Link>
              </div>
              <hr className={styles.line} />
              <p className={styles.channel_description}>{description}</p>
              <Link href={link_tg} className={styles.button}>
                Открыть канал
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

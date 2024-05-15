"use client";

import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
export interface Props {
  name: string;
  description: string;
  image: string;
  subscribers: number;
  link_tg: string;
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
}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image
          alt="Avatar"
          className={styles.image}
          width={208}
          height={208}
          src={image}
        />
        <div className={styles.info}>
          <h3 className={styles.title}>{name}</h3>
          <div className={styles.description_container}>
            <Link className={styles.link} href={`${link_tg}`}>
              {link_tg}
            </Link>
            <p className={styles.people}>{subscribers} подписчиков</p>
            <Link
              className={styles.category_link}
              href={`/`}
            >
              {category.translit_name}
            </Link>
          </div>
          <hr className={styles.line} />
          <p className={styles.channel_description}>{description}</p>
          <Link href={link_tg} className={styles.button}>
            Открыть канал
          </Link>
        </div>
      </div>
    </div>
  );
}

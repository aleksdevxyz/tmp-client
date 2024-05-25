import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import SwiperRec from "./SwiperRec";

export interface recRes {
  name: string;
  translit_name: string;
  description: string;
  image: string;
}

async function getRec() {
  const res = await fetch(`${process.env.BASE_URL}/articles/recommended`);
  if (res.ok) {
    return res.json();
  }
  throw new Error(res.statusText);
}

export default async function RecListMain() {
  const recData = await getRec();
  const t = await getTranslations("Main");

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("Рекомендуем почитать")}</h2>
        <SwiperRec data={recData} />
      </div>
    </div>
  );
}

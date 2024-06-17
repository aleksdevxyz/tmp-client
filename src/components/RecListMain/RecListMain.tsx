import React from "react";
import styles from "./RecListMain.module.scss";
import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";

const SwiperRec = dynamic(() => import("./SwiperRec"));

export interface recRes {
  name: string;
  translit_name: string;
  description: string;
  image: string;
}

async function getRec() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/articles/recommended`);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  } catch(error) {
    console.log(error);
  }

  return []
}

export default async function RecListMain() {
  const recData = await getRec();
  const t = await getTranslations("Main");

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("Рекомендуем почитать")}</h2>
      <SwiperRec data={recData} />
    </div>  
  );
}

import React, { useEffect } from "react";
import styles from "./index.module.scss";
import axios from "axios";
import Image from "next/image";

export interface recRes {
  name: string;
  translit_name: string;
  description: string;
  image: string;
}

async function getRec() {
  const res = await fetch(
    "https://test-api-teleshtorm.teleshtorm.org/articles/recommended"
  );
  if (res.ok) {
    return res.json();
  }
  throw new Error(res.statusText);
}

export default async function RecList() {
  const recData = await getRec();

  return (
    <div className={styles.section}>
      <h2 className={styles.title}>Рекомендуем почитать</h2>
      <div className={styles.container}>
        {recData?.map((item: recRes) => (
          <div key={Math.random()} className={styles.slide}>
            <Image
              alt={item.name}
              width={366}
              height={192}
              className={styles.image}
              src={item.image}
            />
            <div className={styles.text_container}>
              <h3 className={styles.title}>{item.name}</h3>
              <p className={styles.subtitle}>{item.description}</p>
              <p className={styles.button}>Читать дальше ...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

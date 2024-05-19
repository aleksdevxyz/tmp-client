import React from "react";
import styles from "./index.module.scss";
import ChannelsForm from "../ChannelsForm/ChannelsForm";
import { getCategory } from "@/app/[locale]/api/categoryApi";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function AddForm() {
  const category = await getCategory();

  const t = await getTranslations("AddForm");
  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <h2 className={styles.title}>{t("Заголовок формы")}</h2>
        <p className={styles.subtitle}>{t("Подзаголовок формы")}</p>
        <div className={styles.button_container}>
          <button className={styles.button_select}>
            <Image
              className={styles.image}
              src="/form-icon.svg"
              alt="form-icon"
              width={21}
              height={21}
            />
            <p className={styles.button_text}>{t("Канал")}</p>
          </button>
          <button className={styles.button_select}>
            <Image
              className={styles.image}
              src="/form-icon.svg"
              alt="form-icon"
              width={21}
              height={21}
            />
            <p className={styles.button_text}>{t("Чат/Бот")}</p>
          </button>
        </div>
        <ChannelsForm category={category} />
      </div>
      <div className={styles.text_container}>
        <div className={styles.text}>
          <h3 className={styles.title}>{t("Заголовок 1 вопроса")}</h3>
          <p className={styles.subtitle}>{t("Подзаголовок 1 вопроса")}</p>
        </div>
        <div className={styles.text}>
          <h3 className={styles.title}>{t("Заголовок 2 вопроса")}</h3>
          <p className={styles.subtitle}>{t("Подзаголовок 2 вопроса")}</p>
        </div>
      </div>
    </div>
  );
}

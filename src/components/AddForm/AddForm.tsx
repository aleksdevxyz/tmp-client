"use client";

import { CategoryResponse } from "@/app/api/categoryApi";
import cn from "classnames";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import ChannelsForm from "../ChannelsForm/ChannelsForm";
import ChatForm from "../BotsForm/BotsForm";
import styles from "./index.module.scss";

const chanelActive = cn(styles._active, styles.button_select);

export default function AddForm({
  category,
}: {
  category: CategoryResponse[];
}) {
  const [acitveSelect, setActiveSelect] = React.useState(true);

  const t = useTranslations("AddForm");
  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <h2 className={styles.title}>{t("Заголовок формы")}</h2>
        <p className={styles.subtitle}>{t("Подзаголовок формы")}</p>
        <div className={styles.button_container}>
          <div
            onClick={() => setActiveSelect(true)}
            className={acitveSelect ? chanelActive : styles.button_select}
          >
            <Image
              className={styles.image}
              src="/form-icon.svg"
              alt="form-icon"
              width={21}
              height={21}
            />
            <p className={styles.button_text}>{t("Канал")}</p>
          </div>
          <div
            onClick={() => setActiveSelect(false)}
            className={!acitveSelect ? chanelActive : styles.button_select}
          >
            <Image
              className={styles.image}
              src="/form-icon.svg"
              alt="form-icon"
              width={21}
              height={21}
            />
            <p className={styles.button_text}>{t("Чат/Бот")}</p>
          </div>
        </div>
        {acitveSelect ? <ChannelsForm category={category} /> : <ChatForm />}
      </div>
      <div className={styles.text_container}>
        <div className={styles.text}>
          <h3 className={styles.quest_title}>{t("Заголовок 1 вопроса")}</h3>
          <p className={styles.quest_subtitle}>{t("Подзаголовок 1 вопроса")}</p>
        </div>
        <div className={styles.text}>
          <h3 className={styles.quest_title}>{t("Заголовок 2 вопроса")}</h3>
          <p className={styles.quest_subtitle}>{t("Подзаголовок 2 вопроса")}</p>
        </div>
      </div>
    </div>
  );
}

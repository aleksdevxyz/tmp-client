'use client'

import { useTranslations } from "next-intl";
import styles from "./index.module.scss";
import { CategoryResponse } from "@/app/[locale]/api/categoryApi";
import SubmitButton from "../SubmitButton/SubmitButton";
import { useFormState } from "react-dom";
import { postChannel } from "@/app/[locale]/api/postChannel";


export default function ChannelsForm({category} : {category : CategoryResponse[]}) {
  const t = useTranslations("AddForm");
  const [state, formAction] = useFormState(postChannel, 'Канал')
  
  return (
    <>
      <form action={formAction} className={styles.form}>
        <label className={styles.label}>
          {t("Ссылка на канал")}
        </label>
        <input
          name="link"
          className={styles.input}
          type="text"
          placeholder={t("Поле ввода")}
        />
        <label className={styles.label}>
          {t("Категория канала")}
        </label>
        <select className={styles.select} name="category">
          {category.map(({ id, name }) => {
            return (
              <option value={name} className={styles.option} key={id} >
                {name}
              </option>
            );
          })}
        </select>
        <h3 className="error">{state.detail}</h3>
        <SubmitButton />
      </form>
    </>
  );
}

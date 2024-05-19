'use client'
import { useTranslations } from "next-intl";
import SubmitButton from "../SubmitButton/SubmitButton";
import { useFormState } from "react-dom";
import styles from './index.module.scss'
import { postBots } from "@/app/[locale]/api/postBots";

export default function ChatForm() {
    const t = useTranslations("AddForm");
    const [state, formAction] = useFormState(postBots, '');

  return (
    <form action={formAction} className={styles.form}>
        <label className={styles.label}>{t("Ссылка на канал")}</label>
        <input
          name="link"
          className={styles.input}
          type="text"
          placeholder={t("Поле ввода")}
        />
        {state != "" && (
          <div className={styles.error}>
            <h3 className={styles.text_error}>{state}</h3>
          </div>
        )}
        <SubmitButton />
      </form>
  )
}

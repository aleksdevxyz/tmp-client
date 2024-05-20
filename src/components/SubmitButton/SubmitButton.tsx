"use client";
import { useTranslations } from "next-intl";
import styles from "./index.module.scss";
import { useFormStatus } from "react-dom";

export default function SubmitButton({onSubmit}:any) {
  const t = useTranslations("AddForm");

  return (
    <button type="submit" onSubmit={onSubmit}  className={styles.conf_button}>
        {t("Добавить")} 
    </button>
  );
}

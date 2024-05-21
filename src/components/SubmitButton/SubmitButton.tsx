"use client";
import { useTranslations } from "next-intl";
import styles from "./index.module.scss";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const t = useTranslations("AddForm");

  return (
    <button type="submit" className={styles.conf_button}>
        {t("Добавить")} 
    </button>
  );
}

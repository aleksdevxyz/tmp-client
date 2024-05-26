import React from "react";
import styles from "./index.module.scss";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("Footer");
  const locale = await getLocale();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.paragraph}>{t("Права")}</p>
        <div className={styles.links}>
          <Link
            href="https://t.me/teleshtorm_com"
            className={styles.footer__link}
          >
            {t("Ссылка телеграм")}
          </Link>
          <Link
            href={`/${locale}/articles/dmca`}
            className={styles.footer__link}
          >
            {t("Правообладатели")}
          </Link>
          <Link
            href="https://t.me/teleshtorm_bot"
            className={styles.footer__link}
          >
            {t("Техподдержка")}
          </Link>
        </div>
      </div>
      <div className={styles.container_480}>
        <div className={styles.links_480}>
        <Link
            href="https://t.me/teleshtorm_com"
            className={styles.footer__link_480}
          >
            {t("Ссылка телеграм")}
          </Link>          
          <Link
            href={`/${locale}/articles/dmca`}
            className={styles.footer__link_480}
          >
            {t("Правообладатели")}
          </Link>
          <Link
            href="https://t.me/teleshtorm_bot"
            className={styles.footer__link_480}
          >
            {t("Техподдержка")}
          </Link>
        </div>
        <p className={styles.paragraph_480}>{t("Права")}</p>
      </div>
    </footer>
  );
}

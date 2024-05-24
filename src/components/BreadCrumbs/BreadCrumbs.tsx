"use client";

import { useLocale } from "next-intl";
import styles from "./index.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function BreadCrumbs({ name }: any) {
  const pathName = usePathname();
  const locale = useLocale();
  const currentPath = pathName
    .split("/")
    .slice(2, -1)
    .map((item) => item.replace("channel", "Каналы"));

  return (
    <ul className={styles.breadCrumbs}>
      <li className={styles.breadCrumbs_item}>
        <Link className={styles.breadCrumbs_item} href={"/"}>
          Каталог
        </Link>
      </li>
      {currentPath.map((item, index) => {
        return (
          <li className={styles.breadCrumbs_item} key={index}>
            <Link
              className={styles.breadCrumbs_item}
              href={`/${locale}/${item}`}
            >
              {item === "bots" ? "Боты" : item === "chats" ? "Чаты" : "Статьи"}
            </Link>
          </li>
        );
      })}
      <li className={styles.breadCrumbs_item_last}>{name}</li>
    </ul>
  );
}

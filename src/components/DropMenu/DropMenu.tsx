"use client";

import React, { useEffect, useState } from "react";
import styles from "./DropMenu.module.scss";
import Image from "next/image";
import cn from "classnames";
import { Link, usePathname } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import { switchFlag } from "@/helpers/SwitchFlag";

const active = cn(styles._active, styles.list);

export default function DropMenu() {
  const [activeMenu, setActiveMenu] = useState(false);
  const listRef: React.RefObject<HTMLDivElement> = React.createRef();
  const pathName = usePathname();
  const t = useTranslations("Header");
  const locale = useLocale();

  const onClickMenu = () => {
    setActiveMenu(!activeMenu);
  };

  const handleOverlayClick = (event: MouseEvent) => {
    if (listRef.current && !listRef.current.contains(event.target as Node)) {
      setActiveMenu(false);
    }
  };

  const onClickChild = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  useEffect(() => {
    document.addEventListener("click", handleOverlayClick);
    return () => document.removeEventListener("click", handleOverlayClick);
  });


  return (
    <>
      <ul onClick={onClickMenu} className={styles.container}>
        <li className={styles.item}>
          <Image
            src={`/DropMenu/${switchFlag(locale)}`}
            alt="image"
            width={22}
            height={16}
            className={styles.image}
          />
          <p className={styles.title}>{t("Язык сайта")}</p>
          <Image
            className={styles.chevron}
            src={"/chevron-compact-down.png"}
            alt="image"
            width={10}
            height={16}
          />
        </li>
        <div
          ref={listRef}
          onClick={onClickChild}
          className={activeMenu ? active : styles.list}
        >
          <p className={styles.header}>{t('Язык сайта')}</p>
          <Link href={`${pathName}`} className={styles.item_menu} locale="ru">
            <Image
              src={"/DropMenu/Russian.svg"}
              width={22}
              height={16}
              alt="image"
              className={styles.image}
            />
            <span className={styles.title_menu}>Russian</span>
          </Link>
          <Link href={`${pathName}`} className={styles.item_menu} locale="de">
            <Image
              src={"/DropMenu/German.svg"}
              alt="image"
              width={22}
              height={16}
              className={styles.image}
            />
            <span className={styles.title_menu}>Deutsch</span>
          </Link>
          <Link href={`${pathName}`} className={styles.item_menu} locale="en">
            <Image
              src={"/DropMenu/English.svg"}
              alt="image"
              width={22}
              height={16}
              className={styles.image}
            />
            <span className={styles.title_menu}>English</span>
          </Link>
          <Link href={`${pathName}`} className={styles.item_menu} locale="es">
            <Image
              src={"/DropMenu/Spanish.svg"}
              alt="image"
              width={22}
              height={16}
              className={styles.image}
            />
            <span className={styles.title_menu}>Español</span>
          </Link>
          <Link href={`${pathName}`} className={styles.item_menu} locale="fr">
            <Image
              src={"/DropMenu/French.svg"}
              alt="image"
              width={22}
              height={16}
              className={styles.image}
            />
            <span className={styles.title_menu}>Français</span>
          </Link>
          <Link href={`${pathName}`} className={styles.item_menu} locale="it">
            <Image
              src={"/DropMenu/Italian.svg"}
              alt="image"
              width={22}
              height={16}
              className={styles.image}
            />
            <span className={styles.title_menu}>Italiano</span>
          </Link>
          <Link href={`${pathName}`} className={styles.item_menu} locale="pt">
            <Image
              src={"/DropMenu/Portuguese.svg"}
              alt="image"
              width={22}
              height={16}
              className={styles.image}
            />
            <span className={styles.title_menu}>Português</span>
          </Link>
        </div>
      </ul>
    </>
  );
}

"use client";

import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import SearchInput from "../SearchInput/SearchInput";
import classNames from "classnames";
import DropMenu from "../DropMenu/DropMenu";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function BurgerMenu() {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openSearch, setOpenSearch] = React.useState(false);
  const t = useTranslations("BurgerMenu");
  const locale = useLocale();

  return (
    <nav className={styles.menu}>
      <div
        onClick={() => setOpenMenu(false)}
        className={classNames(styles.overlay, !openMenu && styles.hidden)}
      ></div>
      <div
        onClick={() => setOpenMenu(!openMenu)}
        className={classNames(styles.burger_menu, !openMenu && styles.hidden)}
      >
        <Link href={"/"} className={styles.link}>
          {t("Каталог")}
          <Image
            src={"/BurgerIcon.svg"}
            width={14}
            height={10}
            alt={"forward"}
          />
        </Link>
        <Link href={`/${locale}/chats`} className={styles.link}>
          {t("Чаты")}
          <Image
            src={"/BurgerIcon.svg"}
            width={14}
            height={10}
            alt={"forward"}
          />
        </Link>
        <Link href={`/${locale}/bots`} className={styles.link}>
          {t("Боты")}
          <Image
            src={"/BurgerIcon.svg"}
            width={14}
            height={10}
            alt={"forward"}
          />
        </Link>
        <Link href={`/${locale}/articles`} className={styles.link}>
          {t("Статьи")}
          <Image
            src={"/BurgerIcon.svg"}
            width={14}
            height={10}
            alt={"forward"}
          />
        </Link>
        <Link href={"https://t.me/teleshtorm_bot"} className={styles.link}>
          {t("Поддержка")}
          <Image
            src={"/BurgerIcon.svg"}
            width={14}
            height={10}
            alt={"forward"}
          />
        </Link>
        <Link href={"https://t.me/teleshtorm_com"} className={styles.link}>
          {t("Наш канал")}
          <Image
            src={"/BurgerIcon.svg"}
            width={14}
            height={10}
            alt={"forward"}
          />
        </Link>
      </div>
      <div className={classNames(styles.left, openSearch && styles.hidden)}>
        <div
          onClick={() => setOpenMenu(!openMenu)}
          className={classNames(styles.burger, openMenu && styles.open)}
        >
          <span></span>
        </div>
        <Image alt="logo" src={"/Logo.svg"} width={50} height={40} />
      </div>
      <div className={styles.right}>
        <Image
          onClick={() => setOpenSearch(!openSearch)}
          src={"/SearchIcon.svg"}
          width={32}
          height={32}
          alt="search"
        />
        <div
          className={classNames(styles.search, !openSearch && styles.hidden)}
        >
          <SearchInput setOpenSearch={setOpenSearch} open={openSearch} />
        </div>
        <DropMenu />
      </div>
    </nav>
  );
}

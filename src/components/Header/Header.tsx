import React from "react";
import styles from "./index.module.scss";
import { CatalogLogo, Logo, StaticLogo, ChatsLogo, BotsLogo } from "../svgs";
import SearchInput from "../SearchInput/SearchInput";
import DropMenu from "../DropMenu/DropMenu";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <div className={styles.menu_container}>
          <Link href={"/"} className={styles.logo}>
            <Logo className={styles.logo} />
          </Link>
          <Link href={"/"} className={styles.menu_item}>
            <CatalogLogo className={styles.item_icon} />
            <p className={styles.title}>
              Каталог
            </p>
          </Link>
          <Link href={"/chats"} className={styles.menu_item}>
            <ChatsLogo className={styles.item_icon} />
            <p className={styles.title}>Чаты</p>
          </Link>
          <div className={styles.menu_item}>
            <BotsLogo className={styles.item_icon} />
            <p className={styles.title}>Боты</p>
          </div>
          <div className={styles.menu_item}>
            <StaticLogo className={styles.item_icon} />
            <p className={styles.title}>Статьи</p>
          </div>
        </div>

        <div className={styles.search_container}>
          <SearchInput />
          <DropMenu />
        </div>
      </div>
    </header>
  );
}

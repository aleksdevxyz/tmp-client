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
          <Logo className={styles.logo} />
          <div className={styles.menu_item}>
            <CatalogLogo className={styles.item_icon} />
            <Link href={'/'} className={styles.title}>Каталог</Link>
          </div>
          <div className={styles.menu_item}>
            <ChatsLogo className={styles.item_icon} />
            <p className={styles.title}>Чаты</p>
          </div>
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
          <DropMenu/>
        </div>
      </div>
    </header>
  );
}

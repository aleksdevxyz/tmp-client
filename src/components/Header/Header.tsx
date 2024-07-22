'use client'

import Image from "next/image";
import styles from "./Header.module.scss";
import SearchInput from "../SearchInput/SearchInput";
import DropMenu from "../DropMenu/DropMenu";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function Header() {
  const locale = useLocale();
  const t = useTranslations('Header')
  
  return (
    <header className={styles.header}>
      <div className={styles.container_inner}>
      <div className={styles.header_container}>
        <nav className={styles.menu_container}>
          <Link locale={locale} href={`/${locale}`} className={styles.logo}>
            <Image
              src={"/Header/Logo.svg"}
              className={styles.logo}
              alt="Logo"
              width={50}
              height={43}
            />
          </Link>
          <Link href={"/"} className={styles.menu_item}>
            <Image
              src={"/Header/Catalog.svg"}
              className={styles.item_icon}
              alt="Catalog"
              width={22}
              height={22}
            />
            <p className={styles.title}>
              {t('Каталог')}
            </p>
          </Link>
          <Link href={`/${locale}/chats`} className={styles.menu_item}>
            <Image
              src={"/Header/Chats.svg"}
              className={styles.item_icon}
              alt="Chats"
              width={22}
              height={22}
            />
            <p className={styles.title}>{t('Чаты')}</p>
          </Link>
          <Link href={`/${locale}/bots`} className={styles.menu_item}>
            <Image
              src={"/Header/Bots.svg"}
              className={styles.item_icon}
              alt="Bots"
              width={22}
              height={22}
            />
            <p className={styles.title}>{t('Боты')}</p>
          </Link>
          <Link href={`/${locale}/articles`} className={styles.menu_item}>
            <Image
              src={"/Header/Articles.svg"}
              className={styles.item_icon}
              alt="Articles"
              width={22}
              height={22}
            />
            <p className={styles.title}>{t('Статьи')}</p>
          </Link>
        </nav>

        <div className={styles.search_container}>
          <SearchInput />
          <DropMenu />
        </div>
      </div>
      </div>
    </header>
  );
}

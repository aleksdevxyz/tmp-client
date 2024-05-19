"use client";

import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import cn from "classnames";
import { Link, usePathname } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import { switchFlag } from "@/helpers/SwitchFlag";

const active = cn(styles._active, styles.list);

export default function DropMenu() {
  
  const [activeMenu, setActiveMenu] = useState(false);
  const listRef: React.RefObject<HTMLDivElement> = React.createRef();
  const pathName = usePathname()  
  const t = useTranslations('Header')
  const locale = useLocale()
  
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
  })

  


  return (
    <>
      <ul onClick={onClickMenu} className={styles.container}>
        <li className={styles.item}>
          <Image src={`${switchFlag(locale)}`} alt="image" width={22} height={16} className={styles.image} />
          <p className={styles.title}>{t('Язык сайта')}</p>
          <Image src={'/chevron-compact-down.png'} alt="image" width={10} height={16} />
        </li>
        <div
        ref={listRef}
        onClick={onClickChild}
        className={activeMenu ? active : styles.list}
      >
        <p className={styles.header}>Язык сайта</p>
        <div className={styles.item_menu}>
        <Image src={"/Russian.svg"} width={22} height={16} alt="image" className={styles.image} />
          <Link href={`${pathName}`} locale='ru' className={styles.title_menu}>Russian</Link>
        </div>
        <div className={styles.item_menu}>
          <Image src={"/Deutsch.svg"} alt="image" width={22} height={16} className={styles.image}/>
          <Link href={'/'} locale='de' className={styles.title_menu}>Deutsch</Link>
        </div>
        <div className={styles.item_menu}>
          <Image src={"/English.svg"} alt="image" width={22} height={16} className={styles.image}/>
          <Link href={`${pathName}`} locale='en' className={styles.title_menu}>English</Link>
        </div>
        <div className={styles.item_menu}>
          <Image src={"/Español.svg"} alt="image" width={22} height={16} className={styles.image}/>
          <Link href={'/'} locale='es' className={styles.title_menu}>Español</Link>
        </div>
        <div className={styles.item_menu}>
          <Image src={"/Français.svg"} alt="image" width={22} height={16} className={styles.image}/>
          <Link href={'/'} locale='fr' className={styles.title_menu}>Français</Link>
        </div>
        <div className={styles.item_menu}>
          <Image src={"/Italiano.svg"} alt="image" width={22} height={16} className={styles.image}/>
          <Link href={'/'} locale='it' className={styles.title_menu}>Italiano</Link>
        </div>
        <div className={styles.item_menu}>
          <Image src={"/Portugal.svg"} alt="image" width={22} height={16} className={styles.image}/>
          <Link href={'/'} locale='pt' className={styles.title_menu}>Português</Link>
        </div>
      </div>
      </ul>
      
    </>
  );
}

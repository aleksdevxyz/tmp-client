"use client";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import ru from "../../../public/RU.png";
import icon from "../../../public/chevron-compact-down.png";
import Image from "next/image";
import {
  Deutsch,
  English,
  Español,
  Français,
  Italiano,
  Portugal,
} from "../svgs";
import cn from "classnames";
import Link from "next/link";

const active = cn(styles._active, styles.list);

export default function DropMenu() {
  const [activeMenu, setActiveMenu] = useState(false);
  const listRef: React.RefObject<HTMLDivElement> = React.createRef();

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
          <Image src={ru} alt="image" className={styles.image} />
          <Link href={'/'} locale='ru' className={styles.title}>Russian</Link>
          <Image src={icon} alt="image" className={styles.drop_icon} />
        </li>
        <div
        ref={listRef}
        onClick={onClickChild}
        className={activeMenu ? active : styles.list}
      >
        <p className={styles.header}>Язык сайта</p>
        <div className={styles.item_menu}>
        <Image src={ru} alt="image" className={styles.image} />
          <Link href={'/'} locale='ru' className={styles.title_menu}>Russian</Link>
        </div>
        <div className={styles.item_menu}>
          <Deutsch className={styles.image}/>
          <Link href={'/'} locale='de' className={styles.title_menu}>Deutsch</Link>
        </div>
        <div className={styles.item_menu}>
          <English className={styles.image}/>
          <Link locale='en' href={'/'} className={styles.title_menu}>English</Link>
        </div>
        <div className={styles.item_menu}>
          <Español className={styles.image}/>
          <Link href={'/'} locale='es' className={styles.title_menu}>Español</Link>
        </div>
        <div className={styles.item_menu}>
          <Français className={styles.image}/>
          <Link href={'/'} locale='fr' className={styles.title_menu}>Français</Link>
        </div>
        <div className={styles.item_menu}>
          <Italiano className={styles.image}/>
          <Link href={'/'} locale='it' className={styles.title_menu}>Italiano</Link>
        </div>
        <div className={styles.item_menu}>
          <Portugal className={styles.image}/>
          <Link href={'/'} locale='pt' className={styles.title_menu}>Português</Link>
        </div>
      </div>
      </ul>
      
    </>
  );
}

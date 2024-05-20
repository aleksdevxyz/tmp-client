"use client";

import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
import hiddenImg from "../../../../public/+18.png";
import { useLocale } from "next-intl";
import cn from "classnames";
import Modal from "../Modal/Modal";
const active = cn(styles._active, styles.dots_container);
export interface Props {
  name: string;
  description: string;
  image: string;
  subscribers: number;
  link_tg: string;
  hidden: boolean;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
  translit_name: string;
}

export default function CardInner({
  image,
  name,
  link_tg,
  description,
  subscribers,
  category,
  hidden,
}: Props) {
  const locale = useLocale();
  const [activeMenu, setActiveMenu] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  
  return (
    <>
      <Modal open={openModal} setOpen={setOpenModal} />
      <div className={styles.container}>
        <div className={styles.content}>
          <Image
            onClick={() => setActiveMenu(!activeMenu)}
            className={styles.dots}
            alt="three dots"
            src={"/три точки.svg"}
            width={24}
            height={24}
          />
          <div className={activeMenu ? active : styles.dots_container}>
            <div onClick={() => setOpenModal(true)} className={styles.option}>
              <Image
                alt="Жалоба"
                src={"/complaint.svg"}
                width={16}
                height={16}
              />
              <p className={styles.text}>Пожаловаться на страницу</p>
            </div>
            <div className={styles.option}>
              <Image alt="Жалоба" src={"/recIcon.svg"} width={16} height={16} />
              <p className={styles.text}>
                Как работают <span className={styles.link}>рекомендации?</span>
              </p>
            </div>
          </div>
          <Image
            alt="Avatar"
            className={styles.image}
            width={208}
            height={208}
            src={hidden ? hiddenImg : image}
          />
          <div className={styles.info}>
            {hidden ? (
              <>
                <p className={styles.channel_description_ban}>
                  Содержимое скрыто по причине наличия контента, нарушающего
                  законодательство
                </p>
                <hr className={styles.line} />
              </>
            ) : (
              <>
                <h3 className={styles.title}>{name}</h3>
                <div className={styles.description_container}>
                  {link_tg ? (
                    <Link className={styles.link} href={`${link_tg}`}>
                      {link_tg}
                    </Link>
                  ) : null}

                  <p className={styles.people}>{subscribers} подписчиков</p>
                  {category ? (
                    <Link
                      className={styles.category_link}
                      href={`/${locale}/category/${category.translit_name}`}
                    >
                      {category.translit_name}
                    </Link>
                  ) : null}
                </div>
                <hr className={styles.line} />
                <p className={styles.channel_description}>{description}</p>
                <Link href={link_tg} className={styles.button}>
                  Открыть канал
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
import hiddenImg from "../../../../public/+18.png";
import { useLocale } from "next-intl";
import Modal from "../Modal/Modal";
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
          <div className={styles.social_container}>
            <Link
              href={`${link_tg}`}
              target="_blank"
              className={styles.social}
            >
              <Image
                src={"/whatsup.svg"}
                alt="telegram"
                className={styles.image}
                width={28}
                height={28}
              />
            </Link>
            <Link
              href={`${link_tg}`}
              target="_blank"
              className={styles.social}
            >
              <Image
                src={"/whatsup.svg"}
                alt="telegram"
                className={styles.image}
                width={28}
                height={28}
              />
            </Link>
            <Link
              href={`${link_tg}`}
              target="_blank"
              className={styles.social}
            >
              <Image
                src={"/whatsup.svg"}
                alt="telegram"
                className={styles.image}
                width={28}
                height={28}
              />
            </Link>
            <Link
              href={`${link_tg}`}
              target="_blank"
              className={styles.social}
            >
              <Image
                src={"/whatsup.svg"}
                alt="telegram"
                className={styles.image}
                width={28}
                height={28}
              />
            </Link>
            <Link
              href={`${link_tg}`}
              target="_blank"
              className={styles.social}
            >
              <Image
                src={"/whatsup.svg"}
                alt="telegram"
                className={styles.image}
                width={28}
                height={28}
              />
            </Link>
          </div>
          <Image
            onClick={() => setOpenModal(true)}
            className={styles.dots}
            alt="three dots"
            src={"/dots.svg"}
            width={24}
            height={24}
          />
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

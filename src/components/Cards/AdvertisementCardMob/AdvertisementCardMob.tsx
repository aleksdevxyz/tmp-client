import React from 'react'
import { default as cn} from 'classnames'
import Image from 'next/image'
import styles from "./AdvertisementCardMob.module.scss";
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export interface advertisement {
  title: string;
  content: string;
  image: string;
  link: string;
}

type Props = {
  data: {
    image: string
    title: string
    link: string
    content: string
  },
  classNames?: string
}

const AdvertisementCardMob = ({ data, classNames }: Props) => {
  const { image, title, link, content } = data;
  const t = useTranslations("Card");
  const tA = useTranslations("AdvertisementCard");

  return (
    <Link href={`${link}`} className={cn(styles.ad, classNames)}>
      <Image
        className={styles.image}
        src={image}
        width={94}
        height={94}
        alt={title}
        loading='lazy'
      />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.descr}>
          {content.split("\n").map((text) => (
            <p key={text} className={styles.descr_item}>
              {text}
            </p>
          ))}
        </div>
        <p className={styles.link}>
          {t("Открыть канал")}
        </p>
      </div>
      <div className={styles.tag}>{tA("реклама")}</div>
    </Link>
  )
}

export default AdvertisementCardMob
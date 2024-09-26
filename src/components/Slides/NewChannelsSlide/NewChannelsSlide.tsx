import Link from "next/link";
import styles from "./NewChannelsSlide.module.scss";
import Image from "next/image";
import React from "react";
import zamenaImg from "../../../../public/zamena.png";

interface SlideRes {
  id: number;
  name: string;
  image: string;
  subscribers: number;
  locale: string;
}

const NewChannelsSlide: React.FC<SlideRes> = React.memo(({ id, name, image, subscribers, locale }) => {
  return (
    <Link href={`/${locale}/channel/${id}`} className={styles.item}>
      <Image
        width={46}
        height={46}
        src={image}
        alt={name}
        className={styles.image}
        loading="lazy"
        onError={(e) => {
            e.currentTarget.src = `${process.env.NEXT_PUBLIC_SITE_URL}/${zamenaImg.src}`;
            e.currentTarget.srcset = '';
        }}
        
      />
      <div className={styles.text_container}>
        <p className={styles.title}>{name}</p>
        <p className={styles.description}>{subscribers?.toLocaleString()} подписчиков</p>
      </div>
    </Link>
  );
});

NewChannelsSlide.displayName = 'NewChannelsSlide';

export default NewChannelsSlide;

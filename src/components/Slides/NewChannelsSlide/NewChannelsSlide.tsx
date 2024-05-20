import Link from "next/link";
import styles from "./index.module.scss";
import Image from "next/image";
import { useLocale } from "next-intl";

interface slideRes {
  id: number;
  name: string;
  image: string;
  subscribers: number;
}

export default function NewChannelsSlide({
  id,
  name,
  image,
  subscribers,
}: slideRes) {
  const locale = useLocale()
  return (
    <Link href={`/${locale}/channel/${id}`} className={styles.item} key={id}>
      <Image width={46} height={46} src={image} alt={name} className={styles.image} />
      <div className={styles.text_container}>
        <p className={styles.title}>{name}</p>
        <p className={styles.description}>{subscribers} подписчиков</p>
      </div>
    </Link>
  );
}

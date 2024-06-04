import Image from "next/image";
import styles from "./index.module.scss";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export interface advertisement {
  title: string;
  content: string;
  image: string;
  link: string;
}

async function GetAdvertisement() {
  const res = await fetch(`${process.env.BASE_URL}/advertisement`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

function getRandomAdvertisement(advertisements: advertisement[]) {
  const randomIndex = Math.floor(Math.random() * advertisements.length);
  return advertisements[randomIndex];
}
export default async function AdvertisementCard() {
  const data = await GetAdvertisement();
  const randomAd = getRandomAdvertisement(data);
  const t = await getTranslations("Card");
  
  const text = randomAd.content.split('\n');
  
  return (
    <>
      <div className={styles.section_mobile}>
        <Image
          className={styles.image}
          src={randomAd.image}
          width={94}
          height={94}
          alt="Advertisement"
        />
        <div className={styles.text_container}>
          <h3 className={styles.title}>{randomAd.title}</h3>
          <div className={styles.subtitle}>
         {text.map((text, index) => (
            <p key={index} className={styles.formatted_text}>{text}</p>
          ))}
          </div>
          <button className={styles.button}>
            <Link className={styles.button_link} href={`${randomAd.link}`}>
              {t("Открыть канал")}
            </Link>
          </button>
        </div>
        <p className={styles.advertisement}>#Реклама</p>
      </div>
    </>
  );
}

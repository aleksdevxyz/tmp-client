// 'use client'
import Image from "next/image";
import styles from "./AdvertisementCard.module.scss";
import Link from "next/link";
import AdvertisementCardMob from "../AdvertisementCardMob/AdvertisementCardMob";
// import { useTranslations } from 'next-intl';

export interface advertisement {
  title: string;
  content: string;
  image: string;
  link: string;
}

async function GetAdvertisement() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/advertisement`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch(error) {
    console.log(error);
  }
  return [];
}

function getRandomAdvertisement(advertisements: advertisement[]) {
  const randomIndex = Math.floor(Math.random() * advertisements.length);
  return advertisements[randomIndex];
}
export default async function AdvertisementCard() {
  const data = await GetAdvertisement();
  const randomAd = getRandomAdvertisement(data);
  // const t = useTranslations("Card");

  
  if (!randomAd)
  return <div>Empty ad</div>
  
  const text = randomAd.content.split('\n');
  
  return (
    <>
      {/* <AdvertisementCardMob data={randomAd} /> */}

      <Link href={`${randomAd.link}`} className={styles.section}>
        <Image
          className={styles.image}
          src={randomAd.image}
          width={94}
          height={94}
          alt="Advertisement"
          loading='lazy'
          
        />
        <div className={styles.text_container}>
          <p className={styles.title}>{randomAd.title}</p>
          <div className={styles.subtitle}>{text.map((text, index) => (
            <p key={index} className={styles.formatted_text}>{text}</p>
          ))}</div>
          {/* <Link className={styles.link} href={`${'link'}`}>
          {'t("Открыть канал")'}
         </Link> */}
        </div>
        <p className={styles.advertisement}>#Реклама</p>
      </Link>
    </>
  );
}

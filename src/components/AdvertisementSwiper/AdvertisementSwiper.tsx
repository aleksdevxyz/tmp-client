"use client";

import React, { useRef } from "react";
import { advertisement } from "../Cards/AdvertisementCard/AdvertisementCard";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import "swiper/css";

export default function AdvertisementSwiper({
  data,
}: {
  data: advertisement[];
}) {
  const ref = useRef<SwiperRef>(null);
  const t = useTranslations("Card");

  return (
    <Swiper
    style={{marginBottom: '12px'}}
      onSwiper={(swiper) =>
        ref.current ? (ref.current.swiper = swiper) : null
      }
      slidesPerView={1}
      loop={true}
    >
      {data.map((item, index) => {
        return (
          <SwiperSlide key={index} >
            <div className={styles.slide}>
              <Image
                className={styles.image}
                src={data[0].image}
                width={94}
                height={94}
                alt={data[0].title}
              />
              <div className={styles.text_container}>
                <p className={styles.title}>{item.title}</p>
                <div className={styles.subtitle}>
                  {item.content.split("\n").map((text, index) => (
                    <p key={index} className={styles.formatted_text}>
                      {text}
                    </p>
                  ))}
                </div>
                <button className={styles.button}>
                  <Link className={styles.button_link} href={`${item.link}`}>
                    {t("Открыть канал")}
                  </Link>
                </button>
              </div>
              <p className={styles.advertisement}>#Реклама</p>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

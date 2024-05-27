'use client'

import React, { useRef } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import styles from "./index.module.scss";


export default function SwiperRec({ data }: any) {
  const locale = useLocale()
  const t = useTranslations('Main')
  const swiperRef = useRef<SwiperRef>(null);
  return (
    <Swiper
      style={{width: '100%'}}
      onSwiper={(swiper) => {
        if (swiperRef.current) {
          swiperRef.current.swiper = swiper;
        }
      }}
      breakpoints={{
        1920:{
          slidesPerView:3,
          spaceBetween: 21,
          
        },
        480: {
          slidesPerView: 1,
        }
      }}
      loop={true}
    >
      {data.map((item:any, index:any) => {
        return <SwiperSlide className={styles.slide} key={index}>
          <Link style={{width: '100%', textDecoration: 'none'}} href={`/${locale}/articles/${item.translit_name}`} key={index} >
            <Image
              alt={item.name}
              width={366}
              height={192}
              className={styles.image}
              src={item.image}
            />
            <div className={styles.text_container}>
              <h3 className={styles.title}>{item.name}</h3>
              <p className={styles.subtitle}>{item.description}</p>
              <p className={styles.button}>{`${t('Читать дальше')} ...`}</p>
            </div>
          </Link>
        </SwiperSlide>;
      })}
    </Swiper>
  );
}

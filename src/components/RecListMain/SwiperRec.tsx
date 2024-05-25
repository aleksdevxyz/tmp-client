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
          
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 0,
        }
      }}
      spaceBetween={21}
    >
      {data.map((item:any, index:any) => {
        return <SwiperSlide style={{maxWidth: '366px',marginBottom:'29px'}} key={index}>
          <Link href={`/${locale}/articles/${item.translit_name}`} key={index} className={styles.slide}>
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

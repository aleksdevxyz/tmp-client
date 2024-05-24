"use client";

import React, { useEffect, useRef } from "react";
import { Navigation } from "swiper/modules";
import styles from "./index.module.scss";

import "swiper/css";

import { CategoryResponse } from "@/app/api/categoryApi";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import ChannelSlide from "../Slides/CategorySlide/CategorySlide";
import { AddSquare, ArrowBack, ArrowForward } from "../svgs";

type Props = {
  data: CategoryResponse[];
  count: number;
};

export default function SwiperMainComponent({ data, count }: Props) {
  const locale = useLocale();
  const t = useTranslations('Main')

  const slideRef = useRef<SwiperRef>(null);

  const [slides, setSlides] = React.useState<React.ReactNode[]>([]);

  const handlePrev = React.useCallback(() => {
    if (!slideRef.current) return;
    slideRef.current.swiper.slidePrev();
  }, []);

  const handleNext = React.useCallback(() => {
    if (!slideRef.current) return;
    slideRef.current.swiper.slideNext();
  }, []);

  useEffect(() => {
    if (data) {
      const chunkSize = 8;
      const swiperSlides: any = [];

      for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);

        const slide = (
          <SwiperSlide key={i} className={styles.slide}>
            {chunk.map(({ id, name, translit_name, channels_count }) => (
              <ChannelSlide
                key={id}
                name={name}
                id={id}
                translit_name={translit_name}
                channels_count={channels_count}
              />
            ))}
          </SwiperSlide>
        );
        swiperSlides.push(slide);
      }

      setSlides(swiperSlides);
    }
  }, [data]);

  return (
    <div className={styles.section}>
      <div className={styles.subtitle}>
        <div className={styles.subtitle_container}>
          <h3 className={styles.subtitle_text}>{t("Все категории")}</h3>
          <button className={styles.button}>
            <AddSquare className={styles.icon_add} />
            <Link href={`/${locale}/add_channel`} className={styles.button_text}>
              {t("Добавить канал")}
            </Link>
          </button>
        </div>
        <div className={styles.content_container}>
          <div className={styles.content}>
            <div className={styles.content_list}>
              <ArrowBack onClick={handlePrev} className={styles.arrow_back} />
              <Swiper
                ref={slideRef}
                onSwiper={(swiper) => {
                  if (slideRef.current) {
                    slideRef.current.swiper = swiper;
                  }
                }}
                loop={data && true}
                slidesPerView={count}
                modules={[Navigation]}
              >
                {slides}
              </Swiper>
              <ArrowForward
                onClick={handleNext}
                className={styles.arrow_forward}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useRef } from "react";
import { Navigation } from "swiper/modules";

import styles from "./index.module.scss";

import "swiper/css";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import NewChannelsSlide from "../Slides/NewChannelsSlide/NewChannelsSlide";
import Image from "next/image";
import classNames from "classnames";

type Props = {
  data: any;
  count: number;
};

export default function SwiperNewComponent({ data, count }: Props) {
  const slideNewRef = useRef<SwiperRef>(null);

  const [slidesNew, setSlidesNew] = React.useState<React.ReactNode[]>([]);

  const handlePrev = React.useCallback(() => {
    if (!slideNewRef.current) return;
    slideNewRef.current.swiper.slidePrev();
  }, []);

  const handleNext = React.useCallback(() => {
    if (!slideNewRef.current) return;
    slideNewRef.current.swiper.slideNext();
  }, []);

  useEffect(() => {
    if (data) {
      const chunkSize = 3;
      const swiperSlides: any = [];

      for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        const slide = (
          <SwiperSlide key={i} className={styles.slider}>
            {chunk.map((item: any) => (
              <NewChannelsSlide
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.image}
                subscribers={item.subscribers}
              />
            ))}
          </SwiperSlide>
        );
        swiperSlides.push(slide);
      }

      setSlidesNew(swiperSlides);
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <Image
        width={12}
        height={24}
        alt="arrow-back"
        src={"/Arrow-Back.svg"}
        onClick={handlePrev}
        className={classNames(styles.arrow_new_back, styles.arrow_new_back_visible)}
      />
      <Swiper
        ref={slideNewRef}
        onSwiper={(swiper) => {
          if (slideNewRef.current) {
            slideNewRef.current.swiper = swiper;
          }
        }}
        breakpoints={{
          1920: {
            slidesPerView: count,
          },
          480: {
            slidesPerView: 1,
            width: 366,
          }
        }}
        loop={true}
        modules={[Navigation]}
      >
        {slidesNew}
      </Swiper>
      <Image
        width={12}
        height={24}
        alt="arrow-forward"
        src={"/Arrow-forward.svg"}
        onClick={handleNext}
        className={classNames(styles.arrow_new_forward, styles.arrow_new_forward_visible)}
      />
    </div>
  );
}

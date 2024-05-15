"use client";

import React, { useEffect, useRef } from "react";
import { Navigation } from "swiper/modules";

import "swiper/css";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import ChannelSlide from "../Slides/CategorySlide/CategorySlide";
import { ArrowBack, ArrowForward } from "../svgs";

type Props = {
  data: any;
  styles: any;
  count: number;
};

export default function SwiperMainComponent({ data, styles, count }: Props) {
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
            {chunk.map((item: any) => (
              <ChannelSlide
                key={item.id}
                name={item.name}
                id={item.id}
                translit_name={item.translit_name}
                channels_count={item.channels_count}
              />
            ))}
          </SwiperSlide>
        );
        swiperSlides.push(slide);
      }

      setSlides(swiperSlides);
    }
  }, [data,styles.slide]);

  return (
    <>
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
      <ArrowForward onClick={handleNext} className={styles.arrow_forward} />
    </>
  );
}

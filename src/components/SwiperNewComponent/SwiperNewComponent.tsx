"use client";

import React, { useEffect, useRef } from "react";
import { Navigation } from "swiper/modules";

import "swiper/css";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { ArrowBack, ArrowForward } from "../svgs";
import NewChannelsSlide from "../Slides/NewChannelsSlide/NewChannelsSlide";

type Props = {
  data: any;
  styles: any;
  count: number;
};

export default function SwiperNewComponent({ data, styles, count }: Props) {
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
  }, [data,styles.slider]);

  return (
    <>
      <ArrowBack onClick={handlePrev} className={styles.arrow_back} />
      <Swiper
        ref={slideNewRef}
        onSwiper={(swiper) => {
          if (slideNewRef.current) {
            slideNewRef.current.swiper = swiper;
          }
        }}
        slidesPerView={count}
        loop={true}
        modules={[Navigation]}
      >
        {slidesNew}
      </Swiper>
      <ArrowForward onClick={handleNext} className={styles.arrow_forward} />
    </>
  );
}

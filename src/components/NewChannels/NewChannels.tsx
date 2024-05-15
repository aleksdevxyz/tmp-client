"use client";

import React, { useEffect } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import styles from "./index.module.scss";
import axios from "axios";

import "swiper/css";
import { Navigation } from "swiper/modules";
import ArrowBackWrapper from "../ArrowBackWrapper/ArrowBackWrapper";
import ArrowForwardWrapper from "../ArrowForwardWrapper/ArrowForwardWrapper";
import { SwiperOptions } from "swiper/types";
import { ArrowBack, ArrowForward } from "../svgs";

interface slidesRes {
  id: number;
  name: string;
  image: string;
  subscribers: number;
}

const swiperParams: SwiperOptions = {
    slidesPerView: 4,
    loop: true,
    navigation:{
      nextEl: styles.arrow_forward,
      prevEl: styles.arrow_back
    },
    modules: [Navigation]
  };

export default function NewChannels() {
  const [slides, setSlides] = React.useState<slidesRes[] | null>(null);

  const [swiperSlides, setSwiperSlides] = React.useState(null);

  const sliderRef = React.useRef<SwiperRef>(null);

  const handlePrev = React.useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = React.useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  useEffect(() => {
    axios
      .get("https://test-api-teleshtorm.teleshtorm.org/channels/new")
      .then((res) => {
        setSlides(res.data);
      });
  }, []);

  useEffect(() => {
    if (slides) {
      const chunkSize = 3;
      const swiperChunks: any = [];

      for (let i = 0; i < slides.length; i += chunkSize) {
        const chunk = slides.slice(i, i + chunkSize);
        const slide = (
          <SwiperSlide key={i} className={styles.slider}>
            {chunk.map((item) => (
              <div className={styles.item} key={item.id}>
                <img
                  src={item.image}
                  alt={styles.name}
                  className={styles.image}
                />
                <div className={styles.text_container}>
                  <p className={styles.title}>{item.name}</p>
                  <p className={styles.description}>
                    {item.subscribers} подписчиков
                  </p>
                </div>
              </div>
            ))}
          </SwiperSlide>
        );
        swiperChunks.push(slide);
      }

      setSwiperSlides(swiperChunks);
    }
  }, [slides]);

  return (
    <div className={styles.swipper}>
      <ArrowBack onClick={handlePrev} className={styles.arrow_back} />
      <Swiper
        ref={sliderRef}
        {...swiperParams}
        onSwiper={it => {
          if (sliderRef.current) {
            sliderRef.current.swiper = it;
          }
          
        }}
        
      >
        {swiperSlides}
      </Swiper>
      <ArrowForward
        className={styles.arrow_forward}
        onClick={handleNext}
      />
    </div>
  );
}

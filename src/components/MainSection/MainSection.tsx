"use client";

import React, { useEffect } from "react";
import styles from "./MainSection.module.scss";
import { AddSquare, ArrowBack, ArrowForward } from "../svgs";
import cn from "classnames";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Navigation } from "swiper/modules";
import axios from "axios";

interface categoriesRes {
  id: number;
  name: string;
  translit_name: string;
  channels_count: number;
}

const activeBack = cn(styles._active, styles.arrow_back);
const activeForward = cn(styles._active, styles.arrow_forward);

export default function MainSection() {
  const [arrowsActive, setArrowsActive] = React.useState(false);
  const [categories, setCategories] = React.useState<categoriesRes[] | null>(
    null
  );

  const sliderChannelsRef = React.useRef<SwiperRef>(null);

  const [swiperSlides, setSwiperSlides] = React.useState(null)

  const mainRef = React.useRef(null);

  useEffect(() => {
    axios
      .get("https://test-api-teleshtorm.teleshtorm.org/channels/categories")
      .then((res) => {
        setCategories(res.data);
      });
  }, []);

  const handlePrev = React.useCallback(() => {
    if (!sliderChannelsRef.current) return;
    sliderChannelsRef.current.swiper.slidePrev();
  }, []);

  const handleNext = React.useCallback(() => {
    if (!sliderChannelsRef.current) return;
    sliderChannelsRef.current.swiper.slideNext();
  }, []);



  useEffect(() => {
    if (categories) {
      const chunkSize = 8; 
      const swiperSlides: any = []; 
  
      
      for (let i = 0; i < categories.length; i += chunkSize) {
        const chunk = categories.slice(i, i + chunkSize); 
        const slide = (
          <SwiperSlide key={i} className={styles.slide}>
            {chunk.map((item) => (
              <div key={item.id} className={styles.list_item}>
                <a href={`/category/${item.translit_name}`} className={styles.list_title}>{item.name}</a>
                <p className={styles.list_subscribers}>{item.channels_count}</p>
              </div>
            ))}
          </SwiperSlide>
        );
        swiperSlides.push(slide); 
      }
  
      setSwiperSlides(swiperSlides);
    }
  }, [categories]);

  return (
    <div ref={mainRef} className={styles.main_section}>
      <h1 className={styles.title}>Каталог телеграм каналов</h1>
      <div className={styles.subtitle}>
        <div className={styles.subtitle_container}>
          <h3 className={styles.subtitle_text}>Все категории</h3>
          <button className={styles.button}>
            <AddSquare className={styles.icon_add} />
            <p className={styles.button_text}>Добавить канал</p>
          </button>
        </div>
        <div className={styles.content_container}>
          <ArrowBack
            onClick={handlePrev}
            className={!arrowsActive ? activeBack : styles.arrow_back}
          />
          <div className={styles.content}>
            <div className={styles.content_list}>
              <Swiper
                ref={sliderChannelsRef}
                onSwiper={swiper => {
                if (sliderChannelsRef.current){
                  sliderChannelsRef.current.swiper = swiper
                }
              }}
                slidesPerView={3}
                loop={true}
                modules={[Navigation]}
              >
                {swiperSlides}
              </Swiper>
            </div>
          </div>
          <ArrowForward
            onClick={handleNext}
            className={!arrowsActive ? activeForward : styles.arrow_forward}
          />
        </div>
      </div>
    </div>
  );
}

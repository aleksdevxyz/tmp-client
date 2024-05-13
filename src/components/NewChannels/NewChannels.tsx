"use client";

import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./index.module.scss";
import axios from "axios";

import "swiper/css";
import { Navigation } from "swiper/modules";

interface slidesRes {
  id: number;
  name: string;
  image: string;
  subscribers: number;
}

export default function NewChannels() {
  const [slides, setSlides] = React.useState<slidesRes[] | null>(null);

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
      const swiperSlides: JSX.Element[] = [];
  
      for (let i = 0; i < slides.length; i += chunkSize) {
        const chunk = slides.slice(i, i + chunkSize);
        const slide = (
          <SwiperSlide key={i} className={styles.slide}>
            {chunk.map((item) => (
              <div key={item.id} className={styles.item}>
              <img className={styles.image} src={item.image} alt={item.name} />
              <div>
                <p className={styles.title}>{item.name}</p>
                <p className={styles.description}>{item.subscribers}</p>
              </div>
            </div>
            ))}
          </SwiperSlide>
        );
        swiperSlides.push(slide);
      }
  
      setSlides(swiperSlides);

    }
  }, []);


  return (
    <>
    </>
    
    )
}
  

'use client'

import React, { useEffect } from "react";
import styles from "./index.module.scss";
import { ArrowBack, ArrowForward } from "../svgs";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import axios from "axios";
import Image from "next/image";

export interface recRes {
  name: string;
  translit_name: string;
  description: string;
  image: string;
}



export default function RecList() {
  const recRef = React.useRef<SwiperRef>(null);
  const [rec, setRec] = React.useState<recRes[] | null>(null);

  useEffect(() => {
    axios
      .get(
        "https://test-api-teleshtorm.teleshtorm.org/articles?page=0&limit=31"
      )
      .then((res) => setRec(res.data));
  }, []);

  return (
    <div className={styles.container}>
      <ArrowBack />
      <Swiper
        ref={recRef}
        slidesPerView={3}
        loop={true}
        className={styles.swiper}
      >
        {rec?.map((item) =>
          item != null ? (
            <SwiperSlide key={Math.random()} className={styles.slide}>
              <Image alt={item.name} width={366} height={192} className={styles.image} src={item.image} />
              <div className={styles.text_container}>
                <h3 className={styles.title}>{item.name}</h3>
                <p className={styles.subtitle}>{item.description}</p>
                <p className={styles.button}>Читать дальше ...</p>
              </div>
            </SwiperSlide>
          ) : (
            <SwiperSlide key={Math.random()} style={{width:'366px', height:'312px'}}>
              <div className={styles.text_container}>
                <h3 className={styles.title}></h3>
                <p className={styles.subtitle}></p>
                <p className={styles.button}></p>
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>
      <ArrowForward />
    </div>
  );
}

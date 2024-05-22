"use client";

import { useRef, useState } from "react";

import styles from "./index.module.scss";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import Link from "next/link";

import "swiper/css";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import { Category } from "@/app/[locale]/articles/page";
import { useLocale } from "next-intl";

export default function ArticleCategorySwiper({
  categories,
}: {
  categories: Category[];
}) {
  const slideRef = useRef<SwiperRef>(null);
  const { replace } = useRouter();
  const [activeCategory, setActiveCategory] = useState('');
  const locale = useLocale()

  

  const handleClick = (transilt_name: string) => {
    const params = new URLSearchParams();
    params.set("category", transilt_name);
    setActiveCategory(transilt_name);
    replace(`?${params.toString()}`);
  };

  return (
    <section className={styles.section}>
      <Swiper
        ref={slideRef}
        onSwiper={(swiper) => {
          if (slideRef.current) {
            slideRef.current.swiper = swiper;
          }
        }}
        spaceBetween={23}
        slidesPerView={7}
        className={styles.swiper}
      >
        {categories.map((category) => {
          return (
            <SwiperSlide
              key={category.id}
              onClick={() => handleClick(category.translit_name)}
              className={classNames(
                styles.slide,
                activeCategory === category.translit_name && styles.active
              )}
            >
              <Link href={`/${locale}/article/${category.translit_name}`} className={styles.link}>
                {category.name}
              </Link>
            </SwiperSlide>
          );
        })}

        <SwiperSlide
          onClick={() => handleClick("Категория 2")}
          className={styles.slide}
        >
          <Link href={"/"} className={styles.link}>
            Категория 2
          </Link>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <Link href={"/"} className={styles.link}>
            Категория 3
          </Link>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <Link href={"/"} className={styles.link}>
            Категория 4
          </Link>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <Link href={"/"} className={styles.link}>
            Категория 5
          </Link>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <Link href={"/"} className={styles.link}>
            Категория 6
          </Link>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <Link href={"/"} className={styles.link}>
            Категория 7
          </Link>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <Link href={"/"} className={styles.link}>
            Категория 1
          </Link>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

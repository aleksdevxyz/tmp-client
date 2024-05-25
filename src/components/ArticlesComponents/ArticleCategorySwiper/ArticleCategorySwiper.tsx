"use client";

import { useCallback, useRef, useState } from "react";

import styles from "./index.module.scss";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import Link from "next/link";

import "swiper/css";

import { useRouter } from "next/navigation";
import classNames from "classnames";
import { Category } from "@/app/[locale]/articles/page";
import { useLocale } from "next-intl";
import Image from "next/image";
import { Navigation } from "swiper/modules";

export default function ArticleCategorySwiper({
  categories,
}: {
  categories: Category[];
}) {
  const slideRef = useRef<SwiperRef>(null);
  const { replace } = useRouter();
  const [activeCategory, setActiveCategory] = useState("1");
  const locale = useLocale();

  const handlePrev = useCallback(() => {
    if (!slideRef.current) return;
    slideRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!slideRef.current) return;
    slideRef.current.swiper.slideNext();
  }, []);

  const handleClick = (transilt_name: string) => {
    const params = new URLSearchParams();
    params.set("category", transilt_name);
    setActiveCategory(transilt_name);
    replace(`?${params.toString()}`);
  };

  return (
    <section className={styles.section}>
      <div className={classNames(styles.arrow_prev, styles.arrow_prev_active)}>
        <Image
          onClick={handlePrev}
          src={"/arrow-sm.svg"}
          width={10}
          height={12}
          alt="arrow"
        />
      </div>
      <div className={classNames(styles.arrow_next, styles.arrow_next_active)}>
        <Image
          onClick={handleNext}
          src={"/arrow-sm.svg"}
          width={10}
          height={12}
          alt="arrow"
        />
      </div>
      <Swiper
        ref={slideRef}
        onSwiper={(swiper) => {
          if (slideRef.current) {
            slideRef.current.swiper = swiper;
          }
        }}
        breakpoints={{
          1920: {
            slidesPerView: 7,
            spaceBetween: 23,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        }}
        className={styles.swiper}
        modules={[Navigation]}
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
              <Link
                href={`/${locale}/articles/${category.translit_name}`}
                className={styles.link}
              >
                {category.name}
              </Link>
            </SwiperSlide>
          );
        })}

        <SwiperSlide
          onClick={() => handleClick("Категория 2")}
          className={classNames(
            styles.slide,
            activeCategory === "1" && styles.active
          )}
        >
          <Link href={"/"} className={styles.link}>
            Кат
          </Link>
        </SwiperSlide>
        <SwiperSlide
          onClick={() => handleClick("Категория 2")}
          className={styles.slide}
        >
          <Link href={"/"} className={styles.link}>
            Кат
          </Link>
        </SwiperSlide>
        <SwiperSlide
          onClick={() => handleClick("Категория 2")}
          className={styles.slide}
        >
          <Link href={"/"} className={styles.link}>
            Кат
          </Link>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

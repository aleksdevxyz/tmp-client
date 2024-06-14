"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
import { breakpoints } from "./constants";
import { loadCategories } from "@/app/[locale]/articles/api";

export default function ArticleCategorySwiper({
  currentCategory,
}: {
  currentCategory: string
}) {
  const slideRef = useRef<SwiperRef>(null);
  const { replace } = useRouter();
  const [activeCategory, setActiveCategory] = useState(currentCategory);
  const locale = useLocale();
  const [categories, setCategories] = useState<Category[]>([]);

  const handlePrev = useCallback(() => {
    if (!slideRef.current) return;
    slideRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!slideRef.current) return;
    slideRef.current.swiper.slideNext();
  }, []);

  const handleClick = (catId: string = "") => {
    const params = new URLSearchParams();
    if (catId.toString() == activeCategory) {
      catId = ""
      params.delete("category");
    } else {
      params.set("category", catId.toString());
    }

    setActiveCategory(catId.toString());
    replace(`?${params.toString()}`, {});
  };

  useEffect(() => {
    loadCategories().then((data: Category[]) => {
      setCategories(data);
    });
  }, [])

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
        breakpoints={breakpoints}
        className={styles.swiper}
        modules={[Navigation]}
      >
        {categories.map((category) => {
          return (
            <SwiperSlide
              key={category.id}
              onClick={() => handleClick(category.id.toString())}
              className={classNames(
                styles.slide,
                activeCategory == category.id.toString() && styles.active
              )}
            >
              <Link
                href={`/${locale}/articles/?category=${category.id}`}
                className={styles.link}
                // onClick={(event) => event.preventDefault()}
              >
                {category.name}
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
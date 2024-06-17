"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { advertisement } from "../Cards/AdvertisementCard/AdvertisementCard";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import classNames from "classnames";
import styles from "./index.module.scss";

export default function AdvertisementSwiper({
  data,
}: {
  data: advertisement[];
}) {
  const t = useTranslations("Card");
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" });

  return (
    <div className={classNames("embla", styles.embla)} ref={emblaRef}>
      <div className={classNames("embla__container", styles.embla__container)}>
        {data.map((slide) => {
          return (
            <article className={classNames("embla__slide", styles.embla__slide, styles.slide)} key={slide.link}>
              <Image
                className={styles.image}
                src={data[0].image}
                width={94}
                height={94}
                alt={data[0].title}
              />
              <div className={styles.content}>
                <h3 className={styles.title}>{slide.title}</h3>
                <div className={styles.descr}>
                  {slide.content.split("\n").map((text) => (
                    <p key={text} className={styles.descr_item}>
                      {text}
                    </p>
                  ))}
                </div>
                <Link className={styles.link} href={`${slide.link}`}>
                  {t("Открыть канал")}
                </Link>
              </div>
              <div className={styles.tag}>#Реклама</div>
            </article>
          )
        })}
      </div>
    </div>
  );
}

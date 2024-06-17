'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import styles from "./index.module.scss";
import classNames from "classnames";
import useEmblaCarousel from "embla-carousel-react";

export default function SwiperRec({ data }: any) {
  const locale = useLocale();
  const t = useTranslations('Main');
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' });

  return (
    <div className={classNames("embla", styles.embla)} ref={emblaRef}>
      <div className={classNames("embla__container", styles.embla__container)}>
        {data.map((item:any, index:any) => {
          return (
            <div className={classNames("embla__slide", styles.embla__slide, styles.slide)} key={item.name} >
              <Link style={{width: '100%', textDecoration: 'none'}} href={`/${locale}/articles/${item.translit_name}`}>
                <Image
                  alt={item.name}
                  width={366}
                  height={192}
                  className={styles.image}
                  src={item.image}
                  loading="lazy"
                />
                <div className={styles.text_container}>
                  <h3 className={styles.title}>{item.name}</h3>
                  <p className={styles.subtitle}>{item.description}</p>
                  <p className={styles.button}>{`${t('Читать дальше')} ...`}</p>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  );
}

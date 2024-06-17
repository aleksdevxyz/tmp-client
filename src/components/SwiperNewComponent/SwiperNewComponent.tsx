"use client";

import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import styles from "./index.module.scss";

import NewChannelsSlide from "../Slides/NewChannelsSlide/NewChannelsSlide";
import Image from "next/image";
import classNames from "classnames";

type Props = {
  data: any;
  count: number;
};


const splitToChunks = (data: any): React.ReactNode[] => {
  const chunkSize = 3;
  const slides: React.ReactNode[] = [];

  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);

    const slide = (
      <div className={classNames("embla__slide", styles.embla__slide)} key={i} >
        {chunk.map((item: any) => (
          <NewChannelsSlide
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            subscribers={item.subscribers}
          />
        ))}
      </div>
    );

    slides.push(slide);
  }

  return slides;
}

export default function SwiperNewComponent({ data, count }: Props) {
  const [slides, setSlides] = useState<React.ReactNode[]>([]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  useEffect(() => {
    setSlides(splitToChunks(data));
  }, []);

  return (
    <div className={styles.container}>
      <Image
        width={12}
        height={24}
        alt="arrow-back"
        src={"/Arrow-Back.svg"}
        onClick={() => emblaApi && emblaApi.scrollPrev()}
        className={classNames("embla__prev", styles.arrow, styles.arrow_prev)}
      />
      <div className={classNames("embla", styles.embla)} ref={emblaRef}>
        <div className={classNames("embla__container", styles.embla__container)}>
          {slides}
        </div>
      </div>
      <Image
        width={12}
        height={24}
        alt="arrow-forward"
        src={"/Arrow-forward.svg"}
        onClick={() => emblaApi && emblaApi.scrollNext()}
        className={classNames("embla__next", styles.arrow, styles.arrow_next)}
      />
    </div>
  );
}

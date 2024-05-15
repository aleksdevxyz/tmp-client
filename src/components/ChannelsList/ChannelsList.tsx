'use client'

import React from "react";
import styles from "./index.module.scss";
import CardWrapper from "../CardWrapper/CardWrapper";


export default function ChannelsList({channels}: any) {

  return ( 
    <section className={styles.list}>
      <div className={styles.advertisement}></div>
      {channels?.map((item: any) => {
        return (
          <CardWrapper
            key={item.id}
            title={item.name}
            count={item.subscribers}
            src={item.image}
            description={item.description}
          />
        );
      })}
    </section>
  );
}

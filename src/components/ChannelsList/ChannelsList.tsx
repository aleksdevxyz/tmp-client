'use client'

import React, { useEffect } from "react";
import styles from "./index.module.scss";
import axios from "axios";
import CardWrapper from "../CardWrapper/CardWrapper";

export interface ChannelsProps {
  id: number;
  name: string;
  hidden: boolean;
  description: string;
  image: string;
  subscribers: number;
}

export default function ChannelsList() {
  const [channels, setChannels] = React.useState<ChannelsProps[] | null>(null);

  useEffect(() => {
    axios
      .get(
        "https://test-api-teleshtorm.teleshtorm.org/channels?page=0&limit=31"
      )
      .then((res) => {
        setChannels(res.data);
      });
  }, []);

  return (
    <section className={styles.list}>
      <div className={styles.advertisement}></div>
      {channels?.map((item) => {
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

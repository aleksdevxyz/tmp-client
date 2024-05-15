'use client'

import ChannelsList from "@/components/ChannelsList/ChannelsList";
import MainSection from "@/components/MainSection/MainSection";
import styles from './page.module.scss'
import NewChannels from "@/components/NewChannels/NewChannels";
import React, { useEffect } from "react";
import axios from "axios";

export interface ChannelsProps {
  id: number;
  name: string ;
  hidden: boolean;
  description: string;
  image: string;
  subscribers: number;
}

export default function Home() {
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
    <>
      <MainSection />
      <div className={styles.section}>
        <h2 className={styles.title}>Телеграм каналы</h2>
        <ChannelsList channels={channels}/>
      </div>
      <div className={styles.section}>
        <h2 className={styles.title}>Новые каналы</h2>
        <NewChannels/>
      </div>
      <div>
        
      </div>
    </>
  );
}

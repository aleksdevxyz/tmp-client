import React from "react";
import styles from "./index.module.scss";
import CardWrapper from "../Cards/CardWrapper/CardWrapper";
import AdvertisementCard from "../Cards/AdvertisementCard/AdvertisementCard";
import AdvertisementCardMob, { advertisement } from "../Cards/AdvertisementCardMob/AdvertisementCardMob";

type ChannelsListProps = {
  data: Array<{
    id: number;
    name: string;
    subscribers: number;
    image: string;
    description: string;
  }>;
  path?: string;
  advertisement?: boolean;
};

async function GetAdvertisement() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/advertisement`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch(error) {
    console.log(error);
  }
  return [];
}

function getRandomAdvertisement(advertisements: advertisement[]) {
  const randomIndex = Math.floor(Math.random() * advertisements.length);
  return advertisements[randomIndex];
}

const ChannelsList: React.FC<ChannelsListProps> = async ({ data, path, advertisement }) => {
  let adslist: advertisement[] = [];

  if (advertisement) {
    adslist = await GetAdvertisement();
  }

  return (
    <section className={styles.list}>
      {advertisement && <AdvertisementCard />}
      {data?.map((item, index) => (
        <React.Fragment key={item.id}>
          <CardWrapper
            id={item.id}
            key={item.id}
            title={item.name}
            count={item.subscribers}
            src={item.image}
            description={item.description}
            path={path}
          />
          {adslist?.length > 0 && index === 0 && <AdvertisementCardMob data={getRandomAdvertisement(adslist)} />}
        </React.Fragment>
      ))}
    </section>
  );
};

export default ChannelsList;

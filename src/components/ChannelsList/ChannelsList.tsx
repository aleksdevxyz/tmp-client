import React from "react";
import styles from "./index.module.scss";
import CardWrapper from "../Cards/CardWrapper/CardWrapper";
import AdvertisementCard from "../Cards/AdvertisementCard/AdvertisementCard";
import AdvertisementCardMob from "../Cards/AdvertisementCardMob/AdvertisementCardMob";

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

const ChannelsList: React.FC<ChannelsListProps> = ({ data, path, advertisement }) => {
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
          {advertisement && index === 0 && <AdvertisementCardMob />}
        </React.Fragment>
      ))}
    </section>
  );
};

export default ChannelsList;

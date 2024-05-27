import styles from "./index.module.scss";
import CardWrapper from "../Cards/CardWrapper/CardWrapper";
import AdvertisementCard from "../Cards/AdvertisementCard/AdvertisementCard";


export default async function ChannelsList({data, path, advertisement}: {data:any, path?: string, advertisement?: boolean}) {
  
  return ( 
    <section className={styles.list}>
      {advertisement && <AdvertisementCard />}
      {data?.map((item: any) => {
        return (
          <CardWrapper
            id={item.id}
            key={item.id}
            title={item.name}
            count={item.subscribers}
            src={item.image}
            description={item.description}
            path={path}
          />
        );
      })}
    </section>
  );
}
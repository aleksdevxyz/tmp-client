import styles from "./index.module.scss";
import CardWrapper from "../Cards/CardWrapper/CardWrapper";


export default async function ChannelsList({data, path}: {data:any, path?: string}) {
  
  return ( 
    <section className={styles.list}>
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
import ChannelsList from "@/components/ChannelsList/ChannelsList";
import MainSection from "@/components/MainSection/MainSection";
import styles from './page.module.scss'
import NewChannels from "@/components/NewChannels/NewChannels";
import Pagination from "@/components/Pagination/Pagination";
import RecList from "@/components/RecList/RecList";

export interface ChannelsProps {
  id: number;
  name: string ;
  hidden: boolean;
  description: string;
  image: string;
  subscribers: number;
}

async function getChannelsList() {
  const res = await fetch("https://test-api-teleshtorm.teleshtorm.org/channels?page=0&limit=31")
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Home() {

  const ChannelsData = await getChannelsList()

  return (
    <>
      <MainSection />
      <div className={styles.section}>
        <h2 className={styles.title}>Телеграм каналы</h2>
        <ChannelsList data={ChannelsData}/>
      </div>
      <div className={styles.section}>
        <h2 className={styles.title}>Новые каналы</h2>
        <NewChannels/>
      </div>
      <div className={styles.counter}>
       <Pagination /> 
      </div>
      <div className={styles.section}>
        <h2 className={styles.title}>Рекомендуем почитать</h2>
        <RecList/>
      </div>
    </>
  );
}

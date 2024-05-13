import ChannelsList from "@/components/ChannelsList/ChannelsList";
import MainSection from "@/components/MainSection/MainSection";
import styles from './page.module.scss'
// import NewChannels from "@/components/NewChannels/NewChannels";

export default function Home() {
  return (
    <>
      <MainSection/>
      <div className={styles.section}>
        <h2 className={styles.title}>
        Телеграм каналы
        </h2>
      <ChannelsList/>
      </div>
      <div className={styles.section}>
      <h2 className={styles.title}>
        Новые каналы
      </h2>
      {/* <NewChannels/> */}
      </div>
    </>
  );
}

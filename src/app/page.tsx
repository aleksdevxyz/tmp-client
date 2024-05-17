import ChannelsList from "@/components/ChannelsList/ChannelsList";
import MainSection from "@/components/MainSection/MainSection";
import styles from "./page.module.scss";
import NewChannels from "@/components/NewChannels/NewChannels";
import Pagination from "@/components/Pagination/Pagination";
import RecList from "@/components/RecList/RecList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teleshtorm – поиск по Telegram каналам. Каталог телеграмм каналов.",
  description:
    "Teleshtorm – удобный поиск по телеграмм каналам, а также структурированный каталог, в котором собрано более чем 150000 Telegram каналов."
};

export interface ChannelsProps {
  id: number;
  name: string;
  hidden: boolean;
  description: string;
  image: string;
  subscribers: number;
}

async function getChannelsList(page: number) {
  const res = await fetch(
    `https://test-api-teleshtorm.teleshtorm.org/channels?page=${page}&limit=31`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}


export default async function Home({
  searchParams,
}: {
  searchParams?: {
    page?: number;
    totalPages?: number
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = Number(searchParams?.totalPages) || 4

  const ChannelsData = await getChannelsList(currentPage);

  return (
    <main>
      <MainSection />
      <div className={styles.section}>
        <h2 className={styles.title}>Телеграм каналы</h2>
        <ChannelsList data={ChannelsData} />
      </div>
      <div className={styles.section}>
        <h2 className={styles.title}>Новые каналы</h2>
        <NewChannels />
      </div>
      <div className={styles.counter}>
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
      <div className={styles.section}>
        <RecList />
      </div>
    </main>
  );
}

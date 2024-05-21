import ChannelsList from "@/components/ChannelsList/ChannelsList";
import MainSection from "@/components/MainSection/MainSection";
import NewChannels from "@/components/NewChannels/NewChannels";
import Pagination from "@/components/Pagination/Pagination";
import RecList from "@/components/RecListMain/RecListMain";
import { getTotalPages } from "@/helpers/getTotalPages";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import styles from "./page.module.scss";
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Index");
  return {
    title: t("title"),
    description: t("description"),
  };
}

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
    `${process.env.BASE_URL}/channels?page=${page}&limit=31`
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
    totalPages?: number;
  };
}) {
  const currentPage = Number(searchParams?.page) || 0;

  const ChannelsData = await getChannelsList(currentPage);

  const totalPages = await getTotalPages(currentPage, ChannelsData);
  const t = await getTranslations("Main");

  return (
    <main>
      <MainSection />
      <div className={styles.section}>
        <h2 className={styles.title}>{t("Телеграм каналы")}</h2>
        <ChannelsList path="channel" data={ChannelsData} />
      </div>
      <div className={styles.section}>
        <h2 className={styles.title}>Новые каналы</h2>
        <NewChannels />
      </div>
      <div className={styles.counter}>
        <Pagination
          data={ChannelsData}
          totalPages={totalPages}
        />
      </div>
      <div className={styles.section}>
        <RecList />
      </div>
    </main>
  );
}

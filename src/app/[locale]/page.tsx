
import ChannelsList from "@/components/ChannelsList/ChannelsList";
import MainSection from "@/components/MainSection/MainSection";
import styles from "./page.module.scss";
import NewChannels from "@/components/NewChannels/NewChannels";
import Pagination from "@/components/Pagination/Pagination";
import RecList from "@/components/RecList/RecList";
import { Metadata } from "next";
import { getTotalPages } from "@/helpers/getTotalPages";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { getToken } from "./api/getToken";
import { updateToken } from "./layout";
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
    `https://test-api-teleshtorm.teleshtorm.org/channels?page=${page}&limit=31`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}



export default async function Home({
  searchParams,
  params : {locale}
}: {
  searchParams?: {
    page?: number;
    totalPages?: number;
  }, 
  params : {locale : string}
}) {
  const currentPage = Number(searchParams?.page) || 1;

  const ChannelsData = await getChannelsList(currentPage);

  const totalPages = await getTotalPages(currentPage, ChannelsData);
  const t = await getTranslations("Main");

  return (
      <main>
        <MainSection />
        <div className={styles.section}>
          <h2 className={styles.title}>{t("Телеграм каналы")}</h2>
          <ChannelsList data={ChannelsData} />
        </div>
        <div className={styles.section}>
          <h2 className={styles.title}>Новые каналы</h2>
          <NewChannels />
        </div>
        <div className={styles.counter}>
          <Pagination
            data={ChannelsData}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
        <div className={styles.section}>
          <RecList />
        </div>
      </main>
  );
}

import ChannelsList from "@/components/ChannelsList/ChannelsList";
import MainSection from "@/components/MainSection/MainSection";
// import Pagination from "@/components/Pagination/Pagination";
import NewChannels from "@/components/NewChannels/NewChannels";
import RecList from "@/components/RecListMain/RecListMain";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import styles from "./Home.module.scss";
import dynamic from "next/dynamic";

const Pagination = dynamic(() => import("@/components/Pagination/Pagination"));

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Index");
  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    robots: {
      index: true,
      follow: true,
    },
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
  try {
    const res = await fetch(`${process.env.BASE_URL}/channels?page=${page}&limit=31`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch(error) {
    console.log(error)
  }
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

  const t = await getTranslations("Main");

  return (
    <main>
      <h1 className={styles.hidden}>Каталог Telegram-каналов и чатов</h1>
      <MainSection />
      <div className={styles.section}>
        <h2 className={styles.title}>{t("Телеграм каналы")}</h2>
        <ChannelsList advertisement={true} data={ChannelsData} />
      </div>
      <div className={styles.section}>
        <h2 className={styles.title}>{t("Новые каналы")}</h2>
        <NewChannels />
      </div>
      <div className={styles.counter}>
        <Pagination data={ChannelsData} />
        <RecList />
      </div>
    </main>
  );
}
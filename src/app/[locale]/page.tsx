//Components
import Pagination from "@/components/Pagination/Pagination";
import ChannelsList from "@/components/ChannelsList/ChannelsList";
import MainSection from "@/components/MainSection/MainSection";
import NewChannels from "@/components/NewChannels/NewChannels";
import RecList from "@/components/RecListMain/RecListMain";
import { getLocale, getTranslations } from "next-intl/server";
//Other
import { Metadata } from "next";
//server
import { getChannelsList } from "../actions";
//styles
import styles from "./Home.module.scss";


export async function generateMetadata(): Promise<Metadata> {

  const t = await getTranslations("Index");
  const locale = await getLocale();


  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    robots: {
      index: true,
      follow: true,
    },
    // openGraph: {
    //   images: [{
    //     url:`/mainPageLogo.png`,
    //     width:800,
    //     height:630,
    //     alt:'MainPageLogo'
    //   }],
    // },
  };
}


export default async function Home({searchParams,}: {searchParams?: {page?: number;totalPages?: number;};}) {

  const currentPage = Number(searchParams?.page) || 0;
  const locale = await getLocale() || "ru";

  const [ChannelsData, t] = await Promise.all([
    getChannelsList(currentPage, locale),
    getTranslations("Main")
  ]);

  return (
    <>
    <h1 className={styles.hidden}>Каталог Telegram-каналов и чатов</h1>
      <MainSection />
      <div className={styles.section}>
        <h2 className={styles.title}>{t("Телеграм каналы")}</h2>
        <ChannelsList advertisement={true} data={ChannelsData.channels} />
      </div>

      <div className={styles.section}>
        <h2 className={styles.title}>{t("Новые каналы")}</h2>
        <NewChannels />
      </div>

      <div className={styles.counter}>
        <Pagination totalPages={ChannelsData.pages} />
        <RecList />
      </div>

    </>
  );
}

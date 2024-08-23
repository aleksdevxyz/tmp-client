import ChannelsList from "@/components/ChannelsList/ChannelsList";
import { Metadata } from "next";
import styles from "./ChannelCard.module.scss";
import AdvertisementCard from "@/components/Cards/AdvertisementCard/AdvertisementCard";
import CardInner from "@/components/Cards/CardInner/CardInner";
import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs";
import { getTranslations, getLocale } from "next-intl/server";
import { getAdvertisement } from "@/app/api/GetAdvertisement";
import AdvertisementSwiper from "@/components/AdvertisementSwiper/AdvertisementSwiper";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  const data = await getChat(id);

  const t = await getTranslations("IndexChat");

  return {
    title: `${t("title", { name: data.name })}`,
    description: `${t("description")} ${data.name}. ${data.description}.`,
    keywords: `${t("keywords")}, ${data.name}`,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      images: [{
        url:`${data.image}`,
        width:128,
        height:128,
        alt:`${data.name}`
      }],
    },
    twitter: {
      card: "summary",
    },
  };
}

async function getChat(id: string) {
  const locale = await getLocale() || "ru";
  const res = await fetch(`${process.env.BASE_URL}/chat/${id}?lang=${locale}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getSimilarChats(id: string) {
  const locale = await getLocale() || "ru";
  const res = await fetch(`${process.env.BASE_URL}/chat/${id}/similar_chats?lang=${locale}`);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export default async function ChannelCard({
  params: { id },
}: {
  params: { id: string };
}) {
  const data = await getChat(id);
  const similarChannels = await getSimilarChats(id);
  const t = await getTranslations("Card");
  const advertisementData = await getAdvertisement()
  

  return (
    <div className={styles.section}>
      <h1 className={styles.hidden}>{data.name}</h1>
      <BreadCrumbs name={data.name} />
      <div className={styles.card_section}>
        <AdvertisementSwiper data={advertisementData}/>
        <CardInner
          id={id}
          hidden={data.hidden}
          category={data.category}
          subscribers={data.subscribers}
          description={data.description}
          link_tg={data.link_tg}
          username={data.username}
          name={data.name}
          image={data.image}
        />
      </div>
      <div className={styles.advertisement_section}>
        <AdvertisementCard />
        <AdvertisementCard />
      </div>
      <div className={styles.simular_section}>
        <h2 className={styles.title}>{t("Похожие каналы")}</h2>
        <ChannelsList advertisement={false} path="chats" data={similarChannels} />
      </div>
    </div>
  );
}

import ChannelsList from "@/components/ChannelsList/ChannelsList"
import { Metadata, ResolvingMetadata } from "next";
import styles from './index.module.scss'
import AdvertisementCard from "@/components/Cards/AdvertisementCard/AdvertisementCard";
import CardInner from "@/components/Cards/CardInner/CardInner";

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata>{
  const id = params.id
  const data = await getBots(id)
  
  return {
    title: `Телеграмм канал ${data.name}. Поиск по Telegram каналам. Каталог телеграмм каналов.`,
    description: data.description
  }
}
  

async function getBots(id: string) {
  const res = await fetch(`https://test-api-teleshtorm.teleshtorm.org/bot/${id}`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

async function getSimilarBots(id: string) {
  const res = await fetch(`https://test-api-teleshtorm.teleshtorm.org/bot/${id}/similar_bots`)
  if (!res.ok) {
    throw new Error(res.statusText)
  }
  return res.json()
}

export default async function BotsCard({ params: { id } }:{
  params: { id: string }
}) {
  
  const data = await getBots(id)
  const similarChannels = await getSimilarBots(id)

  return <div className={styles.section}>
    <div className={styles.card_section}>
      <CardInner hidden={data.hidden} category={data.category} subscribers={data.subscribers} description={data.description} link_tg={data.link_tg} name={data.name} image={data.image}/>
    </div>
    <div className={styles.advertisement_section}>
    <AdvertisementCard/>
    <AdvertisementCard/>
    </div>
    <div className={styles.simular_section}>
      <h2 className={styles.title}>Похожие каналы</h2>
      <ChannelsList path="bots" data={similarChannels}/>
    </div>
  </div>;
}

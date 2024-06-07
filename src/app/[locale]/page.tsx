import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import styles from './page.module.scss';

const ChannelsList = dynamic(() => import('@/components/ChannelsList/ChannelsList'));
const MainSection = dynamic(() => import('@/components/MainSection/MainSection'));
const NewChannels = dynamic(() => import('@/components/NewChannels/NewChannels'));
const Pagination = dynamic(() => import('@/components/Pagination/Pagination'));
const RecList = dynamic(() => import('@/components/RecListMain/RecListMain'));

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Index');
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
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
  const res = await fetch(`${process.env.BASE_URL}/channels?page=${page}&limit=31`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Home({ searchParams }: { searchParams?: { page?: number; totalPages?: number; }; }) {
  const currentPage = Number(searchParams?.page) || 0;

  const [ChannelsData, t] = await Promise.all([
    getChannelsList(currentPage),
    getTranslations('Main'),
  ]);

  return (
    <main>
      <MainSection />
      <div className={styles.section}>
        <h2 className={styles.title}>{t('Телеграм каналы')}</h2>
        <ChannelsList advertisement={true} data={ChannelsData} />
      </div>
      <div className={styles.section}>
        <h2 className={styles.title}>{t('Новые каналы')}</h2>
        <NewChannels />
      </div>
      <div className={styles.counter}>
        <Pagination data={ChannelsData} />
        <RecList />
      </div>
    </main>
  );
}

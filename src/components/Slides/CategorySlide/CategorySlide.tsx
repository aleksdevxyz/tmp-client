import Link from 'next/link';
import styles from './index.module.scss'
import { useLocale } from 'next-intl';
interface CategorySlideProps {
    id: string;
    name: string;
    translit_name: string;
    channels_count: number;
}
export default function CategorySlide({id, name, translit_name, channels_count}: CategorySlideProps) {

  const locale = useLocale()
  
  return (
    <div key={id} className={styles.list_item}>
      <Link href={`/${locale}/category/${translit_name}`} className={styles.list_title}>
        {name}
      </Link>
      <p className={styles.list_subscribers}>{channels_count}</p>
    </div>
  );
}

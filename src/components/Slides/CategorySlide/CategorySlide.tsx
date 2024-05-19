import Link from 'next/link';
import styles from './index.module.scss'
interface CategorySlideProps {
    id: string;
    name: string;
    translit_name: string;
    channels_count: number;
    main: boolean
}
export default function CategorySlide({id, name, translit_name, channels_count, main}: CategorySlideProps) {
  
  return (
    <div key={id} className={styles.list_item}>
      <Link href={main ? `/category/${translit_name}`: `${translit_name}`} className={styles.list_title}>
        {name}
      </Link>
      <p className={styles.list_subscribers}>{channels_count}</p>
    </div>
  );
}

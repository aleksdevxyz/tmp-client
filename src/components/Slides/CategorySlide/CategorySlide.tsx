import styles from './index.module.scss'
interface categoriesRes {
    id: number;
    name: string;
    translit_name: string;
    channels_count: number;
  }


export default function CategorySlide({id, name, translit_name, channels_count}: categoriesRes) {
  return (
    <div key={id} className={styles.list_item}>
      <a href={`/category/${translit_name}`} className={styles.list_title}>
        {name}
      </a>
      <p className={styles.list_subscribers}>{channels_count}</p>
    </div>
  );
}

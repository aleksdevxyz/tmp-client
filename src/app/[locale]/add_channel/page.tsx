import AddForm from '@/components/AddForm/AddForm'
import styles from './index.module.scss'
import { getCategory } from '../api/categoryApi';

export default async function HomePage() {
  const category = await getCategory();

  return (
    <div className={styles.section}>
        <AddForm category={category}/>
    </div>
  )
}
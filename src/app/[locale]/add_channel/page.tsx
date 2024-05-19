import AddForm from '@/components/AddForm/AddForm'
import styles from './index.module.scss'

export default function HomePage() {
  return (
    <div className={styles.section}>
        <AddForm />
    </div>
  )
}
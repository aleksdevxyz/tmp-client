import { useFormStatus } from 'react-dom'
import styles from './index.module.scss'

export default function Button({isLoading}: {isLoading: boolean}) {
  return (
    <button type="submit" className={styles.button}>
          {isLoading ? <span className={styles.loader}></span> : "Отправить"}
    </button>
  )
}

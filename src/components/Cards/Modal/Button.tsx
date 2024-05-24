import { useFormStatus } from 'react-dom'
import styles from './index.module.scss'
import { useTranslations } from 'next-intl';

export default function Button({isLoading}: {isLoading: boolean}) {
  const t = useTranslations("Modal");
  return (
    <button type="submit" className={styles.button}>
          {isLoading ? <span className={styles.loader}></span> : t('Отправить')}
    </button>
  )
}

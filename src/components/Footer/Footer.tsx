import React from 'react'
import styles from './index.module.scss'
import Link from 'next/link'


export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.paragraph}>© 2024 teleshtorm.com — поиск в Telegram, сайт не хранит персональные данные</p>
        <div className={styles.links}>
          <Link href="/" className={styles.footer__link}>Наш телеграм-канал</Link>
          <Link href="/" className={styles.footer__link}>Для правообладателей</Link>
          <Link href="/" className={styles.footer__link}>Связаться с техподдержкой</Link>
        </div>
      </div>
    </footer>

  )
}

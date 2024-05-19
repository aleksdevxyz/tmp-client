import React from 'react'
import styles from './index.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

interface CardWrapperProps {
    src: string
    title: string
    description: string
    count: number
    id: number,
}

export default function CardWrapper({src, title, description, count, id}: CardWrapperProps) {
  const locale = useLocale()

  return (
    <Link href={`/${locale}/channel/${id}`} className={styles.card}>
        <div className={styles.container}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.subtitle}>{description}</p>
            <div className={styles.container}>
                <span className={styles.count}>{count}</span>
                Подписчиков
            </div>
        </div>
        <Image width={91} height={91} className={styles.image} src={src} alt={title}/>
    </Link>
  )
}

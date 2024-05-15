import React from 'react'
import styles from './index.module.scss'

interface CardWrapperProps {
    src: string
    title: string
    description: string
    count: number
}

export default function CardWrapper({src, title, description, count}: CardWrapperProps) {
  return (
    <div className={styles.card}>
        <div className={styles.container}>
            <h4 className={styles.title}>{title}</h4>
            <p className={styles.subtitle}>{description}</p>
            <div className={styles.container}>
                <span className={styles.count}>{count}</span>
                Подписчиков
            </div>
        </div>
        <img className={styles.image} src={src} alt={title}/>
    </div>
  )
}

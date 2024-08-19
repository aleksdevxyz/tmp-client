"use client";

import React, { useState } from 'react';
import styles from './CardWrapper.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useTranslations } from "next-intl";
import zamenaImg from "../../../../public/zamena.png";

interface CardWrapperProps {
    src: string;
    title: string;
    description: string;
    count: number;
    id: number;
    path?: string;
}

export default function CardWrapper({ src, title, description, count, id, path }: CardWrapperProps) {
    const [imageSrc, setImageSrc] = useState<string>(src); // State для хранения пути изображения
    const locale = useLocale();
    const innerStyle = path === 'bots' || path === 'chats' ? { display: 'none' } : {};
    const basePath = path === 'bots' || path === 'chats' ? '' : '/channel';
    const href = `/${locale}${basePath}${path ? `/${path}` : ''}/${id}`;
    const t = useTranslations("CardWrapper");

    const handleImageError = () => {
        setImageSrc(zamenaImg.src);
    };

    return (
        <Link href={href} className={styles.card}>
            <div className={styles.container}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.subtitle}>{description}</p>
                <div className={styles.inner} style={innerStyle}>
                    <span className={styles.count}>{count}</span>
                    {t("подписчиков")}
                </div>
            </div>
            <Image
                loading='lazy'
                width={91}
                height={91}
                className={styles.image}
                src={imageSrc}
                alt={title}
                onError={handleImageError}
            />
        </Link>
    );
}

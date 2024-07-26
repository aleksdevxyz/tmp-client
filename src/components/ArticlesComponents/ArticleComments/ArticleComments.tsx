'use client'

import {useEffect, useRef} from "react";
import styles from "@/components/ArticlesComponents/ArticleContent/ArticleContent.module.scss";

export default function ArticleComments({ telegram_post_id, telegram_channel }: { telegram_post_id: number | null, telegram_channel: string | undefined }) {
    const scriptAdded = useRef(false);

    useEffect(() => {
        if (telegram_post_id) {
            if (scriptAdded.current) return;
            const script = document.createElement('script');
            script.src = "https://telegram.org/js/telegram-widget.js?22";
            script.async = true;
            script.setAttribute('data-telegram-discussion', `${telegram_channel}/${telegram_post_id}`);
            script.setAttribute('data-comments-limit', '5');
            script.setAttribute('data-color', '161B22');

            document.querySelector('.telegram-comments')?.appendChild(script);
            scriptAdded.current = true;
        }
    }, []);

    let commentsShield = null
    if (telegram_post_id){
        commentsShield = <p className={styles.comments}>Комментарии</p>
    }
    return (
        <div className="telegram-comments">
            {commentsShield}
        </div>
    );
}
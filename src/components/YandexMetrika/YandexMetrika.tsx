"use client";

import { useEffect } from 'react';
import Script from 'next/script';
import Image from 'next/image';

declare global {
    interface Window {
        ym: any;
    }
}

const YandexMetrika: React.FC = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.ym = window.ym || function () {
                (window.ym.a = window.ym.a || []).push(arguments);
            };
            window.ym(96816924, 'init', {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true
            });
        }
    }, []);

    return (
        <>
            <Script
                id="yandex-metrika-script"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
             m[i].l=1*new Date();
             for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
             k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
             (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(96816924, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
            });
          `,
                }}
            />
            <noscript>
                <div>
                    <Image
                        src="https://mc.yandex.ru/watch/96816924"
                        style={{ position: 'absolute', left: '-9999px' }}
                        alt=""
                    />
                </div>
            </noscript>
        </>
    );
};

export default YandexMetrika;

'use client'

import { useEffect } from 'react';

const YandexMetrika: React.FC = () => {
    useEffect(() => {
        const timer = setTimeout(() => {
            (function(m: any, e: Document, t: string, r: string, i: string, k?: HTMLScriptElement, a?: HTMLElement) {
                m[i] = m[i] || function() {
                    (m[i].a = m[i].a || []).push(arguments);
                };
                m[i].l = new Date().getTime();  // Приведение к числу
                for (let j = 0; j < e.scripts.length; j++) {
                    if (e.scripts[j].src === r) {
                        return;
                    }
                }
                k = e.createElement(t) as HTMLScriptElement;
                a = e.getElementsByTagName('script')[0] as HTMLElement;
                k.async = true;
                k.src = r;
                a.parentNode?.insertBefore(k, a);
            })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

            (window as any).ym(96816924, 'init', {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor:true
            });
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <noscript>
            <div>
                <img
                    src="https://mc.yandex.ru/watch/96816924"
                    style={{ position: 'absolute', left: '-9999px' }}
                    alt=""
                />
            </div>
        </noscript>
    );
};

export default YandexMetrika;

// components/GoogleTag.js
import Script from 'next/script';

const GoogleTag = () => (
    <>
        <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-WRXQCLJ2HC"
        />
        <Script
            id="google-gtag"
            dangerouslySetInnerHTML={{
                __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-WRXQCLJ2HC');
        `,
            }}
        />
    </>
);

export default GoogleTag;

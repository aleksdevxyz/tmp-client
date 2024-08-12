// components/GoogleTag.js
import Script from 'next/script';

const GoogleTag = () => (
    <>
        <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-KBE6C3VXYS"
        />
        <Script
            id="google-gtag"
            dangerouslySetInnerHTML={{
                __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-KBE6C3VXYS');
        `,
            }}
        />
    </>
);

export default GoogleTag;

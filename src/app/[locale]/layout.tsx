import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import Script from 'next/script';
import { Suspense } from 'react';
const Header = dynamic(() => import("@/components/Header/Header"));
const Footer = dynamic(() => import("@/components/Footer/Footer"));
const BurgerMenu = dynamic(() => import("@/components/BurgerMenu/BurgerMenu"));
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import YandexMetrika from '@/components/YandexMetrika/YandexMetrika';
//styles
import "./globals.scss";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

// import {Inter} from "next/font/google";
//
// const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    images: [{
      url:`${baseUrl}/opengraph-image.png`,
      width:800,
      height:418,
      alt:'MainPageLogo',
    }],
  },
};

export const viewport: Viewport ={
  width: "device-width",
  initialScale: 1,
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  
  const messages = await getMessages();
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body suppressHydrationWarning={true}>
      <Script id="metrika-counter" strategy="afterInteractive">
            {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
 
              ym(96816924, "init", {
                    defer: true,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
              });`
            }
          </Script>
          <Suspense fallback={<></>}>
            <YandexMetrika />
          </Suspense>
        <main
          id={"main"}
          style={{
            maxWidth: "100vw",
            minHeight: "100vh",
            position: "relative",
            backgroundColor: "rgb(250, 251, 254)",
          }}
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            <BurgerMenu/>
            {children}
            <Footer />
          </NextIntlClientProvider>
        </main>
      </body>
    </html>
  );
}

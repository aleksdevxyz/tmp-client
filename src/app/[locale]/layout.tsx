import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("@/components/Header/Header"));
const Footer = dynamic(() => import("@/components/Footer/Footer"));
const BurgerMenu = dynamic(() => import("@/components/BurgerMenu/BurgerMenu"));
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
//styles
import "./globals.scss";
// import {Inter} from "next/font/google";
//
// const inter = Inter({ subsets: ["latin"], display: "swap" });
const baseUrl = process.env.PUBLIC_SITE_URL;

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

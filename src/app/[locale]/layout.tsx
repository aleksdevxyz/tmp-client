import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import "normalize.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import {unstable_setRequestLocale} from 'next-intl/server';

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
};

export async function updateToken(token:string) {
  console.log(token);
  
  const res = await fetch('http://localhost:3000/ru/api/get-token', {
    method: "POST",
    headers: {},
    body: JSON.stringify({token})
  })
  // const data = await res.json();
  // return data
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
      <body suppressHydrationWarning={true} className={inter.className}>
        <main
          style={{
            maxWidth: "100vw",
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            position: "relative",
          }}
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header/>
            {children}
            <Footer />
          </NextIntlClientProvider>
        </main>
      </body>
    </html>
  );
}

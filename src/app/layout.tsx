import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import "normalize.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description:
    "Teleshtorm – удобный поиск по телеграмм каналам, а также структурированный каталог, в котором собрано более чем 150000 Telegram каналов.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body suppressHydrationWarning={true} className={inter.className}>
        <main style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}

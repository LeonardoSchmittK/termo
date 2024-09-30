import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Termorever",
  description: "Do you consider yourself good with words? Check it out...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <Script
          src="https://tools.luckyorange.com/core/lo.js?site-id=cdd7c3a6"
          strategy="afterInteractive"
          async
          defer
        />
      </Head>
      <body className={inter.className}>
        {children}

        <Script
          src="https://tools.luckyorange.com/core/lo.js?site-id=cdd7c3a6"
          strategy="lazyOnload"
          async
          defer
        />
      </body>
    </html>
  );
}

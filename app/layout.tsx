import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "구해요",
  description: "로블록스 거래 플랫폼, 구해요 (클론 UI 데모)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="text-dark-200 bg-dark-500 flex min-h-full flex-col break-keep">{children}</body>
    </html>
  );
}

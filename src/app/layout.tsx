import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { WebsiteJsonLd, OrganizationJsonLd } from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "コンビニ高タンパク飯DB | 筋トレ・ダイエットに最適な商品を検索",
  description: "セブン・ローソン・ファミマで買える高タンパク・低脂質商品を比較検索。タンパク質コスパランキングで効率的な筋トレ飯を見つけよう。",
  keywords: "コンビニ,高タンパク,筋トレ,ダイエット,サラダチキン,プロテイン,栄養成分",
  metadataBase: new URL("https://protein-conveni.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "コンビニ高タンパク飯DB",
    description: "コンビニで買える高タンパク商品のデータベース",
    url: "https://protein-conveni.com",
    siteName: "コンビニ高タンパク飯DB",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "コンビニ高タンパク飯DB",
    description: "コンビニで買える高タンパク商品のデータベース",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <WebsiteJsonLd />
        <OrganizationJsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-gray-50">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}

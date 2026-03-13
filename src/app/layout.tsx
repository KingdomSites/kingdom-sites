import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Kingdom Sites",
    template: "%s | Kingdom Sites",
  },
  description: "Professional websites that support Kingdom work in the most unreached places.",
  metadataBase: new URL("https://kingdom-sites.com"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "missionary websites",
    "ministry websites",
    "church websites",
    "unreached peoples",
    "kingdom work",
    "missions web design",
    "Christian web design",
  ],
  openGraph: {
    title: "Kingdom Sites",
    description: "Professional websites that support Kingdom work in the most unreached places.",
    url: "https://kingdom-sites.com",
    siteName: "Kingdom Sites",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kingdom Sites",
    description: "Professional websites that support Kingdom work in the most unreached places.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()` }} />
      </head>
      <body className={inter.className}>
        <AppShell>{children}</AppShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

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
  description: "Custom software solutions — websites, apps, and platforms — scoped and quoted to your needs.",
  metadataBase: new URL("https://kingdom-sites.com"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "custom software",
    "web development",
    "app development",
    "custom websites",
    "software solutions",
    "freelance developer",
    "small business software",
  ],
  openGraph: {
    title: "Kingdom Sites",
    description: "Custom software solutions — websites, apps, and platforms — scoped and quoted to your needs.",
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
      <body className={inter.className}>
        <AppShell>{children}</AppShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

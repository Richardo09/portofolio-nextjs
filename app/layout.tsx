import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Richardo Bram Barus - Portofolio",
  description:
    "Portofolio resmi Richardo Bram Barus, Web Developer yang menggunakan Next.js untuk membangun website modern.",
  keywords: [
    "Richardo Bram Barus",
    "Richardo Bram",
    "Richardo",
    "Portofolio Richardo",
    "Web Developer Indonesia",
  ],
  authors: [{ name: "Richardo Bram Barus" }],
  creator: "Richardo Bram Barus",

  icons: {
    icon: "/logo.png",
  },

  verification: {
    google: "qClfFCEolyeSbIRuXKjJxTsOx3RvncQfb67DOonBliU",
  },

  openGraph: {
    title: "Richardo Bram Barus - Portofolio",
    description:
      "Website portofolio resmi Richardo Bram Barus, Web Developer Next.js.",
    url: "https://richardobram.vercel.app",
    siteName: "Richardo Bram Barus",
    locale: "id_ID",
    type: "website",
  },
};
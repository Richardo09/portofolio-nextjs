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
  title: "Richardo Portofolio",
  description:
    "Portofolio resmi Richardo Bram Barus. Mahasiswa Teknik Informatika, Web Developer dan Android Developer.",

  keywords: [
    "Richardo",
    "Richardo Bram",
    "Richardo Bram Barus",
    "Portofolio Richardo",
    "Richardo Developer",
  ],

  authors: [{ name: "Richardo Bram Barus" }],
  creator: "Richardo Bram Barus",

  metadataBase: new URL("https://richardobram.vercel.app"),

  openGraph: {
    title: "Richardo Bram Barus",
    description:
      "Website portofolio resmi Richardo Bram Barus - Web & Android Developer",
    url: "https://richardobram.vercel.app",
    siteName: "Richardo Bram Barus",
    locale: "id_ID",
    type: "website",
  },

  icons: {
    icon: "/logo.png",
  },

  verification: {
    google: "qClfFCEolyeSbIRuXKjJxTsOx3RvncQfb67DOonBliU",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
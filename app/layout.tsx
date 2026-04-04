import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/* Inisialisasi font Geist Sans */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/* Inisialisasi font Geist Mono */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* Metadata (SEO + Verifikasi Google) */
export const metadata: Metadata = {
  title: "Richardo Bram Barus - Portofolio",
  description: "Website portofolio Richardo Bram Barus",
  icons: {
    icon: "/logo.png",
  },
  verification: {
    google: "qClfFCEolyeSbIRuXKjJxTsOx3RvncQfb67DOonBliU",
  },
};

/* Root layout */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
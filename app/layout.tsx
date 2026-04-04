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

/* Metadata untuk mengatur title, deskripsi, dan icon website */
export const metadata: Metadata = {
  title: "Richardo Bram Barus - Portofolio", // Judul tab browser
  description: "Website portofolio Richardo Bram Barus", // Deskripsi website
  icons: {
    icon: "/logo.png", // Mengambil favicon dari folder public
  },
};

/* Root layout utama yang membungkus seluruh halaman */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Body utama dengan flex layout */}
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
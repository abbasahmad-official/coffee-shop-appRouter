import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans, Italiana } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: "400"
});

const IBMPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coffee Connoisseur",
  description: "Discover Your Next Favorite Coffee Shops",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${geistSans.variable} ${IBMPlexSans.className} ${geistMono.variable} ${italiana.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

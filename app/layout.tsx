import type { Metadata } from "next";
import {  IBM_Plex_Sans} from "next/font/google";
import "./globals.css";

const IBMPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
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
       <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body
        className={` ${IBMPlexSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

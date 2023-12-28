"use client";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "./globals.css";
import '@/components/NavbarStyles.scss';

import { Providers } from "./providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Aviquo</title>
      </head>

      <body className={`min-h-screen ${inter.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

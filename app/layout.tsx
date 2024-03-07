import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

import "./globals.css";

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Aviquo</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet"/>
      </head>

      <body className={inter.className}>
          <Nav/>
          {children}
          
      </body>
    </html>
  );
}

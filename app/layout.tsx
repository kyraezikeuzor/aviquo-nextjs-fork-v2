'use client'
import './library.css'
import { Inter } from 'next/font/google'
import {usePathname} from 'next/navigation'
import Navbar from '../components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) 
{
  const pathname = usePathname();
  //Logic to determine when to show the navbar
  const showNavbar = pathname === '/' || pathname === '/database' || pathname === '/auth/login' || pathname === '/auth/signup';


  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" /> {/* IMPORTED INTER 600 TO GET A PRETTY BOLD FONT NOT THE PIXELATED DEFAULT */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap" rel="stylesheet"/>
      </head>
      <body className={inter.className}>
        {showNavbar && <Navbar/>}
        {children}
      </body>
    </html>
  )
}

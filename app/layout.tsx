'use client'
import {usePathname} from 'next/navigation'
import {Inter} from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import './globals.css'

import Navbar from '../components/Navbar'
import DashNavbar from '../components/DashNavbar'
import Sidebar from '../components/Sidebar'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname();
  const homeLayout = pathname === '/';


  return (
    <html lang="en">
      <head>
        <title>Create Next App</title>
      </head>

      {/* {homeLayout && 
      <body className={inter.className}>
        <Navbar/>
        {children}
      </body>}

      {!homeLayout && 
      <body className={`${inter.className} flex flex-row bg-[var(--clr-surface)]`}>
        <Sidebar/>
        <main className={`p-0 w-full ml-[var(--w-sidebar)]`}>
          <DashNavbar/>
          {children}
        </main>
      </body>} */}
      <body>
        {children}
      </body>
    </html>
  )
}

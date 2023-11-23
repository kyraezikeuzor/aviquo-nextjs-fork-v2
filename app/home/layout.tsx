import React from 'react'
import styles from './layout.module.css'
import Sidebar from '../../components/Sidebar'
import HomeNavbar from '../../components/HomeNavbar'

export default function Layout({children}: {children:React.ReactNode}) {
  return (
    <body>
       <Sidebar/>
       <main>
        <HomeNavbar/>
        {children}
       </main>
    </body>
  )
}

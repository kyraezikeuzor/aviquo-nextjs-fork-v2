import React from 'react'
import Sidebar from '../../components/Sidebar'
import HomeNavbar from '../../components/HomeNavbar'

export default function Layout({children}: {children:React.ReactNode}) {
  return (
    <body>
       <Sidebar/>
       <HomeNavbar/>
        {children}
    </body>
  )
}

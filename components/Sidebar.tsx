'use client'
import React, {useState, useEffect} from 'react'

import Icon from './Icon'
import Logo from './Logo'
import styles from './Sidebar.module.css'
import Link from 'next/link'

import {username} from '../lib/userData'

export default function Sidebar() {
    
    const [sidebar, setSidebar] = useState(true)

    const handleWideScreenSidebarClick = () => {
        setSidebar(!sidebar)
        
    }

    useEffect(() => {
        const handleSmallScreenShowSidebar = () => {
            

          if(window.innerWidth <= 960) {
            setSidebar(false);
          } else {
            setSidebar(true);
          }
        }
    
        //handleSmallScreenShowSidebar([])
    
        window.addEventListener('resize', handleSmallScreenShowSidebar);
        
      }, []);

  return (
    <div className='h-[100vh] border-r-2 border-[var(--clr-grey-300)] bg-[#fff] fixed flex flex-col items-center px-1'>
        
        <div className={sidebar ? `w-[var(--w-sidebar)] px-4` : `w-[50px]`}>
            <div className={`flex flex-row items-center w-full ${sidebar ? 'justify-between' : 'justify-center'} py-4`}>
                {sidebar && <Logo minimal={false}/>}
                <div className='' onClick={handleWideScreenSidebarClick}>
                    <Icon icon="sidebar" fillColor="black"/>
                </div>
            </div>
            
            
            <ul className={`${styles['sidebar__list']} ${sidebar ? '' : 'items-center'}`}>
                <li>
                    <Link href='/dashboard'>
                        <Icon icon="sidebar" fillColor="black"/>
                        {sidebar && <p>Dashboard</p>}
                    </Link>   
                </li>
                <li>
                    <Link href='/forum'>
                        <Icon icon="notifications" fillColor="black"/>
                        {sidebar && <p>Forum</p>}
                    </Link>
                </li>
                <li>
                    <Link href='/marketplace'>
                        <Icon icon="house" fillColor="black"/>
                        {sidebar && <p>Marketplace</p>}
                    </Link>
                </li>
                <li>
                    <Link href='/discover'>
                        <Icon icon="search" fillColor="black"/>
                        {sidebar && <p>Discover</p>}
                    </Link>
                    
                </li>
                <li>
                    <Link href={`/${username}`}>
                        <Icon icon="user" fillColor="black"/>
                        {sidebar && <p>Profile</p>}
                    </Link>
                </li>
                <li>
                    <Link href='/settings'>
                        <Icon icon="cog" fillColor="black"/>
                        {sidebar && <p>Settings</p>}
                    </Link>
                </li>
            </ul>
        </div>

        
        
        
    </div>
  )
}

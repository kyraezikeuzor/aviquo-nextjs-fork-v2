'use client'
import React from 'react'
import styles from './Sidebar.module.css'
import Link from 'next/link'
import Button from './Button'
import Logo from './Logo'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser, faHouse, faBriefcase, faGear, faBars} from "@fortawesome/free-solid-svg-icons";

export const Sidebar = () => {

  return (
        <div className={styles.sidebar}>
            <div className={styles.logo}>
                <Logo minimal={false} size='sm'/>
            </div>
            <div className={styles['sidebar-link-container']}>
                <Link href='/dashboard'>
                    <FontAwesomeIcon icon={faHouse} className='fa'/>
                    Home
                </Link>
                <Link href='/dashboard/discover'>
                    <FontAwesomeIcon icon={faGear} className='fa'/>
                    Discover
                </Link>
                <Link href='/dashboard/profile'>
                    <FontAwesomeIcon icon={faHouse} className='fa'/>
                    Profile
                </Link>
                <Link href='/dashboard/notifications'>
                    <FontAwesomeIcon icon={faUser} className='fa'/>
                    Notifications
                </Link>
                <Link href='/dashboard/forum'>
                    <FontAwesomeIcon icon={faBriefcase} className='fa'/>
                    Forum
                </Link>
                <Link href='/dashboard/settings'>
                    <FontAwesomeIcon icon={faGear} className='fa'/>
                    Settings
                </Link>
                
                <br/>
                
                <Button type='btn' style='p' size='md'>Log out</Button>
            </div>
        </div>

    
  )
}

export default Sidebar;

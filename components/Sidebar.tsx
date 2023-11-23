'use client'
import React, {useState} from 'react'
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
                <Link href='/home/'>
                    <FontAwesomeIcon icon={faHouse} className='fa'/>
                    Home
                </Link>
                <Link href='/home/'>
                    <FontAwesomeIcon icon={faHouse} className='fa'/>
                    Profile
                </Link>
                <Link href='/home/outreach'>
                    <FontAwesomeIcon icon={faUser} className='fa'/>
                    Initiative Guidance
                </Link>
                <Link href='/home/applications'>
                    <FontAwesomeIcon icon={faBriefcase} className='fa'/>
                    Messages
                </Link>
                <Link href='/home/settings'>
                    <FontAwesomeIcon icon={faGear} className='fa'/>
                    Notifications
                </Link>
                <Link href='/home/settings'>
                    <FontAwesomeIcon icon={faGear} className='fa'/>
                    Settings
                </Link>
                
                <Button type='btn' style='p' size='md'>Log out</Button>
            </div>
        </div>

    
  )
}

export default Sidebar;

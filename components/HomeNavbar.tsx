import React from 'react'
import styles from './Navbar.module.css'
import Link from 'next/link'
import Button from './Button'
import Logo from './Logo'

export default function HomeNavbar() {
  return (
    <nav className={styles['home-nav']}>
        <ul className='flex-row'>
            <li><Link href='/explore'>For You</Link></li>
            <li><Link href='/database'>Marketplace</Link></li>
        </ul>
    </nav>
  )
}

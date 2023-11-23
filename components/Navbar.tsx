import React from 'react'
import Link from 'next/link'
import Button from './Button'
import Logo from './Logo'
import styles from './Navbar.module.css'

export const Navbar = () => {
  return (
    <div className={styles.nav}>
        <ul className='flex-row'>
            <Logo minimal={false} size='md'/>
            <li><Link href='/explore'>About Us</Link></li>
            <li><Link href='/explore'>About Us</Link></li>
            <li><Link href='/database'>Resources</Link></li>
            <li><Link href='/explore'>About Us</Link></li>
        </ul>

        <ul className='flex-row'>
            <Link href='/auth/login'>Log in</Link>
            
            <Button path='/auth/signup' style='p' type='btn' size='md'>Sign Up</Button>
        </ul>
    </div>
  )
}

export default Navbar;
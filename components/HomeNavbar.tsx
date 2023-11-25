import React from 'react'
import Link from 'next/link'
import Button from './Button'
import Logo from './Logo'
import styles from './HomeNavbar.module.css'
import Search from './Search'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBell} from "@fortawesome/free-regular-svg-icons";

export default function HomeNavbar() {
  return (
    <nav className={styles['home-nav']}>
      <Search/>  

      <FontAwesomeIcon icon={faBell} className={styles.bell}/>
    </nav>
  )
}

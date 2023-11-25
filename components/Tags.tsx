'use client'
import React from 'react'
import styles from './Tag.module.css'

export const Tags = ({children}: {children: React.ReactNode}) => {

    return (
         <div className={styles.tags}>
            {children}
         </div>
    )
}

export default Tags;

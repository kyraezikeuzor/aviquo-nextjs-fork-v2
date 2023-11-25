'use client'
import React from 'react'
import styles from './Tag.module.css'

type TagProps = {
    children: React.ReactNode,
    type: 'not-started' | 'started' | 'progress' | 'done' | 'deadline' | 'tag'
    size: 'sm' | 'md' | 'lg'
}

export const Tag = ({children, type, size}: TagProps) => {

    return (
        <div className={`${styles.tag} ${styles[type]} ${styles[size]}`}>
            {children}
        </div>
    )
}

export default Tag;
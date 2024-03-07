import React from 'react'
import Link from 'next/link'
import styles from './Button.module.css'

type ButtonProps = {
    children: React.ReactNode,
    path?: string;
}

const Button = ({children, path}: ButtonProps) => {
    return (
        <>
            {
                path ? 
                <Link href={path}>
                    <button className={styles.button}>
                        {children}
                    </button>
                </Link>
                :
                <button className={styles.button}>
                    {children}
                </button>
            }
        </>
    )
}


export default Button;
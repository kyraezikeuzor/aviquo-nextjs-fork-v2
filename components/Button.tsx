import React from 'react';
import Link from 'next/link';
import styles from './Button.module.css';


type ButtonProps = {
    children: React.ReactNode,
    type: 'btn' | 'submit' | 'header';
    path?: string;
    style: 'p' | 's';
    size: 'sm' | 'md' | 'lg';
};


export const Button = ({
    children, 
    type,
    path,
    style, 
    size,
}: ButtonProps) => 

{

    return (
        <div className={styles['btn-container']}>
            {path ? (
                <Link href={path} className={`${styles[style]} ${styles[type]} ${styles[size]}`}>
                    <button >
                        {children}
                    </button>
                    
                </Link>
            ) : (
                <button className={`${styles[style]} ${styles[type]} ${styles[size]}`}>
                    {children}
                </button>
            )}
        </div>
        
    );
};

export default Button;
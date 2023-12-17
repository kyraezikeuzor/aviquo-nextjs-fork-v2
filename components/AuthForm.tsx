import React from 'react'
import styles from './AuthForm.module.css'
import Logo from './Logo'
import Button from './Button'

const AuthForm = ({children}: {children:React.ReactNode}) => {
  return (
    <form className={styles.form}>
        <Logo minimal={true}/>
        {children}
    </form>
  )
}

export default AuthForm;
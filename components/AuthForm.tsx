"use client"

import React from 'react'
import styles from './AuthForm.module.css'
import Logo from './Logo'
import Button from './Button'

import { useRouter } from "next/navigation";

const AuthForm = ({ children, action }: { children: React.ReactNode, action: string }) => {
  const router = useRouter();
  
  return (
    <form
      className={styles.form}
      action={action}
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await fetch(action, {
          method: "POST",
          body: formData,
          redirect: "manual"
        });

        if (response.status === 0) {
          // redirected
          // when using `redirect: "manual"`, response status 0 is returned
          return router.refresh();
        } 
      }}

    >
      <Logo minimal={true} />
      {children}
    </form>
  )
}

export default AuthForm;
import React from 'react'
import AuthForm from '../../../components/AuthForm'
import Button from '../../../components/Button'

export default function Signup() {
  return (
    <main className='align-items-center'>
        <AuthForm>
            <h1>Sign up for Aviquo</h1>
            <p>Let&apos;s get you started.</p>

            <label>Email</label>
            <input type='email'/>
            <label>Password</label>
            <input type='password'/>

            <Button type='submit' size='md' style='p'>Continue</Button>
            <p>Already have an account? <a href='/auth/login'>Sign Up</a></p>
        </AuthForm>
    </main>
  )
}

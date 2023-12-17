import React from 'react'
import AuthForm from '../../../components/AuthForm'
import Button from '../../../components/Button'

export default function Login() {
  return (
    <main className='align-items-center'>
        <AuthForm>
            <h1>Welcome back!</h1>
            <p>Welcome back! Please enter your details.</p>

            <label>Email</label>
            <input type='email'/>
            <label>Password</label>
            <input type='password'/>

            <Button type='submit' size='md' style='p'>Continue</Button>
            <p>Don&apos;t have an account? <a href='/auth/signup'>Sign Up</a></p>
        </AuthForm>     
    </main>
  )
}

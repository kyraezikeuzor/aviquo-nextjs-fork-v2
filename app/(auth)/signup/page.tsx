import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";


import React from 'react'
import AuthForm from '../../../components/AuthForm'
import Button from '../../../components/Button'

export default async function Signup()  {
  const authRequest = auth.handleRequest("GET", context);
	const session = await authRequest.validate();
  console.log(session);
	if (session) redirect("/");
  
  return (
    <main className='flex items-center justify-center min-h-screen'>
        <AuthForm action="/api/signup"> 
            <h1>Sign up for Aviquo</h1>
            <p>Let&apos;s get you started.</p>

            <label>Email</label>
            <input id="username" type='email'/>
            <label>Password</label>
            <input id="password" type='password'/>

            <Button type='btn--submit' size='btn--md' style='btn--primary'>Continue</Button>
            <p>Already have an account? <a href='/auth/login'>Sign Up</a></p>
        </AuthForm>
    </main>
  )
}

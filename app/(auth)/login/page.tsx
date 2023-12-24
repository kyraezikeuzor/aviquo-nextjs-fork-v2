import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";

import React from 'react'
import AuthForm from '../../../components/AuthForm'
import Button from '../../../components/Button'

export default async function Login() {
  const authRequest = auth.handleRequest("GET", context);
	const session = await authRequest.validate();
  console.log(session);
	if (session) redirect("/");

  return (
    <main className='flex items-center justify-center min-h-screen'>
        <AuthForm action="/api/login">
            <h1>Welcome back!</h1>
            <p>Welcome back! Please enter your details.</p>

            <label>Email</label>
            <input type='email'/>
            <label>Password</label>
            <input type='password'/>

            <Button type='btn--submit' size='btn--md' style='btn--primary'>Continue</Button>
            <p>Don&apos;t have an account? <a href='/auth/signup'>Sign Up</a></p>
        </AuthForm>     
    </main>
  )
}

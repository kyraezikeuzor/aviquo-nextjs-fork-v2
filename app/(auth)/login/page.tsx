import { auth, getPageSession } from "@/auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";

import React from 'react'
import AuthForm from '@/components/AuthForm'
import Button from '@/components/Button'

import { Input } from "@nextui-org/react";

export default async function Login() {
  const session = await getPageSession();

  if (session) redirect("/profile");

  return (
    <main className='flex items-center justify-center min-h-screen'>
      <AuthForm action="/api/login">
        <h1>Welcome back!</h1>
        <p>Welcome back! Please enter your details.</p>

        <div className="flex flex-col gap-3 w-full h-auto pb-[5%]">
          <Input id="username" name="username" type='text' label="Username" labelPlacement="outside" />
          <Input id="password" name="password" type='password' label="Password" labelPlacement="outside" />

        </div>

        <Button type='btn--submit' size='btn--md' style='btn--primary'>Continue</Button>
        <p>Don&apos;t have an account? <a href='/auth/signup'>Sign Up</a></p>
      </AuthForm>
    </main>
  )
}

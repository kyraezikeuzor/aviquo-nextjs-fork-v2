import { auth, getPageSession } from "@/auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";


import React from 'react'
import AuthForm from '@/components/AuthForm'
import Button from '@/components/Button'

import { Input } from "@nextui-org/react";

export default async function Signup() {
  const session = await getPageSession();

  if (session) redirect("/");

  return (
    <main className='flex items-center justify-center min-h-screen'>
      <AuthForm action="/api/signup">
        <h1>Sign up for Aviquo</h1>
        <p>Let&apos;s get you started.</p>
        <div className="flex flex-col gap-3 w-full h-auto pb-[5%]">
          <Input id="username" name="username" type='text' label="Username" labelPlacement="outside" />
          <Input id="password" name="password" type='password' label="Password" labelPlacement="outside" />
          <Input id="first_name" name="first_name" type='text' label="First Name" labelPlacement="outside" />
          <Input id="last_name" name="last_name" type='text' label="Last Name" labelPlacement="outside" />
          <Input id="email" name="email" type='email' label="Email" labelPlacement="outside" />
        </div>

        <Button type='btn--submit' size='btn--md' style='btn--primary'>Sign Up</Button>
        <p>Already have an account? <a href='/login'>Log In</a></p>
      </AuthForm>
    </main>
  )
}

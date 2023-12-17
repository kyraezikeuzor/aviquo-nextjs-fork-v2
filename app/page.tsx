import Image from 'next/image'
import Link from 'next/link'
import Button from '../components/Button'

export default function Home() {
  return (
    <main className="flex flex-col gap-5">
      <header className='flex flex-col gap-5 items-center text-center '>
        <Button type='' style='btn--secondary' size='btn--md'>Get on the Waitlist →</Button>
        <h1 className='w-full md:w-full lg:w-4/5'>Aviquo is the #1 Platform for managing student life</h1>
        <p className='text-[var(--clr-grey-500)] font-normal text-center w-full md:w-full lg:w-3/4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
        <div className='flex gap-5 items-center'>
          <Button type='' style='btn--primary' size='btn--md'>Sign Up</Button>
          <Link href='/signup' className='font-semibold'>Get Started →</Link>
        </div>
      </header>
        
    </main>
  )
}

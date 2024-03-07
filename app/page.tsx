import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";

import Link from 'next/link'
import AuthForm from "@/components/AuthForm";
import Button from '@/components/Button'
import Icon from '@/components/Icon'



const Page = async () => {
  return (
    <main className='px-[2vw] md:px-[8vw] py-[6vh]'>
      <header className='h-[100vh] py-[10vh] flex flex-col items-center gap-5'>
        <span className='w-fit text-xs md:text-sm  whitespace-nowrap border border-[--clr-base-accent] rounded-2xl py-1 px-4 text-center font-medium'>
            Submit a Program to Aviquo 🡪
        </span>
        <h1 className='text-5xl md:text-6xl lg:text-8xl text-center tracking-tighter'>
          Find your passions with Aviquo
        </h1>
        <p className='text-center'> Join the team behind the fastest-growing extracurricular database in the world.</p>
        <div className='flex flex-row gap-4 items-center justify-center'>
          <Link href='/about'>Learn More</Link>
          <Button>Get Started</Button>
        </div>
      </header>

      <section className='px-[4vw] flex flex-col items-center gap-5'>
        <h2 className='text-2xl md:text-3xl lg:text-4xl text-center'>Finding Extracurriculars and <br/> Internships has never been <br/> easier.</h2>
        <p className='text-base'>Talem makes searching for Extracurriculars and Internships easier by allowing you to sort and filter through our massive database of over 500+ items.</p>
        
        <section className='flex flex-col  md:grid grid-rows-2 grid-cols-2 gap-5'>
            <div className='flex flex-row items-start gap-5'>
                <div>
                  <Icon size='lg' icon="Check"/>
                </div>
                <div className='flex flex-col '>
                    <span className='text-lg font-semibold'>One Massive Database</span>
                    <p className='text-base'>Talem boats a massive database with over 100+ extracurriculars and internships for you to search and sort through. Finding what you liked has never been easier.</p>
                </div>
            </div>
            <div className='flex flex-row items-start gap-5'>
                <div>
                  <Icon size='lg' icon="Check"/>
                </div>
                <div className='flex flex-col'>
                    <span className='text-lg font-semibold'>One Massive Database</span>
                    <p className='text-base'>Talem boats a massive database with over 100+ extracurriculars and internships for you to search and sort through. Finding what you liked has never been easier.</p>
                </div>
            </div>
            <div className='flex flex-row items-start gap-5'>
                <div>
                  <Icon size='lg' icon="Check"/>
                </div>
                <div className='flex flex-col'>
                    <span className='text-lg font-semibold'>One Massive Database</span>
                    <p className='text-base'>Talem boats a massive database with over 100+ extracurriculars and internships for you to search and sort through. Finding what you liked has never been easier.</p>
                </div>
            </div>
            <div className='flex flex-row items-start gap-5'>
                <div>
                  <Icon size='l' icon="Check"/>
                </div>
                <div className='flex flex-col '>
                    <span className='text-lg font-semibold'>One Massive Database</span>
                    <p className='text-base'>Talem boats a massive database with over 100+ extracurriculars and internships for you to search and sort through. Finding what you liked has never been easier.</p>
                </div>
            </div>
        </section>
      </section>
    </main>
  );
};

export default Page;

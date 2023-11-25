import Image from 'next/image'
import Button from '../components/Button'
import Navbar from '../components/Navbar'
import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <header>
        <Button size='md' style='p' type='header'>Join the waitlist →</Button>
        <h1>Meet Aviquo, the #1 platform for <span>managing student life</span></h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris </p>
        <div className='flex-row'>
            <Button path='/dashboard' type='btn' size='md' style='p'>Learn More</Button>
            <Link href='/auth/login'>Let&apos;s Get Started →</Link>
        </div>
      </header>
      
        <img src='https://www.aviato.co/static/media/Demo.c903cc4e2899c668d7bb.png' className={styles['landing-main-img']}/>
      
      <section>
        <article className={styles['article-card']}>
          <h2>Manage college applications</h2>
          <p>Discover emerging talent and new companies first. Get alerts on fresh opportunities, never miss out on hot deals.</p>
          <img src='https://www.aviato.co/static/media/Semantic%20Search.a64aaa04e7cae854aefe.png'/>
        </article>
      </section>
      <section >
          <article className={styles['article-card']}>
            <h2>Explore extracurriculars</h2>
            <p>Discover emerging talent and new companies first. Get alerts on fresh opportunities, never miss out on hot deals.</p>
            <img src='https://www.aviato.co/static/media/Feed.cfb03c9e517107a733c7.png'/>
          </article>
          <article className={styles['article-card']}>
            <h2>Find your future career</h2>
            <p>Discover emerging talent and new companies first. Get alerts on fresh opportunities, never miss out on hot deals.</p>
            <img src='https://www.aviato.co/static/media/Feed.cfb03c9e517107a733c7.png'/>
          </article>
      </section>
    </main>
  )
}

import React from 'react'
import styles from './profile.module.css'
import Card from '../../../components/Card'
import ProfilePicture from '@/components/ProfilePicture'
import PostCard from '@/components/PostCard'
import Tags from '@/components/Tags'
import Tag from '@/components/Tag'

export default function ProfilePage() {
  return (
    <main className={styles.main}>
        <section>
          <div className='flex-row'>
            <ProfilePicture size='md'/>
            <div>
              <h1>Username</h1>
              <h2>First name</h2>
              <div className='flex-row'>
                <p>29 followers</p>
                <p>29 following</p>
              </div>
              <div>
              24. Amogus Enjoyer. Sussy baka. Aviquo enthusiast.
              </div>
            </div>
          </div>
        </section>
          <h1>Username's Posts</h1>
          <PostCard path='/'poster='username' title='Help me' text='What is Aviquo? My friends told me about it, but I don’t really understand it. Can someone help me? For context, I am a highschool freshman and was told that this platform would set me...'  views={45} likes={34} comments={56} tags={['Engineering', 'Business']}/>
          <PostCard path='/'poster='username' title='Help me' text='lorem ipsum' views={45} likes={34} comments={56} tags={['Engineering', 'Business']}/>
        
        
          <h1>Followed Extracurriculars</h1>
          <Card size='lg'>
            <h3>Example Extracurricular</h3>
            <p><b>467576</b> follows</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et </p>
            <Tags>
              <Tag type='tag' size='md'>Engineering</Tag>
              <Tag type='tag' size='md'>Juniors</Tag>
              <Tag type='tag' size='md'>Admission Advice</Tag>
              <Tag type='tag' size='md'>College</Tag>
              <Tag type='tag' size='md'>Scholarships</Tag>
              <Tag type='tag' size='md'>Nonprofits</Tag>
            </Tags>
          </Card>
        
    </main>
  )
}

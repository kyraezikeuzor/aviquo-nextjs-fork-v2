import React from 'react'
import styles from './profile.module.css'
import Card from '../../../components/Card'
import ProfilePicture from '@/components/ProfilePicture'
import PostCard from '@/components/PostCard'
import Tags from '@/components/Tags'
import Tag from '@/components/Tag'

import userPostsData from '../../../lib/userPosts.json'
import userEcsData from '../../../lib/userEcs.json'

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
          <h1>Username&apos;s Posts</h1>

          {userPostsData.map((item,index)=>(
            <PostCard
                key={item.id}
                poster={'User'}
                title={item.title}
                text={item.body}
                views={item.views}
                likes={item.likes}
                comments={item.comments}
                path={`/posts/${item.id}`}
                tags={item.tags}
              />
          ))}
          
        
          <h1>Followed Extracurriculars</h1>

          


          <Card >
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

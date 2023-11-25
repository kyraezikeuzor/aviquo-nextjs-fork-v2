import React from 'react'
import styles from './dashboard.module.css'
import Link from 'next/link'
import Card from '../../components/Card'
import PostCard from '../../components/PostCard'
import ProfilePicture from '../../components/ProfilePicture'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShareFromSquare, faGear, faHouse} from "@fortawesome/free-solid-svg-icons";
import Tags from '../../components/Tags'
import Tag from '../../components/Tag'
import Button from '../../components/Button'

import userData from '../../lib/user.json'
import userEcData from '../../lib/userEcs.json'
import userPostsData from '../../lib/userPosts.json'
import allPosts from '../../lib/allPosts.json'

export default function Home() {
  return (
    <main className={`${styles.main} ${styles['dashboard-content-container']}`}>
      <section className={styles['dashboard-content']}>
        <h1>Welcome back, Soham!</h1>
          
          <section >
            <section >
              <h2>Top Opportunities</h2>
              <section className={styles.gallery}>
                {userEcData.map((item,index)=>(
                  <Card size='md'>
                  <h3>{item.name}</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                  <Tags>
                    <Tag type='tag' size='sm'>Global</Tag>
                    <Tag type='tag' size='sm'>All Skill</Tag>
                    <Tag type='tag' size='sm'>All Grades</Tag>
                    <Tag type='tag' size='sm'>Hybrid</Tag>
                  </Tags>
                  <Button style='p' type='submit' size='sm'>Visit Website <FontAwesomeIcon icon={faShareFromSquare} className='fa'/></Button>
                </Card>
                ))}

              </section>
              <Link href='/my/list'>Go to full list →</Link>
            </section>

            <section>
              <h2>Recent Forum Posts</h2>
              {allPosts.map((item,index)=>(
                <PostCard
                poster={item.username}
                title={item.title}
                text={item.body}
                views={item.views}
                likes={item.likes}
                comments={item.comments}
                path={`/posts/${item.id}`}
                tags={item.tags}
              />
              ))}
              
            </section>

          </section>
        
      </section>
      
      <aside className={`${styles['dashboard-profile-aside']} ${styles['dashboard-content']} `}>

        <Card size='lg'>
          <ProfilePicture size='lg'/>
          <h3>Soham Bossman</h3>
          <p>Member since July 2023.</p>
          <br/>
          <div className={`flex-col`}>
            <p ><FontAwesomeIcon icon={faShareFromSquare} className='fa'/>3 posts</p>
            <p><FontAwesomeIcon icon={faShareFromSquare} className='fa'/>0 questions answered</p>
          </div>
          <br/>
          
          <Button path='/dashboard/profile' size='md' type='submit' style='s'>Go to Full Profile</Button>
        </Card>
        <Card size='lg'>
          <h3>Interests</h3>
          <Tags>
              <Tag type='tag' size='md'>🌎 Engineering</Tag>
              <Tag type='tag' size='md'>🩷 Juniors</Tag>
              <Tag type='tag' size='md'>🥴 Admission Advice</Tag>
              <Tag type='tag' size='md'>😈 College</Tag>
              <Tag type='tag' size='md'>🩷 Scholarships</Tag>
              <Tag type='tag' size='md'>🌎 Nonprofits</Tag>
          </Tags>
        </Card>
        
      </aside>
    </main>

  )
}

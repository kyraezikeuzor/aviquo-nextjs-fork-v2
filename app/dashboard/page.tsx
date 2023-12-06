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
import userInterestData from '../../lib/userInterests.json'
import userUsername from '../../lib/userUsername.json'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Welcome back, <span className='text-important'>{userUsername}</span></h1>
      <section className={styles['dashboard-content-container']}>
          
          <section className={styles['dashboard-section']}>

            <div className={styles['dashboard-section-content']}>
              <h2>Top Opportunities</h2>
                <section className={styles.gallery}>
                  {userEcData.map((item,index)=>(
                    <Card key={item.id}>
                    <h3>{item.name}</h3>
                    <Tags>
                      <Tag type='tag' size='md'>Global</Tag>
                      <Tag type='tag' size='md'>All Skill</Tag>
                      <Tag type='tag' size='md'>All Grades</Tag>
                      <Tag type='tag' size='md'>Hybrid</Tag>
                    </Tags>
                    <Button style='p' type='btn' size='sm'>Visit Website <FontAwesomeIcon icon={faShareFromSquare} className='fa'/></Button>
                  </Card>
                  ))}

                </section>
            </div>
            <div className={styles['dashboard-section-content']}>
              <h2>Recent Forum Posts</h2>
              
              <section>
              {allPosts.map((item, index) => (
                <PostCard
                  key={item.id}  
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
              
            </div>
          </section>

          <aside className={styles['dashboard-section']}>
          <Card>
            <ProfilePicture size='lg'/>
            <h3>Soham Bossman</h3>
            <>Member since July 2023.</>
            <br/>
            {/*<div className={`flex-col`}>
              <p ><FontAwesomeIcon icon={faShareFromSquare} className='fa'/>3 posts</p>
              <p><FontAwesomeIcon icon={faShareFromSquare} className='fa'/>0 questions answered</p>
            </div>
                <br/>*/}
            
            <Button path='/dashboard/profile' size='md' type='submit' style='s'>Go to Full Profile</Button>
          </Card>
          <Card>
            <h3>Interests</h3>
            <Tags>
              
              {userInterestData && userInterestData.map((item,index)=>(
                <Tag key={index} type='important' size='md'>{item}</Tag>
              ))}
              
            </Tags>
          </Card>
          </aside>
      </section>
    </main>

  )
}

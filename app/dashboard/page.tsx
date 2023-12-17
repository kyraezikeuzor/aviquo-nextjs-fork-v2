import React from 'react'
import Card from '../../components/Card'
import styles from './page.module.css'
import Tag from '../../components/Tag'
import Button from '../../components/Button'

import friendsList from '../../lib/friends.json'
import interestList from '../../lib/interests.json'
import userPosts from '../../lib/userPosts.json'

import Icon from '../../components/Icon'

import {username} from '../../lib/userData'

export default function Dashboard() {
  return (
    <main className={styles.main}>
        <section className='flex flex-col gap-8 px-[5vw]'>
            <h1 className='text-2xl md:text-3xl lg:text-4xl'>Welcome back, Soham!</h1>
            
            <div className='flex flex-wrap gap-3'>
                {interestList.map((item,index)=>(
                    <div className='flex gap-2 items-center justify-center text-center bg-[#fff] p-2 border-2 border-[var(--clr-grey-300)] rounded-xl'>
                        <img className='w-6' src={item.img}/>
                        <p className='font-medium'>{item.name}</p>
                    </div>
                ))}
               
            </div>

            <h6>Activity List</h6>
            <div className='flex gap-8'>
                <Card>
                    <p className='font-semibold text-[var(--fs-400)]'>Research Science Institute</p>
                    <p className='text-xs md:text-sm lg:text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna mauris, lobortis non dolor non, mattis vulputate nisi. </p>
                    <div className='flex flex-wrap gap-2'>
                      <Tag type='pink'>Activity</Tag>
                      <Tag type='tag'>Global</Tag>
                      <Tag type='orange'>All Grades</Tag>
                    </div>
                </Card>
                <Card>
                    <p className='font-semibold text-[var(--fs-400)]'>Research Science Institute</p>
                    <p className='text-xs md:text-sm lg:text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna mauris, lobortis non dolor non, mattis vulputate nisi. </p>
                    <div className='flex flex-wrap gap-2'>
                      <Tag type='pink'>Activity</Tag>
                      <Tag type='tag'>Global</Tag>
                      <Tag type='orange'>All Grades</Tag>
                    </div>
                </Card>
            </div>

            <h6>Recent Posts</h6>
            <div className='flex flex-col gap-2'>
                {userPosts.map((item,index)=>(
                    <Card>
                        <p className='font-semibold text-[var(--fs-400)]'>{item.title}</p>
                        <p className='text-xs md:text-sm lg:text-sm'>{item.body}</p>
                    </Card>
                ))}
            </div>
        </section>
        

        <aside className='bg-[#fff] h-fit-content rounded-xl py-8 flex flex-col items-center gap-5 border-2 border-[var(--clr-grey-300)]'>
            <img className='rounded-full' src='https://lh3.googleusercontent.com/a/AAcHTtdyLYM4FwQTKzzM2orCp0ehNswbQ6cQywaFN-fNlCZU9w=s96-c'/>
            <div className='rounded-lg flex flex-col gap-5'>
                <h2 className='text-lg md:text-xl lg:text-2xl'>@{username}</h2>

                <Card>
                    <span className="flex items-center gap-1">
                        <Icon icon="notification-bell" fillColor="#0ABA69"/>
                        <p><b>10</b> answers</p>
                    </span>
                    <span className="flex items-center gap-1">
                        <Icon icon="check" fillColor="#0ABA69"/>
                        <p><b>2</b>  most helpful answers</p>
                    </span>
                    <span className="flex items-center gap-1">
                        <Icon icon="arrow-up" fillColor="#0ABA69"/>
                        <p><b>102</b>  upvotes received</p>
                    </span>
                </Card>
            </div>
            
            <div className='flex flex-col gap-5'>
                <h6 className='text-base'>Friends</h6>
                <div className='bg-[var(--clr-grey-200)] p-2 rounded-lg'>
                    {friendsList.map((item,index)=>(
                    <div key={index} className='flex items-center gap-2 justify-between border-b-2 border-[var(--clr-grey-300)] p-3'>
                        <div className='flex items-center gap-2'>
                            <img className='rounded-full w-10 h-auto' src='https://lh3.googleusercontent.com/a/AAcHTtdyLYM4FwQTKzzM2orCp0ehNswbQ6cQywaFN-fNlCZU9w=s96-c'/>
                            <div className='flex flex-col'>
                                <p className='font-semibold'>{item.name}</p>
                                <p>Friend</p>
                            </div>
                        </div>
                        <Button type='' style='btn--secondary' size='btn--sm'>Following</Button>
                    </div>
                    ))}
                    
                </div>
            </div>
        </aside>
    </main>
  )
}


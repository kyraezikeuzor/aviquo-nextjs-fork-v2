'use client'
import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Card from '../../../components/Card'

import users from '../../../lib/users.json'
import posts from '../../../lib/allPosts.json'
import Tag from '../../../components/Tag'

import {getPath} from '../../../lib/utilities'

import Icon from '../../../components/Icon'

import Button from '../../../components/Button'

type Params = {
    params: {
        question_name:string;
    }
}


export default function ForumPost({params: {question_name}}: Params) {
    const [post, setPost] = useState<Post | null>(null);

  useEffect(()=>{
    for (let i = 0; i < posts.length; i++) {
      if (`${getPath(posts[i].title)}` === `/${question_name}`) {
        setPost(posts[i])
      }
    }
  })

  const postTitle = post ? post.title : '';
  const postLikes = post ? post.likes : '';
  const userId = post ? post.userId : '';
  const postDate = post ? post.date : '';
  const postTags: any[] = post ? post.tags : [];
  const postBody = post ? post.body : [];
  const postCommentsCount = post ? post.comments : 0;

  return (
    <main className='flex flex-col px-[10vw] gap-5'>
        <Link href='/marketplace' className='hover:bg-[var(--clr-grey-200)] rounded-xl cursor-pointer text-xs md:text-sm lg:text-sm items-center text-[var(--clr-blue-400)] font-semibold flex gap-2'><Icon icon="arrow-left" fillColor="#3981F6"/> Back to Marketplace</Link>
        
        <Card>
            <div className='flex gap-10'>
                <div className='flex flex-col items-center text-xs md:text-sm lg:text-sm'>
                    <Icon icon="arrow-up" fillColor="black"/>
                    {postLikes}
                    <Icon icon="arrow-down" fillColor="black"/>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='flex gap-2'>
                        @kyraezikeuzor
                        <Tag type='tag'>0 answers, 7 votes</Tag>
                        <Tag type='green'>{postDate}</Tag>
                        
                        
                    </div>
                    <h1 className='text-xl md:text-3xl lg:text-4xl'>{postTitle}</h1>
                    <p className='text-sm md:text-base lg:text-base'>{postBody}</p>
                    
                    <div className='flex flex-wrap mb-10'>
                        {postTags.map((item,index)=>(
                            <Tag key={index} type='tag'>{item}</Tag>
                        ))}
                    </div>
                    <Button type='' style='btn--primary' size='btn--sm'>Add a reply</Button>
                
                </div>

                
            </div>

            
            
        </Card>
    </main>
  )
}

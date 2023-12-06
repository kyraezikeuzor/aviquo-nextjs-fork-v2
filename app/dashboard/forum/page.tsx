import React from 'react'
import styles from './forum.module.css'
import allPosts from '../../../lib/allPosts.json'
import PostCard from '../../../components/PostCard'

export default function ForumPage() {
  return (
    <main className={styles.main}>
      <h1>My Feed</h1>
        {allPosts.map((item,index)=>(
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
    </main>
  )
}

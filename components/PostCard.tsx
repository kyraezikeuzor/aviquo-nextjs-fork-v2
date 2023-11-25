import React from 'react'
import styles from './PostCard.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShareFromSquare, faComment, faHeart, faEye} from "@fortawesome/free-solid-svg-icons";
import Tags from './Tags'
import Tag from './Tag'
import Link from 'next/link'

type PostCardProps = {
    poster: string,
    path: string,
    title: string,
    text: string,
    views: number,
    likes: number,
    comments: number,
    tags: string[]
}

export default function PostCard({poster, path, title, text, views, likes, comments, tags}: PostCardProps) {
  return (
    <article className={styles['post-card']}>
        
        <h3>{title} <Link href={path ? path : '/'}></Link></h3>
        <Tags>
            <Tag type='tag' size='sm'><FontAwesomeIcon icon={faEye}/> {views}</Tag>
            <Tag type='tag' size='sm'><FontAwesomeIcon icon={faHeart}/> {likes}</Tag>
            <Tag type='tag' size='sm'><FontAwesomeIcon icon={faComment}/> {comments}</Tag>
        </Tags>
        <p>{text}</p>
        <Tags>
            {tags && tags.map((item,index)=>(
                <Tag key={index} type='tag' size='sm'>{item}</Tag>
            ))}
        </Tags>
        <p>Posted by <b>{poster}</b></p>
    </article>
  )
}

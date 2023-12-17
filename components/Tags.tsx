'use client'
import React from 'react'
import styles from './Tag.module.css'
import Tag from './Tag'

type TagsTypes = {
    children: React.ReactNode
}

export const Tags = ({children}: TagsTypes) => {

    let itemList: any[];
    let tagList: any[] | string;

    if (children) {
        itemList = children.toString().trim().split(", ");

        tagList = itemList.map((item,index)=>{
            return <Tag type='tag' key={index}>{item}</Tag>
         })
    }
    else {
        itemList = [];
        tagList = "";
    }


    return (
         <div className={styles.tags}>
            {tagList}
         </div>
    )
}

export default Tags;

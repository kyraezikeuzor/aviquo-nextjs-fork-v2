'use client'
import React, {useState} from 'react'
import Link from 'next/link'
import SearchBar from '@/components/SearchBar'
import Card from '@/components/Card'

import Tag from '@/components/Tag'
import Modal from '@/components/Modal'

import ecItems from '@/lib/ecItems.json'


import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {getPath} from '@/lib/utilities'

export default function Discover() {

    const [searchText, setSearchText] = useState('');

      const searchDataFiltered = [];
      for (let i = 0; i < ecItems.length; i++) {
          if (ecItems[i].name.toLowerCase().includes(searchText.toLowerCase())) {
            searchDataFiltered.push(ecItems[i]);
          }
      }
    


  return (
    <main className='flex flex-col gap-5 px-1/6 md:px-[10vw] lg:px-[10vw]'>
        <div className='flex flex-col gap-2'>
            <h1 className='text-2xl md:text-3xl lg:text-4xl'>Discover</h1>
            <p>Discover new opportunities and activities.</p>
            <SearchBar placeholder="Search"  searchFunction={setSearchText} />

            

        </div>

        <div className='flex flex-row flex-wrap gap-3'>
            {searchDataFiltered.map((item,index)=>(
                <Card key={index}>
                    <h2 className='text-base md:text-lg lg:text-xl'>{item.name}</h2>
                    <p className='text-sm'>{item.description}</p>
                    <div className='flex flex-wrap'>
                        <Tag type='pink'>{item.type}</Tag>
                        <Tag type='pink'>{item.location}</Tag>
                        <Tag type='green'>{item.education}</Tag>
                        <Tag type='orange'>{item.duration}</Tag>
                        <Tag type='tag'>{item.subjects}</Tag>
                        
                    </div>
                </Card>
            ))}
        </div>
        
    </main>
  )
}
'use client'
import React, {useState} from 'react'

import opps from '@/lib/opps.json'

export default function SearchBar() {

    const [searchQuery, setSearchQuery] = useState('')
    const searchResults = [];
    
    for (let i = 0; i < opps.length; i++) {
        if (searchQuery && opps[i].Name.toLowerCase().includes(searchQuery.toLowerCase())) {
            searchResults.push(opps[i].Name)
        }
    }

    return (
        <div className='w-full relative'>
            <span className='flex flex-row items-center gap-2 border border-[--clr-base-accent]  px-6 py-2 rounded-3xl'>
                <input onChange={(e) => setSearchQuery(e.target.value)} className='w-full focus:outline-none focus:border-none border-transparent bg-transparent text-base placeholder:text-sm placeholder:text-[--clr-grey-dark]' type='text' placeholder={`Search 'research'`}/>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 24 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 11.8487 17.3729 13.551 16.3199 14.9056L21.7071 20.2929L20.2929 21.7071L14.9056 16.3199C13.551 17.3729 11.8487 18 10 18ZM16 10C16 13.3137 13.3137 16 10 16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10Z" fill=""/>
                </svg>
            </span>

            {searchResults.length != 0 && <div className='absolute top-10 left-0 right-0 bg-[--clr-base] text-sm shadow-lg p-2 flex flex-col gap-1 rounded-lg border border-[--clr-base-accent]'>
                {searchResults.map((item,index)=> (
                    <div key={index} className=''>
                        {item}
                    </div>
                ))}
            </div>}
        </div>
)
}
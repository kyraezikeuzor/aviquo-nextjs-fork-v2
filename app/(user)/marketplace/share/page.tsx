'use client'
import React, {useState} from 'react'
import Link from 'next/link'
import Card from '@/components/Card'
import Icon from '@/components/Icon'
import Tag from '@/components/Tag'
import interestList from '@/lib/interests.json'

import Button from '@/components/Button'

export default function MarketplaceShare() {
    const [tags, setTags] = useState<any[]>([]);

    const handleOptions = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.options)
        .filter(option => (option as HTMLOptionElement).selected)
        .map(option => (option as HTMLOptionElement).value)

        setTags(selectedOptions);
        
    }

    const tagList = tags ? tags : [];


  return (
    <main className='flex flex-col px-1/6 md:px-[10vw] lg:px-[10vw] gap-5'>
        <Link href='/marketplace' className='hover:bg-[var(--clr-grey-200)] rounded-xl cursor-pointer text-xs md:text-sm lg:text-sm items-center text-[var(--clr-blue-400)] font-semibold flex gap-2'><Icon icon="arrow-left" fillColor="#3981F6"/> Back to Marketplace</Link>
        <h1 className='tracking-tight text-lg md:text-xl lg:text-2xl'>Submit a post to Marketplace</h1>
        <Card>
            <form className='flex flex-col p-2 gap-5 w-full'>
                <div className='w-full'>
                    <h2 className='text-[var(--clr-grey-500)] tracking-tight text-sm md:text-base lg:text-lg'>Activity summary</h2>
                    <input className='focus:outline-none w-full border-2 border-[var(--clr-grey-300)] rounded-xl p-2 text-xs md:text-sm lg:text-sm' placeholder='Enter your main activty (up to 100 characters)'/>

                </div>
                <div className='w-full'>
                    <h2 className='text-[var(--clr-grey-500)] tracking-tight text-sm md:text-base lg:text-lg'>Activity description</h2>
                    <textarea className='focus:outline-none w-full border-2 border-[var(--clr-grey-300)] rounded-xl p-2 text-xs md:text-sm lg:text-sm' placeholder='Add a description to provide more details'/>

                </div>

                <div className='flex flex-col gap-2'>
                    
                    <p className='text-xs md:text-sm lg:text-sm'>Tags</p>
                    <div className='flex flex-wrap gap-2 p-2 border-2 border-[var(--clr-grey-300)] rounded-xl'>
                        {tagList.map((item,index)=>(
                            <Tag key={index} type="tag">{item}</Tag>
                        ))}
                    </div>

                    <select className='focus:outline-none'  multiple onChange={handleOptions}>
                        {interestList.map((item,index)=>(
                            <option key={index} className='text-xs md:text-sm lg:text-sm border-b border-[var(--clr-grey-300)] p-2'>{item.name}</option>
                        ))}
                    </select>
                </div>

            </form>
            
            <Button type='' style='btn--primary' size='btn--sm'>Submit for Approval</Button>
            

            
        </Card>
    </main>
  )
}

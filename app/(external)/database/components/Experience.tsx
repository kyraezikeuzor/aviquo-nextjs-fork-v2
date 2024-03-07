import React from 'react'

import Tag from '@/components/Tag'
import Heart from '@/components/Heart'
import ReadMore from '@/components/ReadMore'

import { formatRelativeTime } from "@/utils";


type ExperienceProps = {
    clickCallback: (a: any, b: any, c: string) => void;
    item: Record<string, any>;
    likedActivities: Array<any>;
    likeCallback: (a: any, b: any) => void;
    status: 'expanded' | 'folded' | 'standard'
    id: string;
}

export const Experience = ({
    clickCallback,
    likeCallback,
    likedActivities,
    item,
    id}: ExperienceProps) => {

    return (
        <div className='flex flex-col rounded-lg border border-[--clr-base-accent] p-5 shadow-sm'
        onClick={(e) => clickCallback(e, item, id)}>

            <Heart
                className="self-end animated-heart-section w-[13%] p-1"
                likeTrigger={(e, a) => likeCallback(e, a)}
                oppId={item.id}
                liked={likedActivities?.includes(item.id)}
            />
            <div>
                <span className='font-medium'>{item.name}</span>
                
                <ReadMore text={item.description} charCount={100}/>
            </div>
            <div className='flex flex-row justify-between'>
                <Tag type=''>
                📖 {item.tag}
                </Tag>
                <Tag type=''>
                    ⏰ {formatRelativeTime(item.deadline, true)}
                </Tag>
            </div>
            {item.deadline}
        </div>
    )
}

export default Experience;
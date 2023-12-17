'use client'
import React, {useState} from 'react'
import Card from '../../components/Card'
import Icon from '../../components/Icon'
import Toggle from '@/components/Toggle'


const PageView = ({children}: {children: React.ReactNode}) => {
    return (
      <Card>
         {children} 
      </Card>
    )
}

const Views = [
    {
        "name": "Account Settings",
        "page":     <div className='flex flex-col'>
                        <div className='flex justify-between items-center'>
                            <h3 className='text-base md:text-lg lg:text-xl tracking-normal' >Account Settings</h3>
                            <Toggle toggleStatus={true}/>
                        </div>

                    </div>
            
    },
    {
        "name": "Accessibility",
        "page": <div className='flex justify-between'>  
                    <h3 className='text-base md:text-lg lg:text-xl tracking-normal' >Accessibility</h3>
                    <Toggle toggleStatus={true}/>
                </div>
    },
    {
        "name": "Notifications",
        "page": <div className='flex justify-between'>
                    <h3 className='text-base md:text-lg lg:text-xl tracking-normal' >Notiifcations</h3>
                    <Toggle toggleStatus={true}/>
                </div>
    }
]

export default function Settings() {
    const [active, setActive] = useState(false);
  const [viewTitle, setViewTitle] = useState('')
  const [view, setView] = useState<React.ReactNode | undefined>(undefined);
  

  const handleClick = ({title, view}: {title: string, view: React.ReactNode}) => {
    setActive(!active); 
    setViewTitle(title)
    setView(view)
  };

  return (
    <main className='flex flex-col gap-5 px-1/6 md:px-[10vw] lg:px-[10vw]'>
         <h1 className='text-2xl md:text-3xl lg:text-4xl'>Settings</h1>
        {!active && <Card>
            <ul className='flex flex-col gap-10 p-4'>
                <li className='flex justify-between'>
                    <h2 className='text-lg md:text-xl lg:text-2xl tracking-normal'>Account Settings</h2>
                
                    <div  onClick={() => handleClick({title: 'Account Settings', view: Views[0].page})}>
                        <Icon icon="arrow-right" fillColor="black" />
                    </div>
                    </li>
                <li className='flex justify-between'>
                    <h2  className='text-lg md:text-xl lg:text-2xl tracking-normal'>Accessibility</h2>
                
                    <div onClick={() => handleClick({title: 'Accessibility', view: Views[1].page})}>
                        <Icon icon="arrow-right" fillColor="black" />
                    </div>
                    </li>
                <li className='flex justify-between'>
                    <h2  className='text-lg md:text-xl lg:text-2xl tracking-normal'>Notifications</h2>
                
                    <div onClick={() => handleClick({title: 'Notifications', view: Views[2].page})}>
                        <Icon icon="arrow-right" fillColor="black" />
                    </div>
                    </li>
            </ul>

        </Card>}

        {active && 
        <PageView>
          <div className='flex items-center'>
            <div onClick={() => handleClick({title: '', view: null})} >
                <Icon icon="arrow-left" fillColor="black"/>
            </div>
            <p className='font-semibold'>Back</p>
          </div>
          <br/>
          <h2 className='text-lg md:text-xl lg:text-2xl tracking-normal'>{viewTitle}</h2>
          {view}
        </PageView>
        }
    </main>
  )
}

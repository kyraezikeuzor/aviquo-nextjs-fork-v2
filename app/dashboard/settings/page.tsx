'use client'
import React, {useState} from 'react'
import styles from './settings.module.css'
import Card from '../../../components/Card'
import ProfilePicture from '@/components/ProfilePicture'
import PostCard from '@/components/PostCard'
import Tags from '@/components/Tags'
import Tag from '@/components/Tag'
import Toggle from '@/components/Toggle'


const NotificationView = ({children}: {children: React.ReactNode}) => {
    return (
      <Card>
         {children} 
      </Card>
    )
}

export default function SettingsPage() {
  const [active, setActive] = useState(false);
  const [viewTitle, setViewTitle] = useState('')
  const [viewNotificationStatus, setViewNotificationStatus] = useState();

  const handleClick = ({title}: {title: string}) => {
    setActive(!active); 
    setViewTitle(title)
  };

  return (
    <main className={styles.main}>
      <h1>Settings</h1>

        {!active && <Card>

          <ul>
            <li className='justify-content-between'>
              <div>
                <h2>Business/Finance</h2>
                <p>Off</p>
              </div>
              <svg onClick={() => handleClick({title: 'Business/Finance'})} xmlns="http://www.w3.org/2000/svg" width="26" height="16" viewBox="0 0 26 16" fill="none" >
                <path d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.29289L19.3431 0.928932C18.9526 0.538408 18.3195 0.538408 17.9289 0.928932C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM-5.11754e-10 9L25 9L25 7L5.11754e-10 7L-5.11754e-10 9Z" fill="#7B5E88"/>
              </svg>  
            </li>
            <li onClick={() => handleClick({title: 'Science/Math'})} className='justify-content-between'>
              <div>
                <h2>Science/Math</h2>
                <p>Off</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="16" viewBox="0 0 26 16" fill="none">
                <path d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.29289L19.3431 0.928932C18.9526 0.538408 18.3195 0.538408 17.9289 0.928932C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM-5.11754e-10 9L25 9L25 7L5.11754e-10 7L-5.11754e-10 9Z" fill="#7B5E88"/>
              </svg> 
            </li>
            <li onClick={() => handleClick({title: 'Computer Science'})} className='justify-content-between'>
              <div>
                <h2>Computer Science</h2>
                <p>Off</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="16" viewBox="0 0 26 16" fill="none">
                <path d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.29289L19.3431 0.928932C18.9526 0.538408 18.3195 0.538408 17.9289 0.928932C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM-5.11754e-10 9L25 9L25 7L5.11754e-10 7L-5.11754e-10 9Z" fill="#7B5E88"/>
              </svg> 
            </li>
          </ul>

        </Card>
        }

        {active && 
        <NotificationView>
          <div className='flex-row'>
            <svg onClick={() => handleClick({title: ''})} xmlns="http://www.w3.org/2000/svg" width="23" height="16" viewBox="0 0 23 16" fill="none">
              <path d="M0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM23 7L1 7V9L23 9V7Z" fill="#7B5E88"/>
            </svg>
            <p>Back</p>
          </div>
          <br/>
          <h2>Allow Notifications</h2>
          <div className='justify-content-between'>
            <h3>{viewTitle}</h3>
            <Toggle toggleStatus={true}/>
          </div>
        </NotificationView>
        }

    </main>
  )
}

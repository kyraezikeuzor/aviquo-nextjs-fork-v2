import React from 'react'
import styles from './ProfilePicture.module.css'
//sm,md,lg

type ProfilePictureProps = {
    size: 'sm' | 'md' | 'lg'
}

export const ProfilePicture = ({size}: ProfilePictureProps) => {
  return (
    <img src='https://lh3.googleusercontent.com/a/AAcHTtdyLYM4FwQTKzzM2orCp0ehNswbQ6cQywaFN-fNlCZU9w=s96-c' className={`${styles['profile-pic']} ${styles[size]} `}/>
  )
}

export default ProfilePicture;

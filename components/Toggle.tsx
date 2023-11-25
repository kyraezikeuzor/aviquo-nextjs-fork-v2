'use client'
import React, {useState} from 'react'
import styles from './Toggle.module.css'


type ToggleProps = {
    toggleStatus: true | false
}

const Toggle = ({toggleStatus}: ToggleProps) => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    toggleStatus = click;

  return (
    <div onClick={handleClick} className={toggleStatus ? `${styles.toggle} ${styles.on}` : `${styles.toggle} ${styles.off}`}>
        hello
    </div>
  )
}

export default Toggle
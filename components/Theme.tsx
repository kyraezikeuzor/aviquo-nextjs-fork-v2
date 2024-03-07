'use client'

import React, {useState, useEffect} from 'react'
import Icon from './Icon'

const ThemeButton = () => {
    const [showDarkMode, setShowDarkMode] = useState(false)
    const [systemMode, setSystemMode] = useState('')

    useEffect(()=>{
        
        if (window.matchMedia('(prefers-color-scheme: dark)').matches == true) {
            setSystemMode('dark')
        } else {
            setSystemMode('light')
        }

        const themeVariable = systemMode === 'light' ? 'dark' : 'light'
        
        document.documentElement.classList.toggle(themeVariable, showDarkMode);
    }, [showDarkMode])

    useEffect(()=>{
        const data = window.localStorage.getItem('SCHOLARVINE_APP_THEME');
        if (data != null) setShowDarkMode(JSON.parse(data))
    }, [])

    useEffect(()=>{
        window.localStorage.setItem('SCHOLARVINE_APP_THEME', JSON.stringify(showDarkMode))
    }, [showDarkMode])

    const changeTheme = () => {
        setShowDarkMode(prevMode => !prevMode)
    }
    
    return (
        <Icon size={24} icon={showDarkMode == true ? 'Sun' : 'Moon'} onClick={changeTheme} button={true}/>
        
    )
}

export default ThemeButton;
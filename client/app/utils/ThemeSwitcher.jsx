'use client'
import { useState,useEffect } from 'react'
import React from 'react'
import { useTheme } from 'next-themes'
import {BiMoon,BiSun} from 'react-icons/bi'

const ThemeSwitcher = () => {
    const [mounted,setMounted] = useState(false)
    const {theme,setTheme} = useTheme();

    useEffect(() => setMounted(true),[])

    if(!mounted){return null}

  return (
    <div className='p-[16px]'>
        {theme === "light" ? (
            <BiMoon
            className='cursor-pointer'
            size={25}
            onClick={() => {setTheme(theme === 'dark' ? 'light' : 'dark')
              console.log('hii');
            }}
            />
        ) : (
            <BiSun
            className='cursor-pointer'
            size={25}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            />
        )
    }
    </div>
  )
}

export default ThemeSwitcher
'use client'
import { useState,useEffect } from 'react'
import React from 'react'
import { useTheme } from 'next-themes'
import {BiMoon,BiSun} from 'react-icons/bi'

const ThemeSwitcher = () => {
    const [mounted,setMounted] = useState(false)
    const {theme,setTheme} = useTheme();

    useEffect(() => setMounted(true),[])

    if (!mounted) {
      // Render a neutral icon or nothing until mounted (avoids SSR mismatch)
      return (
        <div className='p-[16px]'>
          <BiMoon className='opacity-50' size={25} />
        </div>
      );
    }

    const isDark = theme === 'dark';
    return (
      <div className='p-[16px]'>
        {isDark ? (
          <BiSun
            className='cursor-pointer'
            size={25}
            onClick={() => setTheme('light')}
            title='Switch to light mode'
          />
        ) : (
          <BiMoon
            className='cursor-pointer'
            size={25}
            onClick={() => setTheme('dark')}
            title='Switch to dark mode'
          />
        )}
      </div>
    );
}

export default ThemeSwitcher
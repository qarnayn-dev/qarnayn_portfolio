import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import {useEffect, useState } from 'react'
import { ThemeContext, THEME_LKEY} from '../components/DarkThemeToggle';
import { ParallaxProvider } from 'react-scroll-parallax';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState('light');

  // set the theme on first start
  useEffect(() => {
    const rawData = localStorage.getItem(THEME_LKEY)
    let themeOnStart: string | undefined
    if (rawData) {
      themeOnStart  = JSON.parse(rawData!)
    } else {
      themeOnStart = window.matchMedia('(prefers-color-scheme: dark)').matches? 'dark':'light'
    }
    if (themeOnStart && themeOnStart === 'dark') setTheme(()=> 'dark')

  }, [])

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark')
      localStorage.setItem(THEME_LKEY,JSON.stringify('light'))
    } else
    {
      document.documentElement.classList.add('dark')
      localStorage.setItem(THEME_LKEY,JSON.stringify('dark'))
    }
    console.log('current theme ->', theme)
  },[theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ParallaxProvider><Component {...pageProps} /></ParallaxProvider>
    </ThemeContext.Provider>
  )
}

export default MyApp

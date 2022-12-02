import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import {useEffect, useState } from 'react'
import { ThemeContext, THEME_LKEY} from '../components/DarkThemeToggle';
import { GreetingsLayout } from '../components/GreetingsLayout';
import { Provider } from 'react-redux';
import {store} from '../redux/store';
import { Footer } from '../components/Footer';
import { MatrixEffect } from '../components/MatrixEffect'
import HeaderFrame from '../components/TopFrame'


function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

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
    // console.log('current theme ->', theme)
  },[theme])

  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"></link>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <GreetingsLayout show={loading} onDisposeFn={() => setLoading(false)} />
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <HeaderFrame/>
          <Component {...pageProps} />
          <Footer/>
        </ThemeContext.Provider>
      </Provider>
    </>
  )
}

export default MyApp

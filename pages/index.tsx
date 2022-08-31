import type { NextPage } from 'next'
import Head from 'next/head'
import SideNavBar from '../components/SideNavBar';
import DarkThemeToggle, { ThemeContext } from '../components/DarkThemeToggle';
import ThemeTester from '../components/ThemeTester';
import HorizontalNav from '../components/HorizontalNav';
import { useContext, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import TopFrame from '../components/TopFrame';
import DevIllustration from '../assets/sw_dev.svg';
import DevIllustrationDark from '../assets/sw_dev_dark.svg';


const Home: NextPage = () => {
  return (
      <div className='flex flex-col'>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopFrame>
        <Intro/>
      </TopFrame >
      {/* <ThemeTester /> */}
      {/* <div className='w-screen h-screen flex flex-col justify-center text-center dark:text-green-700 bg-primary duration-1000'> hello world</div> */}
    </div>
  )
}

export default Home


const Intro = () => {
  const {theme} = useContext(ThemeContext)

  return (
    <div className={`mt-6 mb-10 w-full float-left relative flex flex-col  justify-start items-center gap-2 mobile-lg:flex-row-reverse`}>
      <div className='min-w-[40%] float-right mx-6 md:mr-10 '>
        {(theme==='light')? <DevIllustration/>: <DevIllustrationDark/>}
      </div>
      <div className='bg-blue-100 float-left w-full'>
        {/* <h1 className=''>Hi, I'm Qarnayn</h1> */}
      </div>
    </div>
  )
}

const MyValues = () => {
  return (
    <></>
  )
}

const ValueContainer = () => {
  return (
    <></>
  )
}

const Background = () => {
  return (
    <></>
  )
 }
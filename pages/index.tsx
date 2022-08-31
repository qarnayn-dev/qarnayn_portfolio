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
    <div className={`mt-6 mb-10 w-full float-left relative flex flex-col  justify-start items-center gap-4 md:flex-row-reverse`}>
      <div className='min-w-[40%] float-right mx-6 md:mr-10 '>
        {(theme==='light')? <DevIllustration/>: <DevIllustrationDark/>}
      </div>
      <div className='float-left w-full'>
        <h1 className='style-heading'>Hi, I'm Qarnayn</h1>
        <h1 className='style-subheading'>I'm a developer! Hello world</h1>
        <h1 className='style-subheading style-secondary'>I'm a developer! Hello world</h1>
        <h1 className='style-body'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi enim tempore nihil cupiditate voluptas, molestiae libero, facilis deleniti quos inventore odio delectus consectetur, et recusandae. Animi culpa dolor facere molestiae.</h1>
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
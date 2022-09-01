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
import CostIllu from '../assets/discount_percentage.svg';
import CostIlluDark from '../assets/discount_percentage_dark.svg';
import SolutionIllu from '../assets/solution_mindset.svg';
import SolutionIlluDark from '../assets/solution_mindset_dark.svg';
import ServerIllu from '../assets/server_cluster.svg';
import ServerIlluDark from '../assets/server_cluster_dark.svg';


const Home: NextPage = () => {
  return (
      <div className='flex flex-col'>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopFrame>
        <Intro />
        <CardWithGraphicContainer
          title={"Some title should be fine"}
          content={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi enim tempore nihil cupiditate voluptas, molestiae libero, facilis deleniti quos inventore odio delectus consectetur, et recusandae. Animi culpa dolor facere molestiae."}
          graphic={<CostIllu />}
          graphicOnDark={<CostIlluDark/>}
        />
        <CardWithGraphicContainer
          title={"Some title should be fine"}
          content={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi enim tempore nihil cupiditate voluptas, molestiae libero, facilis deleniti quos inventore odio delectus consectetur, et recusandae. Animi culpa dolor facere molestiae."}
          graphic={<ServerIllu/>}
          graphicOnDark={<ServerIlluDark/>}
        />
        <CardWithGraphicContainer
          title={"Some title should be fine"}
          content={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi enim tempore nihil cupiditate voluptas, molestiae libero, facilis deleniti quos inventore odio delectus consectetur, et recusandae. Animi culpa dolor facere molestiae."}
          graphic={<SolutionIllu/>}
          graphicOnDark={<SolutionIlluDark/>}
        />
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
        <h1 className='style-heading'>
          Hello World! I'm
          <span className='text-primary-base'> Qarnayn</span>
        </h1>
        <h1 className='style-subheading style-secondary'>A software developer with mind of an engineer and eyes of an artist</h1>
        <div className='mt-4 style-body'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi enim tempore nihil cupiditate voluptas, molestiae libero, facilis deleniti quos inventore odio delectus consectetur, et recusandae. Animi culpa dolor facere molestiae.</div>
      </div>
    </div>
  )
}

const MyValues = () => {
  return (
    <></>
  )
}

interface iCardWithGraphic{
  title: String;
  content: string;
  graphic: any;
  graphicOnDark: any;
}

/// Provide graphic and some descriptions
const CardWithGraphicContainer = ({title,content,graphic,graphicOnDark}:iCardWithGraphic )=> {
  const { theme } = useContext(ThemeContext)
  const isDark:boolean = theme === 'dark'
  return (
    <div className='my-6 px-4 md:px-6 py-8 rounded-xl apply-glass h-60 w-full md:max-w-[80%] bg-primary-base bg-opacity-10 flex gap-4 md:gap-6 shadow-sm'>
      <div className='mr-2 min-w-[25%] max-w-[40%] flex'>
        {isDark ? graphicOnDark: graphic}
      </div>
      <div className='w-full style-body'>
        <div className='mb-2 style-subheading'>{title}</div>
        <div className='style-secondary'>{content}</div>
      </div>
    </div>
  )
}

const Background = () => {
  return (
    <></>
  )
 }
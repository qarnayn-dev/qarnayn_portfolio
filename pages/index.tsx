import type { NextPage } from 'next'
import Head from 'next/head'
import  { ThemeContext } from '../components/DarkThemeToggle';
import { useContext, useEffect, useState } from 'react';
import TopFrame from '../components/TopFrame';
import DevIllustration from '../assets/sw_dev.svg';
import DevIllustrationDark from '../assets/sw_dev_dark.svg';
import CostIllu from '../assets/discount_percentage.svg';
import CostIlluDark from '../assets/discount_percentage_dark.svg';
import SolutionIllu from '../assets/solution_mindset.svg';
import SolutionIlluDark from '../assets/solution_mindset_dark.svg';
import ServerIllu from '../assets/server_cluster.svg';
import ServerIlluDark from '../assets/server_cluster_dark.svg';
import { CardWithGraphicContainer } from '../components/CardWithGraphic';
import {animated , config, useSpring, useTransition} from 'react-spring';
import { AnimatedText } from '../components/AnimatedText';

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
      <div className='text-start w-full'>
        <AnimatedText
          textInput={"Hello world, I'm Qarnayn Khairuddin!"}
          specialTexts={['Qarnayn']}
          specialStyleClass={`text-primary-t2 font-medium`}
        />
      </div>
    </div>
  )
}



const MyValues = () => {
  return (
    <>

    </>
  )
}




const Background = () => {
  return (
    <></>
  )
 }
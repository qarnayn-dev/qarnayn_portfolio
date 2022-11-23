import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { IconType } from 'react-icons'
import { IoLockClosed, IoLogoGithub, IoLogoPython, IoChevronUpOutline } from 'react-icons/io5'
import { ChainedPost } from '../components/ChainedPost'
import TopFrame from '../components/TopFrame'
import DartLogo from '../assets/Logos/dart_logo.svg'
import FlutterLogo from '../assets/Logos/flutter_logo.svg'
import FirebaseLogo from '../assets/Logos/firebase_logo.svg'
import AWSLogo from '../assets/Logos/aws_logo.svg'
import HTML5Logo from '../assets/Logos/html_logo.svg'
import MySQLLogo from '../assets/Logos/mysql_logo.svg'
import PythonLogo from '../assets/Logos/python_logo.svg'
import ReactLogo from '../assets/Logos/react_js_logo.svg'
import ReduxLogo from '../assets/Logos/redux_logo.svg'
import TailwindLogo from '../assets/Logos/tailwindcss_logo.svg'
import TypeScriptLogo from '../assets/Logos/typescript_logo.svg'

const Projects = () => {
  return (
    <>
    <TopFrame/>
    <div className='frame-bounded-x pt-32 pb-28 bg-gradient-to-tr from-primary-t4'>
        <ProjectCard></ProjectCard>
      </div>
    </>
  )
}

export default Projects


const ProjectCard = () => {
  const [isExpand, setIsExpand] = useState(false);
  const twSub: string = "style-small-text text-themed-gray-t6";
  const twTransition: string = "transition-all duration-500 ease-out-cubic";

  const Tag = () => {
    return <div className={`${isExpand?'scale-100':'scale-75'} ${twTransition} px-3 pb-[1px] style-small-text rounded-xl bg-semantic-success text-nwhite`}>active</div>
  }

  const ProjectName = () => {
    return (
      <div className='flex flex-row gap-1 items-center'>
        <div className={`${isExpand? 'style-heading font-normal mb-1':'style-subheading font-light'} ${twTransition} font-light text-primary-base`}>Sportivity Application</div>
        <IoLockClosed className={`${twTransition} text-themed-gray-t9`} size={isExpand? 20: 14} />
        <Tag/>
      </div>
    )
  }

  const ProjectTitle = () => {
    return (
      <h2 className={`${isExpand ? 'style-body w-[70%] mb-4' : 'style-heading-h2 w-full mb-8'} ${twTransition} font-light`}>A sport facility booking platform with social and community features.</h2>
    )
  }

  const Description = () => {
    return (
      <motion.p
        transition={{ duration: 0.7, type: "spring" }}
        initial={{opacity:0, x: 50}}
        exit={{opacity:0, x: 50}}
        animate={{ opacity: 1,  x:0}}
        className={`w-[90%] ${isExpand? 'md:w-[60%]':'md:w-[90%]'} mt-2 mb-5 style-body apply-inverse-gray text-themed-gray-t4`}
        >
        A mobile-first software applications – both IOS and Android users to search for a sport facility service, reserve their facility service’s slot and socially connect with their community or strangers with commen interest.
      </motion.p>
    )
  }

  const contibution = (items: string[]) => {
    return (
      <AnimatePresence >
        {!isExpand &&
          <motion.div
            transition={{ duration: 0.6, type: 'spring' }}
            initial={{x:50,opacity:0}}
            exit={{x:50,opacity:0}}
            animate={{ x: 0, opacity: 1 }}
            className='mt-8'>
            <div className={`${twSub}`}>CONTRIBUTIONS</div>
            <div className='style-body text-themed-gray-t9 pl-1'>
              {items.map((v,i) => <li key={i}>{v}</li>)}
              <div className='italic text-themed-gray-t8'>... more</div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    )
  }

  const TechStack = () => {
    const datas: iTechIcon[] = [
      {icon: DartLogo,displayTitle:"Dart"},
      {icon: FlutterLogo,displayTitle:"Flutter"},
      {icon: FirebaseLogo,displayTitle:"Firebase"},
      {icon: MySQLLogo,displayTitle:"MySQL"},
      {icon: AWSLogo,displayTitle:"AWS"},
      {icon: PythonLogo,displayTitle:"Phyton"},
      // {icon: ,displayTitle:""},
      // {icon: ,displayTitle:""},
      // {icon: ,displayTitle:""},
    ];
    return (
      <>
        <AnimatePresence>
          {!isExpand && <motion.div
          transition={{ duration: 1.8, type: "spring" }}
          initial={{opacity: 0}}
          exit={{opacity: 0}}
          animate={{opacity: 1}}
          className={`${twSub} mt-6`}>TECH-STACK</motion.div>}
        </AnimatePresence>
        <motion.div
          transition={{ duration: 2.6, type: 'spring' }}
          initial={{ opacity:0}}
          animate={{ opacity:1 }}
          className="w-full mt-2 mb-12 flex flex-row flex-wrap">
          {datas.map((v,i)=> <TechIcon key={i} icon={v.icon} displayTitle={v.displayTitle}></TechIcon>)}
        </motion.div>
      </>
    )
  }

  const ScreenWidePhoto = (
    <AnimatePresence>
      {isExpand &&
        <motion.div
          transition={{ duration: 2.4, type: 'spring' }}
          initial={{opacity:0}}
          exit={{opacity:0}}
          animate={{opacity:1}}
          className='w-full h-60 mb-5 bg-red-100'></motion.div>
      }
    </AnimatePresence>
  )

  const ExpandCTA = () => {
    return (
      <button
          onClick={() => { setIsExpand(true); }}
        className='py-1 px-4 rounded-md bg-primary-t4 text-center text-nwhite hover:drop-shadow-sm transition-all ease-out-circ duration-300'>
        Expand to see more
      </button>
    )
  }

  const ToGithubCTA = () => {
    return (
      <button className='py-[2px] px-4 rounded-md border-2 border-themed-gray-t3 text-center text-themed-gray-t6 hover:drop-shadow-sm transition-all ease-out-circ duration-300 flex flex-row items-center hover:text-themed-gray-t7'>See codes
        <IoLogoGithub className='pl-1' size={22}></IoLogoGithub>
      </button>
    )
  }

  const DividerForCTAs = () => {
    return (<div className='w-[2px] h-6 rounded-2xl mx-2 bg-themed-gray-t3'></div>)
  }

  const MinimizedUiLayout = (
    <>
      {ScreenWidePhoto}
      <Description/>
      {contibution([
        "Led the engineering team",
        "Designed the app’s architechtures",
        "Wrote, reviewed and managed the app’s code base",
      ])}
      {TechStack()}
      <div className='flex flex-row gap-2 items-center'>
        <ExpandCTA/>
        <DividerForCTAs/>
        <ToGithubCTA/>
      </div>
    </>
  )

  const ExpandedUiLayout = (
    <>
      {TechStack()}
      {ScreenWidePhoto}
      <Description />
      <SectionTitle className="mt-12 mb-2">Contibutions</SectionTitle>
      <ChainedPost className={`w-[90%] ${isExpand? 'md:w-[45%]':'md:w-[90%]'}`} header={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, repudiandae! Libero in, reiciendis non dolorum nisi obcaecati quaerat minima corporis magnam ea, architecto rerum tempora autem odio voluptatum officia quidem!"}>
        {[
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, repudiandae! Libero in, reiciendis non dolorum nisi obcaecati quaerat minima corporis magnam ea, architecto rerum tempora autem odio voluptatum officia quidem!",
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, repudiandae! Libero in, reiciendis non dolorum nisi obcaecati quaerat minima corporis magnam ea, architecto rerum tempora autem odio voluptatum officia quidem!",
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, repudiandae! Libero in, reiciendis non dolorum nisi obcaecati quaerat minima corporis magnam ea, architecto rerum tempora autem odio voluptatum officia quidem!"
        ]}
          </ChainedPost>
      <div className='ml-6'><ToGithubCTA/></div>
      <div className='absolute bottom-0 left-0 w-full h-6 mb-[2%] flex items-center justify-center'>
        <button onClick={()=> setIsExpand(false)} className='style-body text-themed-gray-t6 felx flex-row justify-center items-center hover:text-primary-t4 '>
          <IoChevronUpOutline size={18} className='mx-1 float-left'/>
          minimize
        </button>
      </div>
    </>
  )



  return (
    <div className='relative w-full max-w-7xl mb-16 px-6 pt-8 lg:pt-[5%] pb-16 lg:pb-[9%] rounded-2xl bg-themed-gray-base flex flex-col lg:flex-row-reverse '>
      <div className={`w-full ${!isExpand?'lg:max-w-[60%]':''} lg:pl-6`}>
        <ProjectName/>
        <ProjectTitle/>
        {isExpand ? ExpandedUiLayout : MinimizedUiLayout}
      </div>
    </div>
  )
}

interface iTechIcon{
  icon: IconType,
  displayTitle: string,
}

const TechIcon = (data: iTechIcon) => {
  const twHover = "opacity-50 group-hover:opacity-80 transition-all ease-out-circ duration-500";
  return (
    <div className='w-16 group flex flex-col items-center justify-center' >
      <data.icon className={`${twHover} w-6 h-6 flex items-center justify-center`}/>
      <div className={`${twHover} t-1 h-5 style-small-text apply-inverse-gray text-themed-gray-t4 scale-75 overflow-hidden text-center`}>{data.displayTitle}</div>
    </div>
  )
}

const SectionTitle = (props:any) => {
  return (
    <div
      className={`${props.className} style-subheading style-secondary text-themed-gray-t8 font-sans flex -translate-x-0 flex-col
      before:w-8 before:h-1 before:rounded-md before:mb-2 before:bg-primary-t5 before:float-left before:bg-opacity-60
      `}>
        {props.children}
    </div>
  )
}
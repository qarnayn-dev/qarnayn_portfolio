import React, { useState } from 'react'
import { IoLockClosed, IoLogoGithub, IoLogoPython } from 'react-icons/io5'
import { ChainedPost } from '../components/ChainedPost'
import TopFrame from '../components/TopFrame'

const Projects = () => {
  return (
    <>
    <TopFrame/>
    <div className='frame-bounded-x pt-32 pb-28 bg-gradient-to-tr from-primary-t4'>
        <ProjectCard></ProjectCard>
        {/* <ProjectCard></ProjectCard>
        <ProjectCard></ProjectCard> */}
        <div className='w-full bg-themed-gray-base my-16 p-12'>
          <ChainedPost>
            {[
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, repudiandae! Libero in, reiciendis non dolorum nisi obcaecati quaerat minima corporis magnam ea, architecto rerum tempora autem odio voluptatum officia quidem!",
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, repudiandae! Libero in, reiciendis non dolorum nisi obcaecati quaerat minima corporis magnam ea, architecto rerum tempora autem odio voluptatum officia quidem!",
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, repudiandae! Libero in, reiciendis non dolorum nisi obcaecati quaerat minima corporis magnam ea, architecto rerum tempora autem odio voluptatum officia quidem!"
            ]}
          </ChainedPost>
        </div>
      </div>
    </>
  )
}

export default Projects


const ProjectCard = () => {
  const [isExpand, setIsExpand] = useState(false);
  const twSub: string = "style-small-text text-themed-gray-t6";
  const twTransition: string = "transition-all duration-500 ease-out-cubic";

  const tag = () => {
    return <div className={`${isExpand?'scale-100':'scale-75'} ${twTransition} px-3 pb-[1px] style-small-text rounded-xl bg-semantic-success text-nwhite`}>active</div>
  }

  return (
    <div className='w-full max-w-7xl mb-16 px-6 pt-8 lg:pt-[5%] pb-12 lg:pb-[7%] rounded-2xl bg-themed-gray-base flex flex-col lg:flex-row-reverse '>
      <div className='w-full lg:max-w-[60%] lg:pl-6'>
        <div className='flex flex-row gap-1 items-center'>
          <div className={`${isExpand? 'style-heading font-normal mb-1':'style-subheading font-light'} ${twTransition} font-light text-primary-base`}>Sportivity Application</div>
          <IoLockClosed className={`${twTransition} text-themed-gray-t9`} size={isExpand? 20: 14} />
          {tag()}
        </div>
        <h2 className={`${isExpand? 'style-body w-[70%]':'style-heading-h2 w-full'} ${twTransition} font-light mb-8`}>A sport facility booking platform with social and community features.</h2>
        <p className='w-[90%] style-body apply-inverse-gray text-themed-gray-t4 '>A mobile-first software applications – both IOS and Android users to search for a sport facility service, reserve their facility service’s slot and socially connect with their community or strangers with commen interest.</p>
        <div className='mt-8 '>
          <div className={`${twSub}`}>CONTRIBUTIONS</div>
          <div className='style-body text-themed-gray-t9 pl-1'>
            <li>Led the engineering team</li>
            <li>Designed the app’s architechtures</li>
            <li>Wrote, reviewed and managed the app’s code base</li>
            <div className='italic text-themed-gray-t8'>... more</div>
          </div>
        </div>
        <div className={`${twSub} mt-6`}>TECH-STACK</div>
        <div className="w-full mt-2 mb-12 flex flex-row flex-wrap gap-4">
          <TechIcon/>
          <TechIcon/>
          <TechIcon/>
          <TechIcon/>
          <TechIcon/>
          <TechIcon/>
        </div>
        <div className='flex flex-row gap-2 items-center'>
          <button
            onClick={() => { setIsExpand((state)=>!state); }}
            className='py-1 px-4 rounded-md bg-primary-t4 text-center text-nwhite hover:drop-shadow-sm transition-all ease-out-circ duration-300'>Expand to see more</button>
          <div className='w-[2px] h-6 rounded-2xl mx-2 bg-themed-gray-t3'></div>
          <button className='py-[2px] px-4 rounded-md border-2 border-themed-gray-t3 text-center text-themed-gray-t6 hover:drop-shadow-sm transition-all ease-out-circ duration-300 flex flex-row items-center hover:text-themed-gray-t7'>See codes
            <IoLogoGithub className='pl-1' size={22}></IoLogoGithub>
          </button>
        </div>
      </div>
    </div>
  )
}

const TechIcon = () => {
  const twHover = "opacity-40 group-hover:opacity-100 transition-all ease-out-circ duration-500";

  return (
    <div className='group flex flex-col items-center justify-center' >
      <IoLogoPython className={`${twHover}`} size={30}/>
      <div className={`${twHover} t-1 style-small-text text-themed-gray-t9 scale-75`}>Phyton</div>
    </div>
  )
}
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import React, { ReactNode, useState } from 'react'
import { IoChevronBackOutline, IoMenuOutline } from 'react-icons/io5';
import AnimatedIcon from './AnimatedIcon';
import DarkThemeToggle from './DarkThemeToggle';

function SideNavBar() {
const [isExpanded, setIsExpanded] = useState(false)

  const widgetSet: string = isExpanded ? 'w-40 bg-opacity-70 bg-themed-gray-base shadow-md dark:shadow-themed-gray-t3 backdrop-blur-md' : 'w-10'
  const iconSize = 22

  function handleTap() {
    setIsExpanded((state) => !state);
  }

  function transitionWrapper(children: ReactNode) {
    return <Transition
            show={isExpanded}
            enterFrom='opacity-0 scale-50 -translate-x-10'
            enterTo='opacity-100 scale-100 translate-x-0'
            enter='transition-all duration-500'
            leave='transition-all duration-300'
            leaveFrom='opacity-100 scale-100 translate-x-0'
            leaveTo='opacity-0 scale-75 -translate-x-10'>
            {children}
          </Transition>
  }

  return (
    <div className={`p-1 pt-3 ${widgetSet} text-themed-gray-t9 h-full z-10 inset-0 fixed text-end duration-500 ease-in-out`}>
      <div className='w-full pb-4 relative flex justify-around'>
        {transitionWrapper(<DarkThemeToggle />)}
        <button onClick={handleTap} className='relative mt-1 z-10 mr-2 float-right w-6 h-6'>
        <AnimatedIcon secondaryIcon={<IoMenuOutline size={iconSize} />} primaryIcon={<IoChevronBackOutline size={iconSize} />} isActive={!isExpanded}/>
        </button>
      </div>
      {transitionWrapper(
        <div className='gap-2 flex flex-col justify-start items-start px-3 pt-4 border-t-[1px] border-themed-gray-t4'>
          <NavItems displayName='Home' pathName={'/'}/>
          <NavItems displayName='Projects' pathName={'/projects'}/>
          <NavItems displayName='Blogs' pathName={'/blogs'}/>
          <NavItems displayName='Contact' pathName={'/contacts'}/>
        </div>
      )}
      <div></div>
    </div>
  )
}

export default SideNavBar


type tNavItemProps = {
    displayName: string,
    pathName:string,
}
const NavItems = ({displayName,pathName}:tNavItemProps) => {
    return (
        <div className='hover:text-primary-base cursor-pointer text-sm'>
            <Link  href={pathName}>{displayName}</Link>
        </div>
    )
}
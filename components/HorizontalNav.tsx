import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'

const HorizontalNav = () => {
  return (
    <div className='absolute flex flex-row gap-4 mx-7 my-4  right-0 top-12 text-sm text-themed-gray-t8'>
        <NavItems displayName='Home' pathName={'/'}/>
        <NavItems displayName='Projects' pathName={'/projects'}/>
        <NavItems displayName='Blogs' pathName={'/blogs'}/>
        <NavItems displayName='Contact' pathName={'/contacts'}/>
    </div>
  )
}

export default HorizontalNav

type tNavItemProps = {
    displayName: string,
    pathName:string,
    // TODO add navigation fn
}
const NavItems = ({ displayName, pathName }: tNavItemProps) => {
    const path: string = "M1 2C4.46237 1.33333 15.0032 0.5 24.5 0.5C33.9968 0.5 43.043 1.33333 47 2";
    const pathMotion = {
    rest: { pathLength: 0, duration: 0.7, type: "spring" },
    hover: {
      opacity:1,
      pathLength: 1,
      transition: {
        duration: 1.6,
        type: "spring",
      }}
    }

    return (
        <motion.div whileHover="hover" className='hover:text-primary-base cursor-pointer'>
            <Link href={pathName}>{displayName}</Link>
            <svg viewBox="0 0 48 3" fill="transparent" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                    id="underline"
                    d={path}
                    stroke="#4da7c8"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial= {{pathLength: 0,opacity:0}}
                    variants={pathMotion}
                />
            </svg>
        </motion.div>
    )
}

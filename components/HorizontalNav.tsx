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
const NavItems = ({displayName,pathName}:tNavItemProps) => {
    return (
        <div className='hover:text-primary-base cursor-pointer'>
            <Link  href={pathName}>{displayName}</Link>
        </div>
    )
}

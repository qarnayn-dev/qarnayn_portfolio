import React from 'react'
import DarkThemeToggle from './DarkThemeToggle'
import HorizontalNav from './HorizontalNav'
import SideNavBar from './SideNavBar'

const TopFrame = (props:any) => {
  return (
      <>
        <div className='hidden md:flex right-2 top-0 mt-4 mr-2 float-right fixed z-40'><DarkThemeToggle /></div>
        <div className='block md:hidden fixed z-40'><SideNavBar /></div>
        <div className='md:block hidden fixed right-0 z-40'><HorizontalNav/></div>
        <div className={props.className}>{props.children}</div>
      </>
  )
}

export default TopFrame
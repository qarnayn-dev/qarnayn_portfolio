import React from 'react'
import DarkThemeToggle from './DarkThemeToggle'
import HorizontalNav from './HorizontalNav'
import SideNavBar from './SideNavBar'

const TopFrame = (props:any) => {
  return (
      <>
        <div className='hidden md:block right-2 mt-4 mr-2 absolute'><DarkThemeToggle /></div>
        <div className='block md:hidden absolute z-50'><SideNavBar /></div>
        <div className='md:block hidden absolute right-0 z-50'><HorizontalNav/></div>
        {props.children}
      </>
  )
}

export default TopFrame
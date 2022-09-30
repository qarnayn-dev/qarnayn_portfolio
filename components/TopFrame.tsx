import React from 'react'
import DarkThemeToggle from './DarkThemeToggle'
import HorizontalNav from './HorizontalNav'
import SideNavBar from './SideNavBar'

const TopFrame = (props:any) => {
  return (
      <>
        <div className='md:block hidden right-2 mt-4 mr-2 absolute'><DarkThemeToggle /></div>
        <div className='md:hidden absolute z-50'><SideNavBar /></div>
        <div className='md:block hidden absolute right-0 z-50'><HorizontalNav/></div>
        <div className='md:mt-24 px-3 mobile-lg:px-4 flex flex-col items-center'>
            {props.children}
        </div>
      </>
  )
}

export default TopFrame
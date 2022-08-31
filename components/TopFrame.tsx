import React from 'react'
import DarkThemeToggle from './DarkThemeToggle'
import HorizontalNav from './HorizontalNav'
import SideNavBar from './SideNavBar'

const TopFrame = (props:any) => {
  return (
      <>
        <div className='md:block hidden right-2 mt-4 mr-2 absolute'><DarkThemeToggle /></div>
        <div className='md:hidden absolute'><SideNavBar /></div>
        <div className='md:block hidden absolute right-0'><HorizontalNav/></div>
        <div className='mt-10 md:mt-24 px-3 mobile-lg:px-4'>
            {props.children}
        </div>
      </>
  )
}

export default TopFrame
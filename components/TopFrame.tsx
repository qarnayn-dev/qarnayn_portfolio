import React from 'react'
import DarkThemeToggle from './DarkThemeToggle'
import HorizontalNav from './HorizontalNav'
import SideNavBar from './SideNavBar'

const TopFrame = (props:any) => {
  return (
      <>
        <div className='mobile-lg:block hidden right-2 mt-4 mr-2 absolute'><DarkThemeToggle /></div>
        <div className='mobile-lg:block absolute'><SideNavBar /></div>
        <div className='mobile-lg:block hidden absolute right-0'><HorizontalNav/></div>
        <div className='mt-24 px-2 mobile-lg:px-4'>
            {props.children}
        </div>
      </>
  )
}

export default TopFrame
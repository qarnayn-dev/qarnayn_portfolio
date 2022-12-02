import React from 'react'
import DarkThemeToggle from './DarkThemeToggle'
import HorizontalNav from './HorizontalNav'
import SideNavBar from './SideNavBar'

const HeaderFrame = () => {
  return (
      <>
        <div className='hidden md:flex right-2 top-0 mt-4 mr-2 float-right absolute z-40'><DarkThemeToggle /></div>
        <div className='block md:hidden fixed z-40'><SideNavBar /></div>
        <div className='md:block hidden absolute right-0 z-40'><HorizontalNav/></div>
        {/* <div className={props.className}></div> */}
        {/* {props.children} */}
      </>
  )
}

export default HeaderFrame
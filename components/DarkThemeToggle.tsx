import React, { Context, createContext, Dispatch, SetStateAction, useContext} from 'react'
import { IoMoon, IoSunny } from 'react-icons/io5'
import AnimatedIcon from './AnimatedIcon'
import SwitchButton from './SwitchButton'

export const ThemeContext: Context<iTheme> = createContext({ theme: 'light', setTheme:(input)=>{}})
export const THEME_LKEY: string = "saved_theme"

interface iTheme{
   theme: string;
   setTheme: Dispatch<SetStateAction<string>>;
}

const DarkThemeToggle = ()=> {
  const {theme,setTheme} = useContext(ThemeContext)
  const iconSize: number = 20
  const isDark:boolean = theme === 'dark'

  function onToggle() {
    if (theme === 'light') setTheme('dark')
    else setTheme('light')
  }

  return (
    <div className='mx-1 p-1 flex flex-row relative z-20 inset-0 justify-center items-center '>
      <div className='float-left mr-1 text-themed-gray-t9 w-6 h-6'>
        <AnimatedIcon
          primaryIcon={<IoSunny
          size={iconSize}/>}
          secondaryIcon={<IoMoon size={iconSize}/>}
          isActive={isDark} />
      </div>
      <div className='float-left flex justify-center'><SwitchButton isEnabled={isDark} setIsEnabled={onToggle} /></div>
    </div>
  )
}

export default DarkThemeToggle

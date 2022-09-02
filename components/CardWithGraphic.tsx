import { useContext } from "react";
import { ThemeContext } from "./DarkThemeToggle";

interface iCardWithGraphic{
  title: String;
  content: string;
  graphic: any;
  graphicOnDark: any;
}

/// Provide graphic and some descriptions
export const CardWithGraphicContainer = ({title,content,graphic,graphicOnDark}:iCardWithGraphic )=> {
  const { theme } = useContext(ThemeContext)
  const isDark:boolean = theme === 'dark'
  return (
    <div className='my-6 px-4 md:px-6 py-8 rounded-xl apply-glass h-60 w-full md:max-w-[80%] bg-primary-base bg-opacity-10 flex gap-4 md:gap-6 shadow-sm'>
      <div className='mr-2 min-w-[25%] max-w-[40%] flex'>
        {isDark ? graphicOnDark: graphic}
      </div>
      <div className='w-full style-body'>
        <div className='mb-2 style-subheading'>{title}</div>
        <div className='style-secondary'>{content}</div>
      </div>
    </div>
  )
}
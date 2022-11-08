import { IconType } from "react-icons";

interface iIconButton{
  icon: IconType,
  title: string,
  tooltip?: string,
  leftAligned?: boolean,
  onClickFn?: ()=> void,
}

/**
 * Button to represent the social media `Hyperlink` or any other similar types
 * // TODO: Add logic on pressing the button
 * @param icon react icon
 * @param title will be place at the bottom
 * @param tooltip description of what the button would do
 * @param leftAligned for any left sided elemt (that'd probably collides with the left margin), default to false
 *
 */
export const IconButton = (props:iIconButton) => {
  const twTransitions: string = "transition-all duration-500 ease-out-cubic";
  const twTooltipBg: string = "gray-dark-pallete dark:gray-light-pallete bg-themed-gray-t4";

  return (
    <button onClick={()=> props.onClickFn && props.onClickFn()} className={`relative flex flex-col items-center group `}>
      <div className={`w-12 h-12 md:w-14 md:h-14 p-2 flex flex-col items-center justify-center rounded-lg border-2 border-primary-t5 border-opacity-20 group-hover:apply-glass group-hover:border-opacity-0  ${twTransitions}`}>
        <props.icon className={`text-primary-t3 group-hover:scale-110 group-hover:text-primary-base ${twTransitions} `} size={24} />
      </div>
      <div className={`w-12 md:w-14 mt-1 font-extralight overflow-clip text-themed-gray-t8 text-center text-xs group-hover:style-secondary group-hover:drop-shadow-md ${twTransitions}`}>{props.title}</div>
      {props.tooltip &&
      <div className={`opacity-0 group-hover:opacity-100 absolute w-32 -bottom-12 py-2 px-1 rounded-md shadow-sm text-themed-gray-inverse text-xs text-center pointer-events-none ${twTooltipBg} ${props.leftAligned? 'left-0':'-left-[85%] md:-left-[65%]'}`}>
        <div className={`w-3 h-3 absolute -top-1 rotate-45 ${twTooltipBg} ${props.leftAligned? 'left-4':'left-[46%]'}`} />
        {props.tooltip}
      </div>}
    </button>
  )
}

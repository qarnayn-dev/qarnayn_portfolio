import { useContext } from "react";
import { useSpringRef, useSpring, useChain, animated, easings } from "react-spring";
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
  const isDark: boolean = theme === 'dark'

  // heading ref
  const titleSpring1Ref = useSpringRef();
  const titleSrping1 = useSpring({
    ref: titleSpring1Ref,
    config: { duration: 400 },
    from: {opacity:0, y:100 },
    to: {opacity:1, y:0}
  });
  const titleSpring2Ref = useSpringRef();
  const titleSpring2 = useSpring({
    ref: titleSpring2Ref,
    config: { duration: 600, easing: easings.easeOutBounce},
    from: { transform: 'rotateX(180deg)'},
    to: {transform: 'rotateX(0deg)'}
  });
  // description ref
  const descMotionRef = useSpringRef();
  const descSpring = useSpring({
    ref: descMotionRef,
    config: { duration: 200, },
    from: {opacity: 0},
    to: {opacity: 1}
  });
  //  using chains
  useChain([titleSpring1Ref, titleSpring2Ref, descMotionRef]);

  return (
    <div className='my-6 px-4 md:px-6 py-8 rounded-xl apply-glass h-60 w-full md:max-w-[80%] bg-primary-base bg-opacity-10 flex gap-4 md:gap-6 shadow-sm'>
      <div className='mr-2 min-w-[25%] max-w-[40%] flex'>
        {isDark ? graphicOnDark: graphic}
      </div>
      <div className='w-full style-body'>
        <animated.div style={titleSrping1} className='mb-2 style-subheading'>
          <animated.h2 style={titleSpring2}>{title}</animated.h2>
        </animated.div>
        <animated.div style={descSpring} className='style-secondary'>{content}</animated.div>
      </div>
    </div>
  )
}
import { useContext, useEffect, useState } from "react";
import { IoSpeedometerOutline } from "react-icons/io5";
import { Parallax } from "react-scroll-parallax";
import { useSpringRef, useSpring, useChain, animated, easings } from "react-spring";
import { ThemeContext } from "./DarkThemeToggle";

interface iCardWithGraphic{
  title: String;
  content: string;
  graphic: any;
  graphicOnDark: any;
}

/// Provide graphic and some descriptions
export const CardWithGraphicContainer = ({ title, content, graphic, graphicOnDark }: iCardWithGraphic) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useContext(ThemeContext)
  const isDark: boolean = theme === 'dark'

  const photoSpringRef = useSpringRef();
  const photoSpring = useSpring({
    ref: photoSpringRef,
    config: { duration: 600 },
    to: {x:0, scale: 1}
  })

  // heading ref
  const titleSpring1Ref = useSpringRef();
  const titleSrping1 = useSpring({
    ref: titleSpring1Ref,
    config: { duration: 400 },
    to:isOpen? {opacity:  1, y:0} : { opacity: 0, y: 100 }
  });

  const titleSpring2Ref = useSpringRef();
  const titleSpring2 = useSpring({
    ref: titleSpring2Ref,
    config: { duration: 600, easing: easings.easeOutBounce},
    to: isOpen? {transform: 'rotateX(0deg)'}: { transform: 'rotateX(180deg)'}
  });
  // description ref
  const descMotionRef = useSpringRef();
  const descSpring = useSpring({
    ref: descMotionRef,
    config: { duration: 200 },
    to: isOpen? {opacity: 1} : {opacity: 0}
  });
  //  using chains
  useChain([titleSpring1Ref, titleSpring2Ref, descMotionRef]);

  return (
    <Parallax
        opacity={[0, 5]}
        onProgressChange={(progress) => { if (progress > 0.15) setIsOpen(true) }}
        onExit={()=>setIsOpen(false)}
        className='my-6 px-4 md:px-6 py-8 rounded-xl apply-glass h-60 w-full md:max-w-[80%] bg-primary-base bg-opacity-10 flex gap-4 md:gap-6 shadow-sm justify-center'>
        <animated.div style={photoSpring} className='mr-2 min-w-[25%] max-w-[40%] flex'>
          {isDark ? graphicOnDark: graphic}
        </animated.div>
        <div className='w-full style-body'>
          <animated.div style={titleSrping1} className='mb-2 style-subheading'>
            <animated.h2 style={titleSpring2}>{title}</animated.h2>
          </animated.div>
          <animated.div style={descSpring} className='style-secondary'>{content}</animated.div>
        </div>
      </Parallax>
  )
}
import React, { RefObject} from 'react'
import { animated, useSpring } from 'react-spring';

interface iAnimatedColoredText{
    children: string,
    isOpen: boolean,
    textConfig?: string,
    colorConfig?: string,
    opacityDuration?: number,
    colorDuration?: number,
    objRef?: RefObject<HTMLDivElement> | null | undefined,
}

/**
 * This Component will animate the text, from  `isOpen == true`.
 * Any adjustment to the text property e.g. text-alignment, text-size, font and etc, please specify the `textConfig` which can take 'className' property.
 * `default: 'font-extrabold text-3xl  mobile-lg:text-4xl md:text-5xl text-center'`
 * Any color specification, please specify the `colorConfig`.
 * `default: 'bg-gradient-to-bl from-primary-base to-on-primary'`
*/
export const AnimatedColoredText = ({children, isOpen, textConfig, colorConfig, opacityDuration, colorDuration, objRef}:iAnimatedColoredText) => {
    const defaultTextConfig: string = 'font-extrabold text-3xl  mobile-lg:text-4xl md:text-5xl text-center';
    const defaultColorConfig: string = 'bg-gradient-to-bl from-primary-base to-on-primary';


  const heroSpring = useSpring({
    config: { duration: opacityDuration?? 1000 },
    from: {opacity: isOpen ? 0 : 1},
    to: {opacity: isOpen ? 1 : 0}
  });

  const colorChangeSpring = useSpring({
    config: { duration: colorDuration?? 4000 },
    to: {WebkitFilter: isOpen ? 'hue-rotate(0deg)' : 'hue-rotate(360deg)'}
  });

  return (
    <animated.div ref={objRef} style={heroSpring} className={`px-6 ${textConfig ?? defaultTextConfig}`}>
        <animated.div style={colorChangeSpring} className={`${colorConfig ??defaultColorConfig} bg-clip-text text-transparent`}>
            <>{children}</>
        </animated.div>
      </animated.div>
  )
}

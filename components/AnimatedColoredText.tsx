import { useScroll } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react'
import { animated, useSpring } from 'react-spring';

interface iAnimatedColoredText{
    children: string,
    isOpen: boolean,
    textConfig?: string,
    colorConfig?: string,
    opacityDuration?: number,
    colorDuration?: number,
}

export const AnimatedColoredText = ({children, isOpen, textConfig, colorConfig,opacityDuration,colorDuration}:iAnimatedColoredText) => {
    const defaultTextConfig: string = 'font-extrabold text-6xl text-center';
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
    <animated.div style={heroSpring} className={`px-6  ${textConfig ?? defaultTextConfig}`}>
        <animated.div style={colorChangeSpring} className={`${colorConfig ??defaultColorConfig} bg-clip-text text-transparent`}>
            <>{children}</>
        </animated.div>
      </animated.div>
  )
}

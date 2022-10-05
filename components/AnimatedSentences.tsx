import { useState, useEffect, CSSProperties, useRef } from "react";
import { easings,useTransition,  animated, useSpring, useSpringRef, useChain } from "react-spring";

interface iAnimatedSentences{
  children: string,
  className?: string,
  focusConfig?: string,
  afterTextConfig?: string,
  textAlignment?: string,
  title?: string,
  isAnimate?: boolean,
}

/**
 * Split and animate the sentence by sentence. Afterward, display all the sentence in one paragraph.
 * It take `children` as the parameter.
 * If you want to ONLY specify the text alignment, use `textAlignment` instead.
 * When the text is in focus, `focusConfig` or the default: `'text-start text-lg mobile-lg:text-xl md:text-2xl font-semibold gray-dark-pallete dark:gray-light-pallete text-themed-gray-t6'` will be applied.
 * When the text is finieshed, `afterTextConfig` or the default: `'text-start text-base mobile-lg:text-lg md:text-xl'` will be applied.
 */
export const AnimatedSentences = ({ children,className, focusConfig, afterTextConfig,textAlignment, title,isAnimate}: iAnimatedSentences) => {
  const fractions: string[] = children.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g)?.filter((value) => (value !== ' ' && value !== undefined) ? value : null).map((value) => value.trim()) ?? [];
  if (title) fractions.unshift(title);
  const [isFinished, setIsFinished] = useState(isAnimate? false : true);
  const [current, setCurrent] = useState(fractions[0]);

  const config: string = "flex flex-col items-center justify-center relative";
  const defaultFocusConfig: string = `${textAlignment??'text-start'} text-lg mobile-lg:text-xl md:text-2xl font-medium gray-dark-pallete dark:gray-light-pallete text-themed-gray-t6`;
  const defaultTextAfterConfig: string = `${textAlignment??'text-start'} style-body`;

  const titleSpringRef = useSpringRef();
  const titleSpring = useSpring({
    ref: titleSpringRef,
    to: { opacity: isFinished? 1 : 0},
    config: { duration: 1400, easing: easings.easeInCirc},
  });

  const transition = useTransition(current,{
    from: { opacity: 0},
    enter: { opacity: 1},
    leave: { opacity: 0},
    delay: 200,
    config: { duration: 500 },
    trail : 600,
  });

  const afterEffectSpringRef = useSpringRef();
  const afterEffectSpring = useSpring({
    ref: afterEffectSpringRef,
    to: { opacity: isFinished? 1 : 0, x:isFinished? 0 : 100},
    config: { duration: 800, easing: easings.easeOutCirc},
  });


  useEffect(() => {
    // determine criteria to run
    const currentIndex: number = fractions.indexOf(current);
    const timeFactor: number = 70;
    // set interval for every dynamically
    const timesUp: number = (current.length < 42)? 3000 : (current.length) * timeFactor;
    if (!isFinished && currentIndex != -1 && currentIndex < fractions.length - 1) {
      const timeOut = setTimeout(() => setCurrent(fractions[currentIndex + 1]), timesUp);
      return () => clearTimeout(timeOut);
    }
    else if (!isFinished && currentIndex === fractions.length - 1) {
      const timeOut = setTimeout(() => {
        setCurrent('');
        setIsFinished(true);
      }, timesUp);
      return () => clearTimeout(timeOut);
    }
  }, [current]);

  useChain([titleSpringRef,afterEffectSpringRef],[0.2,0.4]);

  return (
    <div className={`${className ?? 'w-screen h-[10%]'} ${config} ${afterTextConfig ?? defaultTextAfterConfig} `}>
      <animated.div style={titleSpring} className="style-heading font-medium mb-4 w-full">{title}</animated.div>
      {
        (isFinished) ?
          <animated.div style={afterEffectSpring}>{children}</animated.div> :
          transition(({ opacity}, item, _, index) => (
            <animated.div
                key={`acacs#${index}`}
                style={{opacity: opacity}}
                className={`${focusConfig ?? defaultFocusConfig} absolute w-full`}
                >
                {item}
            </animated.div>
          ))
      }
    </div>
  )
 }
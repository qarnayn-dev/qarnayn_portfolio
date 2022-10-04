import { useState, useEffect, CSSProperties } from "react";
import { easings,useTransition,  animated, useSpring } from "react-spring";

interface iAnimatedSentences{
  children: string,
  className?: string,
  focusConfig?: string,
  afterTextConfig?: string,
  textAlignment?: string
}

/**
 * Split and animate the sentence by sentence. Afterward, display all the sentence in one paragraph.
 * It take `children` as the parameter.
 * If you want to ONLY specify the text alignment, use `textAlignment` instead.
 * When the text is in focus, `focusConfig` or the default: `'text-start text-lg mobile-lg:text-xl md:text-2xl font-semibold gray-dark-pallete dark:gray-light-pallete text-themed-gray-t6'` will be applied.
 * When the text is finieshed, `afterTextConfig` or the default: `'text-start text-base mobile-lg:text-lg md:text-xl'` will be applied.
 */
export const AnimatedSentences = ({ children,className, focusConfig, afterTextConfig,textAlignment }: iAnimatedSentences) => {
  const [isFinished, setIsFinished] = useState(false);
  const fractions: string[] = children.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g)?.filter((value) => (value !== ' ' && value !== undefined) ? value : null).map((value) => value.trim()) ?? [];
  const [current, setCurrent] = useState(fractions[0]);

  const config: string = "flex flex-col items-center justify-center relative";
  const defaultFocusConfig: string = `${textAlignment??'text-start'} text-lg mobile-lg:text-xl md:text-2xl font-semibold gray-dark-pallete dark:gray-light-pallete text-themed-gray-t6`;
  const defaultTextAfterConfig: string = `${textAlignment??'text-start'} text-base mobile-lg:text-lg md:text-xl`;
    const itemConfig: CSSProperties = { position: 'absolute', width: '100%'};

  const transition = useTransition(current,{
    from: { opacity: 0},
    enter: { opacity: 1},
    leave: { opacity: 0},
    delay: 200,
    config: { duration: 500 },
    trail : 800,
  });

  const afterEffectSpring = useSpring({
    to: { opacity: isFinished? 1 : 0, x:isFinished? 0 : 100},
    delay: 600,
    config: { duration: 1200, easing: easings.easeOutBack},
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

  return (
    <div className={`${className??'w-screen h-[10%]'} ${config} ${isFinished? afterTextConfig?? defaultTextAfterConfig : focusConfig ?? defaultFocusConfig} `}>
      {
        (isFinished) ?
          <animated.div style={afterEffectSpring}>{children}</animated.div> :
          transition(({ opacity}, item, _, index) => (
            <animated.div
                key={`acacs#${index}`}
                style={{opacity: opacity,...itemConfig}}>
                {item}
            </animated.div>
          ))
      }
    </div>
  )
 }
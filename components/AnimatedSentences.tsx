import { useState, useEffect } from "react";
import { easings,useTransition,  animated, useSpring, useSpringRef, useChain } from "react-spring";

interface iAnimatedSentences{
  children: string,
  className?: string,
  twOnAnimateStyle?: string,
  twOnRestStyle?: string,
  // either `text-` or `items-` which depends on the positions
  twTextAlignment?: string,
  // tailwind `margin` and `padding`
  twBoundaries?: string,
  title?: string,
  showAnimation?: boolean,
}

/**
 * Split and animate the sentence by sentence. Afterward, display all the sentence in one paragraph.
 * It take `children` as the parameter.
 * If you want to ONLY specify the text alignment, use `twTextAlignment` instead.
 * When the text is in focus, `twOnAnimateStyle` or the default: `'text-start text-lg mobile-lg:text-xl md:text-2xl font-semibold gray-dark-pallete dark:gray-light-pallete text-themed-gray-t6'` will be applied.
 * When the text is finieshed, `twOnRestStyle` or the default: `'text-start text-base mobile-lg:text-lg md:text-xl'` will be applied.
 */
export const AnimatedSentences = ({ children,className, twOnAnimateStyle,  twOnRestStyle,twTextAlignment,twBoundaries, title,showAnimation = false}: iAnimatedSentences) => {
  const fractions: string[] = children.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g)?.filter((value) => (value !== ' ' && value !== undefined) ? value : null).map((value) => value.trim()) ?? [];
  if (title) fractions.unshift(title);

  const [current, setCurrent] = useState(fractions[0]);
  const [afterEffect, setAfterEffect] = useState(false);

  const config: string = "flex flex-col justify-center";
  const onAnimateStyle: string = twOnAnimateStyle ?? `${twTextAlignment??'items-start'} text-lg mobile-lg:text-xl md:text-2xl font-medium gray-dark-pallete dark:gray-light-pallete text-themed-gray-t6`;
  const onRestStyle: string = twOnRestStyle ?? `${twTextAlignment ?? 'text-start'} style-body`;
  const defaultSize: string = "w-screen h-[10%]";
  const boundaries: string = twBoundaries ?? "px-6 mobile-lg:px-8 md:px-12 lg:px-16";

  // const transRef = useSpringRef();
  const transition = useTransition(showAnimation? current:'', {
    // ref: transRef,
    from: { opacity: 0},
    enter: { opacity: 1},
    leave: { opacity: 0},
    delay: 200,
    config: { duration: 500 },
    trail : 600,
  });

  const titleSpringRef = useSpringRef();
  const titleSpring = useSpring({
    ref: titleSpringRef,
    to: { opacity: afterEffect? 1 : 0},
    config: { duration: 1400, easing: easings.easeInCirc},
  });

  const afterEffectSpringRef = useSpringRef();
  const afterEffectSpring = useSpring({
    ref: afterEffectSpringRef,
    to: { opacity: afterEffect? 1 : 0, x:afterEffect? 0 : 100},
    config: { duration: 800, easing: easings.easeOutCirc},
  });


  useEffect(() => {
    if (showAnimation) {
        // determine criteria to run
      const currentIndex: number = fractions.indexOf(current);
      const timeFactor: number = 70;
      // set interval for every dynamically
      const timesUp: number = (current.length < 42)? 3000 : (current.length) * timeFactor;
      if (showAnimation && currentIndex != -1 && currentIndex < fractions.length - 1) {
        const timeOut = setTimeout(() => setCurrent(fractions[currentIndex + 1]), timesUp);
        return () => clearTimeout(timeOut);
      }
      else if (showAnimation && currentIndex === fractions.length - 1) {
        const timeOut = setTimeout(() => {
          setCurrent('');
          setAfterEffect(true);
        }, timesUp);
        return () => clearTimeout(timeOut);
      }
    }
  }, [showAnimation,current]);

  useChain([titleSpringRef, afterEffectSpringRef],[0,0.4]);

  function onFocusAnimation() {
    return transition(({ opacity }, item) => (
      <animated.div
        style={{opacity:opacity}}
        className={`${className ?? defaultSize} ${boundaries} ${config} ${onAnimateStyle} w-full absolute`}> {item}</animated.div>
    ));
  }

  return (
    <>
      <div className={`${className ?? defaultSize} ${boundaries} ${config} ${onRestStyle} relative items-center bg-green-200`}>
        <animated.div style={titleSpring} className="style-heading font-medium mb-4 w-full">{title}</animated.div>
        <animated.div style={afterEffectSpring}>{children}</animated.div>
        {onFocusAnimation()}
      </div>
    </>
  )
 }
import { useState, useEffect, useCallback, useMemo } from "react";
import { useSpring, easings, animated, useTransition, Transition, config} from "react-spring";
import { Debouncer } from "./utilities/Debouncer";

export const TypingEffect = () => {
    const [isAnimate, setIsAnimate] = useState(true);
    const [isForward, setIsForward] = useState(true);
    const manyWords: string[] = ["Hi, I'm Qarnayn.", 'An engineer who codes with a sense of aesthetics.'];
    const [current, setCurrent] = useState<string | null>(manyWords[0]);

    const debouncer = new Debouncer(() => {
        console.log("Execute this! (set isForward) ");
        setIsForward(latest => !latest);
    }, 1000);

    useEffect(() => {
        if (!isForward) {
        const timeOut = setTimeout(() => { setIsAnimate(true) }, 30);
        return () => clearTimeout(timeOut);
        }
    }, []);

    useEffect(() => {
        // when the animation's done -> move to next
        if (!isForward) {
            setCurrent(latest => {
                const index = (latest) ? manyWords.indexOf(latest) : null;
                return ((index!==null ) && (index < manyWords.length)) ? manyWords[index + 1] : null;
            });
        }
    }, [isForward]);

    const memoizedArray : string[] = useMemo(
      () => (isAnimate && isForward && current)? current.split('') : [],
      [current, isForward, isAnimate],
    )

    const cursorSpring = useSpring({
        config: { duration: 800, easing: easings.easeInBack},
        loop: {reset: true},
        from: { opacity: 0 },
        to: { opacity: 1 },
        delay: 200,
    });

    const letterTransition = useTransition(memoizedArray, {
        config: { duration: 180, easing: easings.easeInBack},
        keys: memoizedArray.map((v, i) => `${v}-${i}`),
        from: { opacity: 0, width: '4px', height: '16px', background: 'white'},
        enter: { opacity: 1, background: 'transparent',life: "100%"},
        leave: { opacity: 0, life: "0%"},
        delay: 400,
        trail: isForward? 200 : -20,
        expires: true,
        reverse: true,
        onRest: () => { debouncer.rebound(); },
    });

    function handleNextItter() {
        console.log("array: ", `${memoizedArray}`);
        // after the reset
        if (memoizedArray.length === 0) {
            setIsForward(true);
            console.log("set animation -> true");
        } else if (memoizedArray.length > 0) {
            console.log("set animation -> false");
            // temporary disable the animation
            setIsForward(false);
            setCurrent(latest => {
                const index = (latest)? manyWords.indexOf(latest) : null;
                return (index && index < manyWords.length) ? manyWords[index + 1] : null;
            });
        }
    }

    return (
        <div className='flex items-center justify-center'>
        <span className='font-mono tracking-wider relative '>
            {letterTransition(({ opacity,width,height,background }, item, _, index) => (
            <animated.span style={{ opacity: opacity,width:width,height:height,background:background }} className="float-none">
                {item}
                {
                (index === memoizedArray.length - 1) &&
                <animated.div style={cursorSpring} className='w-1 h-[16px] ml-[2px] bg-neutral-300 inline-block items-end absolute bottom-1'></animated.div>
                }
            </animated.span>
            ))}
        </span>
        </div>
    )
}

import { useState, useEffect, useMemo } from "react";
import { useSpring, easings, animated, useTransition} from "react-spring";
import { Debouncer } from "../utilities/Debouncer";
import { stringToArray } from "../utilities/StringUtility";

interface iTypingEffect{
    children: string | string[],
    showAnimation: boolean,
    restTime?: number,
    callback?:()=> void,
    delayOnCallback?:number,
}

export const TypingEffect = ({children, restTime = 1000, showAnimation,callback, delayOnCallback = 600}: iTypingEffect) => {
    // const [isAnimate, setIsAnimate] = useState(false);
    const [isForward, setIsForward] = useState(true);
    const sentenceList: string[] = (children instanceof Array) ? children : stringToArray(children);
    const [current, setCurrent] = useState<string | null>(sentenceList[0]);

    // Main array used for the transitions
    const memoizedArray : string[] = useMemo(
      () => (showAnimation && isForward && current)? current.split('') : [],
      [current, isForward, showAnimation],
    )

    const debouncer = new Debouncer(() => {
        setIsForward(latest => !latest);
    }, isForward? restTime: (restTime*0.22));

    useEffect(() => {
        // when the animation's done -> move to next
        if (!isForward) {
            setCurrent(latest => {
                const index = (latest) ? sentenceList.indexOf(latest) : null;
                return ((index!==null ) && (index < sentenceList.length)) ? sentenceList[index + 1] : null;
            });
        }
    }, [isForward]);

    useEffect(() => {
        // if there's any callback after all has fnished
        if (current === undefined && !isForward && callback) {
            console.log("Fininshed all! ");
            const timeout = setTimeout(callback, delayOnCallback);
            return () => clearTimeout(timeout);
        }
    }, [current === undefined])


    const cursorSpring = useSpring({
        config: { duration: 700, easing: easings.easeInBack},
        loop: {reset: true},
        from: { opacity: 0 },
        to: { opacity: 1 },
        delay: 150,
    });

    const letterTransition = useTransition(memoizedArray, {
        config: { duration: 150, easing: easings.easeInBack},
        keys: memoizedArray.map((v, i) => `${v}-${i}`),
        from: { opacity: 0, width: '4px', height: '16px', background: 'white'},
        enter: { opacity: 1, background: 'transparent',life: "100%"},
        leave: { opacity: 0, life: "0%" },
        delay: 200,
        trail: isForward? 200 : -20,
        expires: true,
        reverse: true,
        onRest: () => { debouncer.rebound(); },
    });

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

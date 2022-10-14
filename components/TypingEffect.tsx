import { useState, useEffect } from "react";
import { useSpring, easings, animated, useTransition} from "react-spring";

export const TypingEffect = () => {
    const [isAnimate, setIsAnimate] = useState(false);
    const sentence: string = "Hi, im qarnayn";
    const currentArray: string[] = sentence.split('');

    useEffect(() => {
        if (!isAnimate) {
        const timeOut = setTimeout(() => { setIsAnimate(true) }, 3000);
        return () => clearTimeout(timeOut);
        }
    }, []);

    const cursorSpring = useSpring({
        config: { duration: 800, easing: easings.easeInBack},
        loop: {reset: true},
        from: { opacity: 0 },
        to: { opacity: 1 },
        delay: 200,
    });

    const letterTransition = useTransition(isAnimate? currentArray : [], {
        config: { duration: 500, easing: easings.easeInBack },
        keys: currentArray.map((v,i)=>`${v}-${i}`),
        from: { opacity: 0, width: '4px', height: '16px', background: 'white'},
        enter: { opacity: 1, width: 'none', height: 'none', background: 'transparent'},
        leave: { opacity: 0},
        delay: 200,
        trail: 300,
    });

    return (
        <div className='flex items-center justify-center'>
        <span className='font-mono tracking-wider relative '>
            {letterTransition(({ opacity,width,height,background }, item, _, index) => (
            <animated.span style={{ opacity: opacity,width:width,height:height,background:background }} className="float-none">
                {item}
                {
                (index === currentArray.length - 1) &&
                <animated.div style={cursorSpring} className='w-1 h-[16px] ml-[2px] bg-neutral-300 inline-block items-end absolute bottom-1'></animated.div>
                }
            </animated.span>
            ))}
        </span>
        </div>
    )
}

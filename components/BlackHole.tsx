import { ReactNode, useCallback, useEffect, useState } from "react";
import { animated, easings, useSpring } from "react-spring";

interface iBlackHoleOptions{
    children?: any,
    className?: string,
    duration?: number,
    isShow?: boolean,
    delay?: number,
}

export const BlackHole = ({ children, className, duration, isShow = true, delay }: iBlackHoleOptions) => {
    const twSize: string = "w-[30vh] h-[30vh]";
    const twSupportSize: string = "w-[35vh] h-[48vh]";
    const twSinggleSupport: string = "w-[10%] h-full from-black z-0 blur-[2px]";

    const sphereSpring = useSpring({
        config: { duration: duration?? 1200,easing: easings.easeInOutBack},
        to: { scale: isShow ? 1 : 0.2 },
        delay: delay?? 200,
    });

    const supportSpring = useSpring({
        config: { duration: duration? (duration*0.6): 600,easing: easings.easeInQuad},
        to: {opacity: isShow? 1 : 0},
        delay: delay?? 200,
    });

    return (
        <animated.div style={sphereSpring} className={`w-screen h-screen bg-transparent absolute top-0 right-0 flex flex-col items-center justify-center ${className?? 'z-10'}`}>
            <div className={`${twSize} absolute rounded-full bg-transparent filter backdrop-blur-lg shadow-2xl shadow-neutral-800`}></div>
            <div className={`${twSize} rounded-full bg-neutral-700 bg-opacity-30 filter blur-3xl absolute -z-10`}>
            </div>
            <div className={`${twSize} rounded-full bg-black bg-opacity-60 blur-xl filter absolute`}></div>
            <div className={`${twSize} p-6 absolute font-mono text-neutral-100 flex flex-col justify-center items-center text-center`}>
                {children}
            </div>
            <animated.div style={supportSpring} className={`${twSupportSize} absolute bottom-0 -z-20 shadow-black shadow-2xl flex`}>
                <span className={`${twSinggleSupport} bg-gradient-to-l `}></span>
                <span className='w-full h-full bg-black  blur-[2px]'></span>
                <span className={`${twSinggleSupport} bg-gradient-to-r`}></span>
            </animated.div>
        </animated.div>
    )
}

interface iBeeping{
    className?: string,
}

const Beeping = ({className}:iBeeping) => {
    const [beep, setBeep] = useState(true);
    const outerRingSpring = useSpring({
        config: {  easing:easings.easeOutBack},
        loop: true,
        from: {scale: 1, opacity: 0},
        to: { scale: beep? 1.6 :  1, opacity: beep? 1 :0},
        onRest: () => setBeep(false),
    });

    return (
        <animated.div style={outerRingSpring}  className={`${className??'w-[30vh] h-[30vh]'} absolute rounded-full ring-neutral-700 filter blur-xl ring-8`}>
        </animated.div>
    );
}
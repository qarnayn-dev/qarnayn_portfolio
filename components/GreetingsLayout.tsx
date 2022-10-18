import React, { useEffect, useState } from 'react'
import { easings, useSpring } from 'react-spring';
import { BlackHole } from './BlackHole';
import { MatrixEffect } from './MatrixEffect';
import { TypingEffect } from './TypingEffect';

export const GreetingsLayout = () => {
    const [showLayout, setShowLayout] = useState(true);
    const [startBlackHole, setStartBlackHole] = useState(false);
    const [startGreetings, setStartGreetings] = useState(false);

    useEffect(() => {
        const timeOut1 = setTimeout(() => { setStartBlackHole(true) }, 1600);
        const timeOut2 = setTimeout(() => { setStartGreetings(true) }, 2800);
    return () => {
      clearTimeout(timeOut1);
      clearTimeout(timeOut2);
    }
    }, []);

    function onDispose() {
        setStartBlackHole(false);
        const timeout = setTimeout(() => setShowLayout(false), 1800);
        return () => clearTimeout(timeout);
    }

    const outSpring = useSpring({
        config: { duration: 1600, easing: easings.easeInCirc},
        from: {opacity: 1 },
        to: {opacity: showLayout? 1: 0, clipPath: "circle(0% at 50% 50%)"},
    });




    return (
        <MatrixEffect showScreen={showLayout}>
                <BlackHole isShow={startBlackHole}>
                    <TypingEffect
                        showAnimation={startGreetings}
                        callback={() => onDispose()}>
                        {[
                            "Hello World",
                            "I'm Qarnayn",
                        ]}
                    </TypingEffect>
                </BlackHole>
        </MatrixEffect>
    )
}

import React, { useEffect, useState } from 'react'
import { BlackHole } from './BlackHole';
import { MatrixEffect } from './MatrixEffect';
import { TypingEffect } from './TypingEffect';


interface iGreetingsLayout{
    show?: boolean,
}

export const GreetingsLayout = ({show = true}:iGreetingsLayout) => {
    const [showLayout, setShowLayout] = useState<boolean>(show);
    const [startBlackHole, setStartBlackHole] = useState(false);
    const [startGreetings, setStartGreetings] = useState(false);

    useEffect(() => {
        const timeOut1 = setTimeout(() => { setStartBlackHole(true) }, 800);
        const timeOut2 = setTimeout(() => { setStartGreetings(true) }, 1400);
    return () => {
      clearTimeout(timeOut1);
      clearTimeout(timeOut2);
    }
    }, []);

    function onDispose() {
        setStartBlackHole(false);
        const timeout = setTimeout(() => {
            setShowLayout(false);
        }, 600);
        return () => clearTimeout(timeout);
    }

    return (
        <MatrixEffect showScreen={showLayout} >
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

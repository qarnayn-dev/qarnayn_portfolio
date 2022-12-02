import React, { useEffect, useState } from 'react'
import { BlackHole } from './BlackHole';
import { MatrixEffect } from './MatrixEffect';
import { TypingEffect } from './TypingEffect';


interface iGreetingsLayout{
    show: boolean,
    onDisposeFn: ()=> void,
}

export const GreetingsLayout = ({show,onDisposeFn}:iGreetingsLayout) => {
    const [startBlackHole, setStartBlackHole] = useState(false);
    const [startGreetings, setStartGreetings] = useState(false);

    useEffect(() => {
        if (show) {
            const timeOut1 = setTimeout(() => { setStartBlackHole(true) }, 800);
            const timeOut2 = setTimeout(() => { setStartGreetings(true) }, 1400);
            return () => {
            clearTimeout(timeOut1);
            clearTimeout(timeOut2);
            }
        }
    }, [show]);

    function onDispose() {
        setStartBlackHole(false);
        const timeout = setTimeout(() => {
            onDisposeFn();
        }, 600);
        return () => clearTimeout(timeout);
    }

    return (
        <MatrixEffect showScreen={show} >
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

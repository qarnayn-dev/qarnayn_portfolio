import React, { Children } from 'react'
import TopFrame from '../components/TopFrame'
import {animated , config, easings, useChain, useSpring, useSpringRef, useTransition} from 'react-spring';


const Devpage = () => {
  return (
    <>
    <TopFrame/>
    <FollowAlong>
        <div></div>
    </FollowAlong>
    {/* <WeirdMaterial/>
    <WeirdMaterial/>
    <WeirdMaterial/> */}
    </>
  )
}

export default Devpage

const FollowAlong = (props: Object) => {
    console.log(props);

    const dummyItems: any[] = [1,2,3];
    const transitions = useTransition(dummyItems, {
        trail: 300,
        config: {duration:700, easing: easings.easeOutBack},
        keys: dummyItems.map((_, index) => index),
        from: {opacity : 0 , y: 100},
        enter: {opacity : 1, y: 0},
        to: { opacity: 0 },
        delay: 200,
    });

    return (
        <div className='flex flex-col w-min h-min gap-2 items-center justify-center'>
            {transitions((styles, item) => (
                <animated.div style={styles} className ='float-left'>
                    <WeirdMaterial/>
                </animated.div>
            ))}
        </div>
    )
}

interface iWeirdObj{
    myKey:number
}
const WeirdMaterial = () => {
    return (
        <div  className='w-40 h-10 rounded-lg shadow-md bg-secondary-t5'></div>
    )
}
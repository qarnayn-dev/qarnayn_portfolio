import React, { Children } from 'react'
import TopFrame from '../components/TopFrame'
import {animated , config, easings, useChain, useSpring, useSpringRef, useTransition} from 'react-spring';


const Devpage = () => {
  return (
    <>
    <TopFrame/>
    <FollowAlong>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </FollowAlong>
    {/* <WeirdMaterial/>
    <WeirdMaterial/>
    <WeirdMaterial/> */}
    </>
  )
}

export default Devpage

const FollowAlong = (props: any) => {
    const propChildren: any[] = props.children;
    const numOfChild: number = propChildren.length;
    const curatedDuration:number = (numOfChild<6)? 230 * numOfChild : 1000;
    const curatedTrail: number = 300 -((numOfChild > 6) ? (numOfChild - 6) * 10 : 0);
    const transitions = useTransition(propChildren, {
        trail: curatedTrail,
        config: {duration:curatedDuration, easing: easings.easeOutBack},
        keys: propChildren.map((_, index) => index),
        from: {opacity : 0 , y: 200},
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
import React, { LegacyRef, useRef, useState } from 'react'
import { Parallax, ParallaxProvider, useParallax } from 'react-scroll-parallax'
import { animated, easings, useSpring } from 'react-spring'
import TopFrame from '../components/TopFrame'


const Devpage = () => {
  return (
    <>
    <TopFrame/>
    <ParallaxSample></ParallaxSample>
    </>
  )
}

export default Devpage


const ParallaxSample = () => {

  return (
    <>
    <div className='relative w-screen h-screen bg-gradient-to-br from-primary-t5 flex flex-col justify-center items-center'>
      {/* <SprinngAnim></SprinngAnim> */}
    </div>
    <div className='relative w-screen h-screen bg-gradient-to-tr from-primary-t5 flex gap-4 justify-center items-center'>
        <Parallax
          onEnter={()=>{}}>
          <div className="w-20 h-16 rounded-md shadow-md bg-red-200" /></Parallax>
        <Parallax
          speed={20}
          // onChange={(element) => console.log("Element -> ",element.progress)}
          // onProgressChange={(progress)=>{console.log("%: ", (progress*100).toFixed(2)+"%")}}
          >
          <div className="w-20 h-16 rounded-md shadow-md bg-indigo-200" />
        </Parallax>
        <SprinngAnim></SprinngAnim>

    </div>
    <div className='relative w-screen h-screen bg-gradient-to-br from-primary-t5'></div>

    </>
  )
}


const OnTheFly = () => {
  const [showing, setShowing] = useState(false);
  const thisStyle = useSpring({
    config: { duration: 1600, easing: easings.easeOutBounce},
    from: { transform: 'rotateZ(180deg)'},
    to: { transform: 'rotateZ(0deg)' },
    delay: 400
  });

  return (
    <div className='w-40 h-32 rounded-lg shadow-md bg-themed-gray-t3 flex items-center justify-center'>
      <Parallax onEnter={()=> setShowing(true)} onExit={()=> setShowing(false)}>
        <animated.div style={thisStyle} className='w-20 h-16 gray-dark-pallete dark:gray-light-pallete bg-themed-gray-base'></animated.div>
      </Parallax>
    </div>
  )
}


const SprinngAnim = () => {
  const [isOpen, setIsOpen] = useState(false);
  const springStyle = useSpring({
    config: { duration: 1000 },
    // from: {scale: 1 ,transform: 'rotateZ(0deg)'},
    to: {
      // display: isOpen? 'flex' : 'none',
      opacity: isOpen? 1: 0,
      scale: isOpen? 1.5 : 1 ,
      transform: isOpen ? 'rotateZ(360deg)' : 'rotateZ(0deg)'
    },
  });

  return (
    <Parallax
      speed={10}
      onProgressChange={(progress) => {
        if (progress > 0.5) setIsOpen(true)
      }}
      // onEnter={() => setIsOpen(true)}
      onExit={() => setIsOpen(false)}>
      <animated.div
      onClick={() => setIsOpen(!isOpen)}
      style={springStyle}
      className='w-40 h-40 bg-gradient-to-tl from-red-400 to-primary-base rounded-2xl backdrop-blur-sm shadow-lg'></animated.div>
    </Parallax>
  )
 }
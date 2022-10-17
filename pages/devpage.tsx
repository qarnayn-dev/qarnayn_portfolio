import React, { LegacyRef, useEffect, useRef, useState } from 'react'
import { useScroll } from 'framer-motion'
import { useScrollSnap } from '../components/useScrollSnap'
import { MatrixEffect } from '../components/MatrixEffect'
import { BlackHole } from '../components/BlackHole'
import { TypingEffect } from '../components/TypingEffect'


const Devpage = () => {
  const fullScreenConfig: string = "w-screen h-screen flex flex-col justify-center items-center";
  const centerChildrenConfig: string = "flex flex-col justify-center items-center";
  const bgColor: string = 'bg-gradient-to-br from-primary-base to-themed-gray-base';
  const [isShow, setIsShow] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
        const timeOut = setTimeout(() => { setIsShow(true) }, 2000);
        return () => clearTimeout(timeOut);
  }, []);

  return (
    <>
      <DummyPage></DummyPage>
      <MatrixEffect></MatrixEffect>
      {/* <div className='w-40 h-40 z-50 inset-0 bg-white absolute top-[40%] left-[35%] flex items-center justify-center'>
        <TypingEffect></TypingEffect>
      </div> */}
      <BlackHole><TypingEffect showAnimation={isShow} callback={()=>{console.log("Do smtg when done!!!!");}}>{["Hi, I'm Qarnayn.","An engineer who codes", 'with a sense of aesthetics.', 'yo hahaha wassup']}</TypingEffect></BlackHole>
    </>
  )
}

export default Devpage


const DummyPage = () => {
  const objRef = useRef<HTMLElement>(null);

  useScrollSnap(objRef);


  return (
    <div className='overflow-auto bg-red-400 z-20 w-screen h-screen'>
      <div className='w-screen h-screen bg-amber-100'>
        <div className='w-screen h-3 bg-green-400'></div>
      </div>
      <div className='w-screen h-screen bg-blue-100'></div>
      <div ref={objRef as LegacyRef<HTMLDivElement> | undefined} className='w-screen h-screen bg-red-100'></div>
      <div className='w-screen h-screen bg-green-100'></div>
    </div>
  )
}

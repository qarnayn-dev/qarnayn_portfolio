import React, { LegacyRef, ReactNode, useEffect, useRef, useState } from 'react'
import TopFrame from '../components/TopFrame'
import { AnimatedColoredText } from '../components/AnimatedColoredText'
import { DummyBlock } from '../components/DummyBlock'
import { useScroll } from 'framer-motion'
import { useScrollSnap } from '../components/useScrollSnap'
import useWindowDimensions from '../components/useWindowDimensions'
import { MatrixEffect } from '../components/MatrixEffect'
import { BlackHole } from '../components/BlackHole'


const Devpage = () => {
  const fullScreenConfig: string = "w-screen h-screen flex flex-col justify-center items-center";
  const centerChildrenConfig: string = "flex flex-col justify-center items-center";
  const bgColor: string = 'bg-gradient-to-br from-primary-base to-themed-gray-base';
  const [isShow, setIsShow] = useState(false);
  const { scrollY } = useScroll();




  return (
    <>
      <DummyPage></DummyPage>
      <MatrixEffect></MatrixEffect>
      <div className='z-10 inset-0 w-screen h-screen bg-transparent absolute top-0 right-0 flex flex-col items-center justify-center'>
        {/* <div className='w-40 h-40 rounded-full bg-transparent filter backdrop-blur-xl flex flex-col justify-center items-center font-mono text-neutral-100 shadow-2xl shadow-neutral-700'>Hello world</div>
        <div className='w-40 h-[50vh] absolute top-[50vh] -z-10 filter backdrop-blur-3xl bg-black shadow-black shadow-2xl'></div>
        <div className='w-44 h-[50vh] absolute top-[50vh] -z-10 bg-transparent shadow-black shadow-lg blur-md flex'>
          <span className='w-4 h-full bg-gradient-to-l from-black'></span>
          <span className='w-full h-full bg-black'></span>
          <span className='w-4 h-full bg-gradient-to-r from-black'></span>
        </div> */}
      </div>
      <BlackHole>Hello world</BlackHole>
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

import React, { LegacyRef, useEffect, useRef, useState } from 'react'
import TopFrame from '../components/TopFrame'
import { AnimatedColoredText } from '../components/AnimatedColoredText'
import { DummyBlock } from '../components/DummyBlock'
import { useScroll } from 'framer-motion'
import { useScrollSnap } from '../components/useScrollSnap'
import useWindowDimensions from '../components/useWindowDimensions'
import { MatrixEffect } from '../components/MatrixEffect'


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

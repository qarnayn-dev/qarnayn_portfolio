import React, { LegacyRef, ReactNode, useEffect, useRef, useState } from 'react'
import { useScroll} from 'framer-motion'
import { DummyBlock } from '../components/DummyBlock'
import { ParallaxWrapper } from '../components/ParallaxWrapper';


const Devpage = () => {
  const fullScreenConfig: string = "w-screen h-screen flex flex-col justify-center items-center";
  const centerChildrenConfig: string = "flex flex-col justify-center items-center";
  const bgColor: string = 'bg-gradient-to-br from-primary-base to-themed-gray-base';
  const { scrollY } = useScroll();


  return (
    <>
      <DummyPage></DummyPage>
    </>
  )
}

export default Devpage


const DummyPage = () => {

  return (
    <>
      <div className='w-screen h-screen bg-green-100'></div>
      <div className='w-screen h-screen bg-blue-100 flex justify-center items-center'>
        <div id="test-rotate"><DummyBlock size='lg' colorChoose={2}></DummyBlock></div>
        <ParallaxWrapper yDisplacement={700}>
          <div id="test-rotate"><DummyBlock size='lg' colorChoose={6}></DummyBlock></div>
        </ParallaxWrapper>
        <ParallaxWrapper yDisplacement={-700}>
          <div id="test-rotate"><DummyBlock size='lg' colorChoose={19}></DummyBlock></div>
        </ParallaxWrapper>
        <div id="test-rotate"><DummyBlock size='lg' colorChoose={12}></DummyBlock></div>
      </div>
      <div className='w-screen h-screen bg-green-100'></div>
      <div className='w-screen h-screen bg-red-100'></div>
    </>
  )
}

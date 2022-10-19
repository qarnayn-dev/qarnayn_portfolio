import React, { LegacyRef, useEffect, useRef, useState } from 'react'
import { useScroll } from 'framer-motion'
import { DummyBlock } from '../components/DummyBlock'


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
      <div className='w-screen h-screen bg-blue-100 flex flex-col justify-center items-center'>
        <div id="test-rotate"><DummyBlock size='lg' colorChoose={2}></DummyBlock></div>
      </div>
      <div className='w-screen h-screen bg-green-100'></div>
    </>
  )
}

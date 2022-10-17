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
  const [showMatrixEffect, setShowMatrixEffect] = useState(true);
  const [showBlackHole, setShowBlackHole] = useState(false);
  const [showGreetings, setShowGreetings] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
        const timeOut1 = setTimeout(() => { setShowBlackHole(true) }, 2000);
        const timeOut2 = setTimeout(() => { setShowGreetings(true) }, 3500);
    return () => {
      clearTimeout(timeOut1);
      clearTimeout(timeOut2);
    }
  }, []);


  function onDispose() {
    setShowBlackHole(false);
    const timeout = setTimeout(() => setShowMatrixEffect(false), 2600);
  }

  return (
    <>
      <DummyPage></DummyPage>
      <MatrixEffect showScreen={showMatrixEffect}>
        <BlackHole isShow={showBlackHole}><TypingEffect showAnimation={showGreetings} callback={() => onDispose()}>{["Hi, I'm Qarnayn.", "An engineer who codes"]}</TypingEffect></BlackHole>
      </MatrixEffect>
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

import React, { LegacyRef, RefObject, useEffect, useRef, useState } from 'react'
import TopFrame from '../components/TopFrame'
import { AnimatedColoredText } from '../components/AnimatedColoredText'
import { AnimatedSentences } from '../components/AnimatedSentences'
import { DummyBlock } from '../components/DummyBlock'
import { useScroll } from 'framer-motion'
import { useScrollSnap } from '../components/useScrollSnap'


const Devpage = () => {
  const fullScreenConfig: string = "w-screen h-screen flex flex-col justify-center items-center";
  const centerChildrenConfig: string = "flex flex-col justify-center items-center";
  const bgColor: string = 'bg-gradient-to-br from-primary-base to-themed-gray-base';
  const [isShow, setIsShow] = useState(false);

  const elementRef = useRef<HTMLElement>(null);

  function handleClick() {
    console.log("object offset", elementRef.current?.offsetHeight);
    console.log("offset top ", elementRef.current?.offsetTop);

    window.scrollTo({behavior:'smooth',top: elementRef.current?.offsetTop})
  }

  // useEffect(() => {
  //   useScrollSnap(elementRef);

  // },[]);
    // useScrollSnap(elementRef);


  return (
    <TopFrame>
      <DummyPage></DummyPage>
      {/* <RevealingPage className={`${fullScreenConfig}  ${centerChildrenConfig} ${bgColor}`}>
        <div></div>
      </RevealingPage> */}
      <div className={`flex flex-col justify-start items-center w-[100vw] h-[400vh] pt-20`}>
        <AnimatedColoredText isOpen={true}>My journey, I'm sharing with you</AnimatedColoredText>
        <button
          onClick={() => { handleClick(); }}
          className='m-10 hover:scale-125 transition-all duration-700 ease-out'><DummyBlock size='lg' colorChoose={18}></DummyBlock></button>
        {/* <AnimatedSentences
          title='What is the title?'
          showAnimation={isShow}
          twTextAlignment="text-end"
        >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa sint dolorum quia delectus eum quisquam reiciendis quasi? Illo recusandae commodi consequuntur et quidem perferendis, dolore, sed saepe adipisci soluta quis.</AnimatedSentences> */}
        <div className='w-screen h-screen bg-teal-100'></div>
        <div className='w-screen h-screen bg-red-100 flex flex-col items-center justify-center'>
          <div ref={elementRef as LegacyRef<HTMLDivElement> | undefined} className='w-screen h-40 border-t-2 border-b-2 border-themed-gray-inverse'>
          </div>
          <button
          onClick={() => { handleClick(); }}
          className='m-10 hover:scale-125 transition-all duration-700 ease-out'><DummyBlock size='lg' colorChoose={18}></DummyBlock></button>
        </div>
      </div>
    </TopFrame>
  )
}

export default Devpage


const DummyPage = () => {
  const objRef = useRef<HTMLElement>(null);

  useScrollSnap(objRef);


  return (
    <>
      <div className='w-screen h-screen bg-amber-100'>
        <div className='w-screen h-3 bg-green-400'></div>
      </div>
      <div className='w-screen h-screen bg-blue-100'></div>
      <div ref={objRef as LegacyRef<HTMLDivElement> | undefined} className='w-screen h-screen bg-red-100'></div>
      <div className='w-screen h-screen bg-green-100'></div>
    </>
  )
 }
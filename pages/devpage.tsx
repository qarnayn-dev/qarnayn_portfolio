import React from 'react'
import TopFrame from '../components/TopFrame'
import { AnimatedColoredText } from '../components/AnimatedColoredText'
import { AnimatedSentences } from '../components/AnimatedSentences'


const Devpage = () => {
  const fullScreenConfig: string = "w-screen h-screen flex flex-col justify-center items-center";
  const centerChildrenConfig: string = "flex flex-col justify-center items-center";
  const bgColor: string = 'bg-gradient-to-br from-primary-base to-themed-gray-base';

  return (
    <TopFrame>
      {/* <RevealingPage className={`${fullScreenConfig}  ${centerChildrenConfig} ${bgColor}`}>
        <div></div>
      </RevealingPage> */}
      <div className={`flex flex-col justify-start items-center w-[100vw] h-[400vh] pt-20`}>
        <AnimatedColoredText isOpen={true}>My journey, I'm sharing with you</AnimatedColoredText>

        <AnimatedSentences title='What is the title?' className='w-[80%] px-4 py-2' isAnimate={true}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa sint dolorum quia delectus eum quisquam reiciendis quasi? Illo recusandae commodi consequuntur et quidem perferendis, dolore, sed saepe adipisci soluta quis.</AnimatedSentences>
      </div>
    </TopFrame>
  )
}

export default Devpage

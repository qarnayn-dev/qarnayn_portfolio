import React from 'react'
import {RevealingPage} from '../components/RevealingPage'
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
  const fullScreenConfig: string = "relative w-screen h-screen flex flex-col justify-center items-center";
  return (
    <>
    {/* <Parallax  className={` bg-gradient-to-br from-primary-t5 ${fullScreenConfig}`}>
      <Parallax opacity={[0,1]} className=' w-screen absolute bottom-0 h-40 bg-gradient-to-t from-transparent shadow-end-page'></Parallax>
    </Parallax> */}
    <RevealingPage className='bg-gradient-to-br from-primary-t5 w-screen h-screen flex flex-col justify-center items-center'>
      <div>Heowwow Worldss</div>
      <div>Heowwow Worldss</div>
      <div>Heowwow Worldss</div>
      <div>Heowwow Worldss</div>
    </RevealingPage>
    <RevealingPage opacityScrolling={true} className='bg-blue-400 w-screen h-screen flex flex-col justify-center items-center'>
        <div>sbafvadbafa f aebf a aef</div>
        <div>sbafvadbafa f aebf a aef</div>
        <div>sbafvadbafa f aebf a aef</div>
        <div>sbafvadbafa f aebf a aef</div>
    </RevealingPage>
    </>
  )
}

import React from 'react'
import TopFrame from '../components/TopFrame'
import TrailedChildren from '../components/TrailedChildren';


const Devpage = () => {
  return (
    <>
    <TopFrame/>
    <TrailedChildren>
        <div  className='w-40 h-10 rounded-lg shadow-md bg-secondary-t5'></div>
        <div  className='w-80 h-16 rounded-lg shadow-md bg-neutral-200'></div>
        <div className='gap-1 flex flex-row'>
            <div className='w-20 h-4 mr-2 rounded-lg shadow-sm bg-neutral-400'></div>
            <div className='w-20 h-4 mr-2 rounded-lg shadow-sm bg-neutral-400'></div>
            <div className='w-20 h-4 mr-2 rounded-lg shadow-sm bg-neutral-400'></div>
            <div className='w-20 h-4 mr-2 rounded-lg shadow-sm bg-neutral-400'></div>
        </div>
    </TrailedChildren>
    {/* <WeirdMaterial/>
    <WeirdMaterial/>
    <WeirdMaterial/> */}
    </>
  )
}

export default Devpage

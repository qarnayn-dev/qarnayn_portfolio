import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Error404svg from '../assets/error404.svg';

const Error404 = () => {
  const router = useRouter();
  const [seconds,setSeconds] = useState(6);
  const [hasRun,setHasRun] = useState(false);
  const [errorText,setErrorText] = useState("No such page has been found")

  useEffect(()=>{
    setHasRun(true);
    setErrorText(`No "${router.asPath}" page has been found.`);
  }, [])

  useEffect(()=>{
    if (hasRun && seconds>0){
        const interval = setInterval(() => {
            setSeconds((state) => state - 1)
        }, 1000);
        return () => clearInterval(interval);
    }
  }, [seconds,hasRun])

  useEffect(()=>{
      if (seconds === 0) {
          backToPrevious();
      }
  },[seconds===0])

  function backToPrevious() {
    router.back();
  }
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
        <Error404svg className="w-80" />
          <div className='m-4 text-xl'>{errorText}</div>
          <div className='mt-6 mb-8 text-themed-gray-t9'>Redirect to previous page in
          <span className='text-primary-base'> {seconds}</span>
          </div>

    </div>
  )
}

export default Error404
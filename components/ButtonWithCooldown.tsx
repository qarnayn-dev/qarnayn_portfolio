import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";


export const ButtonWCountdown = () => {
  const [seconds, setSeconds] = useState(10)
  const [hasRun, setHasRun] = useState(false)
  const [shown, setShown] = useState(false);


  function handleOnclick() {
    if (!hasRun) setHasRun(true);
  }

  useEffect(() => {
    if (hasRun && seconds>0) {
      const interval = setInterval(() => {
        setShown(true);
        setSeconds(second => second - 1);
      }, 1000)
      return ()=> clearInterval(interval)
    }
  }, [seconds, hasRun])

  useEffect(() => {
    if (shown) {
      const timout = setTimeout(() => {
        setShown(false);
        return () => clearTimeout(timout);
      },500)
    }
  }, [shown])

  useEffect(() => {
    console.log('Seconds left -> ', seconds);
    if (seconds === 0) {
      setSeconds(10)
      setHasRun(false)
    }
  },[seconds])

  return (
    <>
      <button onClick={handleOnclick} className='w-32 h-12 rounded-xl border-4 border-themed-gray-t6 bg-themed-gray-t3 relative'>
        <NumberWidget isShown={shown} countownSec={seconds} />
    </button>
    </>
  )
}

interface iNumberCountdown{
  isShown: boolean;
  countownSec: number;
}

function NumberWidget({isShown,countownSec}:iNumberCountdown) {
  return (
    <div>
      <Transition
      show={isShown}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0 "
      enterTo="opacity-100 scale-200"
      leave="transition-opacity duration-500"
      leaveFrom="opacity-100 "
      leaveTo="opacity-0 "
      appear={true}
      className="text-2xl relative"
    >
      {countownSec}
    </Transition>
    </div>
  )
}
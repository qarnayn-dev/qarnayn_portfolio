import React, { ChangeEvent,  memo, useCallback, useReducer, useState} from 'react'
import { motion, useScroll} from 'framer-motion'
import { DummyBlock } from '../components/DummyBlock'
import { ParallaxWrapper } from '../components/ParallaxWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { iInterestTag, toggleTag } from '../redux/tagSlice';
import { TextInputField } from '../components/TextInputField';
import { SelectableTag } from '../components/SelectableTag';
import OutsideAlerter from '../components/useOutsideAlerter';
import { IoAdd } from 'react-icons/io5';


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
      <div className='w-screen h-screen bg-green-100 flex flex-col justify-center items-center'>
        <TestObjetct></TestObjetct>
      </div>
      {/* <div className='w-screen h-screen bg-blue-100 flex justify-center items-center'>
        <div id="test-rotate"><DummyBlock size='lg' colorChoose={2}></DummyBlock></div>
        <ParallaxWrapper yDisplacement={700}>
          <div id="test-rotate"><DummyBlock size='lg' colorChoose={6}></DummyBlock></div>
        </ParallaxWrapper>
        <ParallaxWrapper yDisplacement={-700}>
          <div id="test-rotate"><DummyBlock size='lg' colorChoose={19}></DummyBlock></div>
        </ParallaxWrapper>
        <div id="test-rotate"><DummyBlock size='lg' colorChoose={12}></DummyBlock></div>
      </div> */}
      <div className='w-screen h-screen bg-green-100'></div>
      <div className='w-screen h-screen bg-red-100'></div>
    </>
  )
}

const TestObjetct = () => {

  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState("");
  const isOpen:boolean = isActive || value.length > 0;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log('Has pressed "Enter" ')
      setIsActive(false);
      // TODO: add new entry -> reste all
    }
  }

  const reset = () => {
    setIsActive(false);
    setValue("");
  }

  console.log("render!")
  return (
    <OutsideAlerter onOutsideClick={()=>{setIsActive(false)}}>
      <motion.button
        onClick={()=> setIsActive((state)=>!state)}
        transition={{ duration: 0.7 }}
        animate={{width: isOpen? "160px":"40px"}}
        className={`h-10 m-12 rounded-md bg-red-600 shadow-lg flex justify-center items-center overflow-clip`}>
        {isOpen ?
          <input
            autoFocus
            value={value}
            onChange={(e) => {
              e.preventDefault();
              setValue(e.currentTarget.value);
            }}
            onSubmit={(e) => {
              e.preventDefault(); // DO NOT REMOVE or it'll jitter
              setIsActive(false)
            }}
            onKeyDown={handleKeyDown}
            className='outline-none text-center bg-transparent'></input> :
          <IoAdd size={28}></IoAdd>
        }
      </motion.button>
    </OutsideAlerter>
  )
}
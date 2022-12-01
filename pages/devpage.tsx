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


  return (
    <>
      <div className='w-screen h-screen px-16 py-20 bg-green-100'>
      </div>
    </>
  )
}

export default Devpage

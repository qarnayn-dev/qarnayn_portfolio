import { motion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react'
import { animated, useSpring } from 'react-spring';

export const ContactSection = () => {
  return (
    <div className='w-full h-[100vh]  px-5 py-8'>
        <ContactMeForm/>
    </div>
  )
}


const ContactMeForm = () => {
    return (
        <div className='w-full max-w-lg h-[80%] rounded-xl px-4 py-8 bg-themed-gray-base drop-shadow-md dark:bg-neutral-900 style-body'>
            <TextInputField hintText='Your name sir?' title='Name'/>
            <TextInputField title='Title'/>

        </div>
    )
}

interface iTextIputField{
    title: string,
    hintText?: string,
    labelId?:string,
}

const TextInputField = (props:iTextIputField) => {
    const id: string = "fname";

    const [isFocus, setIsFocus] = useState(false);
    const [inputText, setInputText] = useState("");

    const shouldOnTop = useMemo(() => (!isFocus && inputText.length === 0), [isFocus, inputText.length]);


    return (
        <div className='relative group mb-4'>
            <motion.label
                transition={{duration: isFocus ? 0.3 : 0.12}}
                animate={{
                    translateY: shouldOnTop ? 0 : -14,
                    translateX: shouldOnTop ? 6:0,
                    scale: shouldOnTop ? 0.9 : 0.8,
                    opacity:  shouldOnTop? 0: 1,
                }}
                className='bg-themed-gray-base text-themed-gray-t7 absolute top-0 left-0 px-1 group-focus-within:text-primary-base group-focus-within:font-medium'>{props.title}</motion.label>
            <input
                id={id}
                placeholder={isFocus?"": props.hintText?? props.title}
                onFocus={()=>setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(e) => {
                    e.preventDefault();
                    console.log("changed value -> ", e.currentTarget.value);;
                    setInputText(e.currentTarget.value);
                }}
                className='w-full px-2 pt-2 pb-1 bg-transparent border-[1px] border-themed-gray-t2 rounded-md outline-none focus:outline-offset-0 focus:duration-500 ease-out-circ focus:outline-primary-t2 focus:border-transparent' />

        </div>
    )
 }

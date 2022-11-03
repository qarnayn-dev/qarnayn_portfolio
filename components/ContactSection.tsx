import { motion } from 'framer-motion';
import React, { ChangeEvent, useEffect, useMemo, useReducer, useState } from 'react'

export const ContactSection = () => {
  return (
    <div className='w-full h-[100vh]  px-5 py-8'>
        <ContactMeForm/>
    </div>
  )
}

const INITIAL_CONTACT: iContactForm = { name: "", email: "", title: "", message: "" };

const ContactMeForm = () => {
    const [state, dispatch] = useReducer(contactFormReducer, INITIAL_CONTACT);

    function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        dispatch({ type: ActionType.valueUpdate, payload: { keyName: e.currentTarget.name, value: e.currentTarget.value } });
    }

    function checkForState() {
        console.log(state);
    }

    return (
        <div className='w-full max-w-lg h-[80%] rounded-xl px-4 py-8 bg-themed-gray-base drop-shadow-md dark:bg-neutral-900 style-body'>
            <TextInputField title='Name' inputKeyName="name" value={state.name} onChange={handleInputChange} />
            <TextInputField title='Title' inputKeyName="title" value={state.title} onChange={handleInputChange} />
            <TextInputField title='Email' inputKeyName="email" value={state.email} onChange={handleInputChange} />
            <TextInputField title='Message' hintText="Write me anything. It's that easy to get in touch!" inputKeyName="message" value={state.message} onChange={handleInputChange} useTextArea/>
            <button className='bg-red-400 px-4 py-2' onClick={()=>checkForState()}>test</button>
        </div>
    )
}

interface iTextInputField{
    inputKeyName: string,
    title: string,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement >) => void,
    hintText?: string,
    labelId?: string,
    useTextArea?: boolean,
    className?: string,
}

const TextInputField = (props:iTextInputField) => {
    const [isFocus, setIsFocus] = useState(false);
    const shouldOnTop = useMemo(() => {
        return (!isFocus && props.value.length === 0)
    }, [isFocus, props.value.length === 0]);

    const inputBoxCN: string = "w-full px-2 pt-2 pb-1 bg-transparent border-[1px] border-themed-gray-t2 rounded-md outline-none focus:outline-offset-0 focus:duration-500 ease-out-circ focus:outline-primary-t2 focus:border-transparent";

    return (
        <div className={`relative group ${props.className ?? 'mb-4'}`}>
            <motion.label
                transition={{duration: isFocus ? 0.3 : 0.12}}
                animate={{
                    translateY: shouldOnTop ? 0 : -14,
                    translateX: shouldOnTop ? 6:0,
                    scale: shouldOnTop ? 0.9 : 0.8,
                    opacity:  shouldOnTop? 0: 1,
                }}
                className='bg-themed-gray-base text-themed-gray-t7 absolute top-0 left-0 px-1 group-focus-within:text-primary-base group-focus-within:font-medium'>{props.title}</motion.label>
            {!props.useTextArea ?
            <input
                name={props.inputKeyName}
                placeholder={isFocus ? "" : props.hintText ?? props.title}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(e) => props.onChange(e)}
                className={`${inputBoxCN}`} />
            : <textarea
                name={props.inputKeyName}
                placeholder={isFocus ? "" : props.hintText ?? props.title}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(e) => props.onChange(e)}
                className={`${inputBoxCN} h-20`} />
            }
        </div>
    )
 }


interface iContactForm{
     name: string,
     email: string,
     title: string,
     message: string,
}

interface iAction {
    type: ActionType,
    payload: {keyName:string, value:any},
}

enum ActionType{
    // update based on key-value
    valueUpdate,
    // add/ remove item to/ from an array
    arrayToggle,
}


 const contactFormReducer = (state:iContactForm, action:iAction) => {
    switch (action.type) {
        case ActionType.valueUpdate:
            return {...state, [action.payload.keyName]: action.payload.value}
        default:
            return state;
    }
 }
import { motion } from 'framer-motion';
import React, { ChangeEvent, useEffect, useMemo, useReducer, useState } from 'react'
import { TextInputField } from './TextInputField';

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
        <div className='w-full max-w-lg rounded-xl px-4 mobile-lg:px-6 sm:px-8 pt-16 pb-6 bg-themed-gray-base drop-shadow-md dark:bg-neutral-900 style-body flex flex-col justify-center items-start'>
            <TextInputField title='Name' inputKeyName="name" value={state.name} onChange={handleInputChange} />
            <TextInputField title='Title' inputKeyName="title" value={state.title} onChange={handleInputChange} />
            <TextInputField title='Email' inputKeyName="email" value={state.email} onChange={handleInputChange} />
            <TextInputField title='Message' hintText="Write me anything. It's that easy to get in touch!" inputKeyName="message" value={state.message} onChange={handleInputChange} useTextArea />
            <div className='w-full  mt-4 mb-2relative'>
                <div className='style-small-text text-primary-t4 '>optional</div>
                <div className='mb-3'>Scouting for talent? What role are you interested in?</div>
                <div className='w-full gap-2 flex flex-wrap'>
                    <SelectableTag>UI/UX Designer</SelectableTag>
                    <SelectableTag>Front-end dev</SelectableTag>
                    <SelectableTag>Back-end dev</SelectableTag>
                    <SelectableTag>Product engineer</SelectableTag>
                    <SelectableTag>Software engineer</SelectableTag>
                    <SelectableTag>Data engineer</SelectableTag>
                </div>
            </div>
            <button className='mt-16 mb-2 px-2 py-1 bg-primary-t2 text-themed-gray-base dark:text-themed-gray-inverse style-body shadow-sm dark:shadow-themed-gray-t3 font-normal rounded-md ' onClick={()=>checkForState()}>Send Message</button>
        </div>
    )
}

const SelectableTag = (props:any) => {
    return (
        <button className='px-3 py-1 bg-themed-gray-t3 rounded-2xl overflow-clip style-small-text text-themed-gray-t9'>{props.children}</button>
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
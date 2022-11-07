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

const INITIAL_CONTACT: iContactForm = { name: "", email: "", title: "", message: "",tags:[] };

const ContactMeForm = () => {
    const [state, dispatch] = useReducer(contactFormReducer, INITIAL_CONTACT);
    // const [tags, setTags] = useState<string[]>([]);

    function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        dispatch({ type: ActionType.valueUpdate, payload: { keyName: e.currentTarget.name, value: e.currentTarget.value } });
    }

    function handleToggleTag(tag:string) {
        dispatch({type: ActionType.addRemoveTag,payload: {keyName: "tags",value:tag}})
    }

    function checkForState() {
        console.log(state);
        // console.log(tags);
    }

    // function toggleItem(tag: string) {
    //     if (tags.includes(tag)) setTags((current) => current.filter((v) => v !== tag));
    //     else setTags((current) => [...current, tag]);
    // }

    function isSelected(tag: string): boolean {
        return state.tags.includes(tag);
    }

    // useEffect(() => {
    //     console.log(tags);
    // },[tags])


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
                    <SelectableTag onClickFn={handleToggleTag} isSelected={isSelected}>UI/UX Designer</SelectableTag>
                    <SelectableTag onClickFn={handleToggleTag} isSelected={isSelected}>Front-end dev</SelectableTag>
                    <SelectableTag onClickFn={handleToggleTag} isSelected={isSelected}>Back-end dev</SelectableTag>
                    <SelectableTag onClickFn={handleToggleTag} isSelected={isSelected}>Product engineer</SelectableTag>
                    <SelectableTag onClickFn={handleToggleTag} isSelected={isSelected}>Software engineer</SelectableTag>
                    <SelectableTag onClickFn={handleToggleTag} isSelected={isSelected}>Data engineer</SelectableTag>
                </div>
            </div>
            <button className='mt-16 mb-2 px-2 py-1 bg-primary-t2 text-themed-gray-base dark:text-themed-gray-inverse style-body shadow-sm dark:shadow-themed-gray-t3 font-normal rounded-md ' onClick={()=>checkForState()}>Send Message</button>
        </div>
    )
}

interface iSelectableTag{
    children?: string,
    isSelected?: (tag:string) => boolean ,
    onClickFn: (tag:string) => void,
}

const SelectableTag = (props: iSelectableTag) => {
    const [isSelected, setIsSelected] = useState(false);
    const selected = useMemo(() => props.isSelected, [props.isSelected]);

    function toggleSelection() {
        setIsSelected((state) => !state);
    }

    console.log(`${props.children} : `, isSelected);

    return (
        <button onClick={()=>{}} className={`px-3 py-1 rounded-2xl overflow-clip style-small-text duration-300 transition-all ease-in-out ${selected? 'bg-primary-t5 text-on-primary text-opacity-60':'bg-themed-gray-t3 text-themed-gray-t9'}`}>{props.children}</button>
    )
 }


interface iContactForm{
     name: string,
     email: string,
     title: string,
     message: string,
     tags: string[],
}

interface iAction {
    type: ActionType,
    payload: {keyName:string, value:any},
}

enum ActionType{
    // update based on key-value
    valueUpdate,
    // add/ remove item to/ from an array
    addRemoveTag,
}


 const contactFormReducer = (state:iContactForm, action:iAction) => {
    switch (action.type) {
        case ActionType.valueUpdate:
            return { ...state, [action.payload.keyName]: action.payload.value }
        case ActionType.addRemoveTag:
            const item = action.payload.value;
            const stateArray: string[] = state.tags;
            const updatedArray = stateArray.includes(item) ? stateArray.filter((v) => v !== item) : [...stateArray, item];
            return {...state,[action.payload.keyName]: updatedArray}
        default:
            return state;
    }
 }
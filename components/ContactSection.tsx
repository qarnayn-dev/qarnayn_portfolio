import { motion } from 'framer-motion';
import React, { ChangeEvent, useMemo, useReducer, useState, useCallback, memo, useRef } from 'react'
import { IoAdd, IoAddCircle, IoAddSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addNewTag, iInterestTag, toggleTag } from '../redux/tagSlice';
import { SelectableTag } from './SelectableTag';
import { TextInputField } from './TextInputField';
import OutsideAlerter from './useOutsideAlerter';

export const ContactSection = () => {
  return (
    <div className='w-full h-[100vh]  px-5 py-8'>
        <ContactMeForm/>
    </div>
  )
}

const INITIAL_CONTACT: iContactForm = { name: "", email: "", title: "", message: "",tags:[] };

const ContactMeForm = () => {
    const [formData, dispatch] = useReducer(contactFormReducer, INITIAL_CONTACT);
    // const [tags, setTags] = useState<string[]>([]);

    const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({ type: ActionType.valueUpdate, payload: { keyName: e.currentTarget.name, value: e.currentTarget.value } });
    }, []);


    function checkForState() {
        console.log(formData);
        // console.log(tags);
    }

    return (
        <div className='w-full max-w-lg rounded-xl px-4 mobile-lg:px-6 sm:px-8 pt-16 pb-6 bg-themed-gray-base drop-shadow-md dark:bg-neutral-900 style-body flex flex-col justify-center items-start'>
            <TextInputField title='Name' inputKeyName="name" value={formData.name} onChange={onInputChange} />
            <TextInputField title='Title' inputKeyName="title" value={formData.title} onChange={onInputChange} />
            <TextInputField title='Email' inputKeyName="email" value={formData.email} onChange={onInputChange} />
            <TextInputField title='Message' hintText="Write me anything. It's that easy to get in touch!" inputKeyName="message" value={formData.message} onChange={onInputChange} useTextArea />
            <Tags/>
            <button className='mt-16 mb-2 px-2 py-1 bg-primary-t2 text-themed-gray-base dark:text-themed-gray-inverse style-body shadow-sm dark:shadow-themed-gray-t3 font-normal rounded-md ' onClick={()=>checkForState()}>Send Message</button>
        </div>
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


/**
 * Component to display tags that the audience might be interested in.
 * NOTE: It uses `Redux` to manage the states.
 *
 * To get the seleccted tags:
 * ```
 * const allSelectedTags: string = useSelector<RootState, string>((state)=> state.interestTags.filter((item)=>item.selected)).map((item)=>item.title);
 * ```
 *
 */
const Tags = () => {
    const dispatch = useDispatch();
    const allTags = useSelector<RootState, iInterestTag[]>((state) => state.interestTags);
    const toggleTagItem = useCallback((id: string) => dispatch(toggleTag(id)), []);

    return (
        <div className='w-full mt-4 mb-2 relative'>
            <div className='style-small-text text-primary-t4 '>optional</div>
            <div className='mb-3'>Scouting for talent? What role's field are you interested in?</div>
            <div className='w-full gap-2 flex flex-wrap '>
                {allTags.map((item, i) =>
                <SelectableTag
                    key={`interesttag#${i}`}
                    id={item.id}
                    item={item.title}
                    isSelected={item.selected}
                    onToggleFn={toggleTagItem}
                    />)}
                <AddTag/>
            </div>
        </div>
    )
}

const AddTag = memo(() => {
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState("");
    const isOpen: boolean = isActive || value.length > 0;
    const reduxDispatch = useDispatch();

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            console.log('Has pressed "Enter" ');
            if (value.length > 0) addTagEntry();
        }
    }

    const addTagEntry = () => {
        reduxDispatch(addNewTag(value));
        reset();
    }

    const reset = () => {
        setIsActive(false);
        setValue("");
    }

    console.log("render!")
    return (
        <OutsideAlerter onOutsideClick={() => { setIsActive(false) }}>
            <motion.button
                onClick={() => setIsActive((state) => !state)}
                transition={{ duration: 0.6, type: 'spring' }}
                animate={{ width: isOpen ? "160px" : "40px" }}
                className={`relative px-2 h-7 rounded-2xl overflow-clip style-small-text duration-700 transition-all ease-out-cubic text-themed-gray-t9 flex justify-center items-center border-themed-gray-t3 bg-themed-gray-t2 ${isOpen ? 'border-none' : 'border-2 cursor-pointer hover:text-primary-t5 hover:border-primary-t5 hover:shadow-md dark:shadow-themed-gray-t3'}`}>
                {isOpen ?
                    <input
                        autoFocus
                        value={value}
                        onChange={(e) => {
                            e.preventDefault();
                            const currentValue: string = e.currentTarget.value;
                            if (currentValue.length < 32) setValue(currentValue);
                        }}
                        onSubmit={(e) => {
                            e.preventDefault(); // DO NOT REMOVE or it'll jitter
                            setIsActive(false)
                        }}
                        onKeyDown={handleKeyDown}
                        className='outline-none text-center bg-transparent absolute'></input> :
                    <IoAdd size={24}></IoAdd>
                }
            </motion.button>
        </OutsideAlerter>
    )
});
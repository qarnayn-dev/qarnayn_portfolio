import Lottie from 'lottie-react';
import React, { ChangeEvent, useReducer, useCallback, useState, useEffect} from 'react'
import { IoCheckmarkCircle, IoSad } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { sendContactForm } from '../lib/api';
import { RootState } from '../redux/store';
import { addNewTag, iInterestTag, resetTags, toggleTag } from '../redux/tagSlice';
import { useTrigger } from '../utilities/useTrigger';
import { AddTag } from './AddTag';
import ClickToCopy from './ClickToCopy';
import PopupModal from './PopupModal';
import { SelectableTag } from './SelectableTag';
import { TextInputField } from './TextInputField';
import loadingAnimation from '../assets/loading.json';
import { AnimatePresence } from 'framer-motion';



interface iContactForm{
    name: string,
    email: string,
    message: string,
}

const INITIAL_CONTACT: iContactForm = { name: "", email: "", message: "" };

export const ContactForm = () => {
    const [formData, dispatch] = useReducer(contactFormReducer, INITIAL_CONTACT);
    const dispatchTags = useDispatch();
    const [success, setSuccess] = useState<null | boolean>(null);
    const {active, fire} = useTrigger({duration: 4000, alwaysAlive: success === null});
    const {active: cooldown, fire: initCD} = useTrigger({duration: 2000});
    const allTags: string[] = useSelector<RootState, iInterestTag[]>((state) => state.interestTags).filter((item) => item.selected).map((item) => item.title);
    const formHasData: boolean = formData.message !== '' || formData.name !== '' || formData.email !== '';

    const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {dispatch({ type: ActionType.valueUpdate, payload: { keyName: e.currentTarget.name, value: e.currentTarget.value } });
    }, []);

    async function onSubmit() {
        if (formData.email !== '' && formData.message !== '' && formData.name !== '')
        {
            initCD(); // to initiate the CD
            fire(); // open the modal
            await sendContactForm({ ...formData, tags: allTags }).then((res) => {
                if (res.status === 200) {
                    setSuccess(true);
                    resetForms();
                }
                else setSuccess(false);
            });
        }
    }

    // reset the result once everything has been completed
    useEffect(() => {
        if (success !== null) {
            const timeout = setTimeout(() => {
                setSuccess(null);
            }, 4000);
            return () => {clearTimeout(timeout);}
        }
    }, [success !== null])


    function validateMessage(input: string):boolean {
        return ((input === '' && !formHasData) ||input !== '' )? true: false;
    }

    function validateName(input: string): boolean {
        return ((input === '' && !formHasData )||input !== '')? true: false;
    }

    function validateEmail(input: string): boolean {
        const lastDotIndex = input.lastIndexOf(".");
        const lastAlternateIndex = input.lastIndexOf("@");

        // handle when there's no data input at all
        if (input === '' && !formHasData)
            return true;
        // validation for email address
        else if ((lastDotIndex !== -1) &&
            (lastDotIndex < input.length - 1) &&
            (lastAlternateIndex !== -1) &&
            (lastAlternateIndex < lastDotIndex))
            return true;
        else
            return false;
    }

    function resetForms() {
        dispatch({ type: ActionType.resetForm });
        dispatchTags(resetTags());
    }

    return (
        <div className='w-full py-8'>
            <div className='relative w-full max-w-lg rounded-xl px-4 mobile-lg:px-6 sm:px-8 pt-8 pb-6 bg-themed-gray-base drop-shadow-md dark:bg-neutral-900 style-body flex flex-col justify-center items-start md:float-right'>
                <TextInputField
                    title='Message'
                    hintText="Write me anything. It's that easy to get in touch!"
                    inputKeyName="message"
                    value={formData.message}
                    validationFn={validateMessage}
                    errorMessage="Please write your message."
                    onChange={onInputChange}
                    useTextArea />
                <TextInputField
                    title='Name'
                    inputKeyName="name"
                    value={formData.name}
                    validationFn={validateName}
                    errorMessage="Please write your name."
                    onChange={onInputChange} />
                <TextInputField
                    title='Email'
                    inputKeyName="email"
                    value={formData.email}
                    validationFn={validateEmail}
                    errorMessage="Please provide a valid email."
                    onChange={onInputChange} />
                <TagsSection/>
                <button className='mt-16 mb-2 px-2 py-1 bg-primary-t2 text-themed-gray-base dark:text-themed-gray-inverse style-body shadow-sm dark:shadow-themed-gray-t3 font-normal rounded-md ' onClick={() => { onSubmit() }} disabled={cooldown}>Send Message</button>
            </div>
            <Receipt show={active} isSuccess={success} />
        </div>
    )
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
const TagsSection = () => {
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
                <AddTag onSubmitFn={(value)=>dispatch(addNewTag(value))}/>
            </div>
        </div>
    )
}



/** The form's logic (reducer) */

interface iAction {
    type: ActionType,
    payload?: {keyName:string, value:any},
}

enum ActionType{
    // update based on key-value
    valueUpdate,
    // reset form
    resetForm,
}


 const contactFormReducer = (state:iContactForm, action:iAction) => {
    switch (action.type) {
        case ActionType.valueUpdate:
            if (action.payload) {
                return { ...state, [action.payload.keyName]: (action.payload.keyName === "email") ? action.payload.value.toLowerCase().replace(/\s/g, '') : action.payload.value }
            } else
                return state;
        case ActionType.resetForm:
            return INITIAL_CONTACT;
        default:
            return state;
    }
 }

interface iReceipt{
    show: boolean,
    isSuccess: boolean | null,
}


const Receipt = (props: iReceipt) => {
    interface iMessage {
        title: string, followUp: any
    }

    const Message = (msg:iMessage) => {
        return (
            <>
                <div className='style-subheading'>{msg.title}</div><br/><br/>
                <div className='style-body style-secondary w-[80%]'>{msg.followUp}</div>
            </>
        )
    }

    const Loading = () => {
        return (
            <>
                <Lottie animationData={loadingAnimation} className='mb-8 max-w-[180px]'/>
                <div className='style-subheading'>We're sending your message.</div>
            </>
        )
    }

    const SuccessWidget = () => {
        return (
            <>
                <IoCheckmarkCircle size={100} className="text-semantic-success mb-8" />
                <Message title="Thank you for the message. I will reach you back via email." followUp="Want to stay in touch? Let's connect on LinkedIn!"/>
            </>
        )
    }

    const FailWidget = () => {
        return (
            <>
                <IoSad size={100} className="text-semantic-error mb-8" />
                <Message title="Something went wrong.  Your message was not sent." followUp={
                    <>
                        You can manually send me an email to my&nbsp;
                        <ClickToCopy
                            textToCopy='qarnaynkhairuddin@gmail.com'
                            message="Email adrress has been copied to the clipboard."
                            className='underline text-semantic-info inline-block'
                        >
                        email address
                        </ClickToCopy>
                        &nbsp;– click to copy.
                    </>
                } />
            </>
        )
    }

    return (
        <AnimatePresence>
            {props.show &&
                <PopupModal isOpen={props.show} className="w-[80vw] h-[60vh] max-w-[520px] max-h-[480px] p-10 bg-themed-gray-base rounded-xl flex flex-col items-center justify-center style-body text-center">
                {(props.isSuccess === null) ?
                    <Loading /> :
                        props.isSuccess ?
                            <SuccessWidget /> : <FailWidget />
                }
            </PopupModal>
            }
        </AnimatePresence>
    )
}

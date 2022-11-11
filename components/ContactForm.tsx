import React, { ChangeEvent, useReducer, useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addNewTag, iInterestTag, toggleTag } from '../redux/tagSlice';
import { AddTag } from './AddTag';
import { SelectableTag } from './SelectableTag';
import { TextInputField } from './TextInputField';


interface iContactForm{
    name: string,
    email: string,
    message: string,
}

const INITIAL_CONTACT: iContactForm = { name: "", email: "", message: "" };

export const ContactForm = () => {
    const [formData, dispatch] = useReducer(contactFormReducer, INITIAL_CONTACT);

    const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {dispatch({ type: ActionType.valueUpdate, payload: { keyName: e.currentTarget.name, value: e.currentTarget.value } });
    }, []);

    return (
        <div className='w-full py-8'>
            <div className='w-full max-w-lg rounded-xl px-4 mobile-lg:px-6 sm:px-8 pt-8 pb-6 bg-themed-gray-base drop-shadow-md dark:bg-neutral-900 style-body flex flex-col justify-center items-start md:float-right'>
                <TextInputField title='Message' hintText="Write me anything. It's that easy to get in touch!" inputKeyName="message" value={formData.message} onChange={onInputChange} useTextArea />
                <TextInputField title='Name' inputKeyName="name" value={formData.name} onChange={onInputChange} />
                <TextInputField title='Email' inputKeyName="email" value={formData.email} onChange={onInputChange} />
                <TagsSection/>
                <button className='mt-16 mb-2 px-2 py-1 bg-primary-t2 text-themed-gray-base dark:text-themed-gray-inverse style-body shadow-sm dark:shadow-themed-gray-t3 font-normal rounded-md ' onClick={() => {
                    // TODO: send message to me
                }}>Send Message</button>
            </div>
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
        default:
            return state;
    }
 }
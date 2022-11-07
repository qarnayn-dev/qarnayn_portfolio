import { motion } from "framer-motion";
import { ChangeEvent, memo, useState } from "react";

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

//
export const TextInputField = memo((props:iTextInputField) => {
    const [isFocus, setIsFocus] = useState(false);
    const shouldOnTop = !isFocus && props.value.length === 0;

    const inputBoxCN: string = "w-full px-2 pt-2 pb-2 bg-transparent border-[1px] border-themed-gray-t2 rounded-md outline-none focus:outline-offset-0 focus:duration-500 ease-out-circ focus:outline-primary-t2 focus:border-transparent dark:bg-themed-gray-t2";

    // console.log(`${props.title} : `, isFocus);

    return (
        <div className={`relative group  ${props.className ?? 'mb-6 w-full'}`}>
            <motion.label
                transition={{duration: isFocus ? 0.3 : 0.12}}
                animate={{
                    translateY: shouldOnTop ? 0 : -14,
                    translateX: shouldOnTop ? 6:0,
                    scale: shouldOnTop ? 0.9 : 0.8,
                    opacity:  shouldOnTop? 0: 1,
                }}
                className='text-themed-gray-t7 absolute top-1 mobile-lg:top-0 left-0 px-1 group-focus-within:text-primary-base group-focus-within:font-medium'>
                <div className="h-2 w-full absolute bottom-[6px] -z-10 bg-themed-gray-base -translate-x-[2px]"></div>
                {props.title}
            </motion.label>
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
 })

import { motion } from "framer-motion";
import { memo, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addNewTag } from "../redux/tagSlice";
import OutsideAlerter from "./useOutsideAlerter";

interface iAddTag{
    onSubmitFn: (value: string) => void;
}

/**
 * Component to add a new tag.
 * @param onSubmitFn accept any function that provided with input `value` in which will be executed one `'Enter'` has been pressed.
 * NOTE: The value is limited to 32 char's length
 */
export const AddTag = memo((props: iAddTag) => {
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState("");
    const isOpen: boolean = isActive || value.length > 0;

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            console.log('Has pressed "Enter" ');
            if (value.length > 0) addTagEntry();
        }
    }

    const addTagEntry = () => {
        props.onSubmitFn(value);
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
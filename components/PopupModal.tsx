import { Transition } from "@headlessui/react";
import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import OutsideAlerter from "./useOutsideAlerter";
import useWindowDimensions from "./useWindowDimensions";

interface iPopupModal{
    children?:any,
    isOpen: boolean,
    onClose: () => void,
    barrierDismissable?: boolean,
    className?: string,
    closeIcon?: boolean,
}

export default function PopupModal({ children, isOpen = true, onClose, barrierDismissable = true, className, closeIcon = true }: iPopupModal) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll({ target: ref });
    const {height} = useWindowDimensions();

    function getScrollY(): number{
        return scrollY.get() - (height*0.1)
    }

    return (
        <Transition
            ref={ref}
            show={isOpen}
            style={{ top: getScrollY() }}
            enter="transition-all duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-all duration-700"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="absolute h-[110vh] w-screen z-50 inset-0 bg-black bg-opacity-20 dark:bg-opacity-30 backdrop-blur-md flex flex-col items-center justify-center">
            <OutsideAlerter onOutsideClick={(barrierDismissable)?()=> onClose():undefined}>
                <div className={`relative ${className ?? 'w-[80vw] h-[80vh] 2xl:w-[1200px] py-4 md:py-5 xl:py-6 px-[3vw] bg-themed-gray-t2 rounded-lg mobile-lg:rounded-xl'}`}>
                    {closeIcon && <IoClose  onClick={()=>onClose()} className="absolute top-0 right-0 mr-2 mt-2 text-themed-gray-inverse text-opacity-50 style-subheading"/>}
                    {children}
                </div>
            </OutsideAlerter>
        </Transition>
    )
}
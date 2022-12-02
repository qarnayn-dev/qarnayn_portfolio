import { Transition } from "@headlessui/react";
import { useRef } from "react";
import { IoClose } from "react-icons/io5";
import OutsideAlerter from "../utilities/useOutsideAlerter";

interface iPopupModal{
    children?:any,
    isOpen: boolean,
    onClose?: () => void,
    barrierDismissable?: boolean,
    className?: string,
    closeIcon?: boolean,
}

export default function PopupModal({ children, isOpen = true, onClose, barrierDismissable = true, className, closeIcon = true }: iPopupModal) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <Transition
            ref={ref}
            show={isOpen}
            enter="transition-all duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-all duration-700"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="fixed h-screen w-screen top-0 z-40 inset-0 bg-black bg-opacity-20 dark:bg-opacity-30 backdrop-blur-md flex flex-col items-center justify-center">
            <OutsideAlerter onOutsideClick={(barrierDismissable)?()=> onClose && onClose():undefined}>
                <div className={`relative ${className ?? 'w-[94vw] mobile-lg:w-[88vw] md:w-[80vw] max-w-[800px] h-[80vh] py-4 bg-themed-gray-t2 rounded-lg mobile-lg:rounded-xl'}`}>
                    {closeIcon && <IoClose  onClick={()=> onClose && onClose()} className="absolute top-0 right-0 mr-2 mt-2 text-themed-gray-inverse text-opacity-50 style-subheading"/>}
                    {children}
                </div>
            </OutsideAlerter>
        </Transition>
    )
}
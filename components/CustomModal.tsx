import { Transition } from "@headlessui/react";
import { useScroll } from "framer-motion";
import OutsideAlerter from "./useOutsideAlerter";

interface iPopupModal{
    children?:any,
    isOpen: boolean,
    onClose: () => void,
    barrierDismissable?: boolean,
    className?: string,
}

export default function PopupModal({ children, isOpen = true, onClose, barrierDismissable = true, className}: iPopupModal) {
    const { scrollY } = useScroll();

    return (
        <Transition
            show={isOpen}
            style={{ top: scrollY.get() }}
            enter="transition-all duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-all duration-700"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="absolute h-screen w-screen z-50 inset-0 bg-neutral-800 bg-opacity-50 flex flex-col items-center justify-center">
            <OutsideAlerter onOutsideClick={(barrierDismissable)?()=> onClose():undefined}>
                <div className={`${className ?? 'w-[80vw] h-[80vh] py-4 px-3 bg-themed-gray-t2 rounded-lg'}`}>{children}</div>
            </OutsideAlerter>
        </Transition>
    )
}
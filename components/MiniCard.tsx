
import { Dialog, Transition } from "@headlessui/react";
import { useInView, useScroll} from "framer-motion";
import Lottie from "lottie-react"
import { useEffect, useMemo, useRef, useState} from "react"
import PopupModal from "./CustomModal";
import OutsideAlerter from "./useOutsideAlerter";

interface iMiniCard{
  animationData: unknown,
  children: string,
  details?: any, // later on will decide the modal's input
}

export const MiniCard = ({ animationData, children }: iMiniCard) => {
    const titleRef = useRef(null);
    const isInView = useInView(titleRef, { once: true });
    let [showExtension, setShowExtension] = useState(false);

    function closeModal() {
        if (showExtension) setShowExtension(false);
        // Unsets Background Scrolling to use when SideDrawer/Modal is closed
        document.body.style.overflow = 'unset';
    }

    function openModal() {
        if (!showExtension) setShowExtension(true);
        // Disables Background Scrolling whilst the SideDrawer/Modal is open
        if (typeof window != 'undefined' && window.document) {
            document.body.style.overflow = 'hidden';
        }
    }

    return (
        <>
            <div className='h-full w-full float-left rounded-lg flex flex-col items-center justify-center text-center px-[7vw] lg:px-[2vw] py-8 bg-themed-gray-base shadow-sm dark:shadow-themed-gray-t4 backdrop-blur-sm bg-opacity-10'>
                <Lottie animationData={animationData} className='my-6 h-24 mobile-lg:h-28'></Lottie>
                <div
                    ref={titleRef}
                    className='h-28 lg:h-36 w-full font-normal style-subheading'
                    style={{
                        transform: isInView ? "none" : "translateY(80px)",
                        opacity: isInView ? 1 : 0,
                        transition: "all 0.7s cubic-bezier(.41,.06,.7,1.29) 0.4s"}}>
                    {children}</div>
                <button onClick={()=> openModal()} className='pt-4 mobile-lg:pt-2 text-primary-t2 font-medium cursor-pointer hover:text-primary-base hover:scale-110 transition-all duration-500 ease-in-out'>
                    see on how i did →
                </button>
            </div>
            <PopupModal isOpen={showExtension} onClose={closeModal}></PopupModal>
        </>
    )
}

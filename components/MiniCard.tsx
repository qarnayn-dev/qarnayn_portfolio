import {useInView} from "framer-motion";
import Lottie from "lottie-react"
import { useRef, useState} from "react"
import { animated, config, easings, useSpring } from "react-spring";
import PopupModal from "./PopupModal";
import TrailedChildren from "./TrailedChildren";

interface iMiniCard{
    animationData: unknown,
    title: string,
    extensionData: tMiniCardExtension,
}

type tMiniCardExtension = {
    description: string,
    showcaseList: iShowcaseItem[],
}

export const MiniCard = ({ animationData, title, extensionData }: iMiniCard) => {
    const titleRef = useRef(null);
    const isInView = useInView(titleRef, { once: true });
    const [showExtension, setShowExtension] = useState(false);

    const subTitleStyle: string = "style-body font-light text-primary-base font-sans";

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

    const ShowcasesItems = () => {
        return <TrailedChildren delay={500} duration={750}>{extensionData.showcaseList.map((v,i)=><ShowcaseItem key={`showcase#${i}`} title={v.title} content={v.content}></ShowcaseItem>)}</TrailedChildren>
    }

    const subTitleSpring = useSpring({
        config: config.molasses,
        delay:showExtension ? 900 :0,
        to: {opacity:showExtension? 1:   0},
    });

    const titleSpring = useSpring({
        config: {duration: 900,  tension: 280, friction: 120},
        to: { x:showExtension ? 0:10, opacity: showExtension ? 1 : 0 },
    });

    const contentSpring = useSpring({
        config: {duration:600, easing: easings.easeInCubic},
        delay: showExtension? 200 :0,
        to: {opacity:showExtension? 1: 0},
    });



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
                    {title}</div>
                <button onClick={()=> openModal()} className='pt-4 mobile-lg:pt-2 text-primary-t2 font-medium cursor-pointer hover:text-primary-base hover:scale-110 transition-all duration-500 ease-in-out'>
                    see on how i did →
                </button>
            </div>
            <PopupModal isOpen={showExtension} onClose={closeModal}>
                <div className="w-full h-full flex flex-col overflow-scroll gray-dark-pallete dark:gray-light-pallete sm:px-[5%] md:px-[8%] lg:px-[12%] xl:px-[16%] px-2 py-2 md:py-[4%] lg:py-[6%]">
                    <animated.h2 style={subTitleSpring} className={subTitleStyle}>On How</animated.h2>
                    <animated.h1 style={titleSpring} className=" mb-6 style-subheading font-medium ">{title}</animated.h1>
                    <animated.p style={contentSpring} className="mr-2 mb-10 text-themed-gray-t5 style-body">{extensionData.description}</animated.p>
                    {(extensionData.showcaseList.length > 0) && <animated.h2 style={subTitleSpring} className={`${subTitleStyle} mb-3`}>Showcases</animated.h2>}
                    {ShowcasesItems()}
                    <></>
                </div>
            </PopupModal>
        </>
    )
}

interface iShowcaseItem{
    title: string,
    content: string,
}

const ShowcaseItem = (prop: iShowcaseItem) => {

    return (
        <div className="flex flex-col style-body">
            <h3 className="pl-1 border-l-[3px] border-spacing-4 border-primary-t5 font-medium h-4 flex items-center text-themed-gray-t4 -translate-x-[7px]">{prop.title}</h3>
            <div className="text-themed-gray-t5 mt-2 mb-6">{prop.content}</div>
        </div>
    )
 }

import { useScroll } from "framer-motion";
import { RefObject, useState, useEffect } from "react";

/**
 * custom hook: use to snap the scroll position into a precise scrollY position based on the `targetRef` offset top.
 * note that the hook start to execute whenever the `target`'s top is closed to the viewport's  top i.e. scrollY.
 *
 * `distance`: absolute difference in distance (in pixel) between the target offset and the scrollY position. default = 15
 *
 * `responseMs`: the time when the scrolling is at rest i.e. scroll response, to trigger the page to be scrolled into the position. default = 200ms.
 *
 * example of usesage:
 * ```
    const objRef = useRef<HTMLElement>(null);
    useScrollSnap(objRef);
    return (<div ref={objRef as LegacyRef<HTMLDivElement> | undefined}></div>);
 * ```
 */
// TODO: change from offsetTop -> getBoundingClientRect()
// TODO: snap option, bottom snap
// TODO:
// TODO:

interface UseScrollSnapOptions{
    distance?: number,
    responseMs?: number,
    // snap position; accept `['top','bottom']`. default: 'top'
    position?: string,
}


export const useScrollSnap = (targetRef: RefObject<HTMLElement>,options?:UseScrollSnapOptions|undefined): void => {

    // const [targetOffsetTop, setTargetOffsetTop] = useState<number|null>(null);
    // const [boundingOffset, setBoundingOffset] = useState<number|null>(null);
    // const [targetScrollYPosition, setTargetScrollYPosition] = useState<number|null>(null);
    const { scrollY } = useScroll();
    const snapAt: string = options?.position ?? 'top';

    let target: HTMLElement | undefined | null;
    // let targetScrollYPosition: number | undefined | null;
    // should be reassigned everytime the difference is close
    let timeOut: NodeJS.Timeout | undefined;

    function getDifference(): number | null {
        // TODO: update the bottom config
        return target ? (target.getBoundingClientRect().top) : null;
    }

    function getTargetScrollY(): number | null {
        const boundingOffset: number | null = getDifference();
        const addOffset: number = 0;
        console.log("from update: ",`${scrollY.get()} + ${boundingOffset} + ${addOffset}`)
        const targetScrollYPosition = boundingOffset ? (scrollY.get() + boundingOffset + addOffset) : null;

        return targetScrollYPosition;
    }

    function reassignTimeout(): void {
        if (timeOut) clearTimeout(timeOut);
        timeOut = setTimeout(() => { scrollToYTarget(); }, options?.responseMs?? 200)
    }

    function handleOnScroll(): void {
        const threshold: number = 50;
        const diff: number | null = getDifference();
        // Logic should be implement here
        if (diff && Math.abs(diff) < threshold) reassignTimeout();
        else clearTimeout(timeOut);
    }

    function scrollToYTarget(): void {
        const targetScrollYPosition: number | null = getTargetScrollY();
        console.log("scroll to -> ",targetScrollYPosition);
        if (targetScrollYPosition) window.scrollTo({ top: targetScrollYPosition, behavior: "smooth" });
    }

    useEffect(() => {
        target = targetRef.current;
        if (target) {

            const unsubScrollY = scrollY.onChange((y) => {
                // const scrollYPosition = getTargetScrollY();
                // console.log("Y: ", y);
                // console.log("   ");
                // console.log("offsetTop : ", target?.offsetTop);
                // console.log("scrollY : ",scrollY.get());
                // console.log("getDifference() : ", getDifference());
                handleOnScroll();
            });
            return ()=> {unsubScrollY}
        }
    }, []);
}
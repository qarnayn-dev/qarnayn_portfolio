import { useScroll } from "framer-motion";
import { RefObject, useEffect } from "react";
import useWindowDimensions from "./useWindowDimensions";

interface UseScrollSnapOptions{
    distance?: number,
    responseMs?: number,
    // snap position; accept `['top','bottom']`. default: 'top'
    position?: string,
    // the scalling for the distance between the target and the viewport, default is 1.
    scale?: number,
}

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

export const useScrollSnap = (targetRef: RefObject<HTMLElement>,options?:UseScrollSnapOptions|undefined): void => {
    const { scrollY } = useScroll();
    const { width, height } = useWindowDimensions();
    const m: number = 0.0167; // gradient
    const C: number = 12.9; // y-intercept

    let target: HTMLElement | undefined | null;
    let threshold: number;
    let unsubScrollY: (() => void) | null ;
    // should be reassigned everytime the difference is close
    let timeOut: NodeJS.Timeout | undefined;


    // The difference between the top viewport and the target's `options.position`.
    // Default: target's top  - viewport top
    // `'bottom'`: target's bottom - viewport height - viewport's top
    function getDifference(): number | null {
        let diffInPixels: number | null;

        switch (options?.position) {
            case 'bottom':
                diffInPixels = target ? (target.getBoundingClientRect().bottom - height) : null;
                break;
            default:
                diffInPixels = target ? (target.getBoundingClientRect().top) : null;
                break;
        }
        return diffInPixels;
    }

    function getTargetScrollY(): number | null {
        const boundingOffset: number | null = getDifference();
        const addOffset: number = 0;
        // console.log("from update: ", `${scrollY.get()} + ${boundingOffset} + ${addOffset}`);
        const targetScrollYPosition = boundingOffset ? (scrollY.get() + boundingOffset + addOffset) : null;

        return targetScrollYPosition;
    }

    function reassignTimeout(): void {
        if (timeOut) clearTimeout(timeOut);
        timeOut = setTimeout(() => { scrollToYTarget(); }, options?.responseMs?? 200)
    }

    function calculateThreshold() {
        // Note: the threshhold by default uses linear geometry scaling
        threshold = options?.distance ?? (options?.scale ?? 1) * (width * m + C);
        // console.log("new threshold: ",threshold);
    }

    function handleOnScroll(): void {
        const diff: number | null = getDifference();
        if (diff && Math.abs(diff) < threshold) reassignTimeout();
        else clearTimeout(timeOut);
    }

    function scrollToYTarget(): void {
        const targetScrollYPosition: number | null = getTargetScrollY();
        if (targetScrollYPosition) window.scrollTo({ top: targetScrollYPosition, behavior: "smooth" });
    }

    useEffect(() => {
        if(!target) target = targetRef.current;

        if (target && !unsubScrollY && width !== 0 && height !== 0) {
            calculateThreshold();
            unsubScrollY = scrollY.onChange((y) => {handleOnScroll();});
            return ()=> {unsubScrollY}
        }

    }, [width,height]);

}
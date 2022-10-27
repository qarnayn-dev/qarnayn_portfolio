import { useScroll } from "framer-motion";
import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Debouncer } from "../utilities/Debouncer";
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

export const useScrollSnap = (targetRef: RefObject<HTMLElement>, options?: UseScrollSnapOptions | undefined): void => {
    const [target, setTarget] = useState<HTMLElement | null>(null);
    const [targetOffset, SetTargetOffset] = useState<number | null>(null);
    const { scrollY } = useScroll();
    const { width, height } = useWindowDimensions();
    const m: number = 0.0167; // gradient
    const C: number = 12.9; // y-intercept

    let unsubScrollY: () => void | undefined;

    const debouncer: Debouncer = new Debouncer(() => { scrollToYTarget(); }, options?.responseMs ?? 80);
    // Debouncer whenever the scroll changes
    const scrollDebouncer: Debouncer = new Debouncer(() => {SetTargetOffset(targetYOffset())}, 40);

    const threshold: number = useMemo(() => options?.distance ?? (options?.scale ?? 1) * (width * m + C), [width]);

    const targetYOffset:()=> number | null = useCallback(() => {
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
    }, [height, width, target]);

    useEffect(() => {
        if(!target) setTarget(targetRef.current);

        if (target && !unsubScrollY && width !== 0 && height !== 0) {
            unsubScrollY = scrollY.onChange((y) => {
                // console.log("scrolY: ", y);
                scrollDebouncer.rebound();
            });
        }

        return ()=> {unsubScrollY}
    }, [target]);

    // react whenever choll changes
    useEffect(() => {
        // console.log("New target offset : ", targetOffset);
        if (targetOffset && Math.abs(targetOffset) < threshold) debouncer.rebound();
        else debouncer.cancel();
        return () => {}
    }, [targetOffset])


    function getTargetScrollY(): number | null {
        const offset = targetOffset;
        return offset ? (scrollY.get() + offset) : null;
    }

    function scrollToYTarget(): void {
        const targetYPosition = getTargetScrollY();
        if (targetYPosition) window.scrollTo({ top: targetYPosition, behavior: "smooth" });
    }
}

interface iScrollSnapWrapper{
    children?: any,
    className?: string,
    options?: UseScrollSnapOptions,
}

export const ScrollSnapWrapper = ({children, className, options}: iScrollSnapWrapper) => {
    const ref = useRef<HTMLDivElement>(null);

    useScrollSnap(ref, options);

    return (
        <div ref={ref} className={className}>{children}</div>
    )
}
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
export const useScrollSnap = (targetRef: RefObject<HTMLElement>, distance?: number, responseMs?: number): void => {
  const [targetOffsetTop, setTargetOffsetTop] = useState<number|null>(null);
  const { scrollY } = useScroll();
  // should be reassigned everytime the difference is close
  let timeOut: NodeJS.Timeout | undefined;

  function reassignTimeout() {
    timeOut = setTimeout(() => {scrollToElement();}, (responseMs?? 200));
  }

  function scrollToElement() {
    if (targetOffsetTop) window.scrollTo({behavior:'smooth',top: targetOffsetTop})
  }

  function getScrollDiff(): number {
    const diff: number = Math.abs(targetOffsetTop ? (targetOffsetTop - scrollY.get()) : 0);
    return diff;
  }

  useEffect(() => {
    // Note: must assign inside of the use effect, otherwise the `target` had been assigned
    // to the previous value withou updated
    const target: HTMLElement | undefined | null = targetRef.current;

    if (target) setTargetOffsetTop(target.offsetTop);

  },[]);

  useEffect(() => {
    if (targetOffsetTop) {
        // listen to scroll changes
      const scrolYUnsub = scrollY.onChange(() => {
        // Only to be triggeredd when target and the top viewport are close
        if (getScrollDiff() < (distance ?? 15)) {
            // this will clear the prior `timeOut` assigned
          if (timeOut) clearTimeout(timeOut);
          reassignTimeout();
          return () => clearTimeout(timeOut);
        }
      });
    return ()=> {scrolYUnsub}
    }
  }, [targetOffsetTop]);
}
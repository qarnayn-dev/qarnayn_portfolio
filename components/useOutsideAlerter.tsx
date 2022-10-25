import React, { useRef, useEffect, RefObject, BaseSyntheticEvent, ReactNode } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref?: RefObject<HTMLDivElement>, onOutsideClick?: ()=> void) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event:  MouseEvent ) {
        if (ref && ref.current && !ref.current.contains(event.target as Node)) {
            if (onOutsideClick) onOutsideClick();
            // alert("You clicked outside of me!");
        }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Unbind the event listener on clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

interface iOutsideAlerter{
    children?: ReactNode,
    onOutsideClick?: ()=>void,
}

/**
 * Component that alerts if you click outside of it
 */
export default function OutsideAlerter({children,onOutsideClick}:iOutsideAlerter) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef,onOutsideClick);

  return <div ref={wrapperRef}>{children}</div>;
}